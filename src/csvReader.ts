import fs from 'fs';
import csv from 'csv-parser';
// import stripBomStream from 'strip-bom-stream';

import { Industry } from './entities/industry';
import { Client } from './entities/client';
import { CaseStudyType } from './entities/caseStudyType';
import { Tool } from './entities/tool';
import { CaseStudy } from './entities/caseStudy';
import { EntitiesList } from './entities/entitiesList';

export class CsvReader {
	clientsIndustriesList = new EntitiesList('test');
	casesStudiesTypesList = new EntitiesList('test');
	toolsList = new EntitiesList('test');
	clientsList = new EntitiesList('test');
	casesStudiesList = new EntitiesList('test');

	async readCSVFile(filePath: string): Promise<object[]> {
		const results: object[] = [];

		return new Promise((resolve, reject) => {
			fs.createReadStream(filePath)
				// .pipe(stripBomStream())
				.pipe(csv())
				.on('data', (data) => results.push(data))
				.on('end', () => resolve(results))
				.on('error', (error) => reject(error));
		});
	}

	// Extract challenge, solution and result from the column
	extractInfo = (info: string) => {
		// Split the text using keywords as delimiters
		const keywords = ['Challenges', 'Challenge', 'Solution', 'Result'];

		const pattern = new RegExp(`(${keywords.map(keyword => (keyword)).join('|')}):`, 'g');

		const sections = info.split(pattern).filter(section => section.trim() !== '');

		// Process the sections to extract information
		const information:Record<string, string> = {};

		for (let i = 0; i < sections.length; i += 2) {
			let key = sections[i].trim();

			// If there is a value
			if(sections[i + 1]) {
				let value = sections[i + 1].trim();

				// Check if value is not next keyword (meaning it's should be empty)
				if (keywords.includes(value)) {
					value = '';
				}

				//In case that challenge does not have s add it
				if (key === 'Challenges') {
					key = 'Challenge';
				}

				information[key] = value;
			}
		}

		return information;
	}

	parseData = (data:any) => {
		data.forEach((item:any) => {
			// Create industry list
			const currentIndustryList:Industry[] = [];
			if (item['Industry'] && item['Industry'] !== '') {
				const industriesDataList = item['Industry'].split(', ');
				industriesDataList.forEach((industry:string) => {
					const newIndustry = new Industry(industry);
					const industryFind = this.clientsIndustriesList.add(newIndustry);
					if (industryFind !== null && industryFind instanceof Industry) {
						currentIndustryList.push(industryFind);
					} else {
						currentIndustryList.push(newIndustry);
					}
				});
			}
			

			// Create case study type list
			const currentCaseStudyTypeList:CaseStudyType[] = [];
			if (item['Type'] && item['Type'] !== '') {
				const caseStudyTypeDataList = item['Type'].split(', ');
				caseStudyTypeDataList.forEach((type:string) => {
					const newType = new CaseStudyType(type);
					const typeFind = this.casesStudiesTypesList.add(newType);
					if (typeFind !== null && typeFind instanceof CaseStudyType) {
						currentCaseStudyTypeList.push(typeFind);
					} else {
						currentCaseStudyTypeList.push(newType);
					}
				});
			}

			// Create tool list
			const currentToolList:Tool[] = [];
			if (item['Tech'] && item['Tech'] !== '') {
				const toolDataList = item['Tech'].split(', ');
				toolDataList.forEach((toolName:string) => {
					const newTool = new Tool(toolName);
					const toolFind = this.toolsList.add(newTool);
					if (toolFind !== null && toolFind instanceof Tool) {
						currentToolList.push(toolFind);
					} else {
						currentToolList.push(newTool);
					}
				});
			}

			// Create new client
			let currentClient = new Client(item['Name'], currentIndustryList, item['Country']);
			const clientFind = this.clientsList.add(currentClient);
			if (clientFind !== null && clientFind instanceof Client) {
				currentClient = clientFind;
			}

			// Create the case study
			const info = this.extractInfo(item['Challenges, solutions and results EN']);
			
			let title = item['confidential title'];
			if(item['Keep Confidential'] === 'No') {
				title = item['Name'];
			}

			// TODO: collect and send picture to strapi
			const pictureList:string[] = [];
			const bannerPicture = '';

			const newCaseStudy = new CaseStudy(title, bannerPicture, false, item['Summary EN'], currentCaseStudyTypeList, currentClient, item['Keep Confidential'], currentToolList, info.Challenge, info.Solution, info.Result, pictureList);

			// console.log(newCaseStudy);
			this.casesStudiesList.add(newCaseStudy);
		})
	}
}

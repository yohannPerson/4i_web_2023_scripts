import fs from 'fs';
import csv from 'csv-parser';
// import stripBomStream from 'strip-bom-stream';
import { Industry } from './entities/industry';
import { Client } from './entities/client';
import { CaseStudyType } from './entities/caseStudyType';
import { Tool } from './entities/tool';
import { CaseStudy } from './entities/caseStudy';

export class CsvReader {
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
		// const clientsIndustriesList:Industry[] = [];
		// const casesStudiesTypesList:CaseStudyType[] = [];
		// const toolsDataList:Tool[] = [];
		// const clientsList:Client[] = [];
		const casesStudiesList:CaseStudy[] = [];
		
		data.forEach((item:any) => {
			// Create industry list
			const newIndustryList:Industry[] = [];
			if (item['Industry'] && item['Industry'] !== '') {
				const industriesDataList = item['Industry'].split(', ');
				industriesDataList.forEach((industry:string) => {
					const newIndustry = new Industry(industry);
					newIndustryList.push(newIndustry);
				});
			}
			

			// Create case study type list
			const newCaseStudyTypeList:CaseStudyType[] = [];
			if (item['Type'] && item['Type'] !== '') {
				const caseStudyTypeDataList = item['Type'].split(', ');
				caseStudyTypeDataList.forEach((type:string) => {
					const newType = new CaseStudyType(type);
					newCaseStudyTypeList.push(newType);
				});
			}

			// Create tool list
			const newToolList:Tool[] = [];
			if (item['Tech'] && item['Tech'] !== '') {
				const toolDataList = item['Tech'].split(', ');
				toolDataList.forEach((toolName:string) => {
					const newTool = new Tool(toolName);
					newToolList.push(newTool);
				});
			}

			// Create new client
			const newClient = new Client(item['Name'], newIndustryList, item['Country']);

			// Create the case study
			const info = this.extractInfo(item['Challenges, solutions and results EN']);
			
			//TODO : wait for Nina answer to know what to put
			let title = '4i project';
			if(item['Keep Confidential'] === 'No') {
				title = item['Name'];
			}

			// TODO: Wait for Nina answer to check what to put
			let descriptionBanner = item['Summary EN'];
			let description = item['Summary EN'];

			// TODO: collect and send picture to strapi
			const pictureList:string[] = [];
			const bannerPicture = '';

			const newCaseStudy = new CaseStudy(descriptionBanner, title, bannerPicture, false, description, newCaseStudyTypeList, newClient, item['Keep Confidential'], newToolList, info.Challenge, info.Solution, info.Result, pictureList);

			casesStudiesList.push(newCaseStudy);
		})
	
		return casesStudiesList;
	}
}

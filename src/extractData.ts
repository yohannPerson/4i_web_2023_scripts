import { Industry } from './entities/industry';
import { Client } from './entities/client';
import { CaseStudyType } from './entities/caseStudyType';
import { Tool } from './entities/tool';
import { CaseStudy } from './entities/caseStudy';
import { EntitiesList } from './entities/entitiesList';
import { InsightType } from './entities/insightType';
import { Insight } from './entities/insight';
import { InsightParagraph } from './entities/insigthComponents';
import { NodeHtmlMarkdown } from 'node-html-markdown';
import { Test } from './entities/test';

//Case studies collection names
const industryCollectionName = "industries";
const caseStudyTypeCollectionName = "case-study-types";
const toolsCollectionName = "tools";
const clientsCollectionName = "clients";
const caseStudyCollectionName = "case-studies";

//Insights collection names
const insightTypeCollectionName = "insight-types";
const insightCollectionName = "insights";

//Tests collection names
const testCollectionName = "tests";

export class ExtractData {
	// Extract challenge, solution and result from the column
	extractInfo = (info: string) => {
		// Split the text using keywords as delimiters
		const keywords = ['Challenges', 'Challenge', 'Solution', 'Result'];

		const pattern = new RegExp(`(${keywords.map(keyword => (keyword)).join('|')}):?`, 'g');

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

	parseCaseStudiesData = (data:any) => {
		const clientsIndustriesList = new EntitiesList(industryCollectionName);
		const casesStudiesTypesList = new EntitiesList(caseStudyTypeCollectionName);
		const toolsList = new EntitiesList(toolsCollectionName);
		const clientsList = new EntitiesList(clientsCollectionName);
		const casesStudiesList = new EntitiesList(caseStudyCollectionName);

		data.forEach((item:any) => {
			// Create industry list
			const currentIndustryList:Industry[] = [];
			if (item['Industry'] && item['Industry'] !== '') {
				const industriesDataList = item['Industry'].split(', ');
				industriesDataList.forEach((industry:string) => {
					const newIndustry = new Industry(industry);
					const industryFind = clientsIndustriesList.add(newIndustry);
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
					const typeFind = casesStudiesTypesList.add(newType);
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
					const toolFind = toolsList.add(newTool);
					if (toolFind !== null && toolFind instanceof Tool) {
						currentToolList.push(toolFind);
					} else {
						currentToolList.push(newTool);
					}
				});
			}

			// Create new client
			let currentClient = null;
			if (!item['Name']) {
				console.error('Impossible to create client : ' + item['Name'] + ' because no Name');
			}else if (!item['Country']) {
				console.error('Impossible to create client : ' + item['Name'] + ' because no country');
			} else {
				currentClient = new Client(item['Name'], currentIndustryList, item['Country']);
				const clientFind = clientsList.add(currentClient);
				if (clientFind !== null && clientFind instanceof Client) {
					currentClient = clientFind;
				}
			}
			

			// Create the case study
			if (!item['Summary EN']) {
				console.error('Impossible to create case study : ' + item['Name'] + ' because no summary EN');
			}else if (!currentClient) {
				console.error('Impossible to create case study : ' + item['Name'] + ' because no client');
			} else {
				const infoEN = this.extractInfo(item['Challenges, solutions and results EN']);
				const infoCN = this.extractInfo(item['Challenges, solutions and results CN']);

				let title = '';
				let confidential = false;
				if(item['Keep Confidential'] === 'Yes') {
					confidential = true;
				}

				if (item['confidential title']) {
					title = item['confidential title'];
				} else {
					if(!confidential) {
						title = item['Name'];
					}
				}

				if (title !== '') {
					const newCaseStudy = new CaseStudy(title, item['Summary EN'], item['Summary CN'], currentCaseStudyTypeList, currentClient, confidential, currentToolList, infoEN.Challenge, infoCN.Challenge, infoEN.Solution, infoCN.Solution, infoEN.Result, infoCN.Result);
					casesStudiesList.add(newCaseStudy);
				} else {
					console.error('Impossible to create case study : ' + item['Name'] + ' because no title');
				}
			}
		})

		return {
			clientsIndustriesList: clientsIndustriesList,
			casesStudiesTypesList: casesStudiesTypesList,
			toolsList: toolsList,
			clientsList: clientsList,
			casesStudiesList: casesStudiesList
		}
	}

	parseInsightsData = (data:any) => {
		const insightTypesList = new EntitiesList(insightTypeCollectionName);
		const insightsList = new EntitiesList(insightCollectionName);

		data.forEach((item:any) => {
			const currentTypeList:InsightType[] = [];
			if (item['Insight Types'] && item['Insight Types'] !== '') {
				const insightTypeDataList = item['Insight Types'].split('|');
				insightTypeDataList.forEach((type:string) => {
					const newType = new InsightType(type);
					const typeFind = insightTypesList.add(newType);
					if (typeFind !== null && typeFind instanceof InsightType) {
						currentTypeList.push(typeFind);
					} else {
						currentTypeList.push(newType);
					}
				});
			}

			const newParagraph = new InsightParagraph(NodeHtmlMarkdown.translate(item['Paragraph']));
			const newInsight = new Insight(item['Title'], [newParagraph], currentTypeList);
			insightsList.add(newInsight);
		});

		return {
			insightTypeList: insightTypesList,
			insightList: insightsList
		}
	}

	parseTest = () => {
		const testsList = new EntitiesList(testCollectionName);

		const test1 = new Test('test 1 englisgh', 'test 1 chinese');
		const test2 = new Test('test 2 englisgh', 'test 1 chinese');

		testsList.add(test1);
		testsList.add(test2);

		return {
			testsList: testsList
		}
	}
}

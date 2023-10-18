import { IndustryEntity } from './entities/industry/entity';
import { ClientEntity } from './entities/client/entity';
import { CaseStudyTypeEntity } from './entities/caseStudyType/entity';
import { ToolEntity } from './entities/tool/entity';
import { CaseStudyEntity } from './entities/caseStudy/entity';
import { ParentsList } from './entities/parentsList';
import { InsightParagraph } from './entities/insight/insigthComponents';
import { NodeHtmlMarkdown } from 'node-html-markdown';
// import { Test } from './entities/test';
import { IndustryParent } from './entities/industry/parent';
import { CaseStudyTypeParent } from './entities/caseStudyType/parent';
import { ToolParent } from './entities/tool/parent';
import { ClientParent } from './entities/client/parent';
import { CaseStudyParent } from './entities/caseStudy/parent';
import { InsightTypeParent } from './entities/insightType/parent';
import { InsightTypeEntity } from './entities/insightType/entity';
import { InsightParent } from './entities/insight/parent';
import { InsightEntity } from './entities/insight/entity';

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

//Lang local list
const langLocalList = ['zh', 'fr', 'de', 'ja'];

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
		const clientsIndustriesList = new ParentsList(industryCollectionName);
		const casesStudiesTypesList = new ParentsList(caseStudyTypeCollectionName);
		const toolsList = new ParentsList(toolsCollectionName);
		const clientsList = new ParentsList(clientsCollectionName);
		const casesStudiesList = new ParentsList(caseStudyCollectionName);

		data.forEach((item:any) => {
			// Create industry list
			const currentIndustryList:IndustryParent[] = [];
			if (item['Industry'] && item['Industry'] !== '') {
				const industriesDataList = item['Industry'].split(', ');
				industriesDataList.forEach((industry:string) => {
					const mainEntity = new IndustryEntity(industry);
					const newIndustry = new IndustryParent(mainEntity);

					langLocalList.forEach((lang)=> {
						const newModuleIndustry = new IndustryEntity(industry);
						newIndustry.addModule(newModuleIndustry, lang);
					});

					const industryFind = clientsIndustriesList.add(newIndustry);
					if (industryFind !== null && industryFind instanceof IndustryParent) {
						currentIndustryList.push(industryFind);
					} else {
						currentIndustryList.push(newIndustry);
					}
				});
			}
			

			// Create case study type list
			const currentCaseStudyTypeList:CaseStudyTypeParent[] = [];
			if (item['Type'] && item['Type'] !== '') {
				const caseStudyTypeDataList = item['Type'].split(', ');
				caseStudyTypeDataList.forEach((type:string) => {
					const mainEntity = new CaseStudyTypeEntity(type);
					const newType = new CaseStudyTypeParent(mainEntity);

					langLocalList.forEach((lang)=> {
						const newModuleType = new CaseStudyTypeEntity(type);
						newType.addModule(newModuleType, lang);
					});

					const typeFind = casesStudiesTypesList.add(newType);
					if (typeFind !== null && typeFind instanceof CaseStudyTypeParent) {
						currentCaseStudyTypeList.push(typeFind);
					} else {
						currentCaseStudyTypeList.push(newType);
					}
				});
			}

			// Create tool list
			const currentToolList:ToolParent[] = [];
			if (item['Tech'] && item['Tech'] !== '') {
				const toolDataList = item['Tech'].split(', ');
				toolDataList.forEach((toolName:string) => {
					const mainEntity = new ToolEntity(toolName);
					const newTool = new ToolParent(mainEntity);

					const toolFind = toolsList.add(newTool);
					if (toolFind !== null && toolFind instanceof ToolParent) {
						currentToolList.push(toolFind);
					} else {
						currentToolList.push(newTool);
					}
				});
			}

			// Create new client
			let currentClient:ClientParent|null = null;
			if (!item['Name']) {
				console.error('Impossible to create client : ' + item['Name'] + ' because no Name');
			}else if (!item['Country']) {
				console.error('Impossible to create client : ' + item['Name'] + ' because no country');
			} else {
				const mainEntity = new ClientEntity(item['Name'], item['Country']);
				const newClient = new ClientParent(mainEntity, currentIndustryList);

				langLocalList.forEach((lang)=> {
					const newModuleClient = new ClientEntity(item['Name'], item['Country']);
					newClient.addModule(newModuleClient, lang);
				});

				const clientFind = clientsList.add(newClient);
				if (clientFind !== null && clientFind instanceof ClientParent) {
					currentClient = clientFind;
				} else {
					currentClient = newClient;
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
					const mainEntity = new CaseStudyEntity(title, item['Summary EN'], confidential, infoEN.Challenge, infoEN.Solution, infoEN.Result);
					const newCaseStudy = new CaseStudyParent(mainEntity, currentCaseStudyTypeList, currentClient, currentToolList);

					langLocalList.forEach((lang)=> {
						let summary = item['Summary EN'];
						let challenge = infoEN.Challenge;
						let solution = infoEN.Solution;
						let result = infoEN.Result;

						if (lang === 'zh') {
							summary = item['Summary CN'];
							challenge = infoCN.Challenge;
							solution = infoCN.Solution;
							result = infoCN.Result;
						}
						const newModuleCaseStudy = new CaseStudyEntity(title, summary, confidential, challenge, solution, result);
						newCaseStudy.addModule(newModuleCaseStudy, lang);
					});
					casesStudiesList.add(newCaseStudy);
				} else {
					console.error('Impossible to create case study : ' + item['Name'] + ' because no title');
				}
			}
		});

		return {
			clientsIndustriesList: clientsIndustriesList,
			casesStudiesTypesList: casesStudiesTypesList,
			toolsList: toolsList,
			clientsList: clientsList,
			casesStudiesList: casesStudiesList
		}
	}

	parseInsightsData = (data:any) => {
		const insightTypesList = new ParentsList(insightTypeCollectionName);
		const insightsList = new ParentsList(insightCollectionName);

		data.forEach((item:any) => {
			const currentTypeList:InsightTypeParent[] = [];
			if (item['Insight Types'] && item['Insight Types'] !== '') {
				const insightTypeDataList = item['Insight Types'].split('|');
				insightTypeDataList.forEach((type:string) => {
					const mainEntity = new InsightTypeEntity(type);
					const newType = new InsightTypeParent(mainEntity);

					langLocalList.forEach((lang)=> {
						const newModuleType = new InsightTypeEntity(type);
						newType.addModule(newModuleType, lang);
					});
					
					const typeFind = insightTypesList.add(newType);
					if (typeFind !== null && typeFind instanceof InsightTypeParent) {
						currentTypeList.push(typeFind);
					} else {
						currentTypeList.push(newType);
					}
				});
			}

			const newParagraph = new InsightParagraph(NodeHtmlMarkdown.translate(item['Paragraph']));

			const mainEntity = new InsightEntity(item['Title'], [newParagraph]);
			const newInsight = new InsightParent(mainEntity, currentTypeList);
			langLocalList.forEach((lang)=> {
				const newModuleInsight = new InsightEntity(item['Title'], [newParagraph]);
				newInsight.addModule(newModuleInsight, lang);
			}); 
			insightsList.add(newInsight);
		});

		return {
			insightTypeList: insightTypesList,
			insightList: insightsList
		}
	}

	// parseTest = () => {
	// 	const testsList = new EntitiesList(testCollectionName);

	// 	const test1 = new Test('test 1 englisgh', 'test 1 chinese');
	// 	const test2 = new Test('test 2 englisgh', 'test 1 chinese');

	// 	testsList.add(test1);
	// 	testsList.add(test2);

	// 	return {
	// 		testsList: testsList
	// 	}
	// }
}

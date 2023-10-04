import { CsvReader } from "./src/csvReader";
import { ExtractData } from "./src/extractData";
import { InsertData } from "./src/insertData";
import { printObject } from "./src/utils";

const caseStudiesFile = './data/cases_studies_notions.csv';
const insightsFile = './data/insights.csv';

const main = async () => {
	const Reader = new CsvReader();
	const Extractor = new ExtractData();

	const csvCaseStudiesData = await Reader.readCSVFile(caseStudiesFile);
	const caseStudiesData = Extractor.parseCaseStudiesData(csvCaseStudiesData);
	// printObject(caseStudiesData.clientsIndustriesList);
	// printObject(caseStudiesData.casesStudiesTypesList);
	// printObject(caseStudiesData.toolsList);
	// printObject(caseStudiesData.clientsList);
	// printObject(caseStudiesData.casesStudiesList);

	const Creator = new InsertData();
	// const industriesNbCreated = await Creator.createItems(caseStudiesData.clientsIndustriesList);
	// const clientsNbCreated = await Creator.createItems(caseStudiesData.clientsList);
	// const typesNbCreated = await Creator.createItems(caseStudiesData.casesStudiesTypesList);
	// const toolsNbCreated = await Creator.createItems(caseStudiesData.toolsList);
	// const caseStudiesCreated = await Creator.createItems(caseStudiesData.casesStudiesList);
	// console.log('=== End inserting data ===');
	// console.log('=== ' + industriesNbCreated + ' industries created ===');
	// console.log('=== ' + clientsNbCreated + ' clients created ===');
	// console.log('=== ' + typesNbCreated + ' types created ===');
	// console.log('=== ' + toolsNbCreated + ' tools created ===');
	// console.log('=== ' + caseStudiesCreated + ' case stdies created ===');

	const csvInsightsData = await Reader.readCSVFile(insightsFile);
	const insightsData = Extractor.parseInsightsData(csvInsightsData);
	// printObject(insightsData.insightTypeList);
	// printObject(insightsData.insightList);

	const insightTypeNbCreated = await Creator.createItems(insightsData.insightTypeList);
	const insightNbCreated = await Creator.createItems(insightsData.insightList);
	console.log('=== End inserting data ===');
	console.log('=== ' + insightTypeNbCreated + ' type created ===');
	console.log('=== ' + insightNbCreated + ' insight created ===');
}

main();

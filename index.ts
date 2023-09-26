import { CsvReader } from "./src/csvReader";
import { printObject } from "./src/util";
  
// Creating an object of the class which is imported
const Reader = new CsvReader();

const main = async () => {
	const csvData = await Reader.readCSVFile('./data/cases_studies_notions.csv');
	const parsedData = Reader.parseData(csvData);
	printObject(parsedData);
}

main();

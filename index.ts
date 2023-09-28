import { CsvReader } from "./src/csvReader";
import { printObject } from "./src/utils";

const main = async () => {
	const Reader = new CsvReader();
	const csvData = await Reader.readCSVFile('./data/test.csv');
	Reader.parseData(csvData);
	// printObject(Reader.clientsIndustriesList);
	// printObject(Reader.casesStudiesTypesList);
	// printObject(Reader.toolsList);
	// printObject(Reader.clientsList);
	printObject(Reader.casesStudiesList);
}

main();

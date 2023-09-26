import fs from 'fs';
import csv from 'csv-parser';

interface industryType {
	label: string
}

export class CsvReader {
    async readCSVFile(filePath: string): Promise<object[]> {
		const results: object[] = [];

		return new Promise((resolve, reject) => {
			fs.createReadStream(filePath)
				.pipe(csv())
				.on('data', (data) => results.push(data))
				.on('end', () => resolve(results))
				.on('error', (error) => reject(error));
		});
	}

	parseData = (data:any) => {
		const clientsIndustriesData:industryType[] = [];
		const clientsData = [];
		const casesStudiesData = [];
		const casesStudiesTypes = [];
		const toolsData = [];
		
		data.forEach((item:any) => {
			const industriesList = item['Industry'].split(', ');
			industriesList.forEach((industry:string) => {
				const newIndustry = {
					label: industry
				};

				clientsIndustriesData.push(newIndustry);
			});
		})
	
		return {
			clientsIndustriesData: clientsIndustriesData
		}
	}
}

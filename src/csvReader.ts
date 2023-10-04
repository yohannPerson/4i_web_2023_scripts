import fs from 'fs';
import csv from 'csv-parser';
// import stripBomStream from 'strip-bom-stream';

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
}

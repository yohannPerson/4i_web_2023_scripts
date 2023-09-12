const axios = require('axios');
const fs = require('fs');
const csv = require('csv-parser');

// Define the Strapi API endpoint for creating items in the "tools" collection
const apiUrl = 'http://dev.4idps.com.tw:5101/api'; // Replace with your Strapi API URL
const filePath = './data/test_file.csv';
const toolsCollectionName = 'tools';
const toolsKey = 'Name';
const testCollectionName = 'tests';

// Data for creating multiple items
const testToAdd = [
	{ title: 'Tool 1', tools:[] },
	{ title: 'Tool 2', tools:[] }
];

const listOfNewTools = [];

const toolsToAdd = [
	{
		Name: 'ToolTest'
	}
]

const printObject = (obj) => {
	str = JSON.stringify(obj, null, 4);
	console.log(str);
}

// Function to create an item in the collection
const createItem = async (collectionName, item) => {
	let resu = null;
	try {
		const response = await axios.post(`${apiUrl}/${collectionName}`, {data:item});

		if (response.status === 200) {
			//printObject(response.data.data);
			resu = response.data.data.id;
			console.log(`Created ${collectionName} with ID: ${id}`);
		} else {
			console.error('Failed to create item:', response.data);
		}
	} catch (error) {
		console.error('Error creating item:', error.message);
	}

	return resu;
} 

// Loop through the items and create them and then add the id to the arrray of collection if requiere
const createItems =  async (collectionName, listItem, arrayToAdd, collectionKey) => {
	for (const item of listItem) {
		const newId = await createItem(collectionName, item, collectionKey);
		if (arrayToAdd && collectionKey && newId) {
			addIdToArray(arrayToAdd, collectionKey, newId);
		}
	}
}

const addIdToArray = (arrayToAdd, key, id) => {
	arrayToAdd[key] = id;
}

// Function to read the Csv
const readCsvFile = () => {
	const data = [];

	fs.createReadStream(filePath)
	.pipe(csv())
	.on('data', (row) => {
		data.push(row);
	})
	.on('end', () => {
		// Once all data is read from the CSV file, send it to the Strapi API
		//printObject(data);
		console.log('CSV file succefully read');
	});

	return data;
}

// Call the function to create items
const main = () => {
	const cvsData = readCsvFile();
	// createItems(toolsCollectionName, toolsToAdd, listOfNewTools);
	// createItems(toolsToAdd, toolsToAdd);
}

main();

const axios = require('axios');
const fs = require('fs');
const csv = require('csv-parser');

// Define the Strapi API endpoint for creating items in the "tools" collection
const apiUrl = 'http://dev.4idps.com.tw:5101/api'; // Replace with your Strapi API URL
const filePath = './data/test_file.csv';
const toolsCollectionName = 'test-links';

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
			console.log(`Created ${collectionName} with ID: ${resu}`);
		} else {
			console.error('Failed to create item:', response.data);
		}
	} catch (error) {
		console.error('Error creating item:', error.message);
	}

	return resu;
} 

// Loop through the items and create them and then add the id to the arrray of collection if requiere
const createItems =  async (collectionName, listItem, arrayToAdd, key) => {
	for (const item of listItem) {
		const newId = await createItem(collectionName, item);
		if (arrayToAdd && newId) {
			addIdToArray(arrayToAdd, item[key], newId);
		}
	}
}

const addIdToArray = (arrayToAdd, key, id) => {
	arrayToAdd[key] = id;
}

// Function to read the Csv
const readCsvFile = async () => {
	return new Promise((resolve, reject) => {
		const data = [];
	
		fs.createReadStream(filePath)
			.pipe(csv())
			.on('data', (row) => {
				data.push(row);
			})
			.on('end', () => {
				console.log('CSV file successfully read');
				resolve(data); // Resolve the promise with the data
			})
			.on('error', (error) => {
				console.error('Error reading CSV file:', error);
				reject(error); // Reject the promise if there is an error
			});
	});
}

// Function that transform csv data to object for strapi
const cvsDataSplit = (data) => {
	const toolsData = [];
	const testData = [];
	
	data.forEach((item) => {
		const toolsList = item.tools.split(', ');
		toolsList.forEach((tool) => {
			const newTool = {
				title: tool
			};

			// Try to not add dup but does not work
			if (toolsData.indexOf(newTool) === -1) {
				toolsData.push(newTool);
			}
		});

		printObject(item);

		//Don't know why their is a space before Name
		testData.push({
			title: item[" Name"],
			tools: toolsList
		})
	})

	return {
		toolsData: toolsData,
		testData: testData
	}
}

const convertNameToId = (targetArray, idArray) => {
	
	const tmp = targetArray.map((item) => {
		return idArray[item];
	})
}

// Call the function to create items
const main = async () => {
	const cvsData = await readCsvFile();
	const splitData = cvsDataSplit(cvsData);
	
	
	await createItems(toolsCollectionName, splitData.toolsData, listOfNewTools, 'title');

	printObject(splitData);
	// convertNameToId(splitData.testData.tools, listOfNewTools);

	// createItems(toolsToAdd, toolsToAdd);
}

main();

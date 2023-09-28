import axios from "axios";

import { MainEntity } from "./entities/mainEntity";
import { EntitiesList } from "./entities/entitiesList";

// Define the Strapi API endpoint for creating items in the "tools" collection
const apiUrl = 'http://dev.4idps.com.tw:5101/api'; // Replace with your Strapi API URL

//TODO Add getData function
export class InsertData {
	// Function to create an item in the collection
	createItem = async (item:MainEntity, collectionName: string) => {
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
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error('Error creating item:',item, error.message);
			} else {
				console.log('Error creating item:',item);
			}
			
		}

		return resu;
	}

	createItems =  async (itemsList: EntitiesList) => {
		for (const item of itemsList.list) {
			item.id = await this.createItem(item, itemsList.collectionName);
		}
	}
}
import axios from "axios";

import { MainEntity } from "./entities/mainEntity";
import { EntitiesList } from "./entities/entitiesList";
import { printObject } from "./utils";

// Define the Strapi API endpoint for creating items in the "tools" collection
const apiUrl = 'http://dev.4idps.com.tw:5101/api';
// const apiUrl = 'http://127.0.0.1:1337/api';

export class InsertData {
	// Function to create an item in the collection
	createItem = async (item:MainEntity, collectionName: string) => {
		let resu = null;
		try {
			const response = await axios.post(`${apiUrl}/${collectionName}`, {data:item.getData()});

			if (response.status === 200) {
				resu = response.data.data.id;
				console.log(`Created ${collectionName}:${item.getIdent()} with ID: ${resu}`);
			} else {
				console.error('Failed to create item:', response.data);
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error('Error creating item:', error.message);
				printObject(item.getData());
			} else {
				console.error('Error creating item:',item);
			}
			
		}

		return resu;
	}

	createItems =  async (itemsList: EntitiesList) => {
		let nbCreated = 0;
		for (const item of itemsList.list) {
			const id = await this.createItem(item, itemsList.collectionName);

			if (id) {
				item.id = id;
				nbCreated++;
			} else {
				console.error('No id for this ' + itemsList.collectionName);
			}
		}

		return nbCreated;
	}

	createLocalItem = async (item:MainEntity, collectionName: string, lang:string) => {
		let resu = null;
		// console.log(`${apiUrl}/${collectionName}/${item.id}/localizations`);
		try {
			const response = await axios.post(`${apiUrl}/${collectionName}/${item.id}/localizations`, item.getData(lang));

			if (response.status === 200) {
				resu = response.data.id;
				console.log(`Created ${collectionName} local ${lang} : ${item.getIdent()} with ID: ${resu}`);
			} else {
				console.error('Failed to create local item:', response.data);
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error('Error creating local item:', error.message);
				printObject(item.getData(lang));
			} else {
				console.error('Error creating local item:',item);
			}
			
		}

		return resu;
	}

	createItemsLocal = async (itemsList: EntitiesList, lang:string) => {
		let nbCreated = 0;
		for (const item of itemsList.list) {
			const id = await this.createLocalItem(item, itemsList.collectionName, lang);

			if (id) {
				nbCreated++;
			} else {
				console.error('No id for this locale ' + itemsList.collectionName);
			}
		}

		return nbCreated;
	}
}
import { MainEntity } from "./mainEntity";

export class EntitiesList {
	collectionName: string;
	list: MainEntity[] = [];

	constructor(collectionName: string) {
		this.collectionName = collectionName;
	}

	add = (item: MainEntity) => {
		const result = this.list.filter((current) => {
			return (current.getIdent() === item.getIdent());
		});

		if (result.length > 0) {
			return result[0];
		} else {
			this.list.push(item);
			return null;
		}
	}
}
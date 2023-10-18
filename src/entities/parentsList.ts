import { MainParent } from "./mainParent";

export class ParentsList {
	collectionName: string;
	list: MainParent[] = [];

	constructor(collectionName: string) {
		this.collectionName = collectionName;
	}

	add = (item: MainParent) => {
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
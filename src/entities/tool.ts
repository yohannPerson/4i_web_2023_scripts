import { MainEntity } from "./mainEntity";

export class Tool extends MainEntity {
	name: string;
	logo: string = '';

	constructor(name: string) {
		super();
		this.name = name;
	}

	getIdent = () => {
		return this.name;
	}
}
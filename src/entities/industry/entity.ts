import { MainEntity } from "../mainEntity";

export class IndustryEntity extends MainEntity {
	name: string;

	constructor(name: string) {
		super();
		this.name = name;
	}

	getIdent = () => {
		return this.name;
	}

	getData = () => {
		return {
			name: this.name
		};
	}
}
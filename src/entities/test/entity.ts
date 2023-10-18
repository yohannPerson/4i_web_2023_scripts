import { MainEntity } from "../mainEntity";

export class TestEntity extends MainEntity {
	name: string;
	logo = null;

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
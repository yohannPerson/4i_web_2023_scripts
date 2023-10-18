import { MainEntity } from "../mainEntity";

export class InsightTypeEntity extends MainEntity {
	type: string;

	constructor(type: string) {
		super();
		this.type = type;
	}

	getIdent = () => {
		return this.type;
	}

	getData = () => {
		return {
			type: this.type
		};
	}
}
import { MainEntity } from "./mainEntity";

export class Industry extends MainEntity {
	label: string;

	constructor(label: string) {
		super();
		this.label = label;
	}

	compare = (entity1: Industry, entity2: Industry) => {
		return (entity1.label === entity2.label);
	}

	getIdent = () => {
		return this.label;
	}
}
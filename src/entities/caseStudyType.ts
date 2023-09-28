import { MainEntity } from "./mainEntity";

export class CaseStudyType extends MainEntity{
	name: string;

	constructor(name: string) {
		super();
		this.name = name;
	}

	getIdent = () => {
		return this.name;
	}
}
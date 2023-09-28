import { Industry } from "./industry";
import { MainEntity } from "./mainEntity";

export class Client extends MainEntity {
	name: string;
	logo: string = '';
	industryList: Industry[];
	country: string;

	constructor(name: string, industryList: Industry[], country: string) {
		super();
		this.name = name;
		this.industryList = industryList;
		this.country = country;
	}

	getIdent = () => {
		return this.name;
	}
}
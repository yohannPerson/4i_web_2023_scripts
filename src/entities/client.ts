import { Industry } from "./industry";

export class Client {
	name: string;
	logo: string;
	industryList: Industry[];
	country: string;

	constructor(name: string, industryList: Industry[], country: string) {
		this.name = name;
		this.logo = '';
		this.industryList = industryList;
		this.country = country;
	}
}
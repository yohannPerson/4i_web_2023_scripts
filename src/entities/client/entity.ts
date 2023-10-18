import { IndustryEntity } from "../industry/entity";
import { MainEntity } from "../mainEntity";

const logoId = '160';

export class ClientEntity extends MainEntity {
	name: string;
	logo: string = logoId;
	country: string;

	constructor(name: string, country: string) {
		super();
		this.name = name;
		this.country = country;
	}

	getIdent = () => {
		return this.name;
	}

	getData = () => {
		return {
			name: this.name,
			logo: this.logo,
			country: this.country
		};
	}
}
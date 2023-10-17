import { Industry } from "./industry";
import { MainEntity } from "./mainEntity";

const logoId = '160';

export class Client extends MainEntity {
	name: string;
	logo: string = logoId;
	industriesList: Industry[];
	country: string;

	constructor(name: string, industriesList: Industry[], country: string) {
		super();
		this.name = name;
		this.industriesList = industriesList;
		this.country = country;
	}

	getIdent = () => {
		return this.name;
	}

	getData = () => {
		const industriesIdList = this.industriesList.map((item) => {
			return item.id;
		});

		return {
			name: this.name,
			logo: this.logo,
			client_industries: industriesIdList,
			country: this.country
		};
	}
}
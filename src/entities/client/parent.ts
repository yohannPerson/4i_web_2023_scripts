import { IndustryParent } from "../industry/parent";
import { MainParent } from "../mainParent";
import { ClientEntity } from "./entity";

export class ClientParent extends MainParent {
	industriesList: IndustryParent[];

	constructor(main:ClientEntity, industriesList: IndustryParent[]) {
		super(main);
		this.industriesList = industriesList;
	}

	getData = (lang?:string) => {
		const industriesIdList = this.industriesList.map((item) => {
			return item.getId(lang);
		});

		let entityData: { [key: string]: any } = {};
		if (lang && this.moduleList[lang]) {
			entityData = this.moduleList[lang].getData();
		} else {
			entityData = this.mainEntity.getData();
		}

		entityData['client_industries'] = industriesIdList;
		entityData['locale'] = lang;

		return entityData;
	}
}
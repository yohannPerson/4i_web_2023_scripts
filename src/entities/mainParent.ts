import { MainEntity } from "./mainEntity";

export class MainParent {
	mainEntity: MainEntity;
	moduleList: { [key: string]: MainEntity } = {};

	constructor (mainEntity: MainEntity) {
		this.mainEntity = mainEntity;
	}

	addModule = (item:MainEntity, lang:string) => {
		this.moduleList[lang] = item;
	}

	getIdent = () => {
		return this.mainEntity.getIdent();
	}

	getId = (lang='en') => {
		if(this.moduleList[lang]) {
			return this.moduleList[lang].getId();
		} else {
			return this.mainEntity.getId();
		}
	}

	getData = (lang?:string) => {
		if (lang && this.moduleList[lang]) {
			let entityData: { [key: string]: any } = this.moduleList[lang].getData();
			entityData['locale'] = lang;
			return entityData; 
		} else {
			return this.mainEntity.getData();
		}
	}
}
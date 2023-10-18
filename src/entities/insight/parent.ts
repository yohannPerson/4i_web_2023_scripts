import { InsightTypeParent } from "../insightType/parent";
import { MainParent } from "../mainParent";
import { InsightEntity } from "./entity";

export class InsightParent extends MainParent {
	insightTypeList:InsightTypeParent[] = [];

	constructor(mainEntity:InsightEntity, insightTypeList: InsightTypeParent[]) {
		super(mainEntity);
		this.insightTypeList = insightTypeList;
	}

	getData = (lang?:string) => {
		const listInsightTypes = this.insightTypeList.map((item) => {
			return item.getId(lang);
		});
		

		let entityData: { [key: string]: any } = {};
		if (lang && this.moduleList[lang]) {
			entityData = this.moduleList[lang].getData();
		} else {
			entityData = this.mainEntity.getData();
		}

		entityData['insight_types'] = listInsightTypes;
		entityData['locale'] = lang;
		
		return entityData;
	}
}
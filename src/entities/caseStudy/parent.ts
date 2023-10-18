import { CaseStudyTypeParent } from "../caseStudyType/parent";
import { ClientParent } from "../client/parent";
import { MainParent } from "../mainParent";
import { ToolParent } from "../tool/parent";
import { CaseStudyEntity } from "./entity";

export class CaseStudyParent extends MainParent {
	typesList: CaseStudyTypeParent[];
	client: ClientParent;
	toolList: ToolParent[];

	constructor(mainEntity: CaseStudyEntity, typesList: CaseStudyTypeParent[], client: ClientParent, toolList: ToolParent[]) {
		super(mainEntity);
		this.typesList = typesList;
		this.client = client;
		this.toolList = toolList;
	}

	getData = (lang?:string) => {
		const typesIdList = this.typesList.map((item) => {
			return item.getId(lang);
		});

		const toolsIdList = this.toolList.map((item) => {
			return item.getId(lang);
		});

		let entityData: { [key: string]: any } = {};
		if (lang && this.moduleList[lang]) {
			entityData = this.moduleList[lang].getData();
		} else {
			entityData = this.mainEntity.getData();
		}

		entityData['case_study_types'] = typesIdList;
		entityData['tools'] = toolsIdList;
		entityData['client'] = this.client.getId(lang);
		entityData['locale'] = lang;

		return entityData;
	}
}
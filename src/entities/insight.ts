import { MainEntity } from "./mainEntity";
import { InsightParagraph } from "./insigthComponents";
import { InsightType } from "./insightType";

export class Insight extends MainEntity {
	title: string;
	date = '2023-04-10';
	bannerPicture = null;
	content: InsightParagraph[] = [];
	image = '11';
	insightTypeList:InsightType[] = [];

	constructor(title: string, content: InsightParagraph[], insightTypeList:InsightType[]) {
		super();
		this.title = title;
		this.content = content;
		this.insightTypeList = insightTypeList;
	}



	getIdent = () => {
		return this.title;
	}

	getData = () => {
		const contentData = this.content.map((item) => {
			return item.getData();
		});

		const listInsightTypes = this.insightTypeList.map((item) => {
			return item.id;
		})

		return {
			title: this.title,
			published: this.date,
			//elements: contentData,
			image: this.image,
			insight_types: listInsightTypes
		};
	}
}
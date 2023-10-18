import { MainEntity } from "../mainEntity";
import { InsightParagraph } from "./insigthComponents";

export class InsightEntity extends MainEntity {
	title: string;
	date = '2023-04-10';
	bannerPicture = null;
	content:InsightParagraph[] = [];
	image = '160';
	
	constructor(title: string, content: InsightParagraph[]) {
		super();
		this.title = title;
		this.content = content;
	}

	getIdent = () => {
		return this.title;
	}

	getData = () => {
		const contentData = this.content.map((item) => {
			return item.getData();
		});

		return {
			title: this.title,
			published: this.date,
			elements: contentData,
			image: this.image
		};
	}
}
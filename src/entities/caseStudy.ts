import { Client } from "./client";
import { Tool } from "./tool";
import { CaseStudyType } from "./caseStudyType";
import { MainEntity } from "./mainEntity";

export class CaseStudy extends MainEntity {
	title: string;
	bannerPictureUrl: string;
	printBannerPicture: boolean;
	description: string;
	typeList: CaseStudyType[];
	client: Client;
	confidential: boolean;
	toolList: Tool[];
	challenge: string;
	solution: string;
	result: string;
	pictureList: string[];

	constructor(title: string, bannerPictureUrl: string, printBannerPicture: boolean, description: string, typeList: CaseStudyType[], client:Client, confidential: boolean, toolList: Tool[], challenge: string, solution:string, result: string, pictureList: string[]) {
		super();
		this.title = title;
		this.bannerPictureUrl = bannerPictureUrl;
		this.printBannerPicture = printBannerPicture;
		this.description = description;
		this.typeList = typeList;
		this.client = client;
		this.confidential = confidential;
		this.toolList = toolList;
		this.challenge = challenge;
		this.solution = solution;
		this.result = result;
		this.pictureList = pictureList;
	}

	getIdent = () => {
		return this.title;
	}
}
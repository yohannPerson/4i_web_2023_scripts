import { Client } from "./client";
import { Tool } from "./tool";
import { CaseStudyType } from "./caseStudyType";

export class CaseStudy {
	descriptionBanner: string;
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

	constructor(descriptionBanner: string, title: string, bannerPictureUrl: string, printBannerPicture: boolean, description: string, typeList: CaseStudyType[], client:Client, confidential: boolean, toolList: Tool[], challenge: string, solution:string, result: string, pictureList: string[]) {
		this.descriptionBanner = descriptionBanner;
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
}
import { Client } from "./client";
import { Tool } from "./tool";
import { CaseStudyType } from "./caseStudyType";
import { MainEntity } from "./mainEntity";

const bannerImageId = 11; //161

export class CaseStudy extends MainEntity {
	title: string;
	bannerPictureId = '10';
	printBannerPicture = false;
	description: string;
	typesList: CaseStudyType[];
	client: Client;
	confidential: boolean;
	toolList: Tool[];
	challenge: string = "";
	solution: string = "";
	result: string = "";
	pictureList: string[] = [];

	constructor(title: string, description: string, typesList: CaseStudyType[], client:Client, confidential: boolean, toolList: Tool[], challenge: string, solution:string, result: string) {
		super();
		this.title = title;
		this.description = description;
		this.typesList = typesList;
		this.client = client;
		this.confidential = confidential;
		this.toolList = toolList;
		if (challenge) {
			this.challenge = challenge;
		}
		
		if (solution) {
			this.solution = solution;
		}
		
		if (result) {
			this.result = result;
		}
	}

	getIdent = () => {
		return this.title;
	}

	getData = () => {
		const typesIdList = this.typesList.map((item) => {
			return item.id;
		});

		const toolsIdList = this.toolList.map((item) => {
			return item.id;
		});

		return {
			title: this.title,
			banner_image: this.bannerPictureId,
			show_banner_image: this.printBannerPicture,
			description: this.description,
			case_study_types: typesIdList,
			client: this.client.id,
			confidentiality: this.confidential,
			tools: toolsIdList,
			challenge: this.challenge,
			solution: this.solution,
			result: this.result,
			images: []
		};
	}
}
import { Client } from "./client";
import { Tool } from "./tool";
import { CaseStudyType } from "./caseStudyType";
import { MainEntity } from "./mainEntity";

const bannerImageId = 161;

export class CaseStudy extends MainEntity {
	title: string;
	bannerPictureId = bannerImageId;
	printBannerPicture = false;
	descriptionEN: string;
	descriptionCN: string;
	typesList: CaseStudyType[];
	client: Client;
	confidential: boolean;
	toolList: Tool[];
	challengeEN: string = "";
	challengeCN: string = "";
	solutionEN: string = "";
	solutionCN: string = "";
	resultEN: string = "";
	resultCN: string = "";
	pictureList: string[] = [];

	constructor(title: string, descriptionEN: string, descriptionCN: string, typesList: CaseStudyType[], client:Client, confidential: boolean, toolList: Tool[], challengeEN: string, challengeCN:string, solutionEN:string, solutionCN:string, resultEN: string, resultCN:string) {
		super();
		this.title = title;
		this.descriptionEN = descriptionEN;
		this.descriptionCN = descriptionCN;
		this.typesList = typesList;
		this.client = client;
		this.confidential = confidential;
		this.toolList = toolList;
		if (challengeEN) {
			this.challengeEN = challengeEN;
		}

		if (challengeCN) {
			this.challengeCN = challengeCN;
		}
		
		if (solutionEN) {
			this.solutionEN = solutionEN;
		}

		if (solutionCN) {
			this.solutionCN = solutionCN;
		}
		
		if (resultEN) {
			this.resultEN = resultEN;
		}

		if (resultCN) {
			this.resultCN = resultCN;
		}
	}

	getIdent = () => {
		return this.title;
	}

	getData = (lang='en') => {
		const typesIdList = this.typesList.map((item) => {
			return item.id;
		});

		const toolsIdList = this.toolList.map((item) => {
			return item.id;
		});

		if (lang === 'zh') {
			return {
				title: this.title,
				banner_image: this.bannerPictureId,
				show_banner_image: this.printBannerPicture,
				description: this.descriptionCN,
				case_study_types: typesIdList,
				client: this.client.id,
				confidentiality: this.confidential,
				tools: toolsIdList,
				challenge: this.challengeCN,
				solution: this.solutionCN,
				result: this.resultCN,
				images: [],
				locale:'zh'
			};
		} else {
			return {
				title: this.title,
				banner_image: this.bannerPictureId,
				show_banner_image: this.printBannerPicture,
				description: this.descriptionEN,
				case_study_types: typesIdList,
				client: this.client.id,
				confidentiality: this.confidential,
				tools: toolsIdList,
				challenge: this.challengeEN,
				solution: this.solutionEN,
				result: this.resultEN,
				images: [],
				locale:'en'
			};
		}

		
	}
}
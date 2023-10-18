import { MainEntity } from "../mainEntity";

const bannerImageId = 161;

export class CaseStudyEntity extends MainEntity {
	title: string;
	bannerPictureId = bannerImageId;
	printBannerPicture = false;
	description: string;
	confidential: boolean;
	challenge: string = "";
	solution: string = "";
	result: string = "";
	pictureList: string[] = [];

	constructor(title: string, description: string,confidential: boolean, challenge: string, solution:string, result: string) {
		super();
		this.title = title;
		this.description = description;
		this.confidential = confidential;
		if (challenge) {
			this.challenge = challenge;
		}
		
		if (solution) {
			this.solution = solution;
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
		return {
			title: this.title,
			banner_image: this.bannerPictureId,
			show_banner_image: this.printBannerPicture,
			description: this.description,
			confidentiality: this.confidential,
			challenge: this.challenge,
			solution: this.solution,
			result: this.result,
			images: []
		};
	}
}
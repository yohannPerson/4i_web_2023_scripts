import { MainEntity } from "./mainEntity";

export class Test extends MainEntity {
	labelEN: string;
	labelCN: string;

	constructor(labelEN: string, labelCN:string) {
		super();
		this.labelEN = labelEN;
		this.labelCN = labelCN;
	}

	getIdent = () => {
		return this.labelEN;
	}

	getData = (lang='en') => {
		if (lang === 'zh') {
			return {
				label: this.labelCN,
				locale: 'zh'
			};
		} else {
			return {
				label: this.labelEN
			};
		}
	}
}
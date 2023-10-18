export class InsightParagraph {
	content: string;
	component = 'individual-insight.paragraph'

	constructor(content: string) {
		this.content = content;
	}

	getData = () => {
		return {
			__component: this.component,
			paragraph: this.content
		}
	}
}
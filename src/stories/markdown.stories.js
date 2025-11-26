import { Markdown } from '../components/markdown/markdown';
import '../components/markdown/markdown.css';
import markdowndata from '../data/readme.md';
import '../css/pixelated.global.css';

export default {
	title: 'Markdown (ReadMe)',
	component: Markdown
};

export const ReadMeMarkdown = {
	args: {
		markdowndata
	}
};

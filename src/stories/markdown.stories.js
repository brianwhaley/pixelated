import { Markdown } from '../components/markdown/pixelated.markdown';
import '../components/markdown/pixelated.markdown.css';
import markdowndata from '../data/readme.md';
import '../css/pixelated.less';

export default {
	title: 'Markdown (ReadMe)',
	component: Markdown
};

export const ReadMeMarkdown = {
	args: {
		markdowndata
	}
};

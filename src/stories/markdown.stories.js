import { Markdown } from '../components/markdown/pixelated.markdown'
import '../components/markdown/pixelated.markdown.css'
import markdowndata from '../components/markdown/readme.md'

export default {
	title: 'Markdown (ReadMe)',
	component: Markdown
}

export const Primary = {
	args: {
		markdowndata
	}
}

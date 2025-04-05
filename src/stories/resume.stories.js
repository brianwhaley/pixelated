import { Resume } from '../components/resume/pixelated.resume'
import ResumeData from '../data/resume.json'
import '../components/resume/pixelated.resume.css'
import '../css/pixelated.less';

export default {
	title: 'Resume',
	component: Resume
}

export const BTW_Resume = {
	args: {
		data: { items: ResumeData.items }
	}
}


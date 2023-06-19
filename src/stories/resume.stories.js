import { Resume } from '../components/resume/pixelated.resume'
import ResumeData from '../components/resume/pixelated.resume.json'
import '../components/resume/pixelated.resume.css'

export default {
	title: 'Resume',
	component: Resume
}

export const Primary = {
	args: {
		data: ResumeData
	}
}

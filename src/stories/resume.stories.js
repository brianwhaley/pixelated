import { Resume } from '../components/resume/resume';
import ResumeData from '../data/resume.json';
import ReferencesData from '../data/references.json';
import '../components/resume/resume.css';
import '../css/pixelated.global.css';

ResumeData.items[0].properties.references = ReferencesData.items[0].properties.references;

export default {
	title: 'Resume',
	component: Resume
};

export const BTW_Resume = {
	args: {
		data: { items: ResumeData.items }
	}
};


import { Callout } from '../components/callout/pixelated.callout';
import '../components/callout/pixelated.callout.css';
import '../css/pixelated.less';

export default {
	title: 'Callout',
	component: Callout
};

export const CalloutHorizontal = {
	title: 'Callout Horizontal',
	args: {
		url: 'https://www.linkedin.com/in/brianwhaley',
		img: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png',
		title: 'LinkedIn Profile',
		content: 'My LinkedIn Profile - Work History, Education, Volunteer Work, Honors and Awards, Certifications, Skills, and more.',
		layout: 'horizontal',
		columnCount: 2,
	}
};

export const CalloutHorizontal2 = {
	title: 'Callout Horizontal 2',
	args: {
		url: 'https://www.linkedin.com/in/brianwhaley',
		img: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png',
		title: 'LinkedIn Profile',
		content: 'My LinkedIn Profile - Work History, Education, Volunteer Work, Honors and Awards, Certifications, Skills, and more.',
		layout: 'horizontal2',
		columnCount: 2,
	}
};

export const CalloutVertical = {
	title: 'Callout Vertical',
	args: {
		...CalloutHorizontal.args, 
		layout: 'vertical',
	}
};

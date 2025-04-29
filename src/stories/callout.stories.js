import { Callout } from '../components/callout/pixelated.callout';
import '../components/callout/pixelated.callout.css';
import '../css/pixelated.grid.scss';

export default {
	title: 'Callout',
	component: Callout
};

export const CalloutStory = {
	title: 'Callout',
	args: {
		url: 'https://www.linkedin.com/in/brianwhaley',
		img: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png',
		title: 'LinkedIn Profile',
		content: 'My LinkedIn Profile - Work History, Education, Volunteer Work, Honors and Awards, Certifications, Skills, and more.',
		layout: 'horizontal',
		shape: "squircle",
	},
	argTypes: {
		layout: {
			options: ['horizontal', 'horizontal2', "vertical"],
			control: { type: 'select' },
		},
		shape: {
			options: ['round', 'squircle', 'square'],
			control: { type: 'select' },
		},
	}
};

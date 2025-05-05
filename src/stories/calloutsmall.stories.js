import { CalloutSmall } from '../components/callout/pixelated.callout';
import '../components/callout/pixelated.callout.css';
import '../css/pixelated.grid.scss';

export default {
	title: 'Callout',
	component: CalloutSmall
};

export const Callout_Small = {
	title: 'Callout Small',
	args: {
		url: 'https://www.linkedin.com/in/brianwhaley',
		img: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png',
		title: 'LinkedIn Profile',
		shape: 'squircle',
		alt: 'Hooray for LinkedIn!',
	},
	argTypes: {
		shape: {
			options: ['round', 'squircle', 'square'],
			control: { type: 'select' },
		},
	}
};

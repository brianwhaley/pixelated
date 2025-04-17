import { Callout, CalloutRoundSm, CalloutRoundTiny } from '../components/callout/pixelated.callout';
import '../components/callout/pixelated.callout.css';
import '../css/pixelated.less';

export default {
	title: 'Callout',
	component: CalloutRoundTiny
};

export const Callout_Round_Tiny = {
	title: 'Callout Round Tiny',
	component: CalloutRoundTiny, 
	args: {
		url: 'https://www.linkedin.com/in/brianwhaley',
		img: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png',
		title: 'LinkedIn Profile',
		imgclick: function(){ { alert('Image Clicked!'); } },
		alt: 'LinkedIn Logo',
		gridSize: 2
	}
};

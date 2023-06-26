import { Callout } from '../components/callout/pixelated.callout'
import '../components/callout/pixelated.callout.css'

export default {
	title: 'Callout',
	component: Callout
}

export const Primary = {
	args: {
		url: 'https://www.linkedin.com/in/brianwhaley',
		img: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png',
		title: 'LinkedIn Profile',
		content: 'My LinkedIn Profile - Work History, Education, Volunteer Work, Honors and Awards, Certifications, Skills, and more.',
		direction: 'horizontal',
		columnCount: 2
	}
}

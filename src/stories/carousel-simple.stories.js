import { CarouselSimple } from '../components/carouselsimple/pixelated.carouselsimple';
import '../components/carouselsimple/pixelated.carouselsimple.css';
import '../css/pixelated.global.css';

export default {
	title: 'CarouselSimple',
	component: CarouselSimple
};

const mycards = [
	{
		headerText: "\"Palmetto Epoxy installed durable, slip-resistant flooring in our garage that has totally exceeded our expectations.  Highly recommended!\"",
		bodyText: " - Laurie Ellis",
	} , {
		headerText: "\"I highly recommend Palmetto Epoxy for any commercial flooring needs.  They were professional, efficient, and exceeded our expectations.\"",
		bodyText: " - Jamie Bingham",
	} , {
		headerText: "\"Palmetto Epoxy did an exceptional job sealing our patio pavers.  They now look incredible and are so much easier to maintain.  We highly recommend their services for anyone looking to enhance and protect their outdoor spaces!\"",
		bodyText: " - Lindsey Kim",
	} 
];

export const SimpleCarousel = {
	args: {
		cards: mycards
	}
};

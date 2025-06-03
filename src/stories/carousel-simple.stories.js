import { CarouselSimple } from '../components/carouselsimple/pixelated.carouselsimple';
import '../components/carouselsimple/pixelated.carouselsimple.css';
import '../css/pixelated.global.css';

export default {
	title: 'Carousel',
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
	} , {
		image: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
		bodyText: " - LinkedIn",
	} , {
		image: "https://farm6.staticflickr.com/5682/21652998256_7c5d0ce495_b.jpg",
		bodyText: " - Pixelated",
	} , {
		image: "https://images.ctfassets.net/0b82pebh837v/1MRdqRf5lvwWTNveCiNe7D/3be8c38d0b389d131dc23a254b32dd74/Epoxy_Floor_1.jpg",
		bodyText: " - Epoxy Floor",
	}
];

export const SimpleCarousel = {
	args: {
		cards: mycards,
		imgFit: "cover",
	},
	argTypes: {
		imgFit: {
			options: ['contain', 'cover', "fill"],
			control: { type: 'select' },
		}
	}
};

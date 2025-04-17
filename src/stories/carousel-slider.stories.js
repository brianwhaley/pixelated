import { Carousel } from '../components/carousel/pixelated.carousel';
import '../components/carousel/pixelated.carousel.css';
import '../css/pixelated.less';

export default {
	title: 'Carousel',
	component: Carousel
};

export const PixelatedGallery = {
	args: {
		flickr: {
			urlProps: {
				// tags: 'pixelatedviewsgallery',
				tags: 'workportfolio',
				photoSize: 'Large'
			}
		},
		type: 'slider'
	}
};

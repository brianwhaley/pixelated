import { Carousel } from '../components/carousel/pixelated.carousel'
import '../components/carousel/pixelated.carousel.css'

export default {
	title: 'Carousel',
	component: Carousel
}

export const Primary = {
	args: {
		flickr: {
			urlProps: {
				tags: 'pixelatedviewsgallery',
				photoSize: 'Large'
			},
			type: 'slider'
		}
	}
}

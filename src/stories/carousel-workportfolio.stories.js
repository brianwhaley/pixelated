import { Carousel } from '../components/carousel/carousel';
import { GetFlickrData, GenerateFlickrCards } from '../components/cms/flickr';
import '../components/carousel/carousel.css';
import '../css/pixelated.global.css';
import './carousel.stories.css';

export default {
	title: 'Carousel',
	component: Carousel
};

/* ========== FLICKR HANDLER ========== */
async function getFlickrCards() {
	const myPromise = GetFlickrData({
		flickr : {
			baseURL: 'https://api.flickr.com/services/rest/?',
			urlProps: {
				method: 'flickr.photos.search',
				api_key: '882cab5548d53c9e6b5fb24d59cc321d',
				user_id: '15473210@N04',
				tags: 'workportfolio',
				extras: 'date_taken,description,owner_name',
				sort: 'date-taken-desc',
				per_page: 500,
				format: 'json',
				photoSize: 'Large',
				nojsoncallback: 'true' /*,
				startPos: 0 */
			}
		} 
	});
	const myFlickrImages = await myPromise;
	const myFlickrCards = GenerateFlickrCards({flickrImages: myFlickrImages, photoSize: 'Medium'});
	// console.log('Flickr Cards:', myFlickrCards);
	// REMOVE LINKS
	const myScrubbedFlickrCards = myFlickrCards.map(obj => {
		delete obj.link;
		delete obj.bodyText;
		return obj;
	});
	return myScrubbedFlickrCards;
}

export const CarouselWorkPortfolio = {
	args: {
		cards: await getFlickrCards() ,
		draggable: true,
		imgFit: "contain",
	}
};

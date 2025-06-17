
import PropTypes from 'prop-types';
import { generateURL } from '../utilities/pixelated.api';
import { mergeDeep } from '../utilities/pixelated.functions';


type FlickrApiType = {
    baseURL: string;
    urlProps: {
        method: string;
        api_key: string;
        user_id: string;
        tags?: string;
        photoset_id?: string;
        extras: string;
        sort: string;
        per_page: number;
        format: string;
        photoSize: string;
        nojsoncallback: string;
    };
};


function getFlickrSize (size: string) {
	switch (size) {
	case 'Square' : return '_s'; // 75
	case 'Large Square' : return '_q'; // 150
	case 'Thumbnail' : return '_t'; // 100
	case 'Small' : return '_m'; // 240
	case 'Small 320' : return '_n'; // 320
	case 'Medium' : return ''; // 500
	case 'Medium 640' : return '_z'; // 640
	case 'Medium 800' : return '_c'; // 800
	case 'Large' : return '_b'; // 1024
		// case "Large2" : return "_h"; // 1600 + secret
		// case "Large3" : return "_k"; // 2048 + secret
		// case "XL3K" : return "_3k"; // 3072 + secret
		// case "XL4K" : return "_4k"; // 4096 + secret
		// case "XLF" : return "_f"; // 4096 + secret - only 2:1 aspect ratio
		// case "XL5K" : return "_5k"; // 5120 + secret
		// case "XL6K" : return "_6k"; // 6144 + secret
		// case "Original" : return "_o"; // secret + EXIF data; not rotated, ? ext
	default : return '';
	}
}


export function GetFlickrData( props: { flickr: any } ) {

	const defaultFlickr = { 
		flickr : {
			baseURL: 'https://api.flickr.com/services/rest/?',
			urlProps: {
				method: 'flickr.photos.search',
				api_key: '882cab5548d53c9e6b5fb24d59cc321d',
				user_id: '15473210@N04',
				tags: 'pixelatedviewsgallery',
				extras: 'date_taken,description,owner_name',
				sort: 'date-taken-desc',
				per_page: 500,
				format: 'json',
				photoSize: 'Medium',
				nojsoncallback: 'true' /*,
				startPos: 0 */
			}
		} , 
	};

	const debug = false;
	const flickr = mergeDeep(defaultFlickr.flickr, props.flickr) as FlickrApiType;

	const myURL = generateURL(flickr.baseURL, flickr.urlProps);
	const fetchFlickrData = async () => {
		try {
			const response = await fetch(myURL);
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const jsonData = await response.json();
			let myFlickrImages = [];
			if(jsonData.photos) {
				// photos for tags - flickr.photos.search
				myFlickrImages = jsonData.photos.photo;
			} else if (jsonData.photoset) {
				// photoset for albums - flickr.photosets.getPhotos
				myFlickrImages = jsonData.photoset.photo;
			} else {
				console.log('Error fetching Flickr images');
			}
			myFlickrImages.sort((a: any, b: any) => {
				return new Date(b.datetaken).getTime() - new Date(a.datetaken).getTime();
			}); // b - a for reverse sort
			if (debug) console.log('Flickr Cards:', myFlickrImages);
			return myFlickrImages;
			// const myFlickrCards = GenerateFlickrCards(myFlickrImages);
			// console.log('Flickr Cards:', myFlickrCards);
			// return myFlickrCards;
		} catch (err) {
			console.log('Error fetching Flickr data:', err);
		} finally {
			if (debug) console.log('Flickr data fetch completed');
		}
	};
	return fetchFlickrData();

}
GetFlickrData.PropTypes = {
	flickr: PropTypes.object.isRequired,
};


export function GenerateFlickrCards(props: { flickrImages: any, photoSize: string }) {
	if (props.flickrImages?.length > 0) {
		const photoSize = getFlickrSize(props.photoSize);
		const flickrCards = props.flickrImages.map((image: any, i: number) => (
			{
				link: 'https://farm' + image.farm + '.static.flickr.com/' + image.server + '/' + image.id + '_' + image.secret + photoSize + '.jpg' ,
				image: 'https://farm' + image.farm + '.static.flickr.com/' + image.server + '/' + image.id + '_' + image.secret + photoSize + '.jpg' ,
				imageAlt: image.title,
				headerText: image.title,
				subHeaderText: ( i + 1 ) + " of " + props.flickrImages.length + " by " + image.ownername + " on " + image.datetaken,
				bodyText: image.description._content,
			} 
		));
		return flickrCards;
	}
}
GenerateFlickrCards.propTypes = {
	flickrImages: PropTypes.array.isRequired,
	photoSize: PropTypes.string.isRequired,
};
    
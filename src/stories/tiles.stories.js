import React, { useState, useEffect } from 'react';
import { Tiles } from "../components/tiles/pixelated.tiles";
import { FlickrWrapper } from "../components/carousel/pixelated.carousel.flickr";
import '../components/tiles/pixelated.tiles.css';

import '../css/pixelated.global.css';

export default {
	title: 'Tiles',
	component: Tiles
};

const FlickrTiles = () => {
	const [ flickrCards, setFlickrCards ] = useState([]);
	const props = { 
		method: "flickr.photosets.getPhotos", 
		api_key: '882cab5548d53c9e6b5fb24d59cc321d',
		user_id: '15473210@N04',
		tags: "", // "pixelatedviewsgallery"
		photoset_id: "72157712416706518",
		photoSize: "Large", 
		callback: setFlickrCards 
	};
	useEffect(() => {
		async function fetchGallery() {
			await FlickrWrapper(props);
		}
		fetchGallery();
	}, []); 
	return (
		<>
			<section id="flickrtiles-section">
				<div className='section-container'>
					<Tiles cards={flickrCards} rowCount={3}/>
				</div>
			</section>
		</>
	);
};

export const Primary = () => <FlickrTiles />;

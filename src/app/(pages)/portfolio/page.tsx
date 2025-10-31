 
"use client";

import React, { useEffect, useState } from 'react';
import { PageHeader } from "@brianwhaley/pixelated-components";
import { FlickrWrapper } from "@brianwhaley/pixelated-components";
import type { CarouselCardType } from "@brianwhaley/pixelated-components";
import { MicroInteractions } from "@brianwhaley/pixelated-components";
import { Tiles } from "@brianwhaley/pixelated-components";

export default function Portfolio() {
	const [ flickrCards, setFlickrCards ] = useState<CarouselCardType[]>([]);
	const props = { 
		api_key: '882cab5548d53c9e6b5fb24d59cc321d',
		user_id: '15473210@N04',
		tags: "", // "workportfolio"
		method: "flickr.photosets.getPhotos", 
		photoset_id: "72177720326903710",
		photoSize: "Large", 
		callback: getFlickrCards 
	};
	function getFlickrCards(cards: CarouselCardType[]) {
		console.log("Flickr Cards:", flickrCards);
		const myCards = cards.sort((a, b) => ((a.imageAlt ?? '') < (b.imageAlt ?? '')) ? 1 : -1);
		console.log("Sorted Flickr Cards:", myCards);
		setFlickrCards(myCards);
	}
	useEffect(() => {
		async function fetchGallery() {
			await FlickrWrapper(props);
		}
		fetchGallery();
	}, []); 
	useEffect(() => {
		MicroInteractions({ 
			scrollfadeElements: '.tile',
		});
	}, [flickrCards]); 
	return ( 
		<section id="portfolio-section">
			<div className='section-container'>
				<PageHeader title="Pixelated Technologies Portfolio" />
				<div className="row-12col">
					<div className="grid-s3-e8"> 
						<p>
							Here are some examples of websites and web applications we have 
							developed for our clients over the last 30 years.
						</p>
						<p>
							Our portfolio showcases a diverse range of projects, including e-commerce platforms, 
							content management systems, and custom web applications tailored to meet unique client needs. 
							We pride ourselves on delivering high-quality, scalable, and user-friendly solutions.
						</p>
						<p>
							Each project highlights our commitment to innovation, attention to detail, and dedication 
							to creating exceptional digital experiences. Explore the gallery below to see our work in action.
						</p>
					</div>
				</div>
				<Tiles cards={flickrCards} />
			</div>
		</section>
	);
    
}

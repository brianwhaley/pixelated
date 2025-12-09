 
"use client";

import React, { useEffect, useState } from 'react';
import { PageTitleHeader } from "@pixelated-tech/components";
import { PageSection, PageGridItem } from "@pixelated-tech/components";
import { FlickrWrapper } from "@pixelated-tech/components";
import type { CarouselCardType } from "@pixelated-tech/components";
import { MicroInteractions } from "@pixelated-tech/components";
import { Tiles } from "@pixelated-tech/components";

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
		const myCards = cards.sort((a, b) => ((a.imageAlt ?? '') < (b.imageAlt ?? '')) ? 1 : -1);
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
		<>
			<PageTitleHeader title="Pixelated Technologies Portfolio" />
			<PageSection columns={1} maxWidth="768px" id="portfolio-intro-section">
				<PageGridItem> 
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
				</PageGridItem>
			</PageSection>


			<PageSection columns={1} id="portfolio-tiles-section">
				<Tiles cards={flickrCards} />
			</PageSection>
		</>
	);
    
}

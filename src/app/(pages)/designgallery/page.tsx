"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/app/components/general/pixelated.general";
import { Carousel } from "@brianwhaley/pixelated-components";
import GalleryWrapper from "@/app/elements/gallerywrapper";

export default function Gallery () {

	const [ flickrCards, setFlickrCards ] = useState([]);
	const props = { tags: "homedesign", photoSize: 'Large', callback: setFlickrCards } ;
	useEffect(() => {
		async function fetchGallery() {
			await GalleryWrapper(props);
		}
		fetchGallery();
	}, []); 

	return (
		<>
			<section id="customs-section">
				<div className="section-container">
					<PageHeader title="Home Design Photo Gallery" />
					<Carousel 
						cards={flickrCards} 
						draggable={true}
						imgFit="contain" />
				</div>
			</section>
		</>
	);
}
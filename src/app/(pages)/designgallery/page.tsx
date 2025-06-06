"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/app/components/general/pixelated.general";
import { Carousel } from "@brianwhaley/pixelated-components";
import { GetFlickrData, GenerateFlickrCards } from '@brianwhaley/pixelated-components';

export default function Gallery () {

	const [ flickrCards, setFlickrCards ] = useState([]);

	useEffect(() => {
		async function getFlickrCards() {
			const myPromise = GetFlickrData({
				flickr : {
					baseURL: 'https://api.flickr.com/services/rest/?',
					urlProps: {
						method: 'flickr.photos.search',
						api_key: '882cab5548d53c9e6b5fb24d59cc321d',
						user_id: '15473210@N04',
						tags: 'homedesign',
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
			// REMOVE LINKS
			const myScrubbedFlickrCards = myFlickrCards.map((obj: any) => {
				delete obj.link;
				delete obj.headerText;
				delete obj.bodyText;
				return obj;
				});
			setFlickrCards(myScrubbedFlickrCards);
		}
		getFlickrCards();
	}, []); // Empty dependency array to run only once


	return (
		<>
			<section id="customs-section">
				<div className="section-container">
					<PageHeader title="Home Design Photo Gallery" />
					<Carousel 
						cards={flickrCards} 
						draggable={false}
						imgFit="contain" />
				</div>
			</section>
		</>
	);
}
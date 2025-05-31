/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import ContactCTA from "@/app/elements/contact";
import { CarouselSimple } from "@brianwhaley/pixelated-components";
import { getContentfulEntriesByType, getContentfulImagesFromEntries } from "@brianwhaley/pixelated-components";
import "@/app/css/globals.css";

export default function Projects() {

	const [ carouselCards , setCarouselCards ] = useState<{ image: any }[]>([]);
	
	useEffect(() => {
		async function getCarouselCards() {
			const contentType = "carouselCard"; 
			const typeCards = await getContentfulEntriesByType(contentType); 
			const reviewCards = [];
			for (const card of typeCards.items) {
				if ( card.sys.contentType.sys.id == contentType ) {
					const images = await getContentfulImagesFromEntries( [card.fields.image], typeCards.includes.Asset);
					reviewCards.push({
						image: images[0].image,
						imageAlt: images[0].imageAlt,
						headerText: card.fields.title,
						bodyText: card.fields.description,
						link: card.fields.link,
					});
				}
			}
			setCarouselCards(reviewCards);
		}
		getCarouselCards();
	}, []);

	return (
		<>
			<h1>Projects</h1>
			<section className="" id="projects-section">
				<div className="section-container">
					<CarouselSimple cards={carouselCards} />
				</div>
			</section>
            
			<section className="section-bluechip" id="contact-section">
				<ContactCTA />
			</section>
		</>
	);
}

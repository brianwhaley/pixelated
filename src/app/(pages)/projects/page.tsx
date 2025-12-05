"use client";

import React, { useState, useEffect } from "react";
import * as CalloutLibrary from "@/app/elements/calloutlibrary";
import { Carousel } from "@pixelated-tech/components";
import type { CarouselCardType } from "@pixelated-tech/components";
import { getFullPixelatedConfig } from "@pixelated-tech/components";
import { getContentfulEntriesByType, getContentfulImagesFromEntries } from "@pixelated-tech/components";

// const imageOrigin = "https://images.palmetto-epoxy.com";

/* Carousel bug conflict with drag and click */

export default function Projects() {

	const [ carouselCards , setCarouselCards ] = useState<CarouselCardType[]>([]);

	const config = getFullPixelatedConfig();
	const apiProps = {
		base_url: config.contentful?.base_url ?? "",
		space_id: config.contentful?.space_id ?? "",
		environment: config.contentful?.environment ?? "",
		delivery_access_token: config.contentful?.delivery_access_token ?? "",
	};

	useEffect(() => {
		async function getCarouselCards() {
			const contentType = "carouselCard"; 
			const typeCards = await getContentfulEntriesByType({ apiProps: apiProps, contentType: contentType }); 
			const reviewCards : CarouselCardType[] = [];
			for (const card of typeCards.items) {
				if ( card.sys.contentType.sys.id == contentType ) {
					let images = await getContentfulImagesFromEntries({ images: [card.fields.image], assets: typeCards.includes.Asset });
					/* Contentful images start with two slashes */
					images = images.map(img => {
						return img.image.startsWith("//images.ctfassets.net")
						? { image: img.image.replace("//images.ctfassets.net", "https://images.ctfassets.net"),
							imageAlt: img.imageAlt }
						: { image: img.image,
							imageAlt: img.imageAlt };
					});
					console.log(images);
					reviewCards.push({
						index: card.sys.contentType.sys.id.indexOf("card"),
						cardIndex: reviewCards.length,
						cardLength: typeCards.items.length,
						image: images[0].image,
						imageAlt: images[0].imageAlt,
						headerText: card.fields.title,
						bodyText: card.fields.description,
						link: card.fields.link,
						linkTarget: "_self"
					});
				}
			}
			/* for (const img of reviewCards) {
				img.image = img.image.replace("//images.ctfassets.net", imageOrigin);
			} */
			setCarouselCards(reviewCards);
		}
		getCarouselCards();
	}, []);

	return (
		<>
			<CalloutLibrary.PageTitle title="Projects" />
			
			<section className="" id="projects-section">
				<div className="section-container">
					<Carousel 
						cards={carouselCards} 
						draggable={false} 
						imgFit='contain' />
				</div>
			</section>
            
			<section className="section-bluechip" id="contact-section">
				<CalloutLibrary.ContactCTA />
			</section>
		</>
	);
}

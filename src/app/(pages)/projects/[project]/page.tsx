/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { use, useState, useEffect, useRef } from 'react';
// import { Metadata } from 'next';
import * as CalloutLibrary from "@/app/elements/calloutlibrary";
import { getContentfulEntriesByType, getContentfulEntryByField, getContentfulImagesFromEntries } from "@brianwhaley/pixelated-components";
import { setClientMetadata } from '@brianwhaley/pixelated-components';
import { getFullPixelatedConfig } from "@brianwhaley/pixelated-components";
import { Carousel } from "@brianwhaley/pixelated-components";

export default function Project({params}: { params: Promise<{ project: string }> }){

	interface Card {
		fields: {
			title: string;
			description: string;
			keywords?: string;
			link?: string,
			carouselImages: any[];
		};
	}

	const config = getFullPixelatedConfig();
	const apiProps = {
		base_url: config.contentful?.base_url ?? "",
		space_id: config.contentful?.space_id ?? "",
		environment: config.contentful?.environment ?? "",
		delivery_access_token: config.contentful?.delivery_access_token ?? "",
	};

	const [ card , setCard ] = useState<Card | null>(null);
	const [ carouselCards , setCarouselCards ] = useState<{ image: any }[]>([]);
	const { project } = use(params);
  
	useEffect(() => {
		async function getCarouselCards(project: string) {
			const contentType = "carouselCard"; 
			const cards = await getContentfulEntriesByType({ apiProps: apiProps, contentType: contentType }); 
			const card = await getContentfulEntryByField({
				cards: cards,
				searchField: "title",
				searchVal: project
			});
			setCard(card);
			let images = await getContentfulImagesFromEntries({ images: card.fields.carouselImages, assets: cards.includes.Asset });
			images = images.map(img => {
				return {
					image: img.image.replace("//images.ctfassets.net", "https://images.ctfassets.net"),
					imageAlt: img.imageAlt
				};
			});
			setCarouselCards(images);
		}
		getCarouselCards(project);
	}, [project]);


	const isMounted = useRef(false);
	useEffect(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
	}, []);


	useEffect(() => {
		setClientMetadata({
			title: "Palmetto Epoxy | Projects - " + card?.fields.title,
			description: card?.fields.description?.split('. ', 1)[0] ?? "",
			keywords: card?.fields.keywords?.split('. ', 1)[0] ?? ""
		});
	}, [card]);
	

	return (
		<>
			{ isMounted ? (
	      		<>
					<CalloutLibrary.PageTitle title={card?.fields.title || ""} />
							
					<section id="project-carousel-section">
						<div className="section-container">
							<div>
								{card?.fields.description}
							</div>
						</div>
						<div className="section-container">
							<Carousel
								cards={carouselCards.map((card, index) => ({
									...card,
									index: index,
									cardIndex: index,
									cardLength: carouselCards.length
								}))} 
								draggable={true}
								imgFit='contain'
							/>
						</div>
					</section>
					<br /><br />
				</>
			) : (
				<section id="project-section">
					<div className="section-container">
						<div>Loading data...</div>
					</div>
				</section>
			)
			}
			<section className="section-bluechip" id="contact-section">
				<CalloutLibrary.ContactCTA />
			</section>
		</>
		
	);
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { use, useState, useEffect, useRef } from 'react';
// import { Metadata } from 'next';
import * as CalloutLibrary from "@/app/elements/calloutlibrary";
import { getContentfulEntriesByType, getContentfulEntryByField, getContentfulImagesFromEntries } from "@brianwhaley/pixelated-components";
import { setClientMetadata } from '@brianwhaley/pixelated-components';
import { Carousel } from "@brianwhaley/pixelated-components";

// const imageOrigin = "https://images.palmetto-epoxy.com";

/* type Params = {
  params: {
    project: string;
  };
};

export const generateMetadata = async ({params}: Params): Promise<Metadata> => {
	// Fetch data or perform server-side logic
	const title = "Palmetto Epoxy - Projects - " + params.project;
	return {
		title
	};
};*/

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

	const apiProps = {
		base_url: "https://cdn.contentful.com",
		space_id: "0b82pebh837v",
		environment: "master",
		access_token: "lA5uOeG6iPbrJ2J_R-ntwUdKQesrBNqrHi-qX52Bzh4",
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
			const images = await getContentfulImagesFromEntries({ images: card.fields.carouselImages, assets: cards.includes.Asset });
			/* for (const img of images) {
				img.image = img.image.replace("//images.ctfassets.net", imageOrigin);
			} */
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

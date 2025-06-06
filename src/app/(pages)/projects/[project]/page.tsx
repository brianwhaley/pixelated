/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { use, useState, useEffect, useRef } from 'react';
// import { Metadata } from 'next';
import ContactCTA from "@/app/elements/contact";
import PageTitle from "@/app/elements/pageTitle";
import { getContentfulEntriesByType, getContentfulEntryByField, getContentfulImagesFromEntries } from "@brianwhaley/pixelated-components";
import { setClientMetadata } from '@/app/components/pixelated.metadata';
import { Carousel } from "@brianwhaley/pixelated-components";

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

	const [ card , setCard ] = useState<Card | null>(null);
	const [ carouselCards , setCarouselCards ] = useState<{ image: any }[]>([]);
	const { project } = use(params);
  
	useEffect(() => {
		async function getCarouselCards(project: string) {
			const contentType = "carouselCard"; 
			const cards = await getContentfulEntriesByType(contentType); 
			const card = await getContentfulEntryByField({
				cards: cards,
				searchField: "title",
				searchVal: project
			});
			setCard(card);
			const images = await getContentfulImagesFromEntries(card.fields.carouselImages, cards.includes.Asset);
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
					<PageTitle title={card?.fields.title} />
							
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
				<ContactCTA />
			</section>
		</>
		
	);
}

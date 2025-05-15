/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from 'react';
import { getContentfulCardsData, getContentfulCardByField, getContentfulImagesFromCards } from "@/app/elements/pixelated.contentful";
import { CarouselSimple } from "@brianwhaley/pixelated-components";
import "./project.css";

interface ProjectParams {
  project: string;
}

export default function Project({params}: { params: ProjectParams }){

	interface Card {
		fields: {
			header: string;
			body: string;
			link?: string,
			carouselImages: any[];
		};
	}

	const [ card , setCard ] = useState<Card | null>(null);
	const [ carouselCards , setCarouselCards ] = useState<{ image: any }[]>([]);
  
	useEffect(() => {
		async function getCarouselCards(project: string) {
			const cards = await getContentfulCardsData(); 
	    const newparams = {
				cards: cards,
				searchField: "header",
				searchVal: project
	    };
			const card = await getContentfulCardByField(newparams);
			setCard(card);
			const images = await getContentfulImagesFromCards(card.fields.carouselImages, cards.includes.Asset);
			const carouselCards = images.map(function (image) {
				return { image: image } ;
			});
			setCarouselCards(carouselCards);
		}
		getCarouselCards(params.project);
	}, [params.project]);



	const isMounted = useRef(false);
	useEffect(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
	}, []);

	

	return (
		<>
			{ isMounted ? (
	      		<>
					<h1>{card?.fields.header}</h1>
					<section id="portfolio-section">
						<div className="section-container">
							{card?.fields.body}
						</div>
					</section>
					<section id="portfolio-section">
						<div className="section-container">
							<CarouselSimple cards={carouselCards} />
						</div>
					</section>
					<br /><br />
				</>
			) : (
				<section id="portfolio-section">
					<div className="section-container">
						<div>Loading data...</div>
					</div>
				</section>
			)
			}
		</>
		
	);
}

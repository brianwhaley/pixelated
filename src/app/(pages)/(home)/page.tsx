/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import ContactCTA from "@/app/elements/contact";
import PageTitle from "@/app/elements/pageTitle";
import { Callout } from "@brianwhaley/pixelated-components";
import { Carousel } from "@brianwhaley/pixelated-components";
import type { CarouselCard } from "@brianwhaley/pixelated-components";
import { getContentfulEntriesByType } from "@brianwhaley/pixelated-components";

export default function Home() {

	const [ carouselCards , setCarouselCards ] = useState<CarouselCard[]>([]);

	useEffect(() => {
		async function getCarouselCards() {
			const contentType = "reviews"; 
			const typeCards = await getContentfulEntriesByType(contentType); 
			const items = typeCards.items.filter((card: any) => card.sys.contentType.sys.id === contentType);
			const cardLength = items.length;
			const reviewCards = items.map(function (card: any, index: number) {
				return {
					headerText: card.fields.description,
					bodyText: card.fields.reviewer,
					index: index,
					cardIndex: index,
					cardLength: cardLength,
				};
			});
			setCarouselCards(reviewCards);
		}
		getCarouselCards();
	}, []);
		
	return (
		<>
			<PageTitle title="Palmetto Epoxy" />

      		<section id="homeCTA-section">
				<div className="section-container">
					<div className="homeCTA">
						<div className="">
							Elevate your space with a solution 
							<br />
							that&#39;s as practical as it is visually stunning.
							<br />
							<button type="button" onClick={() => { window.location.href = '/contact'; }}>Schedule an Estimate</button>
						</div>
					</div>
				</div>
			</section>

      		<section className="section-alt" id="home-callouts-section">
				<div className="section-container">
					<div className="row-3col">
						<div className="gridItem">
							<Callout
								img='https://images.squarespace-cdn.com/content/v1/63f19158f84f2b1e64ff6df7/1e084272-4798-4793-9379-60afbf3e1c7b/Blue.jpg?format=2500w'
								title="Floors You'll Adore"
								layout='vertical'
								shape='square'  
								content='' />
						</div>
						<div className="gridItem">
							<Callout
								img='https://images.squarespace-cdn.com/content/v1/63f19158f84f2b1e64ff6df7/bf63d28c-d622-4e89-baf8-56d2ccb9194d/Epoxy+Floor+4.jpg?format=2500w'
								title='Epoxy Excellence'
								layout='vertical' 
								shape='square'  
								content='' />
						</div>
						<div className="gridItem">
							<Callout
								img='https://images.squarespace-cdn.com/content/v1/63f19158f84f2b1e64ff6df7/1719082000916-23J7QBKHZCRO9BWBDUZM/Grey_Bowling-Ball-Floor.jpg?format=2500w'
								title='Shine On...'
								layout='vertical' 
								shape='square'  
								content='' />
						</div>
					</div>
				</div>
			</section>

			<section id="home-reviews-section">
				<div className="section-container">
					<Carousel 
						cards={carouselCards} 
						draggable={true}
						imgFit='contain' />
				</div>
			</section>

			<section  className="section-pavers textOutline" id="reviewCTA-section">
				<div className="section-container">
					<div className="homeCTA">
						<div className="">
							Voice your opinion and  
							<br />
							share your experience with us.
							<br />
							<button type="button" onClick={() => { window.location.href = '/submitreview'; }}>Submit your Review</button>
						</div>
					</div>
				</div>
			</section>

			<section className="section-alt" id="portfolio-section-2">
				<div className="section-container">
					<div className="row-12col">
						<div className="grid-s1-e6">
							<img alt="May River High School Athletics - Welcome to the Tank!" 
								src="https://images.squarespace-cdn.com/content/v1/63f19158f84f2b1e64ff6df7/eeeb48e8-b7d5-45b9-aba2-af08e6638ed4/MR+Sharks+2.jpg?format=2500w" />
						</div>
						<div className="grid-s7-e6 bigText">
						Palmetto Epoxy is a proud Sponsor of May River HS Girls Soccer
						</div>
					</div>
				</div>
			</section>

			<section className="section-bluechip" id="contact-section">
				<ContactCTA />
			</section>

		</>
	);
}

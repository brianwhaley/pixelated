/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import ContactCTA from "@/app/elements/contact";
import PageTitle from "@/app/elements/pageTitle";
import { Callout } from "@brianwhaley/pixelated-components";
import { Carousel } from "@brianwhaley/pixelated-components";
import type { CarouselCardType } from "@brianwhaley/pixelated-components";
import { getContentfulEntriesByType } from "@brianwhaley/pixelated-components";

export default function Home() {

	const [ carouselCards , setCarouselCards ] = useState<CarouselCardType[]>([]);

	const apiProps = {
		base_url: "https://cdn.contentful.com",
		space_id: "0b82pebh837v",
		environment: "master",
		access_token: "lA5uOeG6iPbrJ2J_R-ntwUdKQesrBNqrHi-qX52Bzh4",
	};

	useEffect(() => {
		async function getCarouselCards() {
			const contentType = "reviews"; 
			const typeCards = await getContentfulEntriesByType({ apiProps: apiProps, contentType: contentType }); 
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
								layout='vertical'
								img='https://images.ctfassets.net/0b82pebh837v/VEoiv9Mi9OsB4cSSUritM/835dcfa45b98453fdaeb7b19394b1164/Blue.jpg?fm=webp'
								imgShape='bevel'  
								title="Floors You'll Adore" />
						</div>
						<div className="gridItem">
							<Callout
								layout='vertical' 
								img='https://images.ctfassets.net/0b82pebh837v/6oA0GDDEJSkZRPy0PhCBSl/44c7989017c8f08c9fe7abc7bd732486/Epoxy_Floor_4.jpg?fm=webp'
								imgShape='bevel'  
								title='Epoxy Excellence' />
						</div>
						<div className="gridItem">
							<Callout
								layout='vertical' 
								img='https://images.ctfassets.net/0b82pebh837v/5wDiaYXOaLMx2AO1w78SJG/9b65f0e67a515c59e126c952c0d41003/Grey_Bowling-Ball-Floor.jpg?fm=webp'
								imgShape='bevel'  
								title='Shine On...' />
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
								src="https://images.ctfassets.net/0b82pebh837v/5AiTNJSyca5JJ9ZycxXJ2W/814eac82c120b5fa87505011cfe10609/MR_Sharks_2.jpg?fm=webp" />
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

"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/app/components/general/pixelated.general";
import { Callout, CalloutHeader } from "@brianwhaley/pixelated-components";
import SocialTags from "@/app/elements/socialtags";
import { Carousel } from "@brianwhaley/pixelated-components";
import GalleryWrapper from "@/app/elements/gallerywrapper";
import type { CarouselCardType } from "@brianwhaley/pixelated-components";

export default function Home() {



	const [ flickrCards, setFlickrCards ] = useState<CarouselCardType[]>([]);
	const props = { 
		tags: "", // "workportfolio"
		method: "flickr.photosets.getPhotos", 
		photoset_id: "72177720326903710",
		photoSize: "Large", 
		callback: setFlickrCards 
	};
	useEffect(() => {
		async function fetchGallery() {
			await GalleryWrapper(props);
		}
		fetchGallery();
	}, []); 


	return (
		<>
			<section id="products-section">
				<div className="section-container">
					<br />
					<PageHeader title="Pixelated Products & Services" />
					<div className="row-1col">
						<Callout
							url="/workoverview" 
							img='images/circuitboard.jpg'
							title='Web Development'
							content='Pixelated offers a wide variety of products and services, 
							including custom web application development for small businesses, 
							responsive design, search engine optimization, website performance tuning, 
							content management systems, accessibility compliance, social media marketing, 
							e-commerce solutions, accessibility compliance, 
							integration with small business finance systems, cloud hosting and deployment, 
							and more. 
							We specialize in creating custom solutions tailored to your business needs, 
							ensuring a seamless user experience across all devices and platforms.
							Explore our detailed offerings below.'
							layout='horizontal' />
					</div>
				</div>
			</section>

			<section className="section-alt" id="social-section">
				<div className="section-container">

					<SocialTags />

					<div className="row-1col">
						<div className="gridItem">
							<div className="callout-body">
								Links to each of my social media accounts and a few recent postings from each,
								including my Blog, Facebook, Instagram, LinkedIn, Twitter, and more.
								Check out the use of RSS feeds and APIs to generate dynamic cards on the page
								using my React component library.
								<br/>
								<div className="centeredbutton"><a href="socialmedia">My Social Media</a></div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section id="spotlight-section">
				<div className="section-container">
					<br />
					<CalloutHeader title="Work Portfolio Gallery" />
					<Carousel 
						cards={flickrCards} 
						draggable={true}
						imgFit="contain" />
				</div>
			</section>

			<section id="spotlight-section">
				<div className="section-container">
					<CalloutHeader title="Pixelated - Featured Spotlights" />
					<div className="row-4col">
						<div className="gridItem" />
						<div className="gridItem">
							<Callout
								img='images/brianwhaley-headshot.jpg'
								title='Brian T. Whaley'
								content='Technologist,
									Digital Transformation Professional, User Experience Champion,
									Landscape and Macro Photographer, Avid World Traveler,
									Advanced Open Water Scuba Diver, Enthusiast of Home-Cooked Food'
								layout='vertical' />
						</div>
						<div className="gridItem">
							<Callout
								url='schedule'
								img='/images/icons/calendar-icon.jpg'
								title='Schedule an Appointment'
								layout='vertical'
								content='Schedule a consultation appointment with Pixelated 
								for custom IT development work - web development, 
								social media marketing, search engine optimization, 
								and small business modernization.'/>
						</div>
						<div className="gridItem" />
					</div>
				</div>
			</section>
		</>
	);
}

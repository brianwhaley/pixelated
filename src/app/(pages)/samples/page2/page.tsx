/* eslint-disable @next/next/no-page-custom-font */
"use client";

// https://www.kirstennoelle.com/ 
// https://www.trophywives.co/
// https://juliaandgil.com/
// https://cassandraladru.com/

import React, { useEffect } from "react";
import { MenuSimple } from "@brianwhaley/pixelated-components";
import { Callout } from "@brianwhaley/pixelated-components";
import { Tiles } from "@brianwhaley/pixelated-components";
import { MicroInteractions } from "@brianwhaley/pixelated-components";
import "@brianwhaley/pixelated-components/css/pixelated.global.css";
import "./page2.css";
import SocialTags from "@/app/elements/socialtags";

const menuItems1 = [
	{ "name": "About Us", "path": "./", } ,
	{ "name": "Services", "path": "./", } ,
	{ "name": "Our Portfolio", "path": "./", } ,
];

const menuItems2 = [
	{ "name": "Availability", "path": "./", } ,
	{ "name": "Blog", "path": "./", } ,
	{ "name": "Contact Us", "path": "./", } ,
];

const flickrCards = [
	{
		"index": 0, "cardIndex": 0, "cardLength": 3,
		"image": "https://www.brides.com/thmb/LMyiMPxRFx82BLiHZC8lySJFnGo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/marriage-pose-photo-recirc-kyle-john-1-29-4f97523aa049471992292e8d6ddc41ee.jpg",
		"imageAlt": "Wedding One: Beautiful Outdoor Ceremony",
	},
	{
		"index": 1, "cardIndex": 1, "cardLength": 3,
		"image": "https://rangefinderonline.com/wp-content/uploads/2024/03/BODY-2-Derrel-Ho-Shing-copy.jpg",
		"imageAlt": "Wedding Two: Intimate Moment",
	},
	{
		"index": 2, "cardIndex": 2, "cardLength": 3,
		"image": "https://static.wixstatic.com/media/a108e4_23c26d63dd7b4c9c8956b740d05ed63e~mv2.jpg/v1/fill/w_565,h_376,al_c,q_80,usm_0.66_1.00_0.01/a108e4_23c26d63dd7b4c9c8956b740d05ed63e~mv2.jpg",
		"imageAlt": "Wedding Three: Beautiful Beach Scene",
	},
];

export default function SamplePage2() {

	useEffect(() => {
		MicroInteractions({ 
			buttonring: true,
			formglow: true,
			imgscale: true,
			grayscalehover: true,
			scrollfadeElements: '.callout , .calloutSmall , .carouselContainer, .timelineContainer, .tile',
		});
	}, []);

	return (
		<>
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
			<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" />
		
			<header>

				<img className="header-bg" src="https://christophersstudio.net/wp-content/uploads/2024/07/first-look-photos-scaled.jpg" />

				<nav>
					<div className="pull-left">
						<MenuSimple menuItems={menuItems1} />
					</div>
					<div className="push-right">
						<MenuSimple menuItems={menuItems2} />
					</div>
					<div className="logo centered">
						<img src="/images/samples/momento-studios.png" alt="Logo" className="pull-left logo-image" />
					</div>
				</nav>

				<section  id="header-callout-section">
					<div className="row-12col">
						<div className="grid-s2-e10">
							<Callout 
								layout="vertical"
								url='./'
								title="Turning real happiness into timeless imagery"
								buttonText="GET A QUOTE"
							/>
						</div>
					</div>
				</section>

			</header>

			<main>

				<section id="main-callout-section">
					<Callout 
						img="https://i.pinimg.com/736x/dd/13/83/dd1383bd7db545d6ef29dbe078cf73b4.jpg"
						layout="horizontal"
						style='split'
						direction="right"
						url='./'
						title="Wedding Photography for the Artful Soul"
						subtitle="Momento Studios documents life stories across the region - Specializing in 
						intimate wedding days, elopements, and lifestyle photography"
						content="Your wedding day experience, from planning it to living it, can be 
						whatever you want it to be. I'm already one of your biggest advocates in creating 
						the wedding day experience you've always daydreamed of. Whether it's 
						just the two of you for an intimate adventure in the beautiful landscapes of the area 
						or in the busy streets of nearby cities surrounded by all your loved ones — it's your day. 
						Your experience is my top priority, and you'll see that before, during, and after your wedding day."
						buttonText="LEARN MORE"
					/>
				</section>


				<section id="aboutus-callout-section">
					<div className="row-12col">
						<div className="grid-s2-e10">
							<Callout 
								layout="vertical"
								url='./'
								title="Exceptional Wedding Photograps That Tell Your Unique Story"
								content="Our work is inspired by Impressionist painters like Monet, 
								who captured emotion through light, color and movement, as well as 
								by photographers such as Slim Aarons, Henri Cartier-Bresson and 
								Sage Sohier, whose sense for composition and atmosphere shapes how we see. 
								We view photography as an art form, a way of translating feeling into image. 
								Museums, paintings and nature continually remind us that beauty lies 
								not in perfection, but in feeling."
								buttonText="LEARN MORE"
							/>
						</div>
					</div>
				</section>


				<section id="landscape-tiles-section">
					<Tiles cards={flickrCards} rowCount={3}/>
				</section>


				<section id="services-section">

					<img className="section-bg" src="https://katelynbradleyphotography.com/wp-content/uploads/2025/03/CarolineWillWeddingNorfolkCTKatelynBradleyPhotography918.jpg" />

					<div className="row-12col">
						<div className="grid-s2-e10">
							<Callout 
								layout="vertical"
								url='./'
								title="We are your Trusted Photography Vendor"
								content="For over a decade, we've photographed weddings across the globe, 
								from Lake Como to Portugal, Mallorca to Puglia. Our work has been featured in Vogue, 
								The Wed, The Lane, Anti-Bride, Magnolia Rouge and Style Me Pretty, among others. 
								We've had the privilege of documenting celebrations for politicians, 
								athletes, CEOs and creatives, people who trust us for our artistic eye 
								and our discretion. With years of experience in high-profile settings, 
								we understand the importance of privacy."
								buttonText="VIEW ALL SERVICES"
							/>
						</div>

					</div>
				</section>


			</main>
			<footer>
				<section id="footer-callout-section">

					<div className="socialContainer row-12col">
						<div className="grid-s3-e8">
							<SocialTags />
						</div>
					</div>
					
					<div className="logo centered">
						<img src="/images/samples/momento-studios.png" alt="Logo" className="pull-left logo-image" />
					</div>

					<hr />
					<div className="centered">
						<p className="footer-text">&copy; {new Date().getFullYear()} Pixelated Technologies. All rights reserved.</p>
					</div>
				</section>
			</footer>
			
		</>
	);
}

/* eslint-disable @next/next/no-page-custom-font */
"use client";

// https://i.etsystatic.com/21569499/r/il/cd83cb/4647188149/il_1080xN.4647188149_l7nu.jpg
// https://www.quay.com.au/
// https://lapastaria.org/

import React, { useEffect } from "react";
import { MicroInteractions } from "@pixelated-tech/components";
import { MenuSimple } from "@pixelated-tech/components";
import { Callout } from "@pixelated-tech/components";
import { PageSectionHeader } from "@pixelated-tech/components";
import { SmartImage } from "@pixelated-tech/components";
import SocialTags from "@/app/elements/socialtags";
import "@pixelated-tech/components/css/pixelated.global.css";
import "./page3.css";

const menuItems = [
	{ "name": "Menu", "path": "/samples", } ,
	{ "name": "Wine & Spirits", "path": "/samples", } ,
	{ "name": "Reservations", "path": "/samples", } ,
	{ "name": "Orders", "path": "/samples", } ,
	{ "name": "Catering", "path": "/samples", } ,
	{ "name": "Events", "path": "/samples", } ,
	{ "name": "Weddings", "path": "/samples", } ,
	{ "name": "About Us", "path": "/samples", } ,
	{ "name": "Contact", "path": "/samples", } ,
];

export default function SamplePage3() {

	useEffect(() => {
		MicroInteractions({ 
			buttonring: true,
			formglow: true,
			imgscale: true,
			scrollfadeElements: '.callout , .calloutSmall , .carousel-container, .timeline-container, .tile-container, .tile',
		});
	}, []);

	return (
		<>
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
			<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Great+Vibes&display=swap" rel="stylesheet" />
		

			<header>
				<div className="logo-container">
					<SmartImage src="/images/samples/the-linen-table.jpg" alt="logo" />
				</div>
				<nav>
					<hr />
					<MenuSimple menuItems={menuItems} />
					<hr />
				</nav>
			</header>

			<main>

				<section id="main-section" className="">
					<Callout 
						variant="split"
						layout="vertical"
						direction="left"
						url="./" 
						img="https://t3.ftcdn.net/jpg/15/88/13/22/360_F_1588132217_cexuZsTtfLkhp9GCJdN3nN4cKeCcEYyZ.jpg" 
						title="Our Menu" 
						content="Explore our diverse menu featuring gourmet dishes 
						crafted from the freshest ingredients, designed to 
						tantalize your taste buds.  A progression of rare and beautiful ingredients 
						where texture, flavour and harmony is paramount. From appetizers to desserts, 
						our culinary offerings promise a delightful dining experience.
						Delve into our dining experience with our Michelin Rated Menu 
						and a thoughtfully curated Wine List."
						buttonText="VIEW OUR MENU"
					/>
					<Callout 
						variant="split"
						layout="vertical"
						direction="right"
						url="./" 
						img="https://media.istockphoto.com/id/839894108/photo/bartender-with-glass-and-lemon-peel-preparing-cocktail-at-bar.jpg?s=612x612&w=0&k=20&c=IIRUATh4m7mTIsBYtqtIOd30CZpEipMqmBUIz_dNlBg=" 
						title="Wine & Spirits"
						content="Discover our extensive selection of fine wines and spirits, 
						carefully curated to complement our gourmet menu. 
						Whether you're a connoisseur or simply looking for the perfect pairing, 
						our collection offers something for every palate. 
						From rare vintages to craft cocktails, elevate your dining experience with 
						our exceptional beverage offerings.  Indulge in our curated selection of 
						exquisite wines and premium spirits, handpicked to enhance your dining pleasure."
						buttonText="VIEW OUR MENU"
					/>
				</section>

				<section id="tiles-section" className="">
					<div className="row-3col">
						<div className="grid-item">
							<Callout 
								variant="overlay"
								layout="vertical"
								url="./" 
								img="https://t4.ftcdn.net/jpg/01/27/31/55/360_F_127315507_mjZftjLMN89jUP0mo7YCDr4HymXCMqzy.jpg" 
								title="Reservations"
								buttonText="RESERVE NOW"
							/>
						</div>
						<div className="grid-item">
							<Callout 
								variant="overlay"
								layout="vertical"
								url="./" 
								img="https://media.istockphoto.com/id/868935172/photo/heres-to-tonight.jpg?s=612x612&w=0&k=20&c=v1ceJ9aZwI43rPaQeceEx5L6ODyWFVwqxqpadC2ljG0=" 
								title="Events"
								buttonText="SCHEDULE NOW"
							/>
						</div>
						<div className="grid-item">
							<Callout 
								variant="overlay"
								layout="vertical"
								url="./" 
								img="https://media.istockphoto.com/id/1154232730/photo/wedding-decor-rustic-dining-table.jpg?s=612x612&w=0&k=20&c=5jkhCsCL5Jz6KapC_j4n9mOx2CoexcKQTjFVa1Td6-0=" 
								title="Weddings"
								buttonText="PLAN NOW"
							/>
						</div>
					</div>
				</section>

			</main>

			<footer>
				<section id="footer-callout-section">

					<div className="social-container row-12col">
						<div className="grid-s4-e10">
							<SocialTags />
						</div>
					</div>

					<div className="details-container row-3col">

						<div className="grid-item" style={{ textAlign: 'center' }}>
							<PageSectionHeader title="Location" />
							<div>The Linen Table</div>
							<div>1234 Robert Way</div>
							<div>East Lansing, MI 48823</div>
							<PageSectionHeader title="Contact Us" />
							<div>Phone: (421) 867-5309</div>
							<div>Email: tom@thelinentable.com</div>
						</div>

						<div className="grid-item">
							<iframe 
								src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d18077.1874323106!2d-84.48602569271873!3d42.7242724449086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sMos%20Eisley%20Spaceport%2C%20East%20Lansing!5e0!3m2!1sen!2sus!4v1763350624811!5m2!1sen!2sus" 
								width="100%" 
								height="300" 
								style={{ border: 0 }} 
								allowFullScreen
								loading="lazy" 
								referrerPolicy="no-referrer-when-downgrade">
							</iframe>
						</div>
						
						<div className="grid-item"  style={{ textAlign: 'center' }}>
							<PageSectionHeader title="Hours" />
							<div>Mon: Closed</div>
							<div>Tue: 12PM - 8:30PM</div>
							<div>Wed: 12PM - 8:30PM</div>
							<div>Thu: 12PM - 8:30PM</div>
							<div>Fri: 12PM - 8:30PM</div>
							<div>Sat: 4:30PM - 10:30PM</div>
							<div>Sun: 12:30PM - 7PM</div>
						</div>

					</div>

					<hr style={{margin: '0 auto', width: '80%'}} />
					<div className="centered">
						<p className="footer-text">&copy; {new Date().getFullYear()} Pixelated Technologies. All rights reserved.</p>
					</div>
				</section>
			</footer>
		</>
	);
}

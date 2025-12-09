/* eslint-disable @next/next/no-page-custom-font */
 
"use client";

import React, { useEffect } from "react";
import { PageGridItem, MicroInteractions, PageTitleHeader } from "@pixelated-tech/components";
import { MenuSimple, MenuAccordion, MenuAccordionButton } from "@pixelated-tech/components";
import { PageSection } from "@pixelated-tech/components";
import { Callout } from "@pixelated-tech/components";
import { PageSectionHeader } from "@pixelated-tech/components";
import SocialTags from "@/app/elements/socialtags";
import "@pixelated-tech/components/css/pixelated.global.css";
import "./page5.css";

const menuItems = [
	{ "name": "Menu", "path": "./", } ,
	{ "name": "Event Calendar", "path": "./", } ,
	{ "name": "Catering", "path": "./", } ,
	{ "name": "Gallery", "path": "./", } ,
	{ "name": "About Us", "path": "./", } ,
	{ "name": "Contact", "path": "./", } ,
];
// social media
// online orders
// newsletter
// request form
// blog
// testimonials
// FAQ
// location map
// hours
// team bios

export default function SamplePage4() {

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
			<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Shrikhand&display=swap" rel="stylesheet" />
			<header>
				<div className="row-12col">
					<div className="logo grid-s1-e5">
						<img src="/images/samples/HolyGuacamole.png" alt="Velocity Cycling Logo"/>
					</div>
					<div className="menu grid-s5-e13">
						<nav>
							<MenuAccordion menuItems={menuItems} />
							<MenuSimple menuItems={menuItems} />
						</nav>
					</div>
				</div>
				<MenuAccordionButton />
			</header>

			<main>
				<PageSection id="hero-section" columns={1}
					backgroundImage="https://img.freepik.com/free-photo/vegan-mexican-tacos_123827-36154.jpg?uid=R222425900&ga=GA1.1.140752640.1759855211&semt=ais_hybrid&w=740&q=80" >
					<br /><br /><br /><br />
					<Callout 
						url="./" 
						layout="vertical"
						title="Holy Moly That's Good!"
						buttonText={"Shop Now"} 
					/>
					<br /><br /><br /><br />
				</PageSection>

				<PageTitleHeader title="Holy Guacamole - Fresh, Fast, Fantastic!" />

				<PageSectionHeader title="OUR HOLY TRINITY" />
				<PageSection maxWidth="100%" id="menu-section" columns={3} >
					<PageGridItem>
						<Callout 
							img="https://img.freepik.com/free-photo/delicious-tacos-table_23-2150770479.jpg?uid=R222425900&ga=GA1.1.140752640.1759855211&semt=ais_hybrid&w=740&q=80"
							imgShape="round"
							layout="vertical"
							title="The Al Pastor"
							content="Marinated pork, pineapple fiery salsa"
						/>
					</PageGridItem>

					<PageGridItem>
						<Callout 
							img="https://cdn.pixabay.com/photo/2015/07/02/12/41/avocado-829092_1280.jpg"
							imgShape="round"
							layout="vertical"
							title="The Sainted Guac"
							content="Made fresh hourly. Lime, cilantro, serrano, magic"
						/>
					</PageGridItem>

					<PageGridItem>
						<Callout 
							img="https://img.freepik.com/free-photo/tasty-esquites-with-spices-cups_23-2149891146.jpg?uid=R222425900&ga=GA1.1.140752640.1759855211&semt=ais_hybrid&w=740&q=80"
							imgShape="round"
							layout="vertical"
							title="Esquites Street Corn"
							content="Cup of roasted corn, cotija, chili powder, crema"
						/>
						{ /* https://img.freepik.com/free-photo/tasty-esquites-with-spices-high-angle_23-2149891122.jpg?uid=R222425900&ga=GA1.1.140752640.1759855211&semt=ais_hybrid&w=740&q=80 */ }
					</PageGridItem>
				</PageSection>

				<PageSection background="var(--accent-color)" maxWidth="100%" id="menu-section" columns={1} >
					<SocialTags />
				</PageSection>

				<PageSection maxWidth="100%" id="review-section" columns={3} >
					<PageGridItem columnStart={1} columnEnd={-1}>
						<PageSectionHeader title="Reviews" />
					</PageGridItem>
					<PageGridItem>
						<Callout 
							variant="boxed"
							layout="vertical"
							title="Johnny from Bluffton"
							content="When I lived in the area, I came here at least once a week. 
							What a delightful taco truck that stays open late. 
							The prices are very reasonable. 
							The staff are always super friendly to everyone and the tacos come out quick!"
						/>
					</PageGridItem>

					<PageGridItem>
						<Callout 
							variant="boxed"
							layout="vertical"
							title="Vic from Beaufort"
							content="Some of the best tacos in all of the Lowcountry. 
							Value for the money spent is great. 
							The tacos are full of flavor, perfect moisture and not dry.
							The salsa was spicy but not so spicy that it overpowers 
							the flavor of the meat.
							I always go back if I find myself in that area."
						/>
					</PageGridItem>

					<PageGridItem>
						<Callout 
							variant="boxed"
							layout="vertical"
							title="Esquites Street Corn"
							content="Very good food, price and definitely the service and attention. 
							Everything was amazing. Most importantly was the service and honesty of our server. 
							I will definitely recommend this place and we will be back soon. 
							THE BEST TACOS 🌮 🌮 🌮 !"
						/>
						{ /* https://img.freepik.com/free-photo/tasty-esquites-with-spices-high-angle_23-2149891122.jpg?uid=R222425900&ga=GA1.1.140752640.1759855211&semt=ais_hybrid&w=740&q=80 */ }
					</PageGridItem>
				</PageSection>

				<PageSection background="#E0E0E0" padding="20px" maxWidth="768px" id="catering-section" columns={1} >
					<PageGridItem>
						<Callout 
							variant="boxed grid"
							gridColumns={{ left: 1, right: 2 }}
							img="https://img.freepik.com/premium-photo/street-fish-tacos-with-cod-recycled-paper-food-tray_198639-63107.jpg?uid=R222425900&ga=GA1.1.140752640.1759855211&semt=ais_hybrid&w=740&q=80"
							imgShape="round"
							layout="horizontal"
							direction="left"
							title="Let Holy Guacamole! Cater Your Next Private Event"
							content="Need Tacos at Your Party? Ditch the boring buffet. 
							Book Holy Guacamole and turn your event into a full-blown fiesta.
							We'll roll up, pop the hatch, and bless your backyard 
							with the freshest street food in town. 
							You handle the margaritas; we'll handle the holy trinity 
							of tacos, corn, and guac."
						/>
					</PageGridItem>
				</PageSection>

			</main>

			<footer>

				<PageSection maxWidth="100%" id="footer-details-section" columns={1}>
					<div className="row-3col">
						<div className="gridItem" style={{ textAlign: 'center' }}>
							<PageSectionHeader title="Location" />
							<div>Holy Guacamole Taco Truck</div>
							<div>123 William Hilton Parkway</div>
							<div>Hilton Head Island, SC 29930</div>
							<PageSectionHeader title="Contact Us" />
							<div>Phone: (843) 785-3673 </div>
							<div>Email: info@holyguacamoletacotruck.com</div>
						</div>

						<div className="gridItem">
							<iframe 
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d78716.94846046132!2d-80.80423213107764!3d32.19532746066251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88fc772555555555%3A0x62e1985f256e5c96!2sCoastal%20Discovery%20Museum!5e0!3m2!1sen!2sus!4v1764299846597!5m2!1sen!2sus" 
								width="100%" 
								height="300" 
								style={{ border: 0 }} 
								allowFullScreen
								loading="lazy" 
								referrerPolicy="no-referrer-when-downgrade">
							</iframe>
						</div>
						
						<div className="gridItem"  style={{ textAlign: 'center' }}>
							<PageSectionHeader title="Hours" />
							<div>CLOSED</div>
							<div>Tue: 11AM - 8PM</div>
							<div>Wed: 11AM - 8PM</div>
							<div>Thu: 11AM - 8PM</div>
							<div>Fri: 11AM - 8PM</div>
							<div>Sat: 11AM - 8PM</div>
							<div>Sun: 12:30PM - 6PM</div>
						</div>

					</div>
				</PageSection>
				
				<PageSection id="footer-copyright-section" columns={1}>
					<hr style={{margin: '0 auto', width: '80%'}} />
					<div className="centered">
						<p className="footer-text">&copy; {new Date().getFullYear()} Pixelated Technologies. All rights reserved.</p>
					</div>
				</PageSection>

			</footer>
		</>
	);
}

 
"use client";

// https://bike-room.com/
// https://99designs.com/inspiration/websites/bike#:~:text=by%20Hitron_eJump,worlds%20first%20airbag%20for%20cyclists


import React, { useEffect } from "react";
import { MicroInteractions, SmartImage } from "@pixelated-tech/components";
import { MenuSimple, MenuAccordion, MenuAccordionButton } from "@pixelated-tech/components";
import { PageSection } from "@pixelated-tech/components";
import { Callout } from "@pixelated-tech/components";
import { PageSectionHeader } from "@pixelated-tech/components";
import SocialTags from "@/app/elements/socialtags";
import "@pixelated-tech/components/css/pixelated.global.css";
import "./page4.css";

const menuItems = [
	{ "name": "Shop", "path": "./", } ,
	{ "name": "Build Your Bike", "path": "./", } ,
	{ "name": "Repairs", "path": "./", } ,
	{ "name": "Coaching", "path": "./", } ,
	{ "name": "Locations", "path": "./", } ,
	{ "name": "About Us", "path": "./", } ,
	{ "name": "Contact", "path": "./", } ,
];

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
			<header>
				<PageSection id="hero-section" columns={1}
					backgroundImage="https://media.istockphoto.com/id/1156464124/photo/bicycle-chain-gearshift-transmission.jpg?b=1&s=612x612&w=0&k=20&c=FV0ZpqjnpW68apt2GFEKQOj4x1uL6TIT3lPtTzguS1E=" >
					<SmartImage 
						src="/images/samples/velocity-cycling.png" 
						alt="Velocity Cycling Logo" 
						aboveFold={true} />
				</PageSection>

				<MenuAccordionButton />
			</header>

			<nav>
				<MenuAccordion menuItems={menuItems} />
				<hr />
				<MenuSimple menuItems={menuItems} />
				<hr />
			</nav>

			<main>
				<PageSectionHeader title="Featured Bicycles" />
				<PageSection id="featured-section" columns={1} maxWidth="100%" padding="20px">
					<div className="row-3col">
						<div className="grid-item">
							<Callout 
								aboveFold={true}
								layout="vertical"
								img="https://www.sefiles.net/images/library/zoom/trek-domane-sl-7-etap-381964-17.jpg"
								title="Trek Domane SL 7 eTap"
								subtitle=""
								content="Experience the perfect blend of speed, comfort, and cutting-edge technology with the Trek Domane SL 7 eTap. This endurance road bike features a lightweight carbon frame, advanced IsoSpeed technology for a smooth ride, and SRAM's wireless eTap shifting system for precise gear changes. Whether you're tackling long rides or challenging terrains, the Domane SL 7 eTap is designed to elevate your cycling experience."
							/>
						</div>
						<div className="grid-item">
							<Callout 
								aboveFold={true}
								layout="vertical"
								img="https://flyridesusa.com/cdn/shop/products/Specialized_Turbo_Vado_SL_4_0_EQ_eMTB_Smoke_Black_Reflective.jpg?v=1665180033&width=1946"
								title="Specialized Turbo Vado SL 4.0 EQ"
								subtitle=""
								content="Discover the joy of effortless commuting and weekend adventures with the Specialized Turbo Vado SL 4.0 EQ. This lightweight electric bike combines a sleek design with powerful performance, featuring a Specialized SL 1.1 motor that provides smooth pedal assistance up to 28 mph. Equipped with integrated lights, fenders, and a rear rack, the Turbo Vado SL 4.0 EQ is your perfect companion for urban exploration and beyond."
							/>
						</div>
						<div className="grid-item">
							<Callout 
								aboveFold={true}
								layout="vertical"
								img="https://images.cdn.europe-west1.gcp.commercetools.com/078b97e9-ed31-4c81-baae-cdd44f3bf3c1/85f1a0ef71173c496992-b2ki_voE.jpg"
								title="Giant Trance X Advanced Pro 29"
								subtitle=""
								content="Conquer the trails with confidence on the Giant Trance X Advanced Pro 29. This high-performance mountain bike features a full carbon frame, 29-inch wheels for enhanced rollover capability, and Maestro suspension technology for superior control on rough terrain. With a wide range of gears and hydraulic disc brakes, the Trance X Advanced Pro 29 is built to handle technical descents and challenging climbs with ease."
							/>
						</div>
					</div>
				</PageSection>


				<PageSection id="services-section" columns={1} maxWidth="100%" padding="20px">
					<div className="row-3col">
						<div className="grid-item">
							<Callout 
								variant="overlay"
								imgShape="bevel"
								img="https://thebicyclestation.com/cdn/shop/files/IMG_6795.heic?v=1737135501&width=1800"
								title="Visit Our Shop"
								subtitle=""
								content="Explore our wide selection of bikes, accessories, and apparel from top brands. Our knowledgeable staff is here to help you find the perfect gear for your cycling adventures."
							/>
						</div>
						<div className="grid-item">
							<Callout 
								variant="overlay"
								imgShape="bevel"
								img="https://cdn.shopify.com/s/files/1/2318/5263/files/Frame2_2048x2048_1.jpg?8209230342697207847"
								title="Build Your Bike"
								subtitle=""
								content="Let's build your dream bike together! Choose your frame, components, and accessories to create a custom ride that fits your style and needs."
							/>
						</div>
						<div className="grid-item">
							<Callout 
								variant="overlay"
								imgShape="bevel"
								img="https://tricoachgeorgia.com/wp-content/uploads/2024/04/triathilon-header.jpg"
								title="Coaching & Training"
								subtitle=""
								content="Whether you're a beginner or a seasoned cyclist, our coaching services can help you reach your goals. From personalized training plans to group rides, we've got you covered."
							/>
						</div>
					</div>
				</PageSection>


				<PageSection id="about-section" columns={1} maxWidth="1024px" padding="0 20px">
					<Callout 
						layout="horizontal"
						variant="boxed"
						imgShape="squircle"
						img="https://media.istockphoto.com/id/578086382/photo/mountain-biker-silhouette.jpg?s=612x612&w=0&k=20&c=8oEfIudClsxrchJEFJX2ohq-YUcQxB4kKB0LuGsff3o="
						title="About Us"
						subtitle="Passionate About Cycling and Community"
						content="Founded in 1995, Velocity Cycling has been dedicated to 
							serving the cycling community for nearly three decades. 
							Our mission is to provide exceptional products, services, and 
							experiences that inspire people to embrace the joy of cycling. 
							We believe in fostering a welcoming environment where cyclists 
							of all levels can connect, learn, and grow together.
							Our team of experienced cyclists and mechanics are passionate 
							about helping you find the perfect bike and gear to suit your needs. 
							We take pride in our personalized service and expert advice, ensuring 
							that every customer leaves our shop feeling confident and excited 
							about their cycling journey."
					/>
				</PageSection>


				<PageSectionHeader title="Authorized Reseller" />
				<PageSection id="reseller-section" columns={1} maxWidth="1024px" padding="20px">
					<div className="row-4col">
						<div className="grid-item">
							<Callout 
								layout="vertical"
								imgShape="bevel"
								img="https://live.staticflickr.com/5213/5434174310_ae0c113c03_n.jpg"
								title=""
								subtitle="Specialized"
								content=""
							/>
						</div>
						<div className="grid-item">
							<Callout 
								layout="vertical"
								imgShape="bevel"
								img="https://logosandtypes.com/wp-content/uploads/2025/04/giant-bicycles.svg"
								title=""
								subtitle="Giant"
							/>
						</div>
						<div className="grid-item">
							<Callout 
								layout="vertical"
								imgShape="bevel"
								img="https://1000logos.net/wp-content/uploads/2020/09/Cannondale-Emblem-500x313.jpg"
								title=""
								subtitle="Cannondale"
								content=""
							/>
						</div>
						<div className="grid-item">
							<Callout 
								layout="vertical"
								imgShape="bevel"
								img="/images/samples/trek-logo.png"
								title=""
								subtitle="Trek"
								content=""
							/>
						</div>
					</div>
				</PageSection>

				<PageSection id="footer-callout-section" maxWidth="768px" columns={1} background="lightblue">
					<SocialTags />
				</PageSection>

			</main>

			<footer>

				<PageSection id="footer-details-section" columns={1}>
					<div className="row-3col">
						<div className="grid-item" style={{ textAlign: 'center' }}>
							<PageSectionHeader title="Location" />
							<div>Velocity Cycling</div>
							<div>Malvern Courtyard Shopping Centre</div>
							<div>5 South Morehall Rd</div>
							<div>Malvern, PA 19355</div>
							<PageSectionHeader title="Contact Us" />
							<div>Phone: (610) 644-2602</div>
							<div>Email: info@velocitycycling.com</div>
						</div>

						<div className="grid-item">
							<iframe 
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12219.643371209297!2d-75.52584077225562!3d40.03276997376298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6ed451790a5e9%3A0x9bba4ec3f14ecc64!2sMalvern%2C%20PA%2019355!5e0!3m2!1sen!2sus!4v1764015906891!5m2!1sen!2sus" 
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
							<div>Mon: 8AM - 6PM</div>
							<div>Tue: 8AM - 6PM</div>
							<div>Wed: 8AM - 8:30PM</div>
							<div>Thu: 8AM - 6PM</div>
							<div>Fri: 8AM - 6PM</div>
							<div>Sat: 8AM - 6PM</div>
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

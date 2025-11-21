"use client";

// https://www.bednarlandscape.com/
// https://cdn-icons-png.flaticon.com/512/489/489969.png
// https://uxwing.com/wp-content/themes/uxwing/download/nature-and-environment/pine-trees-icon.png

import React, { useEffect } from "react";
import { MenuSimple } from "@brianwhaley/pixelated-components";
import { Callout, CalloutButton } from "@brianwhaley/pixelated-components";
import { Tiles } from "@brianwhaley/pixelated-components";
import { MicroInteractions } from "@brianwhaley/pixelated-components";
import SocialTags from "@/app/elements/socialtags";
import "@brianwhaley/pixelated-components/css/pixelated.global.css";
import "./page1.css";

const menuItems = [
	{ "name": "About Us", "path": "./", } ,
	{ "name": "Services", "path": "./", } ,
	{ "name": "Our Portfolio", "path": "./", } ,
	{ "name": "Contact Us", "path": "./", } ,
];

const flickrCards = [
	{
		"index": 0, "cardIndex": 0, "cardLength": 3,
		"image": "https://s3media.angieslist.com/s3fs-public/exterior-house-landscaped-garden.jpeg",
		"imageAlt": "House Number One : Landscaped Garden",
	},
	{
		"index": 1, "cardIndex": 1, "cardLength": 3,
		"image": "https://dam.thdstatic.com/content/production/BNKD6cjCcHUQKpWva1URsw/xzJVeeuzLkxO84Y56SCWkg/Original%20file/front-yard-lanscaping-ideas-section-10_02-28-2024.jpg",
		"imageAlt": "House Number Two : Front Yard Landscaping Ideas",
	},
	{
		"index": 2, "cardIndex": 2, "cardLength": 3,
		"image": "https://static0.backyardbossimages.com/wordpress/wp-content/uploads/2023/07/shutterstock_641952565.jpg",
		"imageAlt": "House Number Three : Beautiful Backyard Design",
	},
];

export default function SamplePage1() {

	useEffect(() => {
		MicroInteractions({ 
			buttonring: true,
			formglow: true,
			imgtwist: true,
			scrollfadeElements: '.callout , .calloutSmall , .carouselContainer, .timelineContainer, .tile',
		});
	}, []);

	return (
		<>
			<header>
				<section id="header-callout-section">


					<div className="row-12col">
						<div className="grid-s2-e10">
							
							<div id="header-logo-row">
								<div className="logo-image pull-left">
									<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXHtcizoFKcMO4UrSvmGeznuQSamg9FOV0Os03Wj9Ofkv6p63citEUpT-z871IEQW-fb8&usqp=CAU" alt="Tom's Landscape Services Logo" />
								</div>
								<div className="logo-text pull-left">
									<h1>Tom's<br />Landscape<br />Services</h1>
								</div>
								<div className="header-nav">
									<nav>
										<MenuSimple menuItems={menuItems} />
									</nav>
								</div>
							</div>
							
						</div>
					</div>



					
					<div className="row-12col">
						<div className="grid-s2-e10">
							<Callout 
								layout="vertical"
								url='./'
								title="Professional Landscaping, Hardscaping & Masonry Services"
								subtitle="Throughout the Entire State"
								buttonText="GET A QUOTE"
							/>
						</div>
					</div>
				</section>
			</header>

			<main>
				<section id="landscape-callout-section">
					<div className="row-12col">
						<div className="grid-s2-e10">
							<Callout 
								layout="vertical"
								url='./'
								title="Exceptional Lawn Maintenance and Landscape Designs"
								content="Tom's Landscape Services offers professional landscaping 
								throughout the entire state. We bring vivid displays of nature 
								right to your doorstep through our comprehensive lawn and landscaping services. 
								Our team of experienced landscapers is committed to embellishing your surroundings 
								for enhanced aesthetics and functionality. We understand that every client has 
								unique needs and preferences, which is why we offer tailored solutions that 
								cater to your specific requirements. Our company serves all counties in the state."
								buttonText="LEARN MORE"
							/>
						</div>
					</div>
				</section>

				<section id="landscape-tiles-section">
					<Tiles cards={flickrCards} rowCount={3}/>
				</section>

				<section id="schedule-callout-section">
					<Callout 
						img="https://www.bednarlandscape.com/wp-content/uploads/2023/12/bednar-portfolio-07.jpg"
						layout="horizontal"
						style='split'
						url='./'
						title="Outstanding Landscapes and Breathtaking Results"
						content="With over 25 years of experience in the landscape industry, 
							our company has become a trusted name in creating exquisite landscapes 
							and maintaining lush lawns in the local area. We take immense pride in our work, 
							and our dedication to excellence is evident in every project we undertake. 
							At our company, we understand that every customer is unique, 
							with their own distinct vision and preferences. That's why we go above and beyond 
							to design vibrant landscapes that are tailored to meet the individual needs and desires 
							of each client. From stunning flower beds to serene water features, 
							we pay meticulous attention to detail to ensure that every element of the 
							landscape reflects the customer's personal style."
						buttonText="LEARN MORE"
					/>
				</section>

				<section id="landscape-services-section">
					<div className="row-12col">
						<div className="grid-s2-e10">
							<Callout 
								layout="vertical"
								title="Our Comprehensive Lawn and Landscaping Services"
								content="Our team of skilled craftsmen is committed to delivering exceptional results 
								using the highest quality materials and techniques. We believe in creating 
								landscapes that not only enhance the beauty of the surroundings but also 
								stand the test of time. Our meticulous craftsmanship, combined with our 
								unwavering commitment to customer satisfaction, sets us apart. 
								When you choose our company, you can expect nothing less than the 
								finest quality workmanship, personalized service, and breathtaking landscapes 
								that will exceed your expectations. Experience the difference that 
								our passion for landscaping can make, and let us transform 
								your outdoor space into a true masterpiece."
								buttonText="VIEW ALL SERVICES"
							/>
						</div>

						<div className="grid-s2-e10">
							<div className="row-4col">
								<div className="gridItem">
									<Callout 
										layout="vertical"
										img="https://www.bednarlandscape.com/wp-content/uploads/2023/12/icon_lawn-maintenance.png"
										imgShape="round"
										subtitle="Lawn Maintenance"
									/>
								</div>
								<div className="gridItem">
									<Callout 
										layout="vertical"
										img="https://www.bednarlandscape.com/wp-content/uploads/2023/12/icon_landscape-design.png"
										imgShape="round"
										subtitle="Landscape Design"
									/>
								</div>
								<div className="gridItem">
									<Callout 
										layout="vertical"
										img="https://www.bednarlandscape.com/wp-content/uploads/2023/12/icon_hardscaping.png"
										imgShape="round"
										subtitle="Masonry & Hardscaping"
									/>
								</div>
								<div className="gridItem">
									<Callout 
										layout="vertical"
										img="https://www.bednarlandscape.com/wp-content/uploads/2023/12/icon_snow-removal.png"
										imgShape="round"
										subtitle="Snow Removal"
									/>
								</div>
							</div>
						</div>

						<div className="grid-s2-e10">
							<CalloutButton 
								title="VIEW ALL SERVICES"
								url="./"
							/>
						</div>


					</div>
				</section>


			</main>
			<footer>
				<section id="footer-callout-section">
					<div className="row-12col">
						<div className="grid-s2-e10">
							<Callout 
								layout="vertical"
								url='./'
								title="Transform Your Outdoor Space"
								buttonText="GET STARTED"
							/>
						</div>
					</div>

					<div className="socialContainer row-12col">
						<div className="grid-s3-e8">
							<SocialTags />
						</div>
					</div>

					<hr />
					<MenuSimple menuItems={menuItems} />
					<hr />
					<div className="centered">
						<p className="footer-text">&copy; {new Date().getFullYear()} Pixelatd Technologies. All rights reserved.</p>
					</div>
					
				</section>
			</footer>
			
		</>
	);
}

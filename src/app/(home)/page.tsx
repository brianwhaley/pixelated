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
					<PageHeader title="Pixelated Technologies - Products & Services" />
					<div className="row-3col">
						<Callout
							img='images/icons/webdev.png'
							title='Web Development'
							subtitle='Do you need a new website or web application for your business? 
							Is your current website outdated or not mobile-friendly?
							Have you focused on other parts of your business and need help with your online presence?' 
							content='Pixelated Technologies can be your Virtual Technology Department, 
							providing custom web development solutions tailored to your business needs.
							We specialize in creating responsive, user-friendly websites and web applications 
							that help small businesses succeed online.'
							shape="squircle" 
							layout='vertical' />
						<Callout
							img='images/icons/socialmedia.png'
							title='Social Media Marketing'
							subtitle='Are your social media accounts active and engaging?
							Are they integrated with your website and other online platforms?
							Do they help convert prospective customers into current customers?' 
							content='Let Pixelated Technologieshelp you develop a comprehensive social media strategy that aligns with your business goals.
							We can help you create and manage your social media accounts, 
							produce engaging content, and analyze performance metrics to optimize your social media presence.'
							shape="squircle" 
							layout='vertical' />
						<Callout
							img='images/icons/seo.png'
							title='Search Engine Optimization'
							subtitle='Is your website optimized for search engines?
							Does it stand out from your competition, ranking well for relevant keywords and phrases?
							Do you have a plan to improve your search engine rankings over time?' 
							content='Pixelated Technologiescan help you improve your websites visibility and ranking on popular search engines.
							We can conduct a thorough SEO audit of your website, identify areas for improvement,
							and implement on-page and off-page SEO strategies to boost your search engine performance.'
							shape="squircle" 
							layout='vertical' />
						<Callout
							img='images/icons/content.png'
							title='Content Management'
							subtitle='Do you have to rely on a web developer to make updates to your website?
							Would you like to be able to make updates yourself, without needing technical skills?
							Do you need a content management system that is easy to use and maintain?' 
							content='Pixelated Technologies can help you implement a content management system (CMS) 
							that allows you to easily update and manage your website content.
							We can help you choose the right CMS at the right cost for your business needs, set it up, 
							and provide training and support to ensure you can manage your website effectively.'
							shape="squircle" 
							layout='vertical' />
						<Callout
							img='images/icons/ecommerce.png'
							title='eCommerce Solutions'
							subtitle='Do you want to move your business online to 
							start selling your products or services digitally?
							Do you need a secure and reliable eCommerce platform that integrates with your existing systems?
							Are you looking for ways to improve your online sales and customer experience?' 
							content='Pixelated Technologies can help you set up and manage an eCommerce platform that meets your business needs.
							We can help you choose the right eCommerce solution, 
							set it up, and provide ongoing support to ensure your online store runs smoothly.'
							shape="squircle" 
							layout='vertical' />
						<Callout
							img='images/icons/custom.png'
							title='Small Business Modernization' 
							subtitle='Are you looking to integrate your site with other business systems,
							such as marketing automation tools, billing and finance systems, 
							scheduling or inventory systems, or other business applications?' 
							content='Pixelated Technologies can help you develop custom business solutions that streamline your operations 
							and improve your efficiency. We can work with you to understand your business processes,
							identify areas for improvement, and develop custom software solutions that meet your specific needs.'
							shape="squircle" 
							layout='vertical' />
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
								<br/>
								<div className="centeredbutton"><a href="socialmedia">My Social Media</a></div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section id="gallery-section">
				<div className="section-container">
					<br />
					<CalloutHeader title="Work Portfolio Gallery" />
					<Carousel 
						cards={flickrCards} 
						draggable={true}
						imgFit="contain" />
				</div>
			</section>

			<section className="section-alt2" id="spotlight-section">
				<div className="section-container">
					<CalloutHeader title="About Pixelated Technologies" />
					<div className="row-12col">
						<div className="grid-s3-e8">
							<Callout
								img='images/brianwhaley-headshot.jpg'
								title='Brian T. Whaley'
								content='The owner of Pixelated Technologies.
									Full Stack Developer, Passionate Technologist, 
									Digital Transformation Professional, 
									User Experience Champion, SEO and Social Media Ninja, 
									Landscape and Macro Photographer, Avid World Traveler,
									Advanced Open Water Scuba Diver, Enthusiast of Home-Cooked Food'
								layout='horizontal2' />
						</div>
						<div className="grid-s3-e8">
							<Callout
								url='schedule'
								img='/images/icons/calendar-icon.jpg'
								title='Schedule an Appointment'
								layout='horizontal2'
								content='Schedule a consultation appointment with Pixelated Technologies 
								for custom IT development work - web development, 
								social media marketing, search engine optimization, 
								and small business modernization.'/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

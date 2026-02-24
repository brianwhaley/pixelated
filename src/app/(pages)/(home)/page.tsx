"use client";

import React, { useState, useEffect } from "react";
import { PageTitleHeader, PageSectionHeader } from "@pixelated-tech/components";
import { PageSection, PageGridItem } from "@pixelated-tech/components";
import { Callout } from "@pixelated-tech/components";
import { getWordPressItems, BlogPostList, mapWordPressToBlogPosting, SchemaBlogPosting, type BlogPostType } from "@pixelated-tech/components";
import SocialTags from "@/app/elements/socialtags";
import * as CalloutLibrary from "@/app/elements/calloutlibrary";
import { ToggleLoading } from "@pixelated-tech/components";

const wpSite = "blog.pixelated.tech";

export default function Home() {

	const [ wpPosts, setWpPosts ] = useState<BlogPostType[]>([]);
	const [ wpSchemas, setWpSchemas ] = useState<any[]>([]);

	useEffect(() => {
		async function fetchPosts() {
			ToggleLoading({show: true});
			const posts = (await getWordPressItems({ site: wpSite, count: 1 })) ?? [];
			if(posts) { 
				const myPosts = posts.sort((a, b) => ((a.date ?? '') < (b.date ?? '')) ? 1 : -1);
				setWpPosts(myPosts);
				setWpSchemas(myPosts.map(post => mapWordPressToBlogPosting(post, false)));
				ToggleLoading({show: false});
			}
		}
		fetchPosts();
	}, []); 


	return (
		<>
			<PageTitleHeader title="Pixelated Technologies" />
			<PageSection id="pixelated-section" maxWidth="768px" columns={1}>
				<PageGridItem>
					<Callout
						aboveFold={true}
						layout='vertical' 
						imgAlt='Pixelated Technologies'
						imgShape="squircle" 
						subtitle="About Pixelated Technologies"
						content='Pixelated Technologies is a Digital Services company that 
							specializes in transforming small businesses through
							custom IT solutions, including web development, social media marketing,
							search engine optimization, content management, eCommerce solutions,
							and small business modernization. Our mission is to empower small businesses
							to thrive in the digital age by providing tailored technology services that
							drive growth and efficiency.'/>
				</PageGridItem>
			</PageSection>


			<PageSection columns={1} maxWidth="1024px" id="home-schedule-section" >
				<PageGridItem>
					<CalloutLibrary.scheduleAppointment 
						variant='boxed grid'
						layout='horizontal'
					/>
				</PageGridItem>
			</PageSection>


			<PageSection columns={2} maxWidth="1024px"id="spotlight-section">

				<PageGridItem>
					<Callout
						layout='vertical'
						url='/portfolio'
						// img='/images/icons/portfolio.png'
						img='/images/pix-icons/portfolio.jpg'
						imgAlt='Portfolio'
						imgShape='bevel'
						title='View Our Work Portfolio'
						content='Explore our portfolio to see examples of the web development 
							and design work delivered by our team members over the years. 
							From responsive websites and custom web applications to branding 
							and logo designs, our portfolio showcases the diverse range of 
							projects we have successfully completed for small businesses. 
							Discover how Pixelated Technologies can bring your vision to life 
							with tailored solutions that meet your unique needs.'/>
				</PageGridItem>


				<PageGridItem>
					<Callout
						layout='vertical'
						url='/samples'
						// img='/images/icons/samples.png'
						img='/images/pix-icons/samples.jpg'
						imgAlt='Samples'
						imgShape='bevel'
						title='View Some Samples'
						content="Take a look at some of the web design samples to get an idea of the quality and style we bring to our projects.
						Examples include a landscape company website, a wedding photographer, a local restaurant menu, a bicycle shop, and a taco food truck.  
						These samples are just a few examples of how we can create visually appealing and user-friendly websites tailored to your industry.
						No matter your industry, we have experience creating custom web solutions that can help your business succeed online."/>
				</PageGridItem>
			</PageSection>


			
			<PageSection id="social-section" columns={1} background="var(--secondary-color)" >
				<SocialTags />
				<PageSectionHeader title="Read Our Most Recent Blog Post" />
				{ /* <BlogPostList site={wpSite} count={1} /> */ }
				{ wpSchemas.map((schema, index) => (
					<SchemaBlogPosting key={index} post={schema} />
				)) }
				<BlogPostList site={wpSite} posts={wpPosts} count={1} />
			</PageSection>



			<PageSectionHeader title="Our Value Proposition" />
			<PageSection id="products-section" columns={1}>
				<PageGridItem >
					<Callout
						aboveFold={true}
						variant="boxed"
						layout='horizontal' 
						direction="left"
						// img='/images/icons/webdev.png'
						img='/images/pix-icons/webdev.jpg'
						imgAlt='Web Development'
						imgShape="squircle" 
						title='Web Development'
						subtitle='Do you need a new website or web application for your business? 
							Is your current website outdated or not mobile-friendly?
							Have you focused on other parts of your business and need help with your online presence?' 
						content='Pixelated Technologies can be your Virtual Technology Department, 
							providing custom web development solutions tailored to your business needs.
							We specialize in creating responsive, user-friendly websites and web applications 
							that help small businesses succeed online.'/>
				</PageGridItem>
				<PageGridItem >
					<Callout
						aboveFold={true}
						variant="boxed"
						layout='horizontal' 
						direction="right"
						// img='/images/icons/socialmedia.png'
						img='/images/pix-icons/socialmedia.jpg'
						imgAlt='Social Media Marketing'
						imgShape="squircle" 
						title='Social Media Marketing'
						subtitle='Are your social media accounts active and engaging?
							Are they integrated with your website and other online platforms?
							Do they help convert prospective customers into current customers?' 
						content='Let Pixelated Technologies help you develop a comprehensive social media strategy that aligns with your business goals.
							We can help you create and manage your social media accounts, 
							produce engaging content, and analyze performance metrics to optimize your social media presence.' />
				</PageGridItem>
				<PageGridItem >
					<Callout
						aboveFold={true}
						variant="boxed"
						layout='horizontal' 
						direction="left"
						// img='/images/icons/seo-2.png'
						img='/images/pix-icons/seo.jpg'
						imgAlt='Search Engine Optimization'
						imgShape="squircle" 
						title='Search Engine Optimization'
						subtitle='Is your website optimized for search engines?
							Does it stand out from your competition, ranking well for relevant keywords and phrases?
							Do you have a plan to improve your search engine rankings over time?' 
						content='Pixelated Technologies can help you improve your websites visibility and ranking on popular search engines.
							We can conduct a thorough SEO audit of your website, identify areas for improvement,
							and implement on-page and off-page SEO strategies to boost your search engine performance.' />
				</PageGridItem>
				<PageGridItem >
					<Callout
						variant="boxed"
						layout='horizontal' 
						direction="right"
						// img='/images/icons/content.png'
						img='/images/pix-icons/content.jpg'
						imgAlt='Content Management'
						imgShape="squircle"
						title='Content Management'
						subtitle='Do you have to rely on a web developer to make updates to your website?
							Would you like to be able to make updates yourself, without needing technical skills?
							Do you need a content management system that is easy to use and maintain?' 
						content='Pixelated Technologies can help you implement a content management system (CMS) 
							that allows you to easily update and manage your website content.
							We can help you choose the right CMS at the right cost for your business needs, set it up, 
							and provide training and support to ensure you can manage your website effectively.'  />
				</PageGridItem>
				<PageGridItem >
					<Callout
						variant="boxed"
						layout='horizontal' 
						direction="left"
						// img='/images/icons/ecommerce.png'
						img='/images/pix-icons/ecommerce.jpg'
						imgAlt='eCommerce Solutions'
						imgShape="squircle" 
						title='eCommerce Solutions'
						subtitle='Do you want to move your business online to 
							start selling your products or services digitally?
							Do you need a secure and reliable eCommerce platform that integrates with your existing systems?
							Are you looking for ways to improve your online sales and customer experience?' 
						content='Pixelated Technologies can help you set up and manage an eCommerce platform that meets your business needs.
							We can help you choose the right eCommerce solution, 
							set it up, and provide ongoing support to ensure your online store runs smoothly.' />
				</PageGridItem>
				<PageGridItem >
					<Callout
						variant="boxed"
						layout='horizontal' 
						direction="right"
						// img='/images/icons/custom.png'
						img='/images/pix-icons/modernization.jpg'
						imgAlt='Small Business Modernization'
						imgShape="squircle" 
						title='Small Business Modernization'
						subtitle='Are you looking to integrate your site with other business systems,
							such as marketing automation tools, billing and finance systems, 
							scheduling or inventory systems, or other business applications?' 
						content='Pixelated Technologies can help you develop custom business solutions that streamline your operations 
							and improve your efficiency. We can work with you to understand your business processes,
							identify areas for improvement, and develop custom software solutions that meet your specific needs.' />
				</PageGridItem>
			</PageSection>



			<PageSection columns={1} maxWidth="768px" background="var(--accent1-color)" id="spotlight-section">
				<PageGridItem>
					<Callout
						variant='boxed'
						layout='horizontal' 
						img='/images/brianwhaley-headshot.jpg'
						imgAlt='Brian T. Whaley'
						imgShape='squircle'
						title='Brian T. Whaley'
						content='The owner of Pixelated Technologies.
							Full Stack Developer, Passionate Technologist, 
							Digital Transformation Professional, 
							User Experience Champion, SEO and Social Media Ninja, 
							Landscape and Macro Photographer, Avid World Traveler,
							Advanced Open Water Scuba Diver, Enthusiast of Home-Cooked Food' />
				</PageGridItem>
			</PageSection>
		</>
	);
}

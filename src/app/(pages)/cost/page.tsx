 
"use client";

import React from 'react';
import { PageTitleHeader, PageSectionHeader } from "@pixelated-tech/components";
import { PageSection, PageGridItem } from "@pixelated-tech/components";
import * as CalloutLibrary from "@/app/elements/calloutlibrary";


/* 
https://www.wedowebapps.com/website-development-costs/
https://www.wix.com/studio/blog/how-much-to-charge-for-a-website
https://imaginovation.net/blog/website-development-cost-complete-guide/
https://naturaily.com/blog/website-development-budget-and-timeline

*/

export default function Cost() {
	
	return ( 
		<>
			<PageTitleHeader title="Pixelated Technologies Cost Schedule" />

			<PageSection columns={1} maxWidth="1024px" id="value-prop-section">
				<PageSectionHeader title="Value Proposition" />
				<PageGridItem> 
					<div>The general theme to cost pricing in the web development industry follows two models:
						<ul>
							<li><b>Flat Fee Pricing</b> - Pixelated Technologies offers an all-inclusive pricing model, 
								which bundles many services into one, including custom web development, 
								graphic design, site content creation, domain purchase, image licensing, and more.</li>
							<li><b>A La Carte</b> - a Do-It-Yourself toolset for those who have the time and ability 
								to build a site themselves.  You then pay extra per month for premium themes and plugins 
								for additional features like SEO, Accessibility, and integrations.  Most web site platforms 
								either provide simple easy to use functionality or are too complex for the average person to use.  
								Professional services such as custom web development, graphic design, content creation, 
								and image licensing are all additional costs.</li>
						</ul>
					</div>
					<div>The services provided by each of the cost models are also very different:
						<ul>
							<li><b>Custom Site Shops</b> like Pixelated offer years of experience running the spectrum of features 
								you will need, for many companies and industries, with ways to automate for speed to market 
								and optimize for impact.  This includes Graphic Design, Content Creation, Social Media and Marketing experience, 
								SEO, Analytics, Content Management and Distribution, Accessibility, Page Speed, and more.  They act 
								as additional members of your team, managing technology, marketing, advertising, and other 
								intangible services like business strategy, competitive analysis local businesses in your area, and more.</li>
							<li><b>Off the shelf web platforms</b> like WordPress or GoDaddy, etc. have a customer service phone number 
								that can help you with basic questions related to using their tools, and will often upsell you 
								to premium themes, plugins, and upgraded hosting packages that rarely solve your problem as a small business owner.</li>
						</ul>
					</div>
					<div><b>Key Takeaways</b>
						<ul>
							<li>If you are prepared to take on the additional work of learning new tools, writing your own content, 
								using your own photos, and pouring your time into building your own web site, then 
								a web site platform like WordPress, Wix, or GoDaddy may be right for you.</li>
							<li>If you prefer to focus on your business and build relationships with new customers, having 
								a company like Pixelated to manage your website is both cost-effective and time efficient 
								from a business perspective. </li>
							<li>While a small business owner can take on website management themselves (or hand it over to 
								a family member or friend), it is often not business-minded, well maintained, 
								optimized for speed and search, kept up-to-date, and ultimately presents as “old” or “dormant”. 
								This does not instill confidence in new customers visiting your site.  </li>
						</ul>
					</div>
				</PageGridItem>
			</PageSection>

			<PageSection columns={1} maxWidth="1024px" id="website-build-section">
				<PageSectionHeader title="Web Site Build" />
				<PageGridItem> 
					<div>
						<p>
							Initial Build of a web site is a difficult thing to price as there are so many
							variables to consider. Here are some examples of a cost schedule for a web site - 
							ranging from simple, to more complex, to very complex including e-commerce functionality.
						</p>
						<p>
							These scenarios are meant to provide a general idea of web site build costs. 
							Actual costs may vary based on specific requirements, complexity, and additional features needed.
							To get a better understanding of what your specific web site build may cost, <a href="/schedule">schedule 
							a free assessment with Pixelated Technologies</a> and receive a custom quote.
						</p>
					</div>

					<h3>Scenario 1: Simple Web Site - $1,500 - $3,000</h3>
					<div>
						<p>
							This web site is a rebuild of an existing site with a similar structure and content.
							Information Architecture is straightforward, 
							with 5 pages with no additional hierarchy - the Home Page, About Us Page, Services page, Projects Page, and Contact us Page.  
							The logo and style guide will be reused, and a design was provided and agreed upon, 
							with a shared header, footer, and navigation elements acrosss the site.  
							Existing content will be used as a baseline and improved upon as needed. 
							The site will not leverage a content management system, as the content is simple and straightforward.
							The site will not have any additional integrations or custom functionality beyond the basic contact form.
							Technical requirements include fast load times, cross browser compatibility, 
							responsive and mobile friendly design, Web Analytics, SEO optimization, and Accessibility.
						</p>
					</div>

					<h3>Scenario 2: Complex Web Site - $3,000 - $5,000</h3>
					<div>
						<p>
							Information Architecture is moderately complex, 
							with approximately 15-20 pages and a 2-level hierarchy - the Home Page, About Us Page, 
							Services page with sub-pages, Projects Page with sub-pages, Blog, and Contact us Page.  
							A new logo and style guide will be created, with a unique design for the home page 
							and shared header, footer, and navigation elements across the site.  
							Content will be created from scratch based on client input and research. 
							The site will leverage a content management system (CMS) to allow for easy updates and additions to content.
							The site will include additional integrations such as social media feeds, newsletter sign-up, and a blog.
							There is no social media pesence for the company, so initial setup and integration will be required.
							Technical requirements include fast load times, cross browser compatibility, 
							responsive and mobile friendly design, Web Analytics, SEO optimization, Accessibility, and basic security measures.
						</p>
					</div>

					<h3>Scenario 3: E-Commerce Web Site - $5,000 - $10,000</h3>
					<div>
						<p>
							A web site with full e-commerce functionality is very complex, 
							including product catalog, shopping cart,
							checkout process, payment gateway integration, and order management system.
							Secure payment processing and data protection measures are essential.
							The site could have dozens or hundreds of product pages, with multiple 
							categories and filters for easy navigation. 
							This also means that the site will have many integration points for 
							inventory management, shipping providers, tax calculation, and more.
							This is on top of the style and design work needed to create a unique brand presence, 
							social media integration, content creation, email marketing, and customer support systems.
							There may be an existing social media presence that will need to be integrated into the site, 
							or if this is a new brand, initial setup and integration will be required.
							Technical requirements include fast load times, cross browser compatibility, 
							responsive and mobile friendly design, Web Analytics, SEO optimization, Accessibility, and strong security measures.
						</p>
					</div>
					
				</PageGridItem>
			</PageSection>

			<PageSection columns={1} maxWidth="1024px" id="website-maintenance-section">
				<PageSectionHeader title="Ongoing Maintenance" />
				<PageGridItem> 
					<div>
						<p>
							Ongoing maintenance is essential to keep your web site secure, up-to-date, and functioning optimally.
							Just like a beautiful new house plant, without regular care and attention, your web site can 
							quickly wither, become outdated, vulnerable to security threats, and less effective 
							in achieving your business goals. It is a small investment to gain new customers.  
							We offer three packages for ongoing maintenance, based on the level of services and features you require:
						</p>
					</div>

					<h3>Maintenance Package 1: Essential - $100 per month</h3>
					<div>
					This package includes the basics to keep your site running smoothly:
						<ul style={{marginTop: '0px'}}>
							<li>Site hosting, storage, and deployment management on Amazon Web Services, using AWS Amplify and NextJS</li>
							<li>Annual cost for domain registration and SSL certificate via AWS Route53</li>
							<li>Monthly cost for Content Delivery Network usage via AWS CloudFront</li>
							<li>Active logging and monitoring for uptime and performance using AWS CloudWatch</li>
							<li>Licenses for stock photography and images, as needed</li>
							<li>Basic security monitoring and malware scans, including resolving security vulnerabilities</li>
							<li>Email support for minor issues and questions</li>
							<li>Search engine optimization (SEO) monitoring and basic updates</li>
							<li>Analytics monitoring and monthly reports</li>
						</ul>
					</div>

					<h3>Maintenance Package 2: Standard - $150 per month</h3>
					<div>
					This package includes everything in the Essential package, plus:
						<ul style={{marginTop: '0px'}}>
							<li>Maintenance of Cloudinary Image Content Delivery Network and Contentful Content Management System</li>
							<li>Maintenance of Wordpress Blog Site, Wordpress Themes and Plugins, and Gravatar Profile, as applicable</li>
							<li>One (1) website content update per month, as needed</li>
							<li>One (1) Blog Post or News Update per month, as needed</li>
							<li>A content calendar outlining monthly blog topics and posting schedule</li>
							<li>Two (2) social media content updates per month across platforms, as needed</li>
							<li>Content update topics include blog post announcements, new projects, shared photos, 
								customer profiles, company announcements, relevant news articles, seasonal content, 
								updates and offers, staff spotlights, and more.</li>
							<li>Performance optimization and caching improvements</li>
							<li>Quarterly strategy calls to discuss site performance and improvements</li>
						</ul>
					</div>

					<h3>Maintenance Package 3: Premium - $250 per month</h3>
					<div>
					This package includes everything in the Essential and Standard package, plus:
						<ul style={{marginTop: '0px'}}>
							<li>Two (2) additional website content updates per month, as needed</li>
							<li>Three (3) additional Blog Posts or News Updates per month, as needed</li>
							<li>Two (2) additional social media content updates per month across platforms, as needed</li>
							<li>Monthly strategy calls to discuss site performance and improvements</li>
						</ul>
					</div>
				</PageGridItem>
			</PageSection>

			<PageSectionHeader title="Let's Get Started!" />
			<PageSection columns={12} id="process-schedule-section">
				<PageGridItem columnStart={1} columnEnd={13}>
					<CalloutLibrary.scheduleAppointment
						variant='boxed grid'
						gridColumns={{ left: 1, right: 2 }}
						layout='horizontal' />
				</PageGridItem>
			</PageSection>
		</>
	);
    
}

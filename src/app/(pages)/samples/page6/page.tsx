 
"use client";

import React, { useEffect } from "react";
import { PageGridItem, MicroInteractions, PageTitleHeader } from "@pixelated-tech/components";
import { MenuSimple, MenuAccordion, MenuAccordionButton } from "@pixelated-tech/components";
import { PageSection } from "@pixelated-tech/components";
import { Callout } from "@pixelated-tech/components";
import { PageSectionHeader } from "@pixelated-tech/components";
import { SmartImage } from "@pixelated-tech/components";
import SocialTags from "@/app/elements/socialtags";
import "@pixelated-tech/components/css/pixelated.global.css";
import "./page6.css";

const menuItems = [
	{ "name": "About Us", "path": "/samples", } ,
	{ "name": "Our Team", "path": "/samples", } ,
	{ "name": "Practices", "path": "/samples", } ,
	{ "name": "News", "path": "/samples", } ,
	{ "name": "Careers", "path": "/samples", } ,
	{ "name": "Contact", "path": "/samples", } ,
];

export default function SamplePage6() {

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
				<div className="row-12col">
					<div className="logo grid-s1-e5">
						<SmartImage src="/images/samples/law/m-b.png" alt="McKenzie & Brackman"/>
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
					backgroundImage="/images/samples/law/closeup-judge-gavel-with-symbolizing-foreclosure-proceedings.jpg" >
				</PageSection>

				<PageTitleHeader title="Client Focused. Results Driven." />

				<PageSectionHeader title="Who We Are" />

				<PageSection maxWidth="100%" id="whoweare-1-section" columns={1} >
					<PageGridItem>
						<Callout 
							variant="grid"
							direction="right"
							gridColumns={{ left: 1, right: 1 }}
							img="/images/samples/law/businesspeople-using-mobile-phone-digital-tablet.jpg"
							imgShape="bevel"
							layout="horizontal"
							subtitle="McKenzie & Brackman is a full-service law firm dedicated to providing exceptional legal services to individuals, families, and businesses. With a team of experienced attorneys, we offer comprehensive legal solutions tailored to meet the unique needs of our clients. Our commitment to excellence, integrity, and client satisfaction sets us apart as a trusted legal partner in our community."
							url="/samples"
							buttonText="Learn More about McKenzie & Brackman"
						/>
					</PageGridItem>
				</PageSection>

				<PageSection maxWidth="100%" id="whoweare-2-section" columns={3} >
					<PageGridItem>
						<Callout 
							img="/images/samples/law/close-up-justice-statue.jpg"
							imgShape="bevel"
							layout="vertical"
							title="Our Mission"
							content="At McKenzie & Brackman, our mission is to provide exceptional legal services with a client-centered approach. We are dedicated to achieving the best possible outcomes for our clients while upholding the highest standards of integrity and professionalism."
						/>
					</PageGridItem>

					<PageGridItem>
						<Callout 
							img="/images/samples/law/courthouse-building.jpg"
							imgShape="bevel"
							layout="vertical"
							title="We Work For You"
							content="We are committed to working tirelessly for our clients, ensuring their needs are met and their goals are achieved.  We strive to provide comprehensive legal services that cater to the unique needs of each client. Our team is dedicated to ensuring that every client receives personalized attention and expert guidance.
"
						/>
					</PageGridItem>

					<PageGridItem>
						<Callout 
							img="/images/samples/law/business-team-with-leader-office.jpg"
							imgShape="bevel"
							layout="vertical"
							title="More About Us"
							content="Our team of experienced attorneys is dedicated to providing personalized legal solutions, advocating for our clients' best interests, and delivering results that exceed expectations."	
						/>
					</PageGridItem>
				</PageSection>


				<PageSection background="var(--accent-color)" maxWidth="100%" id="menu-section" columns={1} >
					<SocialTags />
				</PageSection>

				<PageSection maxWidth="100%" id="results-section" columns={3} >
					<PageGridItem columnStart={1} columnEnd={-1}>
						<PageSectionHeader title="Past Results" />
					</PageGridItem>
					<PageGridItem>
						<Callout 
							variant="boxed"
							layout="vertical"
							title="$120 Million"
							content="In a landmark case, McKenzie & brackman secured a $120 million settlement for a class-action lawsuit against a major corporation accused of environmental violations. This victory not only provided justice for the affected communities but also set a precedent for corporate accountability in environmental cases."
						/>
					</PageGridItem>

					<PageGridItem>
						<Callout 
							variant="boxed"
							layout="vertical"
							title="$18 Million"
							content="In a high-profile intellectual property case, McKenzie & Brackman successfully defended a technology company against patent infringement claims, resulting in an $18 million judgment in favor of our client. This victory protected our client's innovations and reinforced their position in the competitive tech industry."
						/>
					</PageGridItem>

					<PageGridItem>
						<Callout 
							variant="boxed"
							layout="vertical"
							title="$1.1 Billion"
							content="In a complex commercial litigation case, McKenzie & Brackman represented a multinational corporation in a dispute over breach of contract, ultimately securing a $1.1 billion verdict in favor of our client. This outcome not only safeguarded our client's financial interests but also reinforced their reputation as a leader in their industry."
						/>
					</PageGridItem>
				</PageSection>



				<PageSection maxWidth="100%" background="var(--secondary-color)" id="service-section" columns={4} >
					<PageGridItem columnStart={1} columnEnd={-1}>
						<PageSectionHeader title="Where We Serve" />
					</PageGridItem>
					<PageGridItem>
						<Callout 
							variant="boxed"
							layout="vertical"
							img="/images/samples/law/autumn-ottawa-valley.jpg"
							title="Morristown"
						/>
					</PageGridItem>

					<PageGridItem>
						<Callout 
							variant="boxed"
							layout="vertical"
							img="/images/samples/law/dunster-house-cambridge-usa.jpg"
							title="Parsippany"
						/>
					</PageGridItem>

					<PageGridItem>
						<Callout 
							variant="boxed"
							layout="vertical"
							img="/images/samples/law/ottawa-street.jpg"
							title="Dover"
						/>
					</PageGridItem>

					<PageGridItem>
						<Callout 
							variant="boxed"
							layout="vertical"
							img="/images/samples/law/new-york-city-central-park.jpg"
							title="Livingston"
						/>
					</PageGridItem>
				</PageSection>



			</main>

			<footer>

				<PageSection maxWidth="100%" id="footer-details-section" columns={1}>
					<div className="row-3col">
						<div className="grid-item" style={{ textAlign: 'center' }}>
							<PageSectionHeader title="Location" />
							<div>McKenzie & Brackman Law Firm</div>
							<div>1 First Street</div>
							<div>Washington, D. C. 20543</div>
							<PageSectionHeader title="Contact Us" />
							<div>Phone: (202) 479-3000 </div>
							<div>Email: info@mckenziebrackman.com</div>
						</div>

						<div className="grid-item">
							<iframe 
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.2288945085743!2d-77.01074440871285!3d38.89588069881811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b81f7b72b0b7%3A0x7f323fb6bb50d94f!2sFirst%20St%20NE%2C%20Washington%2C%20DC!5e0!3m2!1sen!2sus!4v1772300078577!5m2!1sen!2sus" 
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
							<div>Mon: 9am - 4:30pm</div>
							<div>Tue: 9AM - 4:30pm</div>
							<div>Wed: 9AM - 4:30pm</div>
							<div>Thu: 9AM - 4:30pm</div>
							<div>Fri: 9AM - 4:30pm</div>
							<div>Sat: Closed</div>
							<div>Sun: Closed</div>
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

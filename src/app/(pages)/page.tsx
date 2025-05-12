"use client";

import React from "react";
import ContactCTA from "@/app/elements/contact";
import { Callout } from "@brianwhaley/pixelated-components";
import { CarouselSimple } from "@brianwhaley/pixelated-components";
import "./home.css";

export default function Home() {
  return (
    <>
	<h1>Palmetto Epoxy</h1>

      	<section id="homeCTA-section">
			<div className="section-container">
				<div className="homeCTA">
					<div className="textOutline">
						Elevate your space with a solution 
						<br />
						that&#39;s as practical as it is visually stunning.
						<br />
						<button type="button" onClick={() => { window.location.href = '/contact'; }}>Schedule an Estimate</button>
					</div>
				</div>
			</div>
		</section>

      	<section className="section-alt" id="callouts-section">
			<div className="section-container">
				<div className="row-3col">
					<div className="gridItem">
						<Callout
							img='https://images.squarespace-cdn.com/content/v1/63f19158f84f2b1e64ff6df7/1e084272-4798-4793-9379-60afbf3e1c7b/Blue.jpg?format=2500w'
							title="Floors You'll Adore"
							layout='vertical' 
							shape='square' />
					</div>
					<div className="gridItem">
						<Callout
							img='https://images.squarespace-cdn.com/content/v1/63f19158f84f2b1e64ff6df7/bf63d28c-d622-4e89-baf8-56d2ccb9194d/Epoxy+Floor+4.jpg?format=2500w'
							title='Epoxy Excellence'
							layout='vertical' 
							shape='square' />
					</div>
					<div className="gridItem">
						<Callout
							img='https://images.squarespace-cdn.com/content/v1/63f19158f84f2b1e64ff6df7/1719082000916-23J7QBKHZCRO9BWBDUZM/Grey_Bowling-Ball-Floor.jpg?format=2500w'
							title='Shine On...'
							layout='vertical' 
							shape='square' />
					</div>
				</div>
				
			</div>
		</section>

		<section id="portfolio-section">
			<div className="section-container">
				<CarouselSimple cards={[
					{
						headerText: "\"Palmetto Epoxy installed durable, slip-resistant flooring in our garage that has totally exceeded our expectations.  Highly recommended!\"",
						bodyText: " - Laurie Ellis",
					} , {
						headerText: "\"I highly recommend Palmetto Epoxy for any commercial flooring needs.  They were professional, efficient, and exceeded our expectations.\"",
						bodyText: " - Jamie Bingham",
					} , {
						headerText: "\"Palmetto Epoxy did an exceptional job sealing our patio pavers.  They now look incredible and are so much easier to maintain.  We highly recommend their services for anyone looking to enhance and protect their outdoor spaces!\"",
						bodyText: " - Lindsey Kim",
					} 
				]} />
			</div>
		</section>

		<section className="section-alt" id="portfolio-section-2">
			<div className="section-container">
				<div className="row-12col">
					<div className="grid-s1-e6">
						<img alt="May River High School Athletics - Welcome to the Tank!" 
						src="https://images.squarespace-cdn.com/content/v1/63f19158f84f2b1e64ff6df7/eeeb48e8-b7d5-45b9-aba2-af08e6638ed4/MR+Sharks+2.jpg?format=2500w" />
					</div>
					<div className="grid-s7-e6 bigText">
						Palmetto Epoxy is a proud Sponsor of May River HS Girls Soccer
					</div>
				</div>
			</div>
		</section>

		<section id="contact-section">
			<div className="section-container">
				<ContactCTA />
			</div>
		</section>

    </>
  );
}

"use client";

import React from "react";
import * as CalloutLibrary from "@/app/elements/calloutlibrary";
import { Callout } from "@brianwhaley/pixelated-components";

export default function About() {
	return (
		<>
			<CalloutLibrary.PageTitle title="About Us" />
		
			<section className="" id="aboutus-section">
				<div className="section-container">
					<div className="row-5col ">
						<div className="grid-s2-e3">
							<Callout
								title="About Palmetto Epoxy" 
								img='/images/dennis-and-martha-aberle.jpg' 
								imgShape='bevel' 
								imgAlt="Dennis and Martha Aberle of Palmetto Epoxy" 
								subtitle='Our team is made up of the dynamic duo of Dennis and Martha Aberle, 
									and together, we&#39;re committed to making sure our customers are always satisfied. 
									We believe that the key to great flooring is all about the details, 
									and we don&#39;t cut corners when it comes to our installations. 
									We&#39;re all about quality products, meticulous workmanship, 
									and unmatched customer service.'
								content=''
								layout='vertical' />
						</div>
					</div>
				</div>
			</section>

			<section className="" id="lowcountrysbest-section">
				<CalloutLibrary.LowCountrysBest />
			</section>

			<section className="section-bluechip" id="contact-section">
				<CalloutLibrary.ContactCTA />
			</section>
		</>
	);
}

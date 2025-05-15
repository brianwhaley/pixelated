"use client";

import React from "react";
import ContactCTA from "@/app/elements/contact";

export default function About() {
	return (
		<>
			<h1>About Us</h1>
            
			<div className="section-container">
				<div className="row-12col">
					<div className="grid-s1-e6">
						<img alt="Dennis and Martha Aberle of Palmetto Epoxy" 
							src="/images/dennis-and-martha-aberle.jpg" />
					</div>
					<div className="grid-s7-e6 bigText">
                        Our team is made up of the dynamic duo of Dennis and Martha Aberle, 
                        and together, we&#39;re committed to making sure our customers are always satisfied. 
                        We believe that the key to great flooring is all about the details, 
                        and we don&#39;t cut corners when it comes to our installations. 
                        We&#39;re all about quality products, meticulous workmanship, 
                        and unmatched customer service.
					</div>
				</div>
			</div>

			<div className="section-container">
				<ContactCTA />
			</div>
		</>
	);
}

"use client";

import React, { useState, useEffect } from 'react';
import { PageHeader } from "@brianwhaley/pixelated-components";

export default function Schedule() {
    
	const [bodyContent, setBodyContent] = useState<React.ReactNode>(null);

	useEffect(() => {
		setBodyContent(
			<div>
				<div className="meetings-iframe-container"
					data-src="https://meetings-na2.hubspot.com/brian-whaley?embed=true"
					suppressHydrationWarning={true} />
				<script async
					type="text/javascript"
					src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js" />
			</div>
		);
	}, []);

	return (
		<div className="section-container">
			<PageHeader title="Schedule a meeting with Pixelated" />
			<div className="row-12col">
				<div className="grid-s3-e8"> 
					<div className="row-1col" suppressHydrationWarning={true} >
						<div>
							<p>
						Our team of experts is here to help you achieve your business goals with tailored solutions. 
						Whether you're looking to enhance your online presence or streamline your operations, we've got you covered.
							</p>
							<p>
						Feel free to explore our services and book a meeting 
						with Pixelated Technologies to discuss how we can assist you in growing your business:
							</p>
							<ul>
								<li>Web development</li>
								<li>Social media mearketing</li>
								<li>Search engine optimization</li>
								<li>Small business modernization</li>
							</ul>
					
						</div>
					</div>
				</div>
			</div>

			{bodyContent}
			
		</div>
	);
}

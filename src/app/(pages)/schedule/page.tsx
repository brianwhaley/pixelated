"use client";

import React, { useState, useEffect } from 'react';
import { PageHeader, PageSectionHeader } from "@brianwhaley/pixelated-components";
import SocialTags from '@/app/elements/socialtags';

export default function Schedule() {
    
	const [bodyContent, setBodyContent] = useState<React.ReactNode>(null);

	useEffect(() => {
		setBodyContent(
			<div>
				<div className="meetings-iframe-container"
					data-src="https://meetings-na2.hubspot.com/pixelated?embed=true"
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
					<div suppressHydrationWarning={true} >
						<p>
						Our team of experts is here to help you focus on your customers and achieve your business goals. 
						Fill out the form below to schedule a free no-obligation review of your current website, 
						search engine optimization, content strategy, and social media presence.  
						Our review also includes honest, tailored recommendations to strengthen your 
						digital footprint, connection to your community, and ease some of your daily frustrations. 
						Or you can contact us via email or phone to discuss your needs and set up a meeting.
						</p>
						<PageSectionHeader title="Contact Information:" />
						<h3>Email: <a href="mailto:info@pixelated.tech">info@pixelated.tech</a></h3>
						<h3>Phone: (973) 710-8008</h3>
					</div>
				</div>


				<div className="grid-s1-e12"> 
					{bodyContent}
				</div>
				

				<div className="grid-s3-e8"> 
					<div>
						<SocialTags />
						<p><br /></p>
					</div>
				</div>
					
			</div>

			
		</div>
	);
}

"use client";

import React, { useState, useEffect } from 'react';
import { PageHeader, PageSectionHeader } from "@pixelated-tech/components";
import { PageSection, GridItem } from "@pixelated-tech/components";
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

		<>
			<PageHeader title="Schedule your free Digital Assessment with Pixelated" />
			<PageSection columns={1} maxWidth="768px" id="social-section">
				<GridItem>
					<div>
						<p>
						Our team of experts is here to help understand your
						current state of business and digital presence -
						web, social media, and search engine optimization -
						and review tailored solutions that help you focus
						on your customers and achieve your business goals.
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
				</GridItem>
				<GridItem columnStart={1} columnEnd={13}>
					<div suppressHydrationWarning={true}>
						{bodyContent}
					</div>
				</GridItem>
			</PageSection>
			
			<PageSection columns={12} background={"var(--secondary-color)"} id="social-section">
				<GridItem columnStart={3} columnEnd={11}>
					<SocialTags />
				</GridItem>
			</PageSection>
			<br />
		</>


	);
}

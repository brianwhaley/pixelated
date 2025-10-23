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
			<div className="row-1col" suppressHydrationWarning={true} >
				<div>
					Schedule a consult appointment with Pixelated Technologies for custom IT development work: 
					<ul>
						<li>Web development</li>
						<li>Social media mearketing</li>
						<li>Search engine optimization</li>
						<li>Small business modernization</li>
					</ul>
				</div>
				{bodyContent}
			</div>
		</div>
	);
}

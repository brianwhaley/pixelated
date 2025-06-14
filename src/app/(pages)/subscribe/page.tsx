"use client";

import React, { useState, useEffect } from 'react';
import { PageHeader } from "@/app/components/general/pixelated.general";

export default function Subscribe() {
    
	const [bodyContent, setBodyContent] = useState<React.ReactNode>(null);
	
	useEffect(() => {
		setBodyContent(
			<div>
				<script async 
					src="https://js-na2.hsforms.net/forms/embed/243048355.js" defer />
				<div 
					className="gridItem hs-form-frame" 
					data-region="na2" 
					data-form-id="f5236434-f88f-4f87-a150-54070be4494c" 
					data-portal-id="243048355" 
					suppressHydrationWarning={true} />
			</div>
		);
	}, []);
	
	return (
		<div className="section-container">
			<PageHeader title="Subscribe to Pixelated Emails" />
			<div className="row-1col" suppressHydrationWarning={true} >
				<div>
					Subscribe to the Pixelated newsletter and get regular updates on: 
					<ul>
						<li>Monthly activities</li>
						<li>New releases and custom sunglass drops</li>
						<li>Discounts and sales on existing custom sunglasses</li>
						<li>Announcements of upcoming drips and previews of their designs</li>
					</ul>
				</div>
				{bodyContent}
			</div>
		</div>
	);
}

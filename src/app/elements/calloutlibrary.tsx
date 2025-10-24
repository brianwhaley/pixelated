"use client";

import React from "react";
import { Callout } from "@brianwhaley/pixelated-components";
import { PageHeader } from "@brianwhaley/pixelated-components";



export type PageTitleType = {
	title: string
}
export function PageTitle({title}: PageTitleType ) {
	return (
		<>
			<br />
			<section className="section-bwchip textOutline" id="page-title-section">
				<PageHeader title={title} />
			</section>
		</>
	)
}



export function ContactCTA() {
	return (
		<div className="section-container">
			<div className="contactCTA">
				<div className="textOutline">
                    Discover the transformative power of epoxy flooring
					<br />
                    Where durability meets modern elegance
					<br />
					<button type="button" onClick={() => { window.location.href = '/contact'; }}>CONTACT US</button>
				</div>
			</div>
		</div>
	);
}




export function LowCountrysBest() {
	return (
			<div className="section-container">
				<div className="row-12col ">
					<div className="grid-s2-e10">
						<Callout
							style='boxed grid'
							url='https://www.votedlowcountrysbest.com/listing/palmetto-epoxy.html'
							title="Lowcountrys Best 2025"
							img='/images/logos/lowcountrysbest-logo.jpg'
							imgAlt="Lowcountrys Best 2025 Carpet & Flooring Store Silver Winner" 
							content='The Island Packet and The Beaufort Gazette created Lowcountrys Best 
								to honor the people, places, and businesses that capture what makes the 
								Lowcountry such a treasured place to live, work, and visit. 
								Congratulations to all the 2025 winners — and thank you to everyone 
								who voted. Together, youve helped showcase the very best of 
								Hilton Head and the Lowcountry, a region that continues to inspire, 
								welcome, and shine.'
							layout='horizontal' 
							imgShape='square' />
					</div>
				</div>
			</div>
	);
}
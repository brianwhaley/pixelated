"use client";

import React from "react";
import { Callout } from "@brianwhaley/pixelated-components";
import ContactCTA from "@/app/elements/contact";

export default function Services() {
	return (
		<>
			<h1>Services</h1>
			<section className="" id="services-section">
				<div className="section-container">
					<div className="row-3col ">
						<div className="gridItem ">
							<Callout
								img='https://images.squarespace-cdn.com/content/v1/63f19158f84f2b1e64ff6df7/b8642d27-d58a-4ba9-8cd5-890a28b0a5d9/Epoxy+Shining.jpg?format=2500w'
								title='Residential'
								content='Enhance your home with durable, stylish epoxy floors tailored to any room.'
								layout='vertical' 
								shape='squircle' />
						</div>
						<div className="gridItem"><Callout />
							<Callout
								img='https://images.squarespace-cdn.com/content/v1/63f19158f84f2b1e64ff6df7/a0212c2b-138f-4824-84e5-94fc9aa0af5c/Epoxy+Floor+4.jpg?format=2500w'
								title='Commercial'
								content='Upgrade your business space with sleek, resilient commercial-grade epoxy flooring.'
								layout='vertical' 
								shape='squircle' />
						</div>
						<div className="gridItem">
							<Callout
								img='https://images.squarespace-cdn.com/content/v1/63f19158f84f2b1e64ff6df7/1721875911469-JC7JDY9ZMZDRQSL56EWB/IMG_6229.jpg?format=2500w'
								title='Paver Sealing'
								content='Protect and beautify your pavers with our professional sealing services.'
								layout='vertical' 
								shape='squircle' />
						</div>
						<div className="gridItem">
							<Callout
								img='https://images.squarespace-cdn.com/content/v1/63f19158f84f2b1e64ff6df7/49e1ef9d-b3dd-4d30-8105-924b09b303b6/Driveway+Polishjpg.jpg?format=2500w'
								title='Driveway Coating'
								content='Boost curb appeal and durability with our specialized driveway coating solutions.'
								layout='vertical' 
								shape='squircle' />
						</div>
						<div className="gridItem">
							<Callout
								img='https://images.squarespace-cdn.com/content/v1/63f19158f84f2b1e64ff6df7/1679539158241-FV1IHGSIGOWZPWNOEB4Z/Seapines+1_Done.JPG?format=2500w'
								title='Epoxy Garage Floors'
								content='Transform your garage with our high-performance, spill-resistant epoxy floors.'
								layout='vertical' 
								shape='squircle' />
						</div>
						<div className="gridItem">
							<Callout
								img='https://images.squarespace-cdn.com/content/v1/63f19158f84f2b1e64ff6df7/1719085090346-HF8FLE8VBRTORW1WKZFA/image-asset.jpeg?format=2500w'
								title='Concrete Polishing'
								content='Bring out the natural beauty of your concrete with our expert polishing services.'
								layout='vertical' 
								shape='squircle' />
						</div>
					</div>
				</div>
			</section>

			<section className="section-bluechip" id="contact-section">
				<ContactCTA />
			</section>
		</>
	);
}

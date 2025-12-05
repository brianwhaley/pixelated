"use client";

import React from "react";
import * as CalloutLibrary from "@/app/elements/calloutlibrary";
import { Callout } from "@pixelated-tech/components";


export default function Services() {
	return (
		<>
			<CalloutLibrary.PageTitle title="Services" />
			
			<section className="" id="services-section">
				<div className="section-container">
					<div className="row-3col ">
						<div className="gridItem ">
							<Callout
								img='https://images.ctfassets.net/0b82pebh837v/1xi23O70o42mFz38ElKNw3/8ada068a8405e49c9389c0b0f94d87b6/Epoxy_Shining.jpg?fm=webp'
								title='Residential'
								content='Enhance your home with durable, stylish epoxy floors tailored to any room.'
								layout='vertical' 
								imgShape='squircle' />
						</div>
						<div className="gridItem">
							<Callout
								img='https://images.ctfassets.net/0b82pebh837v/6oA0GDDEJSkZRPy0PhCBSl/44c7989017c8f08c9fe7abc7bd732486/Epoxy_Floor_4.jpg?fm=webp'
								title='Commercial'
								content='Upgrade your business space with sleek, resilient commercial-grade epoxy flooring.'
								layout='vertical' 
								imgShape='squircle' />
						</div>
						<div className="gridItem">
							<Callout
								img='https://images.ctfassets.net/0b82pebh837v/4XSmKyMglzHAGa3PrDrnyt/b42f90a173ca7d860acadbb0defa9eeb/IMG_6229.jpg?fm=webp'
								title='Paver Sealing'
								content='Protect and beautify your pavers with our professional sealing services.'
								layout='vertical' 
								imgShape='squircle' />
						</div>
						<div className="gridItem">
							<Callout
								img='https://images.ctfassets.net/0b82pebh837v/70SC4FojTqV1pVl0vTCbXH/88217839618887f3b73088a9f3f86ff9/Driveway_Polishjpg.jpg?fm=webp'
								title='Driveway Coating'
								content='Boost curb appeal and durability with our specialized driveway coating solutions.'
								layout='vertical' 
								imgShape='squircle' />
						</div>
						<div className="gridItem">
							<Callout
								img='https://images.ctfassets.net/0b82pebh837v/39vkbzDrlvLtK3fF86T7Zy/7b21429c376a679dd364cd56685b00f2/Seapines_1_Done.JPG?fm=webp'
								title='Epoxy Garage Floors'
								content='Transform your garage with our high-performance, spill-resistant epoxy floors.'
								layout='vertical' 
								imgShape='squircle' />
						</div>
						<div className="gridItem">
							<Callout
								img='https://images.ctfassets.net/0b82pebh837v/6DVnMXkegjtf8hJoPoj3PJ/b2270332d1136dc6a559c7df8cbe70b3/image-asset.jpeg?fm=webp'
								title='Concrete Polishing'
								content='Bring out the natural beauty of your concrete with our expert polishing services.'
								layout='vertical' 
								imgShape='squircle' />
						</div>
					</div>
				</div>
			</section>

			<section className="section-bluechip" id="contact-section">
				<CalloutLibrary.ContactCTA />
			</section>
		</>
	);
}

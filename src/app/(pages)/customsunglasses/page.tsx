"use client";

import React, { useState } from "react";
import { PageHeader } from "@/app/components/general/pixelated.general";
import { Callout, CalloutHeader, CalloutSmall } from "@brianwhaley/pixelated-components";
import { Modal, handleModalOpen } from "@brianwhaley/pixelated-components";

export default function CustomSunglasses() {
	const [modalContent, setModalContent] = useState<React.ReactNode>();
	const handleImageClick = (event: MouseEvent, url: string) => {
		const myContent = <img src={url} alt="Modal Image" />;
		setModalContent(myContent);
		handleModalOpen(event);
  	};
	return (
		<>
			<section id="customs-section">
				<div className="section-container">
					<PageHeader title="Custom Painted Sunglasses by BTW" />
					<div className="row-4col">
						<div className="gridItem">
							<Callout
								url='/customsgallery'
								img='/images/customs/btw-customs.jpg'
								title='Custom Sunglass Gallery' 
								content='Flip through some examples of my work customizing Oakley sunglasses and eyeglasses.'
								layout='vertical' 
								shape="round" />
						</div><div className="gridItem">
							<Callout
								// url="https://www.ebay.com/sch/i.html?sid=btw73" 
								url="/ebay" 
								img='/images/logos/ebay-logo.png'
								title='Customs, BTW on eBay' 
								content='View some cutomized Oakley sunglasses available for purchase on eBay.'
								layout='vertical' 
								shape='round' />
						</div><div className="gridItem">
							<Callout
								// url="https://www.ebay.com/sch/i.html?sid=btw73" 
								url="/requests" 
								img='/images/customs/btw-signature.jpg'
								title='Customs Request List' 
								content='Sharing my backlog of requests for upcoming customized sunglasses'
								layout='vertical' 
								shape='round' />
						</div><div className="gridItem">
							<Callout
								url='/mycustoms'
								img='/images/customs/btw-collection.jpg'
								title='My Personal Collection' 
								content='This is a gallery of my own personal collection - customs from other OakleyForum members, my own customs for me, and some special additions (Elite pairs and original Mumbos).'
								layout='vertical' 
								shape='round' />
						</div>
					</div>
				</div>
			</section>

			<section className="section" id="styles-section">
				<div className="section-container">
					<CalloutHeader title="Color Styles" />
					<div className="row-4col">
						<div className="gridItem">
							<Callout
								img='/images/customs/camo-marble.jpg' 
								title='Marbles' 
								content='Customized glasses with mottled streaks of color.  
									Custom marbled paint can be done with a number of complimentary colors, or one single color.' 
								layout='vertical' 
								shape='round' 
								alt="Marbles" />
						</div><div className="gridItem">
							<Callout
								// url='https://farm66.static.flickr.com/65535/50652292218_3df2a75475_b.jpg'
								img='/images/customs/blue-splatter-3.jpg'
								title='Splatters'
								content='This style is customized with a splash of colors.  
									Custom splatter paint can be one color, or a combination of complimentary colors.  
									It can also be small or large, thin or thick, dense or sparse. '
								layout='vertical' 
								shape='round' />
						</div><div className="gridItem">
							<Callout
								// url='https://farm66.static.flickr.com/65535/51062706291_097827a69d_b.jpg'
								img='/images/customs/neon-drip.jpg'
								title='Drips'
								content='This style is customized with color dripped all over the frame.  
									Dripping paint can be one color, or a combination of complimentary colors.  
									It can also be done dense or sparse. '
								layout='vertical' 
								shape='round' />
						</div><div className="gridItem">
							<Callout
								// url='https://farm66.static.flickr.com/65535/50652294433_b48c9ef0e4_b.jpg'
								img='/images/customs/repair-nose.jpg'
								title='Repairs'
								content='Reinforced with metal strips and glued back together.  
									A new paint job is recommended after a repair to ensure color match.'
								layout='vertical' 
								shape='round' />
						</div>
					</div>
				</div>
			</section>

			<section className="section" id="examples-section">
				<div className="section-container">
					<CalloutHeader title="Color Examples" />
					<div className="row-6col">
							
						<div className="gridItem">
							<CalloutSmall url="https://farm66.static.flickr.com/65535/50797219348_a7f5b18dd5_b.jpg" imgclick={handleImageClick} img="/images/customs/black-white-splatter.jpg" alt="Black White Splatter" />
						</div>
						<div className="gridItem">
							<CalloutSmall url="https://farm66.static.flickr.com/65535/50797971781_69834d1b6f_b.jpg" imgclick={handleImageClick} img="/images/customs/brown-splatter.jpg" alt="Brown Splatter" />
						</div>
						<div className="gridItem">
							<CalloutSmall url="https://farm66.static.flickr.com/65535/50652292218_3df2a75475_b.jpg" imgclick={handleImageClick} img="/images/customs/blue-splatter-3.jpg" alt="Blue Splatter" />
						</div>
						<div className="gridItem">
							<CalloutSmall url="https://farm66.static.flickr.com/65535/50653036651_8cc8ec0a1c_b.jpg" imgclick={handleImageClick} img="/images/customs/camo-splatter-2.jpg" alt="Camo Splatter" />
						</div>
						<div className="gridItem">
							<CalloutSmall url="https://farm66.static.flickr.com/65535/50756659327_c4ca8fdb52_b.jpg" imgclick={handleImageClick} img="/images/customs/gold-silver-splatter-2.jpg" alt="Gold Silver Splatter" />
						</div>
						<div className="gridItem">
							<CalloutSmall url="https://farm66.static.flickr.com/65535/50685248287_3e8ebe5201_b.jpg" imgclick={handleImageClick} img="/images/customs/green-splatter.jpg" alt="Green Splatter" />
						</div>

						<div className="gridItem">
							<CalloutSmall url="https://farm66.static.flickr.com/65535/50664254938_bb746893d0_b.jpg" imgclick={handleImageClick} img="/images/customs/neon-splatter.jpg" alt="Neon Splatter" />
						</div>
						<div className="gridItem">
							<CalloutSmall url="https://farm66.static.flickr.com/65535/50653037331_449ba8cece_b.jpg" imgclick={handleImageClick} img="/images/customs/blue-marble.jpg" alt="Blue Marble" />
						</div>
						<div className="gridItem">
							<CalloutSmall url="https://farm66.static.flickr.com/65535/50653126162_1479ff31f5_b.jpg" imgclick={handleImageClick} img="/images/customs/camo-marble.jpg" alt="Camo Marble" />
						</div>
						<div className="gridItem">
							<CalloutSmall url="https://farm66.static.flickr.com/65535/50755818913_37cdca4924_b.jpg" imgclick={handleImageClick} img="/images/customs/neon-marble.jpg" alt="Neon Marble" />
						</div>
						<div className="gridItem">
							<CalloutSmall url="https://farm66.static.flickr.com/65535/50920141601_54c8c15e8f_b.jpg" imgclick={handleImageClick} img="/images/customs/neon-marble-clear.jpg" alt="Neon Marble Clear" />
						</div>
						<div className="gridItem">
							<CalloutSmall url="https://farm66.static.flickr.com/65535/50652294433_b48c9ef0e4_b.jpg'" imgclick={handleImageClick} img="/images/customs/repair-nose.jpg" alt="Repair Nose" />
						</div>

						<div className="gridItem">
							<CalloutSmall url="https://farm66.static.flickr.com/65535/51202265371_9830735bb9_b.jpg" imgclick={handleImageClick} img="/images/customs/blue-drip.jpg" alt="Blue Drip" />
						</div><div className="gridItem">
							<CalloutSmall url="https://farm66.static.flickr.com/65535/51152648154_918278d13f_b.jpg" imgclick={handleImageClick} img="/images/customs/blue-clear-drip.jpg" alt="Blue Clear Drip" />
						</div><div className="gridItem">
							<CalloutSmall url="https://farm66.static.flickr.com/65535/50961082721_cb3bc6daf7_b.jpg" imgclick={handleImageClick} img="/images/customs/camo-drip-2.jpg" alt="Camo Drip" />
						</div><div className="gridItem">
							<CalloutSmall url="https://farm66.static.flickr.com/65535/51152648149_1194b3d58d_b.jpg" imgclick={handleImageClick} img="/images/customs/green-gold-drip-2.jpg" alt="Green Gold Drip" />
						</div><div className="gridItem">
							<CalloutSmall url="https://farm66.static.flickr.com/65535/51062790717_0e1496d383_b.jpg" imgclick={handleImageClick} img="/images/customs/red-drip.jpg" alt="Red Drip" />
						</div><div className="gridItem">
							<CalloutSmall url="https://farm66.static.flickr.com/65535/51203329450_38d7a8bf74_b.jpg" imgclick={handleImageClick} img="/images/customs/red-white-blue-drip.jpg" alt="Red White Blue Drip" />
						</div>

					</div>
				</div>
			</section>

			<Modal modalContent={modalContent} />

		</>
	);
}

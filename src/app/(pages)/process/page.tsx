"use client";

import React from 'react';
import { PageHeader } from "@/app/components/general/pixelated.general";
import { Callout } from "@brianwhaley/pixelated-components";
import { Timeline } from "@brianwhaley/pixelated-components";

export default function Process() {
    
	const timelineData = [
		{ 
			title: "Gather Information",
			content: `Connect directly with you, find out what is working, what is not.
				What do you wish you could spend less time doing? 
				What would make your company more efficient?
				What would make your customers happier with your service?
				Once we identify these, we can put together a Strategy tailored just for you.`,
			image: "/images/process/gather-info.png",
			direction: "left"
		},{ 
			title: "Build our Strategy",
			content: `Document and share a plan that includes all the information we gathered.
				It will also include an ananlysis of your competitors, 
				technology recommendations for search engine optimization, 
				review metrics of success and how they will be gathered, 
				how to manage advertising and marketing (digital and traditional media)
				and a social media analysis and plan. `,
			image: "/images/process/strategy.png",
			direction: "right"
		},{ 
			title: "Implement",
			content: `This is where the action happens.
				We will break down the details of the strategy to implement the plan.
				Out objective here is to improve the results for the customer and 
				make the health of your company and its colleagues a better place to work.`,
			image: "/images/process/implement.png",
			direction: "left"
		},{ 
			title: "Measure Outcomes",
			content: `It is important to know where you are, and where you want to be, 
			to come up with a plan on how to get there. The right measurements will show how 
			Pixelated Technologies is helping your customers and you achieve the right outcomes.  `,
			image: "/images/process/measure.png",
			direction: "right"
		},{ 
			title: "Refine Results",
			content: `Once the results start coming in, we may need to make adjustments.  
			Advertise in different social media outlets, target a different geographic area, 
			measure different outcomes, or change the strategy.  Small and simple changes
			will put you right back on course.`,
			image: "/images/process/optimize.png",
			direction: "left"
		},{ 
			title: "Support",
			content: `Once the Digital and Social Media Machine is working for you, 
				we will continue to support you and your customers with the latest technology and
				updates to keep you on course.  We can help you expand your content, 
				create posts for social media, and help you expand your marketing into new areas. `,
			image: "/images/process/support.png",
			direction: "right"
		}
	];

	return (

		<section id="products-section">
			<div className="section-container">
				<PageHeader title="The Pixelated Technologies Process" />
				<div className="row-12col">
					<div className="grid-s3-e8"> 
						Pixelated Technologies offers a proven process 
						to get results for you and your customers - gather information, 
						build a strategy, implement, measure outcomes, 
						refine results, and support.
					</div>
				</div>
				<br />
				<Timeline timelineData={timelineData} />

				<div className="row-12col">
					<div className="grid-s3-e8">
						<Callout
							url='schedule'
							img='/images/icons/calendar-icon.jpg'
							title='Lets Get Started'
							layout='horizontal2'
							content='Schedule a consultation appointment with Pixelated Technologies 
							to get  you started with custom IT development work - web development, 
							social media marketing, search engine optimization, 
							and small business modernization.'/>
					</div>
				</div>

			</div>
		</section>
	);
}

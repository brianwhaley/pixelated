"use client";

import { PageHeader } from "@/app/components/general/pixelated.general";
import { Callout } from "@brianwhaley/pixelated-components";

export default function HomeDesign() {
    
	return (
		<div className="section-container">
			<PageHeader title="Pixelated Home Design & Remodeling" />
			
			<div className="row-4col">
				<div className="gridItem" />
				<Callout
					url='/designgallery' 
					img='https://farm66.static.flickr.com/65535/54513221006_5d2117cdf3_b.jpg'
					title='Design Gallery'
					content='Check out photographs from some of our recent home redesign projects, 
						including homes from Morristown NJ, Denville NJ, and Bluffton SC. 
						We love to update homes, including kitchens, bathrooms, bedrooms, 
						color schemes, artwork, garages, patios, decks, and more. '
					layout='vertical' 
					shape='squircle' />
				<Callout
					url='https://www.instagram.com/maryannsarao/' 
					img='/images/logos/instagram-logo.jpg'
					title='Instagram'
					content='Check out updates on new and existing projects, industry trends, news, 
						promotional materials, and more.'
					layout='vertical' 
					shape='squircle' />
				<div className="gridItem" />
			</div>
		</div>
	);
}

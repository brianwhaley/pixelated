"use client";

import { Callout, CalloutHeader } from "@brianwhaley/pixelated-components";

export default function Services() {
    
	return (
		<div className="section-container">
			<CalloutHeader title="Pixelated Products & Services" />
			<div className="row-4col">
				<Callout
					url="/workoverview" 
					img='images/circuitboard.jpg'
					title='Web Development'
					content='Passionate Web Technologist,
                        Digital Transformation Professional, User Experience Champion.
						I get excited watching companies and products grow and thrive.'
					layout='vertical' />
				<Callout
					url='/photography' 
					img='https://farm6.staticflickr.com/5682/21652998256_7c5d0ce495_b.jpg'
					title='Stock Photography'
					content='I have converted my passion of Landscape, Macro, and Travel Photography 
						into a budding Stock Photography Portfolio.  Check out my work on 
						iStockPhoto or ShutterStock, or see my books on Blurb or Shutterfly. '
					layout='vertical' />
				<Callout
					url='/customsunglasses' 
					img='/images/customs/blue-splatter-3.jpg'
					title='Custom Sunglasses'
					content='I refurbish, repair, and customize Oakley sunglasses. 
						I enjoy providing custom paint jobs with a splash of colors - 
						marbled, splattered, and dripped. Custom paint can be one color, 
						or a combination of complimentary colors. Patterns can also be small or large, 
						thin or thick, dense or sparse.  As the customer, you choose!'
					layout='vertical' />
				<Callout
					url='/homedesign' 
					img='https://farm66.static.flickr.com/65535/54513221006_5d2117cdf3_b.jpg'
					title='Home Design & Remodeling'
					content='We design a holistic plan for interior and exterior design of homes,
						including kitchens, bathrooms, bedrooms, color schemes, artwork, garages, patios, decks, and more'
					layout='vertical' />
			</div>
		</div>
	);
}

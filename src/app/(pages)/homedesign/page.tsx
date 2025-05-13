"use client";

import { Callout, CalloutHeader } from "@brianwhaley/pixelated-components";

export default function HomeDesign() {
    
	return (
		<div className="section-container">
			<CalloutHeader title="Pixelated Home Design & Remodeling" />
			
			<div className="row-4col">
				<div className="gridItem" />
				<Callout
					url='/designgallery' 
					img='https://farm66.static.flickr.com/65535/54513221006_5d2117cdf3_b.jpg'
					title='Design Gallery'
					content='I refurbish, repair, and customize Oakley sunglasses. I enjoy providing custom paint jobs with a splash of colors - marbled, splattered, and dripped. Custom paint can be one color, or a combination of complimentary colors. Patterns can also be small or large, thin or thick, dense or sparse.  As the customer, you choose!'
					layout='vertical' 
					shape='squircle' />
				<Callout
					url='https://www.instagram.com/maryannsarao/' 
					img='/images/logos/instagram-logo.jpg'
					title='Instagram'
					content='Technologist,
                        Digital Transformation Professional, User Experience Champion,
                        Landscape and Macro Photographer, Avid World Traveler,
                        Advanced Open Water Scuba Diver, Enthusiast of Home-Cooked Food'
					layout='vertical' 
					shape='squircle' />
				<div className="gridItem" />
			</div>
		</div>
	);
}

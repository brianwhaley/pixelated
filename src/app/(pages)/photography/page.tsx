"use client";

import { Callout, CalloutHeader } from "@brianwhaley/pixelated-components";

export default function Photography() {
    
	return (
		<div className="section-container">
			<CalloutHeader title="Pixelated Photography" />
			<div className="row-12col">
				<div className="grid-s3-e6">
					<Callout
						url="/photogallery"
						img='https://farm6.staticflickr.com/5682/21652998256_7c5d0ce495_b.jpg'
						title='Photo Gallery'
						content='Passionate Web Technologist,
							Digital Transformation Professional, User Experience Champion.
							I get excited watching companies and products grow and thrive.'
						layout='horizontal' />
				</div>
			</div>
			<div className="row-4col">
				<Callout
					img='/images/logos/istock-logo.jpg'
					title='iStockPhoto'
					content='I have converted my passion of Landscape, Macro, and Travel Photography 
						into a budding Stock Photography Portfolio.  Check out my work on 
						iStockPhoto or ShutterStock, or see my books on Blurb or Shutterfly. '
					layout='vertical' 
					shape='squircle' />
				<Callout
					url='/customsunglasses' 
					img='/images/logos/shutterstock-logo.png'
					title='ShutterStock'
					content='I refurbish, repair, and customize Oakley sunglasses. I enjoy providing custom paint jobs with a splash of colors - marbled, splattered, and dripped. Custom paint can be one color, or a combination of complimentary colors. Patterns can also be small or large, thin or thick, dense or sparse.  As the customer, you choose!'
					layout='vertical' 
					shape='squircle' />
				<Callout
					img='/images/logos/blurb-logo.png'
					title='Blurb'
					content='Technologist,
                        Digital Transformation Professional, User Experience Champion,
                        Landscape and Macro Photographer, Avid World Traveler,
                        Advanced Open Water Scuba Diver, Enthusiast of Home-Cooked Food'
					layout='vertical' 
					shape='squircle' />
				<Callout
					img='/images/logos/shutterfly-logo.png'
					title='ShutterFly'
					content='Technologist,
                        Digital Transformation Professional, User Experience Champion,
                        Landscape and Macro Photographer, Avid World Traveler,
                        Advanced Open Water Scuba Diver, Enthusiast of Home-Cooked Food'
					layout='vertical' 
					shape='squircle' />
			</div>
		</div>
	);
}

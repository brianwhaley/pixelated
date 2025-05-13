"use client";

import { Callout, CalloutHeader } from "@brianwhaley/pixelated-components";

export default function Work() {
    
	return (
		<div className="section-container">
			<CalloutHeader title="Work Overview" />
			<div className="row-12col">
				<div className="grid-s3-e6">
					<Callout
						url="/workportfolio"
						img='images/circuitboard.jpg'
						title='Work Portfolio'
						content='Passionate Web Technologist,
							Digital Transformation Professional, User Experience Champion.
							I get excited watching companies and products grow and thrive.'
						layout='horizontal' />
				</div>
			</div>
			<div className="row-3col">
				<Callout
					url="/resume" 
					img='/images/logos/resume-icon.png'
					title='Resume'
					content='I have converted my passion of Landscape, Macro, and Travel Photography 
						into a budding Stock Photography Portfolio.  Check out my work on 
						iStockPhoto or ShutterStock, or see my books on Blurb or Shutterfly. '
					layout='vertical' 
					shape='squircle' />
				<Callout
					url='/readme' 
					img='/images/logos/readme-icon.png'
					title='Readme'
					content='I refurbish, repair, and customize Oakley sunglasses. I enjoy providing custom paint jobs with a splash of colors - marbled, splattered, and dripped. Custom paint can be one color, or a combination of complimentary colors. Patterns can also be small or large, thin or thick, dense or sparse.  As the customer, you choose!'
					layout='vertical' 
					shape='squircle' />
				<Callout
					url='https://www.linkedin.com/in/brianwhaley' 
					img='/images/logos/linkedin-logo.png'
					title='LinkedIn'
					content='I refurbish, repair, and customize Oakley sunglasses. I enjoy providing custom paint jobs with a splash of colors - marbled, splattered, and dripped. Custom paint can be one color, or a combination of complimentary colors. Patterns can also be small or large, thin or thick, dense or sparse.  As the customer, you choose!'
					layout='vertical' 
					shape='squircle' />
				<Callout
					url='http://twitter.com/brianwhaley' 
					img='/images/logos/x-logo.png'
					title='X (Twitter)'
					content='I refurbish, repair, and customize Oakley sunglasses. I enjoy providing custom paint jobs with a splash of colors - marbled, splattered, and dripped. Custom paint can be one color, or a combination of complimentary colors. Patterns can also be small or large, thin or thick, dense or sparse.  As the customer, you choose!'
					layout='vertical' 
					shape='squircle' />
				<Callout
					url='https://www.goodreads.com/review/list/49377228-brian-whaley?shelf=books-for-work' 
					img='/images/logos/goodreads-logo.png'
					title='Goodreads'
					content='I refurbish, repair, and customize Oakley sunglasses. I enjoy providing custom paint jobs with a splash of colors - marbled, splattered, and dripped. Custom paint can be one color, or a combination of complimentary colors. Patterns can also be small or large, thin or thick, dense or sparse.  As the customer, you choose!'
					layout='vertical' 
					shape='squircle' />
				<Callout
					url="/recipes" 
					img='images/pizza-gaine.jpg'
					title='Family Recipes'
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

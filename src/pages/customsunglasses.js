import React, { Component, Fragment } from "react";
import Callout, { CalloutHeader, CalloutRoundTiny } from "../components/pixelated.callout.js";

export default class CustomSunglasses extends Component {
	render () {
		return (
			<Fragment>

				<section id="intro-section">
					<div className="section-container">
						<CalloutHeader title="Custom Painted Sunglasses by BTW" />
						<div className="row">
							<div className="grid12">
								<Callout
									url='gallery.html?tag=customsunglasses'
									img='images/customs/btw-customs.jpg'
									title='Custom Oakleys Photo Gallery' 
									content='Flip through some examples of my work customizing Oakley sunglasses and eyeglasses.'
									direction='horizontal'
									columnCount={2}/>
								<Callout
									url="https://www.ebay.com/sch/i.html?sid=btw73" 
									img='images/logos/ebay-logo.png'
									title='Customs, BTW on eBay' 
									content='View some cutomized Oakley sunglasses available for purchase on eBay.'
									direction='horizontal'
									columnCount={2}/>
							</div>
						</div>
					</div>
				</section>


				<section className="section" id="styles-section">
					<div className="section-container">
						<div className="row">
							<div className="callout-body grid12">
								<div className="grid12 centered">
									<CalloutHeader title="Color Styles" />
									<Callout
										// url='https://farm66.static.flickr.com/65535/50653126162_1479ff31f5_b.jpg'
										img='images/customs/camo-marble.jpg'
										title='Marbles'
										columnCount='4'
										content='Customized glasses with mottled streaks of color.  
										Custom marbled paint can be done with a number of complimentary colors, or one single color.'/>
									<Callout
										// url='https://farm66.static.flickr.com/65535/50652292218_3df2a75475_b.jpg'
										img='images/customs/blue-splatter-3.jpg'
										title='Splatters'
										columnCount='4'
										content='This style is customized with a splash of colors.  
										Custom splatter paint can be one color, or a combination of complimentary colors.  
										It can also be small or large, thin or thick, dense or sparse. '/>
									<Callout
										// url='https://farm66.static.flickr.com/65535/50652292218_3df2a75475_b.jpg'
										img='images/customs/neon-drip.jpg'
										title='Drips'
										columnCount='4'
										content='This style is customized with color dripped all over the frame.  
										Dripping paint can be one color, or a combination of complimentary colors.  
										It can also be done dense or sparse. '/>
									<Callout
										// url='https://farm66.static.flickr.com/65535/50652294433_b48c9ef0e4_b.jpg'
										img='images/customs/repair-nose.jpg'
										title='Repairs'
										columnCount='4'
										content='Reinforced with metal strips and glued back together.  
										A new paint job is recommended after a repair to ensure color match.  '/>
								</div>
							</div>
						</div>
					</div>
				</section>


				<section className="section" id="styles-section">
					<div className="section-container">
						<div className="row">
							<div className="callout-body grid12">
								<div className="grid12 centered">
									<CalloutHeader title="Color Examples" />

									<div className="row">
										<div className="column grid6">
											<CalloutRoundTiny url="https://farm66.static.flickr.com/65535/50797219348_a7f5b18dd5_b.jpg" img="images/customs/black-white-splatter.jpg" title="Black White Splatter" alt="Black White Splatter" gridSize="4" />
											<CalloutRoundTiny url="https://farm66.static.flickr.com/65535/50797971781_69834d1b6f_b.jpg" img="images/customs/brown-splatter.jpg" title="Brown Splatter" alt="Brown Splatter" gridSize="4" />
											<CalloutRoundTiny url="https://farm66.static.flickr.com/65535/50652292218_3df2a75475_b.jpg" img="images/customs/blue-splatter-3.jpg" title="Blue Splatter" alt="Blue Splatter" gridSize="4" />
										</div>
										<div className="column grid6">
											<CalloutRoundTiny url="https://farm66.static.flickr.com/65535/50653036651_8cc8ec0a1c_b.jpg" img="images/customs/camo-splatter-2.jpg" title="Camo Silver Splatter" alt="Camo Splatter" gridSize="4" />
											<CalloutRoundTiny url="https://farm66.static.flickr.com/65535/50756659327_c4ca8fdb52_b.jpg" img="images/customs/gold-silver-splatter-2.jpg" title="Gold Silver Splatter" alt="Gold Silver Splatter" gridSize="4" />
											<CalloutRoundTiny url="https://farm66.static.flickr.com/65535/50685248287_3e8ebe5201_b.jpg" img="images/customs/green-splatter.jpg" title="Green Splatter" alt="Green Splatter" gridSize="4" />
										</div>
									</div>

									<div className="row">
										<div className="column grid6">
											<CalloutRoundTiny url="https://farm66.static.flickr.com/65535/50664254938_bb746893d0_b.jpg" img="images/customs/neon-splatter.jpg" title="Neon Splatter" alt="Neon Splatter" gridSize="4" />
											<CalloutRoundTiny url="https://farm66.static.flickr.com/65535/50653037331_449ba8cece_b.jpg" img="images/customs/blue-marble.jpg" title="Blue Marble" alt="Blue Marble" gridSize="4" />
											<CalloutRoundTiny url="https://farm66.static.flickr.com/65535/50653126162_1479ff31f5_b.jpg" img="images/customs/camo-marble.jpg" title="Camo Marble" alt="Camo Marble" gridSize="4" />
										</div>
										<div className="column grid6">
											<CalloutRoundTiny url="https://farm66.static.flickr.com/65535/50755818913_37cdca4924_b.jpg" img="images/customs/neon-marble.jpg" title="Neon Marble" alt="Neon Marble" gridSize="4" />
											<CalloutRoundTiny url="https://farm66.static.flickr.com/65535/50652294433_b48c9ef0e4_b.jpg'" img="images/customs/repair-nose.jpg" title="Repair Nose" alt="Repair Nose" gridSize="4" />
										</div>
									</div>

								</div>
							</div>
						</div>
					</div>
				</section>


			</Fragment>
		);
	}
}

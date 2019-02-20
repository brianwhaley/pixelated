import React, { Component } from 'react';

import CalloutRoundSm from './callout-round-sm';
import CalloutHeader from './callout-header';

class Photography extends Component {
    render() {
        return (


            <div>
		
			<div class="page-content-section" id="social-links-section">
			
				<div class="content-container callout">

					<CalloutHeader title="Photography Links" />
					
					<div class="row grid8 push2">
					
						<div class="grid6">
							<div class="grid4fix pad"></div>
							<CalloutRoundSm url="https://500px.com/brianwhaley" img="images/500px-logo.png" title="500px" />
							<CalloutRoundSm url="http://www.flickr.com/photos/brianwhaley/" img="images/flickr-logo.png" title="Flickr" />
						</div>
						
						<div class="grid6">
							<CalloutRoundSm url="https://secure.istockphoto.com/portfolio/brianwhaley" img="images/istock-logo.jpg" title="iStock Photo" />
							<CalloutRoundSm url="http://www.shutterstock.com/g/brianwhaley" img="images/shutterstock-logo.png" title="Shutter Stock" />
							<div class="grid4fix pad"></div>
						</div>
						
					</div>
					
					<div class="row grid8 push2">
						
						<div class="grid6">
							<div class="grid4fix pad"></div>
							<CalloutRoundSm url="https://www.instagram.com/pixelated.views/" img="images/instagram-logo.jpg" title="Instagram" />
							<CalloutRoundSm url="http://www.blurb.com/user/brianwhaley" img="images/blurb-logo.png" title="Blurb" />
						</div>
						
						<div class="grid6">
							<CalloutRoundSm url="http://brianwhaley.shutterfly.com" img="images/shutterfly-logo.jpg" title="Shutterfly" />
							<CalloutRoundSm url="http://twitter.com/pixelatedviews" img="images/twitter-logo.png" title="Twitter" />
							<div class="grid4fix pad"></div>
						</div>
						
					</div>
							
				</div>
				
			</div>



			<div class="page-content-section" id="social-cards-section">
				<div class="content-container">

					<CalloutHeader title="Photography Posts" />

					<div class="row">	
						<div id="socialCards" class="column callout grid12">
							<div class="callout-body">
								<div class="grid12">
									<div class="masonry" id="photocards">
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

            </div>
            

        );
    }
}

export default Photography;
import React, { Component } from 'react';

import CalloutRoundSm from './callout-round-sm';
import CalloutHeader from './callout-header';

class Photography extends Component {
    render() {
        return (


            <div>
		
			<div className="page-content-section" id="social-links-section">
			
				<div className="content-container callout">

					<CalloutHeader title="Photography Links" />
					
					<div className="row grid8 push2">
					
						<div className="grid6">
							<div className="grid4fix pad"></div>
							<CalloutRoundSm url="https://500px.com/brianwhaley" img="images/500px-logo.png" title="500px" />
							<CalloutRoundSm url="http://www.flickr.com/photos/brianwhaley/" img="images/flickr-logo.png" title="Flickr" />
						</div>
						
						<div className="grid6">
							<CalloutRoundSm url="https://secure.istockphoto.com/portfolio/brianwhaley" img="images/istock-logo.jpg" title="iStock Photo" />
							<CalloutRoundSm url="http://www.shutterstock.com/g/brianwhaley" img="images/shutterstock-logo.png" title="Shutter Stock" />
							<div className="grid4fix pad"></div>
						</div>
						
					</div>
					
					<div className="row grid8 push2">
						
						<div className="grid6">
							<div className="grid4fix pad"></div>
							<CalloutRoundSm url="https://www.instagram.com/pixelated.views/" img="images/instagram-logo.jpg" title="Instagram" />
							<CalloutRoundSm url="http://www.blurb.com/user/brianwhaley" img="images/blurb-logo.png" title="Blurb" />
						</div>
						
						<div className="grid6">
							<CalloutRoundSm url="http://brianwhaley.shutterfly.com" img="images/shutterfly-logo.jpg" title="Shutterfly" />
							<CalloutRoundSm url="http://twitter.com/pixelatedviews" img="images/twitter-logo.png" title="Twitter" />
							<div className="grid4fix pad"></div>
						</div>
						
					</div>
							
				</div>
				
			</div>



			<div className="page-content-section" id="social-cards-section">
				<div className="content-container">

					<CalloutHeader title="Photography Posts" />

					<div className="row">	
						<div id="socialCards" className="column callout grid12">
							<div className="callout-body">
								<div className="grid12">
									<div className="masonry" id="photocards">
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
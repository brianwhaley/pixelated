import React, { Component } from 'react';

import CalloutHeader from './callout-header';
import CalloutRoundSm from './callout-round-sm';
import SocialCards from './socialcards';

class Photography extends Component {
    render() {

		let myState = {
			SOOpx: {
				url: 'https://500px.com/brianwhaley/rss',
			},
			shutterfly: {
				url: 'https://cmd.shutterfly.com/commands/format/rss?site=brianwhaley&page=brianwhaley'
			},
			twitter: {
				url: 'https://twitrss.me/twitter_user_to_rss/?user=pixelatedviews'
			}
		};

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
                                        <SocialCards props={myState}></SocialCards>
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
import React, { Component, Fragment } from "react";
import { CalloutHeader, CalloutRoundSm} from "@brianwhaley/pixelated-components/dist/index";
import "@brianwhaley/pixelated-components/dist/css/pixelated.callout.css";
import { SocialCards } from "@brianwhaley/pixelated-components/dist/index";
import "@brianwhaley/pixelated-components/dist/css/pixelated.socialcard.css";

export default class Photography extends Component {
	render () {
		const myState = {
			SOOpx: { url: "https://500px.com/brianwhaley/rss" },
			shutterfly: { url: "https://cmd.shutterfly.com/commands/format/rss?site=brianwhaley&page=brianwhaley" },
			twitter: { url: "https://twitrss.me/twitter_user_to_rss/?user=pixelatedviews" }
		};

		return (
			<Fragment>

				<section id="social-links-section">
					<div className="section-container callout">
						<div className="row">
							<div className="column grid12">
								<CalloutHeader title="Photography Links" />
							</div>
						</div>
						<div className="row grid8 push2">
							<div className="grid6">
								<div className="grid4fix pad"></div>
								<CalloutRoundSm url="https://500px.com/brianwhaley" img="images/logos/500px-logo.png" title="500px" />
								<CalloutRoundSm url="http://www.flickr.com/photos/brianwhaley/" img="images/logos/flickr-logo.png" title="Flickr" />
							</div>
							<div className="grid6">
								<CalloutRoundSm url="https://secure.istockphoto.com/portfolio/brianwhaley" img="images/logos/istock-logo.jpg" title="iStock Photo" />
								<CalloutRoundSm url="http://www.shutterstock.com/g/brianwhaley" img="images/logos/shutterstock-logo.png" title="Shutter Stock" />
								<div className="grid4fix pad"></div>
							</div>
						</div>
						<div className="row grid8 push2">
							<div className="grid6">
								<div className="grid4fix pad"></div>
								<CalloutRoundSm url="https://www.instagram.com/pixelated.views/" img="images/logos/instagram-logo.jpg" title="Instagram" />
								<CalloutRoundSm url="http://www.blurb.com/user/brianwhaley" img="images/logos/blurb-logo.png" title="Blurb" />
							</div>
							<div className="grid6">
								<CalloutRoundSm url="http://brianwhaley.shutterfly.com" img="images/logos/shutterfly-logo.jpg" title="Shutterfly" />
								<CalloutRoundSm url="http://twitter.com/pixelatedviews" img="images/logos/twitter-logo.png" title="Twitter" />
								<div className="grid4fix pad"></div>
							</div>
						</div>
					</div>
				</section>

				<section id="social-cards-section">
					<div className="section-container">
						<CalloutHeader title="Photography Posts" />
						<div className="row">
							<div id="socialCards" className="column callout grid12">
								<div className="callout-body">
									<div className="grid12">
										<div className="masonry" id="photocards">
											<SocialCards sources={myState}></SocialCards>
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

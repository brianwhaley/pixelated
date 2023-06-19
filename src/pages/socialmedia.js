import React, { Component, Fragment } from "react";
import { CalloutHeader, CalloutRoundSm } from "@brianwhaley/pixelated-components/dist/index";
import { SocialCards } from "@brianwhaley/pixelated-components/dist/index";

const mySources = {
	blog: { url: "https://blog.pixelated.tech/feed/", iconSrcAlt: "Pixelated Views Blog Post" },
	etsy: { url: "https://www.etsy.com/people/bwhaley73/favorites/items.rss" },
	/* foursquare: { url: 'https://feeds.foursquare.com/history/LZSXBIJMSBHI5EQXV1GTQOVQW5XRJ0FP.rss' }, */
	/* goodreads:{ url: 'https://www.goodreads.com/review/list?id=49377228&v=2&key=mRDzpwnLeoPPAQf7CAIpPQ&shelf=currently-reading' }, */
	goodreads: { url: "https://www.goodreads.com/review/list_rss/49377228?key=CAJAyLh9iRMHgyWZ781elQK_Bs8acH23gMzA2mvwiBIwPaah&shelf=currently-reading" },
	pinterest: { url: "https://www.pinterest.com/brianwhaley/feed.rss" },
	tumblr: { url: "http://pixelatedviews.tumblr.com/rss" },
	twitter: { url: "https://twitrss.me/twitter_user_to_rss/?user=brianwhaley" },
	youtube: { url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCKk2eBwml-4mEsmMK-dK6sQ" }
};

export default class SocialMedia extends Component {
	render () {
		return (
			<Fragment>
				<section id="social-links-section">
					<div className="section-container callout">
						<div className="row">
							<div className="column grid12">
								<CalloutHeader title="Social Media Links" />
							</div>
						</div>
						<div className="row grid8 push2">
							<div className="grid6">
								<CalloutRoundSm url="http://www.linkedin.com/in/brianwhaley" img="images/logos/linkedin-logo.png" title="LinkedIn" />
								<CalloutRoundSm url="http://twitter.com/brianwhaley" img="images/logos/twitter-logo.png" title="Twitter" />
								<CalloutRoundSm url="http://www.pinterest.com/brianwhaley" img="images/logos/pinterest-logo.png" title="Pinterest" />
							</div>
							<div className="grid6">
								<CalloutRoundSm url="https://www.goodreads.com/user/show/49377228-brian-whaley" img="images/logos/goodreads-logo.png" title="Goodreads" />
								<CalloutRoundSm url="http://www.youtube.com/user/brianwhaley" img="images/logos/youtube-logo.png" title="Youtube" />
								<CalloutRoundSm url="http://www.google.com/profiles/brian.whaley" img="images/logos/google-plus-logo.png" title="Google Plus" />
							</div>
						</div>
						<div className="row grid8 push2">
							<div className="grid6">
								<CalloutRoundSm url="http://pixelatedviews.tumblr.com" img="images/logos/google-reader-logo.png" title="Feed Reader" />
								<CalloutRoundSm url="http://www.amazon.com/gp/pdp/profile/AMIS1GDCT1RZ?ie=UTF8&amp;ref_=ya_T9_56" img="images/logos/amazon-logo.png" title="Amazon" />
								<CalloutRoundSm url="https://www.etsy.com/people/bwhaley73" img="images/logos/etsy-logo.png" title="Etsy" />
							</div>
							<div className="grid6">
								<CalloutRoundSm url="https://foursquare.com/brianwhaley" img="images/logos/foursquare-logo.png" title="Foursquare" />
								<CalloutRoundSm url="http://trees.ancestry.com/tree/7237865" img="images/logos/ancestry-logo.jpg" title="Ancestry" />
								<CalloutRoundSm url="http://www.facebook.com/brian.t.whaley" img="images/logos/facebook-logo.png" title="Facebook" />
							</div>
						</div>
					</div>
				</section>

				<section id="social-cards-section">
					<div className="section-container">
						<CalloutHeader title="Social Posts" />
						<div className="row">
							<div id="socialCards" className="column callout grid12">
								<div className="callout-body">
									<div className="grid12">
										<div className="masonry" id="social">
											<SocialCards sources={mySources}></SocialCards>
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

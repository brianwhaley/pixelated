"use client";

import React, { Fragment } from "react";
import { CalloutHeader, CalloutRoundSm } from "@/app/components/callout/pixelated.callout";
import { SocialCards } from "@/app/components/socialcard/pixelated.socialcard";

/* ========== NOTES ==========
ERRORS: 500px, shutterfly - malformed XML RSS
*/

const myRSSFeeds = {
	SOOpx: { url: "https://500px.com/brianwhaley/rss" },
	blog: { url: "https://blog.pixelated.tech/feed/", entryCount: 5, iconSrc: 'images/logos/wordpress-logo.png', iconSrcAlt: "Pixelated Views Blog Post" },
	/* BLURB */
	ebay: { url: "https://rssbay.net/feed?keyword=sunglasses&globalId=EBAY-US&auction=1&buyitnow=1&condition=-&seller=btw73&time-frame-type=-&time-frame-value=-", entryCount: 5, iconSrc: 'images/logos/ebay-logo.png', iconSrcAlt: 'Ebay Items For Sale'  },
	etsy: { url: "https://www.etsy.com/people/bwhaley73/favorites/items.rss" },
	/* FACEBOOK */
	flickr: { url : "https://www.flickr.com/services/feeds/photoset.gne?nsid=15473210@N04&set=72157712416706518&lang=en-us&format=rss2", entryCount: 5, iconSrc: 'images/logos/flickr-logo.png', iconSrcAlt: 'Flickr Photo'},
	/* foursquare: { url: 'https://feeds.foursquare.com/history/LZSXBIJMSBHI5EQXV1GTQOVQW5XRJ0FP.rss' }, */
	github: { url: "https://github.com/brianwhaley.atom", entryCount: 5, iconSrc: 'images/logos/github-logo.png', iconSrcAlt: 'Github Activity'},
	goodreads: { url:  "https://www.goodreads.com/review/list_rss/49377228?key=3KvDb_dRiJMRnHlEeNtUOsn-Ry396qlabqubyfD6jFiSDk9q&shelf=currently-reading" },
	goodreads2: { url: "https://www.goodreads.com/review/list_rss/49377228?key=3KvDb_dRiJMRnHlEeNtUOsn-Ry396qlabqubyfD6jFiSDk9q&shelf=books-for-work", entryCount: 5, iconSrc: 'images/logos/goodreads-logo.png', iconSrcAlt: 'Goodreads Book For Work' },
	/* INSTAGRAM */
	/* iStockPhoto */
	/* LinkedIn */
	pinterest: { url: "https://www.pinterest.com/brianwhaley/feed.rss" },
	reddit: { url: "https://www.reddit.com/user/btw-73/saved.rss?feed=fc1adaa9f977a389504453447e7c0e6ef68f7037&user=btw-73", entryCount: 5, iconSrc: 'images/logos/reddit-logo.png', iconSrcAlt: 'Reddit Saves' },
	/* https://ssl.reddit.com/prefs/feeds/ */
	shutterfly: { url: "https://cmd.shutterfly.com/commands/format/rss?site=brianwhaley&page=brianwhaley" },
	/* snapchat */
	/* ShutterStock */
	/* TickTock */
	tumblr: { url: "https://pixelatedviews.tumblr.com/rss" },
	twitter: { url : "https://rsshub.app/twitter/user/brianwhaley", entryCount: 5, iconSrc: 'images/logos/x-logo.png', iconSrcAlt: 'Tweets from Brian Whaley'},
	// twitter: { url: "https://twitrss.me/twitter_user_to_rss/?user=brianwhaley" },
	// twitter: { url : "https://rss.app/feeds/MPULoVcijU5AAHxU.xml", entryCount: 5, iconSrc: 'images/logos/twitter-logo.png', iconSrcAlt: 'Tweets from Brian Whaley'},
	// twitter: { url: "https://twitrss.me/twitter_user_to_rss/?user=pixelatedviews" }
	twitter2: { url : "https://rsshub.app/twitter/user/pixelatedviews", entryCount: 5, iconSrc: 'images/logos/x-logo.png', iconSrcAlt: 'Tweets from Brian Whaley'},
	// twitter2: { url : "https://rss.app/feeds/B0rl26o7ehFAuBoq.xml", entryCount: 5, iconSrc: 'images/logos/twitter-logo.png', iconSrcAlt: 'Tweets from picelated.views'},
	youtube: { url: "https://www.youtube.com/feeds/videos.xml%3Fchannel_id=UCKk2eBwml-4mEsmMK-dK6sQ" }
};

export default function SocialMedia() {
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
							<CalloutRoundSm url="http://reddit.com/user/btw-73/saved" img="images/logos/reddit-logo.png" title="Reddit" />
						</div>
						<div className="grid6">
							<CalloutRoundSm url="http://www.pinterest.com/brianwhaley" img="images/logos/pinterest-logo.png" title="Pinterest" />
							<CalloutRoundSm url="https://www.goodreads.com/user/show/49377228-brian-whaley" img="images/logos/goodreads-logo.png" title="Goodreads" />
							<CalloutRoundSm url="http://www.youtube.com/user/brianwhaley" img="images/logos/youtube-logo.png" title="Youtube" />
						</div>
					</div>
					<div className="row grid8 push2">
						<div className="grid6">
							<CalloutRoundSm url="http://pixelatedviews.tumblr.com" img="images/logos/tumblr-logo.png" title="Tumblr" />
							<CalloutRoundSm url="https://www.etsy.com/people/bwhaley73" img="images/logos/etsy-logo.png" title="Etsy" />
							<CalloutRoundSm url="https://www.ebay.com/usr/btw73/" img="images/logos/ebay-logo.png" title="ebay" />
						</div>
						<div className="grid6">
							{/* <CalloutRoundSm url="https://foursquare.com/brianwhaley" img="images/logos/foursquare-logo.png" title="Foursquare" / > */}
							<CalloutRoundSm url="http://trees.ancestry.com/tree/7237865" img="images/logos/ancestry-logo.jpg" title="Ancestry" />
							<CalloutRoundSm url="http://www.facebook.com/brian.t.whaley" img="images/logos/facebook-logo.png" title="Facebook" />
							<CalloutRoundSm url="http://blog.pixelated.tech" img="images/logos/wordpress-logo.png" title="Pixelated Blog" />
						</div>
					</div>

					<div className="row grid8 push2">
						<div className="grid6">
							<CalloutRoundSm url="https://github.com/brianwhaley" img="images/logos/github-logo.png" title="Github" />
							<CalloutRoundSm url="https://500px.com/brianwhaley" img="images/logos/500px-logo.png" title="500px" />
							<CalloutRoundSm url="http://www.flickr.com/photos/brianwhaley/" img="images/logos/flickr-logo.png" title="Flickr" />
						</div>
						<div className="grid6">
							<CalloutRoundSm url="https://secure.istockphoto.com/portfolio/brianwhaley" img="images/logos/istock-logo.jpg" title="iStock Photo" />
							<CalloutRoundSm url="http://www.shutterstock.com/g/brianwhaley" img="images/logos/shutterstock-logo.png" title="Shutter Stock" />
							<CalloutRoundSm url="https://www.instagram.com/pixelated.views/" img="images/logos/instagram-logo.jpg" title="Instagram" />
						</div>
					</div>
					
					<div className="row grid8 push2">
						<div className="grid6">
							<CalloutRoundSm url="http://www.blurb.com/user/brianwhaley" img="images/logos/blurb-logo.png" title="Blurb" />
							<CalloutRoundSm url="http://brianwhaley.shutterfly.com" img="images/logos/shutterfly-logo.jpg" title="Shutterfly" />
							<CalloutRoundSm url="http://twitter.com/pixelatedviews" img="images/logos/twitter-logo.png" title="Twitter" />
						</div>
						<div className="grid6">
							<CalloutRoundSm url="" img="" title="" />
							<CalloutRoundSm url="" img="" title="" />
							<CalloutRoundSm url="" img="" title="" />
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
										<SocialCards sources={myRSSFeeds}></SocialCards>
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

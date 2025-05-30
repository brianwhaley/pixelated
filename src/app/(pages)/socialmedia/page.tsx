"use client";

import React, { Fragment } from "react";
import { PageHeader } from "@/app/components/general/pixelated.general";
import { CalloutHeader, CalloutSmall } from "@brianwhaley/pixelated-components";
import { SocialCards } from "@brianwhaley/pixelated-components";

/* ========== NOTES ==========
TO DO : Google News Saved Articles
ERRORS: 500px, shutterfly - malformed XML RSS
*/

const myRSSFeeds = {
	SOOpx: { url: "https://500px.com/brianwhaley/rss" },
	blog: { url: "https://blog.pixelated.tech/feed/", iconSrcAlt: "Pixelated Views Blog Post" },
	/* BLURB */
	ebay: { url: "https://rssbay.net/feed?keyword=sunglasses&globalId=EBAY-US&auction=1&buyitnow=1&condition=-&seller=btw73&time-frame-type=-&time-frame-value=-" },
	etsy: { url: "https://www.etsy.com/people/bwhaley73/favorites/items.rss" },
	/* FACEBOOK */
	flickr: { url : "https://www.flickr.com/services/feeds/photoset.gne?nsid=15473210@N04&set=72157712416706518&lang=en-us&format=rss2" },
	/* foursquare: { url: 'https://feeds.foursquare.com/history/LZSXBIJMSBHI5EQXV1GTQOVQW5XRJ0FP.rss' }, */
	github: { url: "https://github.com/brianwhaley.atom" },
	goodreads: { url:  "https://www.goodreads.com/review/list_rss/49377228?key=3KvDb_dRiJMRnHlEeNtUOsn-Ry396qlabqubyfD6jFiSDk9q&shelf=currently-reading" },
	goodreads2: { url: "https://www.goodreads.com/review/list_rss/49377228?key=3KvDb_dRiJMRnHlEeNtUOsn-Ry396qlabqubyfD6jFiSDk9q&shelf=books-for-work", iconSrcAlt: 'Goodreads Book For Work' },
	/* INSTAGRAM */
	/* iStockPhoto */
	/* LinkedIn */
	pinterest: { url: "https://www.pinterest.com/brianwhaley/feed.rss" },
	reddit: { url: "https://www.reddit.com/user/btw-73/saved.rss?feed=fc1adaa9f977a389504453447e7c0e6ef68f7037&user=btw-73" },
	/* https://ssl.reddit.com/prefs/feeds/ */
	shutterfly: { url: "https://cmd.shutterfly.com/commands/format/rss?site=brianwhaley&page=brianwhaley" },
	/* snapchat */
	/* ShutterStock */
	/* TickTock */
	tumblr: { url: "https://pixelatedviews.tumblr.com/rss" },
	x: { url : "https://rsshub.app/twitter/user/brianwhaley", iconSrcAlt: 'Tweets from Brian Whaley'},
	// twitter: { url: "https://twitrss.me/twitter_user_to_rss/?user=brianwhaley" },
	// twitter: { url : "https://rss.app/feeds/MPULoVcijU5AAHxU.xml", iconSrcAlt: 'Tweets from Brian Whaley'},
	// twitter: { url: "https://twitrss.me/twitter_user_to_rss/?user=pixelatedviews" }
	x2: { url : "https://rsshub.app/twitter/user/pixelatedviews", iconSrcAlt: 'Tweets from Pixelated'},
	// twitter2: { url : "https://rss.app/feeds/B0rl26o7ehFAuBoq.xml", iconSrcAlt: 'Tweets from picelated.views'},
	youtube: { url: "https://www.youtube.com/feeds/videos.xml%3Fchannel_id=UCKk2eBwml-4mEsmMK-dK6sQ" }
};

export default function SocialMedia() {
	return (
		<Fragment>
			<section id="social-links-section">
				<div className="section-container callout">
					<div className="row-12col">
						<div className="grid-s1-e12">
							<PageHeader title="Social Media Links" />
						</div>
					</div>
					<div className="row-12col">
						<div className="gridItem"><CalloutSmall shape="squircle" url="http://www.linkedin.com/in/brianwhaley" img="/images/logos/linkedin-logo.png" /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="http://twitter.com/brianwhaley" img="/images/logos/twitter-logo.png" /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="http://reddit.com/user/btw-73/saved" img="/images/logos/reddit-logo.png" /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="http://www.pinterest.com/brianwhaley" img="/images/logos/pinterest-logo.png" /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="https://www.goodreads.com/user/show/49377228-brian-whaley" img="/images/logos/goodreads-logo.png" /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="http://www.youtube.com/user/brianwhaley" img="/images/logos/youtube-logo.png" /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="http://pixelatedviews.tumblr.com" img="/images/logos/tumblr-logo.png" /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="https://www.etsy.com/people/bwhaley73" img="/images/logos/etsy-logo.png" /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="https://www.ebay.com/usr/btw73/" img="/images/logos/ebay-logo.png" /></div>
						{/* <CalloutSmall shape="squircle" url="https://foursquare.com/brianwhaley" img="/images/logos/foursquare-logo.png" / > */}
						<div className="gridItem"><CalloutSmall shape="squircle" url="http://trees.ancestry.com/tree/7237865" img="/images/logos/ancestry-logo.jpg" /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="http://www.facebook.com/brian.t.whaley" img="/images/logos/facebook-logo.png" /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="http://blog.pixelated.tech" img="/images/logos/wordpress-logo.png" /></div>
					</div>

					<div className="row-12col">
						<div className="gridItem"></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="https://github.com/brianwhaley" img="/images/logos/github-logo.png" /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="https://maps.app.goo.gl/j5Tpcxxr9roydxd2A" img="/images/logos/googlemaps-logo.png" /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="https://500px.com/brianwhaley" img="/images/logos/500px-logo.png" /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="http://www.flickr.com/photos/brianwhaley/" img="/images/logos/flickr-logo.png" /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="https://secure.istockphoto.com/portfolio/brianwhaley" img="/images/logos/istock-logo.jpg" /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="http://www.shutterstock.com/g/brianwhaley" img="/images/logos/shutterstock-logo.png" /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="https://www.instagram.com/pixelated.views/" img="/images/logos/instagram-logo.jpg" /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="http://www.blurb.com/user/brianwhaley" img="/images/logos/blurb-logo.png" /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="http://brianwhaley.shutterfly.com" img="/images/logos/shutterfly-logo.png" /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="http://twitter.com/pixelatedviews" img="/images/logos/twitter-logo.png" /></div>
						<div className="gridItem"></div>
					</div>

				</div>
			</section>

			<section id="social-cards-section">
				<div className="section-container">
					<CalloutHeader title="Social Posts" />
					<div className="row-12col">
						<div id="socialCards" className="callout grid-s1-e12">
							<div className="callout-body">
								<div className="grid-s1-e12">
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

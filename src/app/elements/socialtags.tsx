"use client";

import React from "react";
import { Callout } from "@brianwhaley/pixelated-components";
import { PageSectionHeader } from "@brianwhaley/pixelated-components";


export default function SocialTags() {
	return (
		<>

			<div className="row-12col">
				<div className="grid-s1-e12">
					<PageSectionHeader url="" title="Follow us on Social Media" />
				</div>
			</div>

			<div className="row-11col">
				<div className="gridItem"><Callout style='full' imgShape="squircle" url="http://blog.pixelated.tech" img="/images/icons/blog-icon.jpg" imgAlt="Pixelated Technologies Blog" /></div>
				<div className="gridItem"><Callout style='full' imgShape="squircle" url="https://share.google/an1Yqe6CTFA946zZV" img="/images/logos/google-business.png" imgAlt="Google Business" /></div>
				<div className="gridItem"><Callout style='full' imgShape="squircle" url="https://www.linkedin.com/company/106825397/" img="/images/logos/linkedin-logo.png" imgAlt="LinkedIn" /></div>
				<div className="gridItem"><Callout style='full' imgShape="squircle" url="https://www.reddit.com/r/PixelatedTech/" img="/images/logos/reddit-logo.png" imgAlt="Reddit" /></div>
				<div className="gridItem"><Callout style='full' imgShape="squircle" url="https://www.facebook.com/profile.php?id=61577216017129" img="/images/logos/facebook-logo.png" imgAlt="Facebook" /></div>
				<div className="gridItem"><Callout style='full' imgShape="squircle" url="https://www.instagram.com/_pixelatedtech_/" img="/images/logos/instagram-logo.jpg" imgAlt="Instagram" /></div>
				<div className="gridItem"><Callout style='full' imgShape="squircle" url="http://twitter.com/pixelatedviews" img="/images/logos/twitter-logo.png" imgAlt="Twitter" /></div>
				<div className="gridItem"><Callout style='full' imgShape="squircle" url="https://www.yelp.com/user_details?userid=SUFlzBCRMR0OIc3D3nN5pg" img="/images/logos/yelp-logo.png" imgAlt="Yelp" /></div>
				<div className="gridItem"><Callout style='full' imgShape="squircle" url="https://www.tumblr.com/pixelatedtech" img="/images/logos/tumblr-logo.png" imgAlt="Tumblr" /></div>
				<div className="gridItem"><Callout style='full' imgShape="squircle" url="https://patch.com/new-jersey/denville-nj/business/listing/558828/pixelated-technologies" img="/images/logos/patch-logo.png" imgAlt="Patch" /></div>
				<div className="gridItem"><Callout style='full' imgShape="squircle" url="https://www.eventbrite.com/o/brian-whaley-120645314676" img="/images/logos/eventbrite-logo.png" imgAlt="EventBrite" /></div>
			</div>
        
		</>
	);
}
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

			<div className="row-6col">
				<div className="gridItem"><Callout style='full' imgShape="squircle" url="https://www.linkedin.com/company/106825397/" img="/images/logos/linkedin-logo.png" imgAlt="LinkedIn" /></div>
				<div className="gridItem"><Callout style='full' imgShape="squircle" url="https://share.google/an1Yqe6CTFA946zZV" img="/images/logos/google-business.png" imgAlt="Google Business" /></div>
				<div className="gridItem"><Callout style='full' imgShape="squircle" url="https://www.facebook.com/profile.php?id=61577216017129" img="/images/logos/facebook-logo.png" imgAlt="Facebook" /></div>
				<div className="gridItem"><Callout style='full' imgShape="squircle" url="http://twitter.com/pixelatedviews" img="/images/logos/twitter-logo.png" imgAlt="Twitter" /></div>
				<div className="gridItem"><Callout style='full' imgShape="squircle" url="https://www.instagram.com/pixelated.views/" img="/images/logos/instagram-logo.jpg" imgAlt="Instagram" /></div>
				<div className="gridItem"><Callout style='full' imgShape="squircle" url="http://blog.pixelated.tech" img="/images/logos/google-reader-logo.png" imgAlt="Pixelated Technologies Blog" /></div>
			</div>
        
		</>
	);
}
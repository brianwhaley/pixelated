"use client";

import React from "react";
import { CalloutHeader, CalloutSmall } from "@brianwhaley/pixelated-components";

export default function SocialTags() {
	return (
		<>

			<div className="row-12col">
				<div className="grid-s1-e12">
					<CalloutHeader url="" title="Pixelated Technologies Social Media" />
				</div>
			</div>

			<div className="row-5col">
				<div className="gridItem"><CalloutSmall shape="squircle" url="https://www.linkedin.com/company/106825397/" img="/images/logos/linkedin-logo.png" alt="LinkedIn" title={""} content={""} /></div>
				<div className="gridItem"><CalloutSmall shape="squircle" url="https://www.facebook.com/profile.php?id=61577216017129" img="/images/logos/facebook-logo.png" alt="Facebook" title={""} content={""} /></div>
				<div className="gridItem"><CalloutSmall shape="squircle" url="http://twitter.com/pixelatedviews" img="/images/logos/twitter-logo.png" alt="Twitter" title={""} content={""} /></div>
				<div className="gridItem"><CalloutSmall shape="squircle" url="https://www.instagram.com/pixelated.views/" img="/images/logos/instagram-logo.jpg" alt="Instagram" title={""} content={""} /></div>
				<div className="gridItem"><CalloutSmall shape="squircle" url="http://blog.pixelated.tech" img="/images/logos/google-reader-logo.png" alt="Pixelated Technologies Blog" title={""} content={""} /></div>
			</div>
        
		</>
	);
}
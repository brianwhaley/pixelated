"use client";

import React from "react";
import { CalloutSmall } from "@brianwhaley/pixelated-components";

export default function Social() {
	return (
		<div className="section-container">
			<div className="rowfix-10col">
				<div className="grid-s1-e5">
					<div className="rowfix-5col">
						<div className="gridItem"><CalloutSmall shape="squircle" url="https://www.facebook.com/palmettoepoxy/" img="/images/logos/facebook-logo.png" alt="Facebook" title={""} content={""} /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="https://www.instagram.com/palmetto_epoxy/" img="/images/logos/instagram-logo.jpg" alt="Instagram" title={""} content={""} /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="https://x.com/palmetto_epoxy" img="/images/logos/x-logo.png" alt="X (Twitter)" title={""} content={""} /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="https://www.youtube.com/@PalmettoEpoxy" img="/images/logos/youtube-logo.png" alt="Youtube" title={""} content={""} /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="https://www.yelp.com/biz/palmetto-epoxy-bluffton" img="/images/logos/yelp-logo.png" alt="Yelp" title={""} content={""} /></div>
					</div>
				</div>
				<div className="grid-s6-e5">
					<div className="rowfix-5col">
						<div className="gridItem"><CalloutSmall shape="squircle" url="https://www.reddit.com/user/palmettoepoxy/" img="/images/logos/reddit-logo.png" alt="Reddit" title={""} content={""} /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="https://nextdoor.com/pages/palmetto-epoxy-bluffton-sc/" img="/images/logos/nextdoor-logo.png" alt="Nextdoor" title={""} content={""} /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="https://www.houzz.com/hznb/professionals/flooring-contractors/palmetto-epoxy-pfvwus-pf~1171449525" img="/images/logos/houzz-logo.jpg" alt="Houzz" title={""} content={""} /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="https://bni-sclowcountry.com/en-US/memberdetails?encryptedMemberId=nF5nozAX3%2BzPl0hTaNt4zQ%3D%3D" img="/images/logos/bni-logo.png" alt="BNI" title={""} content={""} /></div>
					</div>
				</div>
			</div>
		</div>
	);
}

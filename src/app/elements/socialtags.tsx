"use client";

import React from "react";
import { PageSection, GridItem } from "@pixelated-tech/components";
import { Callout } from "@pixelated-tech/components";
import { PageSectionHeader } from "@pixelated-tech/components";


export default function SocialTags() {
	return (
		<>
			<PageSectionHeader url="" title="Follow us on Social Media" />
			<PageSection columns={11} padding={"0px"}>
				<GridItem>
					<Callout variant="full" imgShape="squircle" layout="vertical" 
						url="http://blog.pixelated.tech" 
						img="/images/icons/blog-icon.jpg" imgAlt="Pixelated Technologies Blog" />
				</GridItem>
				<GridItem>
					<Callout variant="full" imgShape="squircle" layout="vertical" 
						url="https://share.google/an1Yqe6CTFA946zZV" 
						img="/images/logos/google-business.png" imgAlt="Google Business" />
				</GridItem>
				<GridItem>
					<Callout variant="full" imgShape="squircle" layout="vertical" 
						url="https://www.linkedin.com/company/106825397/" 
						img="/images/logos/linkedin-logo.png" imgAlt="LinkedIn" />
				</GridItem>
				<GridItem>
					<Callout variant="full" imgShape="squircle" layout="vertical" 
						url="https://www.reddit.com/r/PixelatedTech/" 
						img="/images/logos/reddit-logo.png" imgAlt="Reddit" />
				</GridItem>
				<GridItem>
					<Callout variant="full" imgShape="squircle" layout="vertical" 
						url="https://www.facebook.com/profile.php?id=61577216017129" 
						img="/images/logos/facebook-logo.png" imgAlt="Facebook" />
				</GridItem>
				<GridItem>
					<Callout variant="full" imgShape="squircle" layout="vertical" 
						url="https://www.instagram.com/_pixelatedtech_/" 
						img="/images/logos/instagram-logo.jpg" imgAlt="Instagram" />
				</GridItem>
				<GridItem>
					<Callout variant="full" imgShape="squircle" layout="vertical" 
						url="http://twitter.com/pixelatedviews" 
						img="/images/logos/twitter-logo.png" imgAlt="Twitter" />
				</GridItem>
				<GridItem>
					<Callout variant="full" imgShape="squircle" layout="vertical" 
						url="https://www.yelp.com/user_details?userid=SUFlzBCRMR0OIc3D3nN5pg" 
						img="/images/logos/yelp-logo.png" imgAlt="Yelp" />
				</GridItem>
				<GridItem>
					<Callout variant="full" imgShape="squircle" layout="vertical" 
						url="https://www.tumblr.com/pixelatedtech" 
						img="/images/logos/tumblr-logo.png" imgAlt="Tumblr" />
				</GridItem>
				<GridItem>
					<Callout variant="full" imgShape="squircle" layout="vertical" 
						url="https://patch.com/new-jersey/denville-nj/business/listing/558828/pixelated-technologies" 
						img="/images/logos/patch-logo.png" imgAlt="Patch" />
				</GridItem>
				<GridItem>
					<Callout variant="full" imgShape="squircle" layout="vertical"  
						url="https://www.eventbrite.com/o/brian-whaley-120645314676" 
						img="/images/logos/eventbrite-logo.png" imgAlt="EventBrite" />
				</GridItem>
			</PageSection>
        
		</>
	);
}
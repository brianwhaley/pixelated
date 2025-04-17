"use client";

import React, { Fragment } from "react";
import { CalloutHeader } from "@brianwhaley/pixelated-components";
import { SocialCards } from "@brianwhaley/pixelated-components";
import "./ebay.css";

export default function Ebay() {
	
	const myRSSFeeds = {
		ebay: { 
			url: "https://rssbay.net/feed?keyword=sunglasses&globalId=EBAY-US&auction=1&buyitnow=1&condition=-&seller=btw73&time-frame-type=-&time-frame-value=-", 
			entryCount: 100
		 },
	};

	return (
		<Fragment>
			<section id="social-cards-section">
				<div className="section-container">
					<CalloutHeader title="Ebay Items For Sale" />
					<div className="row">
						<div id="ebayCards" className="column callout grid12">
							<div className="callout-body">
								<div className="grid12">
									<div className="masonry" id="ebay">
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

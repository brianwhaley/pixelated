"use client";

import React from "react";
import { PageSection, SmartImage } from "@pixelated-tech/components";
import { GoogleAnalytics, GoogleAnalyticsEvent } from "@pixelated-tech/components";
// import { GoogleAnalytics } from '@next/third-parties/google';


export default function Footer() {
	return (
		<PageSection id="footer-section" columns={1} padding="20px 0 0 0">
			<div suppressHydrationWarning={true} >
				<GoogleAnalytics id="G-1J1W90VBE1" />
				<GoogleAnalytics id="AW-17721931789" />
				<GoogleAnalyticsEvent event_name="conversion" 
					event_parameters={{ 
						send_to: "AW-17721931789/qOjmCM77-74bEI3wvIJC", 
						value: 1.0, 
						currency: "USD" 
					}} 
				/>
				{ /* <GoogleAnalytics gaId="G-1J1W90VBE1" /> */ }
				<hr style={{ margin: "0 auto", width: "80%" }} />
				<br />
				<div className="centered">
					<p className="footer-text">&copy; {new Date().getFullYear()} Pixelated Technologies. All rights reserved.</p>

					<p className="footer-text">Designed and developed by 
						<a href="https://www.pixelated.tech" target="_blank" rel="noopener noreferrer">
							<SmartImage
								src="https://www.pixelated.tech/images/pix/pix-bg.png" alt="Pixelated Technologies"
								width={50} height={50}
								style={{ width: "20px", height: "20px", margin: "0 1px 0 8px", verticalAlign: "middle", borderRadius: "5px" }}
							/>Pixelated Technologies.
						</a>
					</p>
					
				</div>
				<br /><br />
			</div>
		</PageSection>
	);
}

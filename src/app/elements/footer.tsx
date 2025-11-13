"use client";

import React from "react";
import { Analytics, AnalyticsEvent } from "@brianwhaley/pixelated-components";
// import { GoogleAnalytics } from '@next/third-parties/google';


export default function Footer() {
	return (
		<div className="section-container" suppressHydrationWarning={true} >
			
			<Analytics id="G-1J1W90VBE1" />
			<Analytics id="AW-17721931789" />
			<AnalyticsEvent event_name="conversion" 
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
			</div>
			<br /><br />

		</div>
	);
}

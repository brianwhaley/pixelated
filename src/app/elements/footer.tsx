"use client";

import React from "react";
import { Analytics } from "@brianwhaley/pixelated-components";
// import { GoogleAnalytics } from '@next/third-parties/google';


export default function Footer() {
	return (
		<div className="section-container" suppressHydrationWarning={true} >
			
			<Analytics id="G-1J1W90VBE1" />
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

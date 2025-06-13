"use client";

import React from "react";
import Nav from "@/app/elements/nav";
// import { Analytics } from "@brianwhaley/pixelated-components";
import { GoogleAnalytics } from '@next/third-parties/google';


export default function Footer() {
	return (
		<div className="section-container">
			<div>
				<Nav />
				{ /* <Analytics id="G-X2R4REQ3NG" /> */ }
				<GoogleAnalytics gaId="G-X2R4REQ3NG" />
			</div>
		</div>
	);
}

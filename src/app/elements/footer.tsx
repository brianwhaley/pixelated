"use client";

import React from "react";
// import { Analytics } from "@brianwhaley/pixelated-components";
import { GoogleAnalytics } from '@next/third-parties/google';


export default function Footer() {
	return (
		<div className="section-container">
			{ /* <Analytics id="G-1J1W90VBE1" /> */ }
			<GoogleAnalytics gaId="G-1J1W90VBE1" />
		</div>
	);
}

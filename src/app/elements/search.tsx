"use client";

import React, { useState, useEffect } from "react";

export default function Search() {
	useEffect(() => {
		const script = document.createElement("script");
		document.head.append(script);
		script.src = "https://cse.google.com/cse.js?cx=009500278966481927899:bcssp73qony";
	}, []);
	const [isClient, setIsClient] = useState(false);
	useEffect(() => {
		setIsClient(true);
	}, []);
	return (
		(isClient) ? <div className="section-container" suppressHydrationWarning>
			<div className="gcse-search" suppressHydrationWarning ></div>
		</div> : "" 
	);
}

/* 
===== Google Programmable Search =====
https://programmablesearchengine.google.com/controlpanel/all 
https://dev.to/mjoycemilburn/searching-pdf-files-coding-a-goggle-custom-search-engine-gcse-component-in-react-36fk
https://stackoverflow.com/questions/15779036/auto-adding-gsc-tab-0-after-the-url 

<script async src="https://cse.google.com/cse.js?cx=009500278966481927899:bcssp73qony" />
<div className="gcse-search">

===== Hydration Error =====
https://www.reddit.com/r/nextjs/comments/1gabiqn/hydration_error_when_installing_nextjs_15/?rdt=34262
https://nextjs.org/docs/messages/react-hydration-error
*/
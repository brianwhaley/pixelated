"use client";

import React from "react";


/* 
===== Google Programmable Search =====
pixelated id = "009500278966481927899:bcssp73qony";
pixelvivid id = "e336d1c9d0e5e48e5";

https://programmablesearchengine.google.com/controlpanel/all 
https://dev.to/mjoycemilburn/searching-pdf-files-coding-a-goggle-custom-search-engine-gcse-component-in-react-36fk
https://stackoverflow.com/questions/15779036/auto-adding-gsc-tab-0-after-the-url 

<script async src="https://cse.google.com/cse.js?cx=009500278966481927899:bcssp73qony" />
<div className="gcse-search">

===== Hydration Error =====
https://www.reddit.com/r/nextjs/comments/1gabiqn/hydration_error_when_installing_nextjs_15/?rdt=34262
https://nextjs.org/docs/messages/react-hydration-error
*/


export function Search(props: { id: string }) {
	if(typeof document !== 'undefined'){
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const gsearch = (function () {
			const gcse = document.createElement("script");
			gcse.type = "text/javascript";
			gcse.async = true;
			gcse.src = (document.location.protocol === "https:" ? "https:" : "http:") + "//cse.google.com/cse.js?cx=" + props.id;
			const s = document.getElementsByTagName("script")[0];
			s.parentNode?.insertBefore(gcse, s);
		})();
	}
	return (
		<div className="gcse-search" suppressHydrationWarning />
	);
}

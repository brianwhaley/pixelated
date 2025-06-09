"use client";

import React from "react";

declare global {
    interface Window {
        dataLayer: any[];
    }
}

export function Analytics(props: { id: string }) {
	if(typeof document !== 'undefined'){
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const ganalytics = (function () {
			window.dataLayer = window.dataLayer || [];
			function gtag(...args: any[]) { window.dataLayer.push(args); }
	        gtag("js", new Date());
	        gtag("config", props.id);

			const ga = document.createElement("script");
			ga.type = "text/javascript";
			ga.async = true;
			ga.src = (document.location.protocol === "https:" ? "https:" : "http:") + "//www.googletagmanager.com/gtag/js?id=" + props.id;
			const s = document.getElementsByTagName("script")[0];
			s.parentNode?.insertBefore(ga, s);
		})();
	}
	return (
		<div className="ga" suppressHydrationWarning />
	);
}

/* 
// gtag("config", "UA-2370059-2");
gtag("config", 'G-1J1W90VBE1');
*/

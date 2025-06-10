"use client";

import React from "react";
import PropTypes from 'prop-types';

declare global {
    interface Window {
        dataLayer: any[];
    }
}

export function Analytics(props: { id: string }) {
	if(typeof document !== 'undefined'){
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const ganalytics = (function () {
			// INSTALL GA SCRIPT
			const ga = document.createElement("script");
			ga.type = "text/javascript";
			ga.async = true;
			ga.src = (document.location.protocol === "https:" ? "https:" : "http:") + "//www.googletagmanager.com/gtag/js?id=" + props.id;
			const s = document.getElementsByTagName("script")[0];
			s.parentNode?.insertBefore(ga, s);
			// ADD GA TAG TO PAGE
			window.dataLayer = window.dataLayer || [];
			function gtag(...args: any[]) { window.dataLayer.push(args); }
	        gtag("js", new Date());
	        gtag("config", props.id);
		})();
	}
	return (
		<div className="ga" suppressHydrationWarning />
	);
}
Analytics.propTypes = {
	id: PropTypes.string.isRequired,
};

/* 
// gtag("config", "UA-2370059-2"); // pixelatedviews.com
// gtag("config", 'G-1J1W90VBE1'); // pixelated.tech
*/

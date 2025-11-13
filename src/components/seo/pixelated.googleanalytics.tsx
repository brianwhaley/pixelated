"use client";

import React from "react";
// import { useEffect } from "react";
import PropTypes, { InferProps } from "prop-types";


/* 
// gtag("config", "UA-2370059-2"); // pixelatedviews.com
// gtag("config", 'G-1J1W90VBE1'); // pixelated.tech
// // gtag("config", 'AW-17721931789'); // pixelated.tech Google Ads
// gtag("config", 'G-B1NZG3YT9Y'); // pixelvivid.com
// gtag("config", 'G-K5QDEDTRB4'); // brianwhaley.com
*/


declare global {
	interface Window {
		dataLayer?: any[];
		gtag?: (...args: any[]) => void;
	}
}


function isGA() {
	const hasGtag = typeof window.gtag === 'function';
	const hasDataLayer = typeof window.dataLayer !== 'undefined' && Array.isArray(window.dataLayer);
	const hasGAScript = !!(document.querySelector('script[src*="googletagmanager.com/gtag/js"]'));
	const hasGAScriptID = !!(document.querySelector('script#ga'));
	const hasGAInitScriptID = !!(document.querySelector('script#ga-init'));
	return ( hasGtag || hasDataLayer || hasGAScript || hasGAScriptID || hasGAInitScriptID ) ;
}



Analytics.propTypes = {
	id: PropTypes.string.isRequired,
};
export type AnalyticsType = InferProps<typeof Analytics.propTypes>;
export function Analytics( props: AnalyticsType ) {
	if(typeof window === 'undefined'){ return; }
	if(typeof document === 'undefined'){ return; }
	if(isGA()){ return; }
	const gaSRC = "https://www.googletagmanager.com/gtag/js?id=" + props.id;
	// useEffect(() => {
	// INIT GA TAG TO PAGE
	const gaInit = document.createElement("script");
	gaInit.setAttribute("id", "ga-init");
	gaInit.type = "text/javascript";
	// could also be InnerHTML, but not innerText
	gaInit.text = `
window.dataLayer = window.dataLayer || [];
window.gtag = function gtag(){ window.dataLayer.push(arguments); }
window.gtag('js', new Date());
window.gtag('config', '${props.id}');
`;
	document.head.appendChild(gaInit);
	// INSTALL GA SCRIPT
	const ga = document.createElement("script");
	ga.setAttribute("id", "ga");
	ga.type = "text/javascript";
	ga.async = true;
	ga.src = gaSRC;
	document.head.appendChild(ga);
	// }, []); 
	return (
		<div className="ga" suppressHydrationWarning />
	);
}



AnalyticsEvent.propTypes = {
	event_name: PropTypes.string.isRequired,
	event_parameters: PropTypes.object.isRequired,
};
export type AnalyticsEventType = InferProps<typeof AnalyticsEvent.propTypes>;
export function AnalyticsEvent( props: AnalyticsEventType ) {
	if(typeof window === 'undefined'){ return; }
	if(typeof document === 'undefined'){ return; }
	// if(isGA()){ 
	const ga_evt = document.createElement("script");
	ga_evt.setAttribute("id", "ga-event");
	ga_evt.type = "text/javascript";
	ga_evt.async = true;
	ga_evt.innerHTML = `gtag('event', '${props.event_name}', ${JSON.stringify(props.event_parameters)});`;
	document.head.appendChild(ga_evt);
	// }
	return ( null );
}

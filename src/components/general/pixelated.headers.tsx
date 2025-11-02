import React from 'react';
import "./pixelated.headers.css";

export type PageHeaderType = {
	title: string,
	url?: string
};
/* ========== CALLOUT HEADER ========== */
export function PageHeader( { title , url }: PageHeaderType) {
	const calloutTarget = url && url.substring(0, 4).toLowerCase() === 'http' ? '_blank' : '_self';
	return (
		<>
			{url
				? <a href={url} target={calloutTarget} rel="noopener noreferrer"><h1 className="pageHeader">{title}</h1></a>
				: <h1 className="pageHeader">{title}</h1>
			}
		</>
	);
};


/* ========== CALLOUT HEADER ========== */
export type PageSectionHeaderType = {
	title: string,
	url?: string
};
export function PageSectionHeader( { title , url }: PageSectionHeaderType) {
	const calloutTarget = url && url.substring(0, 4).toLowerCase() === 'http' ? '_blank' : '_self';
	return (
		<>
			{url
				? <a href={url} target={calloutTarget} rel="noopener noreferrer"><h2 className="pageSectionHeader">{title}</h2></a>
				: <h2 className="pageSectionHeader">{title}</h2>
			}
		</>
	);
};

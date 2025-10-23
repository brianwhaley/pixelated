import React from 'react';
import PropTypes from 'prop-types';
import "./pixelated.general.css";

export type GenericHeader = {
	title: string,
	url?: string
}

/* ========== CALLOUT HEADER ========== */
export function PageHeader(props: GenericHeader) {
	const calloutTarget = props.url && props.url.substring(0, 4).toLowerCase() === 'http' ? '_blank' : '_self';
	return (
		<>
			{props.url
				? <a href={props.url} target={calloutTarget} rel="noopener noreferrer"><h1 className="pageHeader">{props.title}</h1></a>
				: <h1 className="pageHeader">{props.title}</h1>
			}
		</>
	);
}
PageHeader.propTypes = {
	title: PropTypes.string.isRequired,
	url: PropTypes.string
};


/* ========== CALLOUT HEADER ========== */
export function PageSectionHeader(props: GenericHeader) {
	const calloutTarget = props.url && props.url.substring(0, 4).toLowerCase() === 'http' ? '_blank' : '_self';
	return (
		<>
			{props.url
				? <a href={props.url} target={calloutTarget} rel="noopener noreferrer"><h2 className="pageSectionHeader">{props.title}</h2></a>
				: <h2 className="pageSectionHeader">{props.title}</h2>
			}
		</>
	);
}
PageSectionHeader.propTypes = {
	title: PropTypes.string.isRequired,
	url: PropTypes.string
};
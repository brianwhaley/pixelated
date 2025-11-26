import React from 'react';
import PropTypes, {InferProps} from 'prop-types';
import "./headers.css";




/* ========== CALLOUT HEADER ========== */
PageHeader.propTypes = {
	title: PropTypes.string.isRequired,
	url: PropTypes.string
};
export type PageHeaderType = InferProps<typeof PageHeader.propTypes>;
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
PageSectionHeader.propTypes = {
	title: PropTypes.string.isRequired,
	url: PropTypes.string
};
export type PageSectionHeaderType = InferProps<typeof PageSectionHeader.propTypes>;
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

"use client";

import React, { /* useState, useEffect */ } from "react";
import PropTypes, { InferProps } from 'prop-types';
import { SmartImage } from '../cms/pixelated.cloudinary.smartimage';

import "./pixelated.callout.scss";

/* ==================== NOTES ====================
DEFAULT = flexbox layout, no border around callout
BOXED = border around callout
BOXED GRID = applies both
FULL = full width callout with minimal margin and padding
GRID = grid layout
SPLIT = full width split page layout, cannot use LAYOUT (HORIZONTAL / VERTICAL) 
LAYOUT = horizontal or vertical callout, VERTICAL cannot use DIRECTION (LEFT / RIGHT)
DIRECTION = used to place image on left or right side, does not apply to VERTICAL layout

GRID is basic 1/2 GRID shape, needs enhanement
BOXSHAPE has not been complete
==================== NOTES ==================== */

// Define option arrays - used by both PropTypes and form generation
export const calloutStyles = ['default', 'boxed', 'boxed grid', 'full', 'grid', 'overlay', 'split'] as const;
export const shapes = ['square', 'bevel', 'squircle', 'round'] as const;
export const layouts = ['horizontal', 'vertical'] as const;
export const directions = ['left', 'right'] as const;

// TypeScript types from the const arrays
export type ShapeType = typeof shapes[number];
export type CalloutStyleType = typeof calloutStyles[number];
export type LayoutType = typeof layouts[number];
export type DirectionType = typeof directions[number];

Callout.propTypes = {
	style: PropTypes.oneOf([...calloutStyles]),
	boxShape: PropTypes.oneOf([...shapes]),
	layout: PropTypes.oneOf([...layouts]),
	direction: PropTypes.oneOf([...directions]),
	gridColumns: PropTypes.shape({
		left: PropTypes.number,
		right: PropTypes.number
	}),
	url: PropTypes.string,
	img: PropTypes.string,
	imgAlt: PropTypes.string,
	imgShape: PropTypes.oneOf([...shapes]),
	imgClick: PropTypes.func,
	// SmartImage props
	useNextImage: PropTypes.bool,
	cloudinaryEnv: PropTypes.string,
	cloudinaryDomain: PropTypes.string,
	cloudinaryTransforms: PropTypes.string,
	title: PropTypes.string,
	subtitle: PropTypes.string,
	content: PropTypes.string,
	buttonText: PropTypes.string,
};
export type CalloutType = InferProps<typeof Callout.propTypes>;
export function Callout({
	style = 'default', 
	boxShape = "squircle", 
	layout = "horizontal", 
	direction = 'left', 
	gridColumns = {left: 1, right: 2},
	url, img, imgAlt, 
	imgShape = 'square', 
	imgClick, 
	useNextImage,
	cloudinaryEnv,
	cloudinaryDomain,
	cloudinaryTransforms,
	title, subtitle, content, buttonText }: CalloutType) {

	const target = url && url.substring(0, 4).toLowerCase() === 'http' ? '_blank' : '_self';

	const body = <div className="calloutBody" >
		{ (title) ? <CalloutHeader title={title} url={url} target={target} /> : null }
		{ (subtitle) ? <div className="calloutSubtitle"><h3>{subtitle}</h3></div> : null }
		{ content ? <div className="calloutContent"><>{content}</></div> : null }
		{ url && buttonText 
			? <CalloutButton title={buttonText} url={url} target={target} />
			: url && title 
				? <CalloutButton title={title || ""} url={url} target={target} /> 
				: null 
		}
	</div> ;

	const image =  ( img ) ?
		<div className={"calloutImage" + (imgShape ? " " + imgShape : "")}>
			{ (url && !imgClick)
				? <a href={url} target={target} rel={target=="_blank" ? "noopener noreferrer" : ""}>
					<SmartImage 
						src={img} 
						title={title ?? imgAlt ?? undefined} 
						alt={imgAlt ?? title ?? ""} 
						useNextImage={useNextImage}
						cloudinaryEnv={cloudinaryEnv}
						cloudinaryDomain={cloudinaryDomain}
						cloudinaryTransforms={cloudinaryTransforms}
					/>
					{/* <img src={img} title={title ?? imgAlt ?? undefined} alt={imgAlt ?? title ?? undefined} /> */}
				</a>
				: (url && imgClick)
					? <SmartImage 
						src={img} 
						title={title ?? imgAlt ?? undefined} 
						alt={imgAlt ?? title ?? ""} 
						onClick={(event) => imgClick(event, url)}
						useNextImage={useNextImage}
						cloudinaryEnv={cloudinaryEnv}
						cloudinaryDomain={cloudinaryDomain}
						cloudinaryTransforms={cloudinaryTransforms}
					/>
					/* <img src={img} title={title ?? imgAlt ?? undefined} alt={imgAlt ?? title ?? undefined} onClick={(event) => imgClick(event, url)} /> */
					: <SmartImage 
						src={img} 
						title={title ?? imgAlt ?? undefined} 
						alt={imgAlt ?? title ?? ""}
						useNextImage={useNextImage}
						cloudinaryEnv={cloudinaryEnv}
						cloudinaryDomain={cloudinaryDomain}
						cloudinaryTransforms={cloudinaryTransforms}
					/>
					/* <img src={img} title={title ?? imgAlt ?? undefined} alt={imgAlt ?? title ?? undefined} /> */
			} 
		</div> : null ;

	return (
		<div 
			className={"callout" + 
			(style ? " " + style : "") + 
			((style==='boxed' || style==='boxed grid') && boxShape ? " " + boxShape : "") + 
			(layout && style!=='split' ? " " + layout : "") + 
			(direction && layout!=='vertical' ? " " + direction : "") +
			(style && (style==='boxed grid' || style==='grid') && gridColumns ? ` calloutGrid-${gridColumns.left}-${gridColumns.right}` : '')
			} >
			{ (direction === "right") ? <>{body}{image}</> : <>{image}{body}</> }
		</div>
	);
}



/* ========== CALLOUT HEADER ========== */
CalloutHeader.propTypes = {
	title: PropTypes.string.isRequired,
	url: PropTypes.string,
	target: PropTypes.string
};
export type CalloutHeaderType = InferProps<typeof CalloutHeader.propTypes>;
export function CalloutHeader( {title, url, target}: CalloutHeaderType) {
	return (
		<div className="calloutHeader">
			{ (url)
				? <a href={url} target={target ? target : ""} rel={target=="_blank" ? "noopener noreferrer" : ""}><h2 className="calloutTitle">{title}</h2></a>
				: <h2 className="calloutTitle">{title}</h2>
			}
		</div>
	);
}



/* ========== CALLOUT BUTTON ========== */
CalloutButton.propTypes = {
	title: PropTypes.string.isRequired,
	url: PropTypes.string,
	target: PropTypes.string
};
export type CalloutButtonType = InferProps<typeof CalloutButton.propTypes>;
export function CalloutButton( { title, url, target } : CalloutButtonType) {
	return (
		<div className="calloutButton">
			{ (url) 
				? <button type="button" className="calloutButton"><a href={url || ""} target={target || ""} rel={target=="_blank" ? "noopener noreferrer" : ""}>{title}</a></button>
				: null
			}
		</div>
	);
}

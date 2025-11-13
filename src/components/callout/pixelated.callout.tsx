"use client";

import React, { /* useState, useEffect */ } from "react";
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

type ShapeType = 'square' | 'bevel' | 'squircle' | 'round';
type gridColumnsType = {left: number, right: number};

export type CalloutType = {
	style?: 'default' | 'boxed' | 'boxed grid' | 'full' | 'grid' | 'overlay' | 'split',
	boxShape?: ShapeType,
	layout?: 'horizontal' | 'vertical' ,
	direction?: 'left' | 'right' ,
	gridColumns?: gridColumnsType,
	url?: string,
	img: string,
	imgAlt?: string,
	imgShape?: ShapeType,
	imgClick?: (event: React.MouseEvent, url: string) => void,
	title?: string,
	subtitle?: string,
	content?: string,
	buttonText?: string,
}
export function Callout({
	style = 'default', 
	boxShape = "squircle", 
	layout = "horizontal", 
	direction = 'left', 
	gridColumns = {left: 1, right: 2},
	url, img, imgAlt, 
	imgShape = 'square', 
	imgClick, title, subtitle, content, buttonText }: CalloutType) {

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

	const image = <div className={"calloutImage" + (imgShape ? " " + imgShape : "")}>
		{ (url && !imgClick)
			? <a href={url} target={target} rel={target=="_blank" ? "noopener noreferrer" : ""}>
				<img src={img} title={title ?? imgAlt ?? undefined} alt={imgAlt ?? title ?? undefined} />
			</a>
			: (url && imgClick)
				? <img src={img} title={title ?? imgAlt ?? undefined} alt={imgAlt ?? title ?? undefined} onClick={(event) => imgClick(event, url)} />
				: <img src={img} title={title ?? imgAlt ?? undefined} alt={imgAlt ?? title ?? undefined} />
		}
	</div>;

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
export type CalloutHeaderType = {
	title: string,
	url?: string,
	target?: string
};
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
export type CalloutButtonType = {
	title: string,
	url?: string,
	target?: string
};
export function CalloutButton( { title, url, target } : CalloutHeaderType) {
	return (
		<div className="calloutButton">
			{ (url) 
				? <button type="button" className="calloutButton"><a href={url || ""} target={target || ""} rel={target=="_blank" ? "noopener noreferrer" : ""}>{title}</a></button>
				: null
			}
		</div>
	);
}

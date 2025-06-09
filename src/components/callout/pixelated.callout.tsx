import React from 'react';
import PropTypes from 'prop-types';
import './pixelated.callout.css';
import "../../css/pixelated.grid.scss";

function validateShape(thisShape: string | undefined) {
	if(thisShape && ["round", "squircle", "square"].includes(thisShape)) {
		return thisShape;
	} else {
		return "round";
	}
}

interface CalloutType {
	url?: string,
	img: string,
	// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
	imgclick?: Function,
	title: string,
	subtitle?: string,
	content: string,
	layout?: string,
	shape?: string,
	alt?: string,
}
interface CalloutHeaderType {
	title: string,
	url?: string
}

/* ========== CALLOUT ========== */

export function Callout(props: CalloutType) {
	const myShape = validateShape(props.shape); 
	const calloutTarget = props.url && props.url.substring(0, 4).toLowerCase() === 'http' ? '_blank' : '_self';

	switch (props.layout) {
	case 'horizontal':
		return (
			<div className={"callout row-2col"}>
				<div className="gridItem">
					<div className={`imgContainer ${myShape} calloutImageHoriz`}>
						{ props.url
							? <a href={props.url} target={calloutTarget} rel="noopener noreferrer"><img src={props.img} alt={props.title} /></a>
							: <img src={props.img} alt={(props.alt) ? props.alt : props.title} />
						}
					</div>
				</div>
				<div className="gridItem">
					<div className="calloutBody">
						{ (props.url)
							? <CalloutHeader url={props.url} title={props.title} />
							: <CalloutHeader title={props.title} />
						}
						<div className="calloutSubtitle">
							{ (props.subtitle) ? ( <><h3>{props.subtitle}</h3><br /></> ) : null}
						</div>
						<div className="calloutBody">
							{ (props.content) ? ( <> {props.content} <br /><br /> </> ) : null}
							{ (props.url) 
								? <div className="centeredbutton"><a href={props.url} target={calloutTarget} rel="noopener noreferrer">{props.title}</a></div>
								: null
							}
						</div>
					</div>
				</div>
			</div>
		) ;

	case 'horizontal2':
		return (
			<div className={`callout row-1col`}>
				<div className="gridItem center">
					{ (props.url)
						? <CalloutHeader url={props.url} title={props.title} />
						: <CalloutHeader title={props.title} />
					}
				</div>
				<div className="row-2col">
					<div className="gridItem">
						<div className={`imgContainer ${myShape} calloutImageHoriz`}>
							{ (props.url)
								? <a href={props.url} target={calloutTarget} rel="noopener noreferrer"><img src={props.img} alt={props.title} /></a>
								: <img src={props.img} alt={(props.alt) ? props.alt : props.title} />
							}
						</div>
					</div>
					<div className="gridItem">
						<div className="calloutBody">
							<div className="calloutSubtitle">
								{ (props.subtitle) ? ( <><h3>{props.subtitle}</h3><br /></> ) : null}
							</div>
							<div className="calloutContent grid12">
								{ (props.content) ? ( <> {props.content} <br /><br /> </> ) : null}
								{ (props.url)
									? <div className="centeredbutton"><a href={props.url} target={calloutTarget} rel="noopener noreferrer">{props.title}</a></div>
									: null
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		) ;

	case 'vertical':
		return (
			<div className={`callout row-1col `}>
				<div className="gridItem center">
					<div className={`imgContainer ${myShape} calloutImageVert center`}>
						{ (props.url)
							? <a href={props.url} target={calloutTarget} rel="noopener noreferrer"><img src={props.img} alt={props.title} /></a>
							: <img src={props.img} alt={(props.alt) ? props.alt : props.title} />
						}
					</div>
				</div>
				<div className="gridItem center">
					<div className="calloutBody">
						{ (props.url)
							? <CalloutHeader url={props.url} title={props.title} />
							: <CalloutHeader title={props.title} />
						}
						<div className="calloutSubtitle center">
							{ (props.subtitle) ? ( <><h3>{props.subtitle}</h3><br /></> ) : null}
						</div>
						<div className="calloutContent center">
							{ (props.content) ? ( <> {props.content} <br /><br /> </> ) : null}
							{ (props.url)
								? <div className="centeredbutton"><a href={props.url} target={calloutTarget} rel="noopener noreferrer">{props.title}</a></div>
								: null
							}
						</div>
					</div>
				</div>
			</div>
		) ;

	}
}
Callout.propTypes = {
	url: PropTypes.string,
	img: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string,
	content: PropTypes.string.isRequired,
	layout: PropTypes.string,
	shape: PropTypes.string,
	alt: PropTypes.string,
};


/* ========== CALLOUT HEADER ========== */


export function CalloutHeader(props: CalloutHeaderType) {
	const calloutTarget = props.url && props.url.substring(0, 4).toLowerCase() === 'http' ? '_blank' : '_self';
	return (
		<div className="calloutHeader">
			{props.url
				? <a href={props.url} target={calloutTarget} rel="noopener noreferrer"><h2 className="calloutTitle">{props.title}</h2></a>
				: <h2 className="calloutTitle">{props.title}</h2>
			}
		</div>
	);
}
CalloutHeader.propTypes = {
	title: PropTypes.string.isRequired,
	url: PropTypes.string
};


/* ========== CALLOUT SMALL ========== */


export function CalloutSmall(props: CalloutType) {
	const myShape = validateShape(props.shape); 
	return (
		<div>
			<div className={`imgContainer ${myShape} gridItem center`}>
				<a href={props.url} target="_blank"rel="noopener noreferrer">
					<img src={props.img} alt={(props.alt) ? props.alt : props.title} 
						onClick={(props.imgclick) ? event => props.imgclick?.(event, props.url) : () => window.open(props.url, '_blank') } 
					/>
				</a>
			</div>
			{ (props.title) ? <div className="calloutHeader gridItem center">
				{ props.url
					? <CalloutHeaderSmall url={props.url} title={props.title} />
					: <CalloutHeaderSmall title={props.title} />
				}
			</div> : null }
		</div>
	);
}
CalloutSmall.propTypes = {
	url: PropTypes.string,
	imgclick: PropTypes.func,
	img: PropTypes.string.isRequired,
	title: PropTypes.string,
	shape: PropTypes.string,
	alt: PropTypes.string,
};


/* ========== CALLOUT HEADER SMALL ========== */


export function CalloutHeaderSmall(props: CalloutHeaderType) {
	const calloutTarget = props.url && props.url.substring(0, 4).toLowerCase() === 'http' ? '_blank' : '_self';
	return (
		<div className="calloutHeader">
			{props.url
				? <a href={props.url} target={calloutTarget} rel="noopener noreferrer"><h3 className="calloutTitle">{props.title}</h3></a>
				: <h3 className="calloutTitle">{props.title}</h3>
			}
		</div>
	);
}
CalloutHeaderSmall.propTypes = {
	title: PropTypes.string.isRequired,
	url: PropTypes.string
};



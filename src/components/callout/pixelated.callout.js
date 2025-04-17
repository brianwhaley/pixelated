import React from 'react';
import PropTypes from 'prop-types';
import './pixelated.callout.css';

/* ========== CALLOUT ========== */

Callout.propTypes = {
	url: PropTypes.string,
	img: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	direction: PropTypes.string,
	columnCount: PropTypes.number
};
export function Callout(props){
// export function Callout(props) {
	const columnGridStyle = props.columnCount ? 'grid' + (12 / props.columnCount) : 'grid4';
	const calloutColumnGridStyle = "callout column " + columnGridStyle;
	const calloutGridStyle = props.direction && props.direction === 'horizontal' ? 'grid6' : 'grid12';
	const calloutImageStyle = props.direction && props.direction === 'horizontal' ? "roundImgContainer calloutImage calloutImageHoriz" : "roundImgContainer calloutImage";
	const calloutTarget = props.url && props.url.substring(0, 4).toLowerCase() === 'http' ? '_blank' : '_self';

	return (
		<div className={calloutColumnGridStyle}>
			<div className={calloutGridStyle}>
				<div className={calloutImageStyle}>
					{ props.url
						? <a href={props.url} target={calloutTarget} rel="noopener noreferrer"><img src={props.img} alt={props.title} /></a>
						: <img src={props.img} alt={props.title} />
					}
				</div>
			</div>
			<div className={calloutGridStyle}>
				{ props.url
					? <CalloutHeader url={props.url} title={props.title} />
					: <CalloutHeader title={props.title} />
				}
				<div className="calloutBody grid12">
					{props.content}
					<br/><br/>
					{ props.url
						? <div className="centeredbutton"><a href={props.url} target={calloutTarget} rel="noopener noreferrer">{props.title}</a></div>
						: null
					}
				</div>
			</div>
		</div>
	);
}


/* ========== CALLOUT HEADER ========== */

CalloutHeader.propTypes = {
	title: PropTypes.string.isRequired,
	url: PropTypes.string
};
export function CalloutHeader(props) {
	const calloutTarget = props.url && props.url.substring(0, 4).toLowerCase() === 'http' ? '_blank' : '_self';
	return (
		<div className="calloutHeader grid12">
			{props.url
				? <a href={props.url} target={calloutTarget} rel="noopener noreferrer"><h2 className="calloutTitle">{props.title}</h2></a>
				: <h2 className="calloutTitle">{props.title}</h2>
			}
		</div>
	);
}


CalloutRoundSm.propTypes = {
	url: PropTypes.string.isRequired,
	img: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired
};
export function CalloutRoundSm(props) {
	return (
		<div className="grid4fix pad">
			<div className="roundImgContainer grid12">
				<a href={props.url} target="_blank"rel="noopener noreferrer">
					<img src={props.img} alt={props.title}/>
				</a>
			</div>
			<div className="calloutHeader grid12">
				<a href={props.url} target="_blank" rel="noopener noreferrer">
					<h3 className="calloutTitle">{props.title}</h3>
				</a>
			</div>
		</div>
	);
}



export const CalloutRoundTiny = (props) => {
	CalloutRoundTiny.defaultProps = {
		gridSize: "2"
	};
	CalloutRoundTiny.propTypes = {
		url: PropTypes.string.isRequired,
		imgclick: PropTypes.func,
		img: PropTypes.string.isRequired,
		title: PropTypes.string,
		alt: PropTypes.string.isRequired,
		gridSize: PropTypes.string.isRequired
	};
	/* 
				<a href={props.url} target="_blank" onClick={props.onclick} rel="noopener noreferrer">
				<a href="#" onClick={props.onclick} rel="noopener noreferrer"></a>

	*/
	return (
		<div className={"roundImgContainer " + (props.img ? 'grid' + props.gridSize + 'fix' : 'grid' + props.gridSize + 'fix noMobile')} >
			<img src={props.img} alt={props.alt} 
				onClick={(props.imgclick) ? event => props.imgclick(event, props.url) : () => window.open(props.url, '_blank') } 
			/>
		</div>
	);
};

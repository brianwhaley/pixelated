"use client";

import React, { useState, useEffect, useRef } from 'react';
import PropTypes /* , { InferProps } */ from 'prop-types';
import { DragHandler } from './carousel.drag';
import './carousel.css';
import { SmartImage } from '../cms/cloudinary.image';
import { useOptionalPixelatedConfig } from '../config/config.client';

/* 
TODO: #20 Carousel bug conflict with drag and click
*/


/* ========== CAROUSEL IMAGE ORIENTATION ========== */
/* https://stackoverflow.com/questions/43430498/detecting-orientation-of-images-with-javascript */



export type CarouselCardType = {
	index: number,
	cardIndex: number,
	cardLength: number,
	link?: string,
	linkTarget?: string,
	image: string,
	imageAlt?: string,
	imgFit?: 'contain' | 'cover' | 'fill',
	headerText?: string,
	subHeaderText?: string,
	bodyText?: string,
};

function capitalize(str: string) {
	return str && String(str[0]).toUpperCase() + String(str).slice(1);
}


/* ========== CAROUSEL ========== */
Carousel.propTypes = {
	cards: PropTypes.array.isRequired,
	draggable: PropTypes.bool,
	imgFit: PropTypes.oneOf(['contain', 'cover', 'fill'])
};
// export type CarouselType = InferProps<typeof Carousel.propTypes>;
export function Carousel(
	props: { 
		cards: CarouselCardType[],
		draggable?: boolean,
		imgFit?: 'contain' | 'cover' | 'fill' ,
	}) {

	const debug = false;
	let timer = useRef<ReturnType<typeof setTimeout>>(null);
	const [ cardIndex, setcardIndex ] = useState(0);

	function startTimer() {
		if (timer.current) clearTimeout(timer.current);
  		timer.current = setTimeout(nextCard, 5000); 
	}
	function stopTimer() {
		if (timer.current) clearTimeout(timer.current);
	}

	function previousCard() {
		if (debug) console.log("Going to Previous card : ", cardIndex, " => ", cardIndex - 1);
		if (cardIndex === 0) {
			setcardIndex(props.cards.length - 1);
		} else {
			setcardIndex(cardIndex - 1);
		}
		startTimer();
	};

	function nextCard() {
		if (debug) console.log("Going to Next card : ", cardIndex, " => ", cardIndex + 1);
		if (cardIndex === props.cards.length - 1) {
			setcardIndex(0);
		} else {
			setcardIndex(cardIndex + 1);
		}
		startTimer();
	};

	useEffect(() => {
		if (typeof document !== 'undefined') {
			startTimer();
		}
	}, [cardIndex]);

	/* ========== DRAGGABLE HANDLER ========== */
	if (props.draggable && props.draggable === true) {
		if (debug) console.log('CarouselSimple: Dragging enabled');
		DragHandler({
			activeIndex: cardIndex, 
			targetDiv: 'carouselCardWrapper', 
			nextImage: nextCard, 
			previousImage: previousCard
		});
	} else {
		if (debug) console.log('CarouselSimple: Dragging disabled');
	}

	if (props.cards && props.cards.length > 0) {
		return (
			<div className="carouselContainer">
				<div className="carouselCardsContainer">
					{ props.cards.map((card: CarouselCardType, i: number) => (
						<CarouselCard
							key={i}
							index={i}
							cardIndex={cardIndex}
							cardLength={props.cards.length}
							link={card.link}
							linkTarget={card.linkTarget || '_self'}
							image={card.image}
							imageAlt={card.imageAlt}
							imgFit={props.imgFit ? props.imgFit : 'fill'}	
							headerText={card.headerText} 	
							subHeaderText={card.subHeaderText} 
							bodyText={card.bodyText}
						/>
					))}
				</div>
				<div className="carouselButtons">
					<CarouselButton
						clickFunction={ previousCard }
						glyph='&#9664;' />
					<CarouselButton
						clickFunction={ stopTimer }
						glyph='&#x23F8;' />
					<CarouselButton
						clickFunction={ nextCard }
						glyph='&#9654;' />
				</div>
				
			</div>
		);
	} else {
		return (
			<div className='section-container'>
				<div className="carouselContainer">
					<CarouselLoading />
				</div>
			</div>
		);
	}
}



/* ========== CAROUSEL CARD ========== */
function CarouselCard( props: CarouselCardType ) {
	const myZindex = props.cardLength - props.index;
	const styles: React.CSSProperties = {
		zIndex: myZindex
	};
	styles.transition = 'all 1.0s ease 0.1s';
	if (props.index > props.cardIndex) {
		styles.transform = 'translateX(100%)';
	} else if (props.index === props.cardIndex) {
		styles.transform = 'translateX(0%)';
	} else if (props.index < props.cardIndex) {
		styles.transform = 'translateX(-100%)';
	}
	const imgFit = props.imgFit ? "img" + capitalize(props.imgFit) : 'imgFill';
	const config = useOptionalPixelatedConfig();	
	const cardBody = (
		< div draggable='false'>
			{ (props.link) ? <div draggable='false' className="carouselCardLink" /> : null }
			{ (props.image) ? <div draggable='false' className="carouselCardImage">
				{ /* <img draggable='false' src={props.image} title={props?.imageAlt} alt={props?.imageAlt} className={imgFit} /> */ }
				<SmartImage draggable={false} src={props.image} title={props?.imageAlt} 
					alt={props?.imageAlt || ""} className={imgFit} 
					cloudinaryEnv={config?.cloudinary?.product_env ?? undefined}
					cloudinaryDomain={config?.cloudinary?.baseUrl ?? undefined}
					cloudinaryTransforms={config?.cloudinary?.transforms ?? undefined} />
			</div> : null }
			{ (props.headerText) ? <div draggable='false' className="carouselCardHeader">
				<h3 draggable='false'>{props.headerText}</h3>
			</div> : null  }
			{ (props.subHeaderText) ? <div draggable='false' className="carouselCardSubHeader">
				<h4 draggable='false'>{props.subHeaderText}</h4>
			</div> : null  }
			{ (props.bodyText) ? <div draggable='false' className="carouselCardBody">{props.bodyText}</div> : null  }
		</div>
	);
	return (
		<div draggable='true' id={'c-' + props.index} className="carouselCardWrapper" style={styles}>
			<div draggable='false' className="carouselCard">
				{ (props.link) ? <a draggable='false' href={props.link} target={props.linkTarget}>{ cardBody }</a> : cardBody }
			</div>
		</div>
		
	);
}
// REMOVED PROPTYPE AS TYPESCRIPT TYPE COVERS THIS



/* ========== CAROUSEL  ARROW ========== */
CarouselButton.propTypes = {
	clickFunction: PropTypes.func.isRequired,
	glyph: PropTypes.string.isRequired
};
function CarouselButton(props: { clickFunction: React.MouseEventHandler<HTMLDivElement> | undefined; glyph: string; }) {
	return (
		<div className={`carouselButton textOutline`}
			onClick={ props.clickFunction }>
			{ props.glyph }
		</div>
	);
}



CarouselArrow.propTypes = {
	direction: PropTypes.string.isRequired,
	clickFunction: PropTypes.func.isRequired,
	glyph: PropTypes.string.isRequired
};
function CarouselArrow(props: { direction: string; clickFunction: React.MouseEventHandler<HTMLDivElement> | undefined; glyph: string; }) {
	return (
		<div className={`carouselButton${capitalize(props.direction)} textOutline`}
			onClick={ props.clickFunction }>
			{ props.glyph }
		</div>
	);
}



/* ========== CAROUSEL LOADING ========== */
function CarouselLoading() {
	return (
		<div className="carouselLoading horizontal-centered vertical-centered centered">
			<div>Loading...</div>
		</div>
	);
}

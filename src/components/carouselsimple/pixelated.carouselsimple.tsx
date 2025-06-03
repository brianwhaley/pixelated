"use client";

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './pixelated.carouselsimple.css';

export type CarouselCard = {
	index: number,
	cardIndex: number,
	cardLength: number,
	link?: string,
	image: string,
	imageAlt?: string,
	imgFit?: 'contain' | 'cover' | 'fill',
	headerText?: string,
	bodyText?: string,
};

function capitalize(str: string) {
	return str && String(str[0]).toUpperCase() + String(str).slice(1);
}

/* https://stackoverflow.com/questions/43430498/detecting-orientation-of-images-with-javascript */
/* function getImageOrientation(img: HTMLImageElement) {
  if (img.naturalHeight > img.naturalWidth) {
    img.classList.add("portrait")
  } else if (img.naturalHeight < img.naturalWidth) {
    img.classList.add("landscape")
  } else if (img.naturalHeight === img.naturalWidth) {
	img.classList.add("square")
  }
}*/

/* ========== CAROUSEL ========== */
export function CarouselSimple(props: { cards: CarouselCard[]; imgFit: 'contain' | 'cover' | 'fill' ; }) {
	const debug = false;
	let timer = useRef<NodeJS.Timeout | null>(null);
	// const [ cards, setCards ] = useState();
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
  		//Runs only on the first render
	}, [cardIndex]);

	/* useEffect(() => {
		if (typeof document !== 'undefined') {
			var pics = document.querySelectorAll(".carouselCardsContainer img");
			for (let i = 0; i < pics.length; i++) {
				const pic = pics[i] as HTMLImageElement;
				if (pic.complete) {
					// The image is already loaded, call handler
					console.log("Image already loaded: ", pic.src);
					getImageOrientation(pic);
				} else {
					// The image is not loaded yet, set load event handler
					console.log
					pic.addEventListener("load", function(this: HTMLImageElement) {
						getImageOrientation(this);
					});
				}
			}
		}
  		//Runs only on the first render
	}, []); */

	if (props.cards.length > 0) {
		return (
			<div className="carouselContainer">
				<div className="carouselCardsContainer">
					{ props.cards.map((card, i) => (
						<CarouselCard
							key={i}
							index={i}
							cardIndex={cardIndex}
							cardLength={props.cards.length}
							link={card.link}
							image={card.image}
							imageAlt={card.imageAlt}
							imgFit={props.imgFit ? props.imgFit : 'fill'}	
							headerText={card.headerText} 
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
CarouselSimple.propTypes = {
	cards: PropTypes.object.isRequired,
	imgFit: PropTypes.oneOf(['contain', 'cover', 'fill'])
};


/* ========== CAROUSEL CARD ========== */
function CarouselCard( props: CarouselCard ) {
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
	const cardBody = (
		<>
			{ (props.image) ? <div className="carouselCardImage"><img src={props.image} alt={props?.imageAlt} className={imgFit} /></div> : null }
			{ (props.headerText) ? <div className="carouselCardHeader"><h3>{props.headerText}</h3></div> : null  }
			{ (props.bodyText) ? <div className="carouselCardBody">{props.bodyText}</div> : null  }
		</>
	);
	return (
		<div id={'c-' + props.index} className="carouselCardWrapper" style={styles}>
			<div className="carouselCard" >
				{ (props.link) ? <a href={props.link}>{ cardBody }</a> : cardBody }
			</div>
		</div>
		
	);
}
/* 
// REMOVE PROPTYPE AS TYPESCRIPT TYPE COVERS THIS
// CarouselCard.propTypes = {
	index: PropTypes.number.isRequired,
	cardIndex: PropTypes.number.isRequired,
	cardLength: PropTypes.number.isRequired,
	link: PropTypes.string,
	image: PropTypes.string.isRequired,
	imageAlt: PropTypes.string,
	headerText: PropTypes.string,
	bodyText: PropTypes.string,
}; */


/* ========== CAROUSEL  ARROW ========== */
function CarouselButton(props: { clickFunction: React.MouseEventHandler<HTMLDivElement> | undefined; glyph: string; }) {
	return (
		<div className={`carouselButton textOutline`}
			onClick={ props.clickFunction }>
			{ props.glyph }
		</div>
	);
}
CarouselButton.propTypes = {
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
CarouselArrow.propTypes = {
	direction: PropTypes.string.isRequired,
	clickFunction: PropTypes.func.isRequired,
	glyph: PropTypes.string.isRequired
};


/* ========== CAROUSEL LOADING ========== */
function CarouselLoading() {
	return (
		<div className="carouselLoading horizontal-centered vertical-centered centered">
			<div>Loading...</div>
		</div>
	);
}


"use client";

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './pixelated.carouselsimple.css';

function capitalize(str) {
	return str && String(str[0]).toUpperCase() + String(str).slice(1);
}


/* ========== CAROUSEL ========== */
export function CarouselSimple(props) {
	const debug = false;
	let timer = useRef();
	// const [ cards, setCards ] = useState();
	const [ cardIndex, setcardIndex ] = useState(0);

	function startTimer() {
  		clearTimeout(timer.current);
  		timer.current = setTimeout(nextCard, 5000); 
	}
	function stopTimer() {
  		clearTimeout(timer.current);
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
	cards: PropTypes.object.isRequired
};


/* ========== CAROUSEL CARD ========== */
export function CarouselCard(props) {
	const myZindex = props.cardLength - props.index;
	const styles = {
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
	const cardBody = (
		<>
			{ (props.image) ? <div className="carouselCardImage"><img src={props.image} /></div> : null }
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
CarouselCard.propTypes = {
	index: PropTypes.number.isRequired,
	cardIndex: PropTypes.number.isRequired,
	cardLength: PropTypes.number.isRequired,
	link: PropTypes.string,
	image: PropTypes.string.isRequired,
	headerText: PropTypes.string,
	bodyText: PropTypes.string,
};


/* ========== CAROUSEL  ARROW ========== */
export function CarouselButton(props) {
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

export function CarouselArrow(props) {
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
export function CarouselLoading() {
	return (
		<div className="carouselLoading horizontal-centered vertical-centered centered">
			<div>Loading...</div>
		</div>
	);
}


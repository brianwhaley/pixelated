
// import React, { useState, useEffect } from 'react';
import PropTypes, { InferProps } from "prop-types";
import './microinteractions.css';

/* ========== MICRO ANIMATIONS ========== */
MicroInteractions.propTypes = {
	buttonring: PropTypes.bool,
	cartpulse: PropTypes.bool,
	formglow: PropTypes.bool,
	grayscalehover: PropTypes.bool,
	imgscale: PropTypes.bool,
	imgtwist: PropTypes.bool,
	imghue: PropTypes.bool,
	simplemenubutton: PropTypes.bool,
	scrollfadeElements: PropTypes.string,
};
export type MicroInteractionsType = InferProps<typeof MicroInteractions.propTypes> & { [key: string]: unknown };
export function MicroInteractions(props: MicroInteractionsType) {
	// const debug = true ;
	const body = document.body;
	for (const propName in props) {
		if (Object.prototype.hasOwnProperty.call(props, propName)) {
			if (props[propName] === true) {
				body.classList.add(propName);
			} else if (props[propName] === false) {
				body.classList.remove(propName);
			}
		}
	}
	if (props.scrollfadeElements) ScrollFade(props.scrollfadeElements as string);
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isElementInViewport(el: Element) {
	const rect = el.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}


function isElementPartiallyInViewport(el: Element) {
	const rect = el.getBoundingClientRect();
	return (
		rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
		rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
		rect.bottom > 0 &&
		rect.right > 0
	);
}


function ScrollFade(elements: string) {
	const options = {
		root: null, // Observes intersection with the viewport
		rootMargin: "0px 0px -100px 0px", // Shrinks the top of the root by 200px
		threshold: 0 // Triggers when any part of the element intersects the adjusted root
	};
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
			// if (entry.intersectionRatio > 0.5) {
			// Add the animation class when the element enters the viewport
				entry.target.classList.add('scrollfade');
				entry.target.classList.remove('hidden');
				// Optionally, stop observing once animated if you only want it to animate once
				observer.unobserve(entry.target);
			} else {
				// Optionally, remove the animation class if you want it to re-animate on re-entry
				// entry.target.classList.remove('hidden');
				// entry.target.classList.remove('scrollfade');
			}
		});
	}, options);
	// Select the elements you want to observe and initially hide them
	const elementsToAnimate = document.querySelectorAll(elements);
	elementsToAnimate.forEach((element) => {
		if( isElementPartiallyInViewport(element) ) {
			if (element.classList.contains('hidden')) {
				element.classList.remove('hidden');
			}
			if (element.classList.contains('scrollfade')) {
				element.classList.remove('scrollfade');
			}
		} else {
			// Apply initial hidden state to elements NOT on the screen
			element.classList.add('hidden'); // Apply initial hidden state
			observer.observe(element); // Start observing each element
		}
	});
}

'use client';

import React from 'react';
import PropTypes from 'prop-types';
import './pixelated.menu-expando.css';


/* 
NOTE : 
Stopped development on details / summary for now.
Not enough css control for animation.
*/


/* ========== MENU ========== */
export function MenuExpando(props: any) {
	// const debug = false;

	function generateMenuItems() {
		const myItems = [];
		for (const itemKey in props.menuItems) {
			myItems.push(<MenuExpandoItem key={itemKey} name={itemKey} href={props.menuItems[itemKey]} />);
		}
		return myItems;
	}

	return (
		<div className="menuExpando" id="menuExpando">
			<details className="menuExpandoWrapper" id="menuExpandoWrapper">
				<summary></summary>
				<ul>
					{ generateMenuItems() }
				</ul>
			</details>
		</div>
	);
}
MenuExpando.propTypes = {
	menuItems: PropTypes.object.isRequired
};


/* ========== MENU ITEM ========== */
export function MenuExpandoItem(props: any) {
	return (
		<li><a href={props.href}>{props.name}</a></li>
	);
}
MenuExpandoItem.propTypes = {
	name: PropTypes.string.isRequired,
	href: PropTypes.string.isRequired
};


/* ========== MENU BUTTON ========== */
export function MenuExpandoButton() {

	function handleMenuExpandoButtonClick(event: React.MouseEvent<HTMLDivElement>){
		const debug = false; 
		if (debug) console.log("MenuExpandoButton clicked");
		event.preventDefault();
		event.stopPropagation();
		// const button = document.getElementById('menuExpandoButton');
		const details = document.getElementById('menuExpandoWrapper') as HTMLDetailsElement;
		if (details) details.open = !details.open;
	}

	return (
		<div className="menuExpandoButton" id="menuExpandoButton" onClick={handleMenuExpandoButtonClick}>
			<img src="/images/icons/mobile-menu2.png" alt="Mobile Menu"/>
		</div>
	);
}
MenuExpandoButton.propTypes = {
};

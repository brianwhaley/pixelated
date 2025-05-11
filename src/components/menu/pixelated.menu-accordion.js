'use client';

import React, { Component, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './pixelated.menu-accordion.css';
import { set } from 'date-fns';

/* 
TODO #18 Menu Accordion Component : Add SubMenu Indicator
*/


function generateMenuItems(menuData, hidden) {
	let myItems = [];
	for (const itemKey in menuData) {
		const myItem = menuData[itemKey];
		if ( typeof myItem === 'object' && myItem !== null ){
			// MENU GROUP
			myItems.push(
				<MenuAccordionItem key={itemKey + "-i"} name={"▶ " + itemKey} />,
				<MenuAccordionGroup key={itemKey + "-g"} menuItems={myItem} hidden={true} />
			);
		} else {
			// INDIVIDUAL MENU ITEM
			myItems.push(<MenuAccordionItem key={itemKey} name={itemKey} href={myItem} />);
		};
	}
	return myItems;
}

/* ========== MENU ========== */
export function MenuAccordion(props) {
	
	const debug = false;
	const left = useRef(-250);
	function setLeft(leftVal) { left.current = leftVal; };
	const documentRef = useRef(null);
	const [ menuItems, setMenuItems ] = useState();

	function moveMenu() {
		if (debug) console.log("Moving Menu... Left: ", left);
		const menu = documentRef.current.getElementById('accordionMenu');
		const menuParent = menu.parentElement;
		if (left.current === 0) { 
			if (debug) console.log("Moving Menu Out");
			menuParent.classList.remove('accordionDown'); /* accordionIn */
			menuParent.classList.add('accordionUp'); /* accordionOut */
			setLeft( -250 ); 
		} else { 
			if (debug) console.log("Moving Menu In");
			menuParent.classList.remove('accordionUp'); /* accordionOut */
			menuParent.classList.add('accordionDown'); /* accordionIn */
			setLeft( 0 ); 
		}
	};

	function expandMenuItem(clickedItem) {
		if (debug) console.log("Expanding Menu Item...");
		const subMenu = clickedItem.parentElement.nextElementSibling;
		if (subMenu.classList.contains('menuHide')) { 
			if (debug) console.log("Opening Submenu");
			subMenu.classList.add('menuShow'); 
			subMenu.classList.remove('menuHide'); 
		} else { 
			if (debug) console.log("Closing Submenu");
			subMenu.classList.add('menuHide'); 
			subMenu.classList.remove('menuShow'); 
		}
		
	}
	
	useEffect(() => {
		window.moveMenu = moveMenu; // attach moveMenu function to the window object for use in MenuAccordionButton
		documentRef.current = document; // for moveMenu
		const menu = document.getElementById('accordionMenu');
		const menuBtn = document.getElementById('panelMenuButton');
		function handleMenuClick(event) {
			if (debug) console.log("event : ", event, "target : ", event.target);
			// const isClicked = (menu.contains(event.target) || menuBtn.contains(event.target));
			const isMenuClicked = menu.contains(event.target);
			const isMenuBtnClicked = menuBtn.contains(event.target);
			if (debug) console.log("isMenuBtnClicked : ", isMenuBtnClicked);
			if (isMenuClicked) {
				// MENU ITEM CLICKED
				if(!event.target.href) {
					// NO HREF - EXPAND / COLLAPSE SUB MENU
					event.stopPropagation();
					expandMenuItem(event.target);
				} else {
					// HREF - NAVIGATE
				}
			} else if (isMenuBtnClicked) {
				// MENU BUTTON CLICKED
				// event.preventDefault();
				event.stopPropagation();
				moveMenu();
			} else if (!isMenuBtnClicked && left.current === 0 ) {
				// NON-MENU AREA CLICKED
				moveMenu();
			}
		};
		document.addEventListener('click', handleMenuClick, true);
		return () => {
			document.removeEventListener('click', handleMenuClick);
		};
	}, [] );

	return (
		<div className="accordionMenuWrapper accordionUp">
			<div className="accordionMenu" id="accordionMenu">
				<MenuAccordionGroup key="accordionRoot" menuItems={props.menuItems} />
			</div>
		</div>
	);
}
MenuAccordion.propTypes = {
	menuItems: PropTypes.object.isRequired
};




/* ========== MENU GROUP ========== */
export function MenuAccordionGroup(props) {
	return (
		<ul className={(props.hidden ? "menuHide" : "menuShow")} >
			{ generateMenuItems( props.menuItems ) }
		</ul>
	);
}
MenuAccordionGroup.propTypes = {
	menuItems: PropTypes.string.isRequired,
	hidden: PropTypes.bool,
};



/* ========== MENU ITEM ========== */
export function MenuAccordionItem(props) {
	return (
		<li><a href={props.href}>{props.name}</a></li>
	);
}
MenuAccordionItem.propTypes = {
	name: PropTypes.string.isRequired,
	href: PropTypes.string.isRequired
};




/* ========== MENU BUTTON ========== */
export function MenuAccordionButton(props) {
	function slideMobilePanel() {
		window.moveMenu();
	} 
	return (
		<div className="panelMenuButton pull-left" id="panelMenuButton" onClick={slideMobilePanel}>
			<img src="/images/icons/mobile-menu2.png" alt="Mobile Menu"/>
		</div>
	);
}
MenuAccordionButton.propTypes = {
};

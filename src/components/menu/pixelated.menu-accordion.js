'use client';

import React, { Component, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './pixelated.menu-accordion.css';

/* ========== MENU ========== */
export function MenuAccordion(props) {
	MenuAccordion.propTypes = {
		menuItems: PropTypes.object.isRequired
	};

	const debug = false;
	const left = useRef(-250);
	function setLeft(leftVal) { left.current = leftVal; };
	const documentRef = useRef(null);

	function generateMenuItems() {
		const myItems = [];
		for (const itemKey in props.menuItems) {
			myItems.push(<MenuAccordionItem key={itemKey} name={itemKey} href={props.menuItems[itemKey]} />);
		}
		return myItems;
	}

	function moveMenu() {
		if (debug) console.log("Moving Menu... Left: ", left);
		const menu = documentRef.current.getElementById('accordionMenu');
		const menuParent = menu.parentElement;
		if (left.current === 0) { 
			if (debug) console.log("Moving Menu Out");
			menuParent.classList.remove('accordionIn');
			menuParent.classList.add('accordionOut');
			setLeft( -250 ); 
		} else { 
			if (debug) console.log("Moving Menu In");
			menuParent.classList.remove('accordionOut');
			menuParent.classList.add('accordionIn');
			setLeft( 0 ); 
		}
	};
	
	useEffect(() => {
		window.moveMenu = moveMenu; // attach moveMenu function to the window object for use in MenuAccordionButton
		documentRef.current = document; // for moveMenu
		const menu = document.getElementById('accordionMenu');
		const menuBtn = document.getElementById('panelMenuButton');
		function handleMenuClick(event) {
			if (debug) console.log("event : ", event, "target : ", event.target);
			const isClicked = (menu.contains(event.target) || menuBtn.contains(event.target));
			if (debug) console.log("isClicked : ", isClicked);
			if (isClicked) {
				// event.preventDefault();
				event.stopPropagation();
				moveMenu();
			} else if (!isClicked && left.current === 0 ) {
				moveMenu();
			}
		};
		document.addEventListener('click', handleMenuClick, true);
		return () => {
			document.removeEventListener('click', handleMenuClick);
		};
	}, [] );

	return (
		<div className="accordionMenuWrapper accordionOut">
			<div className="accordionMenu" id="accordionMenu">
				<ul>
					{ generateMenuItems() }
				</ul>
			</div>
		</div>
	);
}

/* ========== MENU ITEM ========== */
export function MenuAccordionItem(props) {
	MenuAccordionItem.propTypes = {
		name: PropTypes.string.isRequired,
		href: PropTypes.string.isRequired
	};

	return (
		<li><a href={props.href}>{props.name}</a></li>
	);
}

/* ========== MENU BUTTON ========== */
export function MenuAccordionButton(props) {
	MenuAccordionButton.propTypes = {
	};
	
	function slideMobilePanel() {
		window.moveMenu();
	} 

	return (
		<div className="panelMenuButton pull-left" id="panelMenuButton" onClick={slideMobilePanel}>
			<img src="/images/mobile-menu2.png" alt="Mobile Menu"/>
		</div>
	);

}

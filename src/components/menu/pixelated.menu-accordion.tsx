'use client';

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './pixelated.menu-accordion.css';

declare global {
	interface Window {
		moveMenu: () => void;
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function generateMenuItems(menuData: { [x: string]: any; }, hidden: boolean) {
	let myItems = [];
	for (const itemKey in menuData) {
		const myItem = menuData[itemKey];
		if ( typeof myItem === 'object' && myItem !== null ){
			// MENU GROUP
			myItems.push(
				<MenuAccordionItem key={itemKey + "-i"} name={"▶ " + itemKey} href={''} />,
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
export function MenuAccordion(props: { menuItems: any; }) {
	const debug = false;
	const left = useRef(-250);
	function setLeft(leftVal: number) { left.current = leftVal; };
	const documentRef = useRef<Document | null>(null);
	// const [ menuItems, setMenuItems ] = useState();
	function moveMenu() {
		if (debug) console.log("Moving Menu... Left: ", left);
		const menu = documentRef.current ? documentRef.current.getElementById('accordionMenu') : null;
		const menuParent = menu ? menu.parentElement : null;
		if (left.current === 0) { 
			if (debug) console.log("Moving Menu Out");
			menuParent?.classList.remove('accordionDown'); /* accordionIn */
			menuParent?.classList.add('accordionUp'); /* accordionOut */
			setLeft( -250 ); 
		} else { 
			if (debug) console.log("Moving Menu In");
			menuParent?.classList.remove('accordionUp'); /* accordionOut */
			menuParent?.classList.add('accordionDown'); /* accordionIn */
			setLeft( 0 ); 
		}
	};

	function expandMenuItem(clickedItem: Element) {
		if (debug) console.log("Expanding Menu Item...");
		const parent = clickedItem.parentElement;
		const subMenu = parent?.nextElementSibling;
		if (subMenu && subMenu.classList.contains('menuHide')) { 
			if (debug) console.log("Opening Submenu");
			subMenu.classList.add('menuShow'); 
			subMenu.classList.remove('menuHide'); 
		} else { 
			if (debug) console.log("Closing Submenu");
			if (subMenu) subMenu.classList.add('menuHide'); 
			if (subMenu) subMenu.classList.remove('menuShow'); 
		}
		
	}
	
	useEffect(() => {
		window.moveMenu = moveMenu; // attach moveMenu function to the window object for use in MenuAccordionButton
		documentRef.current = document; // for moveMenu
		const menu = document.getElementById('accordionMenu');
		const menuBtn = document.getElementById('panelMenuButton');
		function handleMenuClick(event: MouseEvent) {
			if (debug) console.log("event : ", event, "target : ", event.target);
			// const isClicked = (menu.contains(event.target) || menuBtn.contains(event.target));
			const isMenuClicked = menu?.contains(event.target as Element);
			const isMenuBtnClicked = menuBtn?.contains(event.target as Element);
			if (debug) console.log("isMenuBtnClicked : ", isMenuBtnClicked);
			if (isMenuClicked) {
				// MENU ITEM CLICKED
				const target = event.target as HTMLAnchorElement;
				if ( !(target.href) || !(target.href.length > 0)) {
					// NO HREF - EXPAND / COLLAPSE SUB MENU
					// event.preventDefault();
					event.stopPropagation();
					expandMenuItem(target);
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
				<MenuAccordionGroup key="accordionRoot" menuItems={props.menuItems} hidden={undefined} />
			</div>
		</div>
	);
}
MenuAccordion.propTypes = {
	menuItems: PropTypes.object.isRequired
};




/* ========== MENU GROUP ========== */
export function MenuAccordionGroup(props: { menuItems: { [x: string]: any; }; hidden: any; }) {
	return (
		<ul className={(props.hidden ? "menuHide" : "menuShow")} >
			{ generateMenuItems( props.menuItems, props.hidden ) }
		</ul>
	);
}
MenuAccordionGroup.propTypes = {
	menuItems: PropTypes.string.isRequired,
	hidden: PropTypes.bool,
};



/* ========== MENU ITEM ========== */
export function MenuAccordionItem(props: { href: string ; name: string }) {
	if(props.href && props.href.length > 0) {
		return (
			<li><a href={props.href}>{props.name}</a></li>
		);
	} else {
		return (
			<li><a>{props.name}</a></li>
		);
	} 
}
MenuAccordionItem.propTypes = {
	name: PropTypes.string.isRequired,
	href: PropTypes.string.isRequired
};




/* ========== MENU BUTTON ========== */
/* 
https://www.unclebigbay.com/blog/building-the-world-simplest-hamburger-with-html-and-css
*/
export function MenuAccordionButton() {
	function slideMobilePanel() {
		window.moveMenu();
	} 
	return (
		<div className="panelMenuButton pull-left" id="panelMenuButton" onClick={slideMobilePanel}>
			<span className="hamburger textOutline">|||</span>
			{ /* <img src="/images/icons/mobile-menu2.png" alt="Mobile Menu"/> */ }
		</div>

	);
}
MenuAccordionButton.propTypes = {
};

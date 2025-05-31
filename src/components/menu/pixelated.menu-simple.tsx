import React, { } from 'react';
import PropTypes from 'prop-types';
import './pixelated.menu-simple.css';

/* 
TODO #17 Menu Simple Component: Convert to TypeScript
*/

/* ========== MENU ========== */
export function MenuSimple(props: { menuItems: { [x: string]: any; }; }) {
	function generateMenuItems() {
		const myItems = [];
		for (const itemKey in props.menuItems) {
			myItems.push(<MenuSimpleItem key={itemKey} name={itemKey} href={props.menuItems[itemKey]} />);
		}
		return myItems;
	}
  	if (typeof document !== 'undefined') { const menu = document.getElementById('menu'); };
	return (
		<div className="menuWrapper">
			<hr />
			<div className="menu" id="menu">
				<ul>
					{ generateMenuItems() }
				</ul>
			</div>
			<hr />
		</div>
	);
}
MenuSimple.propTypes = {
	menuItems: PropTypes.object.isRequired,
};

/* ========== MENU ITEM ========== */
export function MenuSimpleItem(props: { href: string; name: string; }) {
	return (
		<li className='menuItem'><a href={props.href}>{props.name}</a></li>
	);
}
MenuSimpleItem.propTypes = {
	name: PropTypes.string.isRequired,
	href: PropTypes.string.isRequired,
};

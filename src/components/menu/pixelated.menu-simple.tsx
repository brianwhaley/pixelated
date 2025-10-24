import React, { } from 'react';
import PropTypes, { InferProps } from "prop-types";
import './pixelated.menu-simple.css';

/* ========== MENU ========== */
export function MenuSimple(props: { menuItems: { [x: string]: any; }; }) {
	function generateMenuItems() {
		const myItems = [];
		for (const itemKey in props.menuItems) {
			myItems.push(<MenuSimpleItem key={itemKey} name={itemKey} href={props.menuItems[itemKey]} />);
		}
		return myItems;
	}
  	// if (typeof document !== 'undefined') { const menu = document.getElementById('menu'); };
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

MenuSimpleItem.propTypes = {
	name: PropTypes.string.isRequired,
	href: PropTypes.string.isRequired,
};
export type MenuSimpleItemType = InferProps<typeof MenuSimpleItem.propTypes>;
export function MenuSimpleItem(props: MenuSimpleItemType) {
	return (
		<li className='menuItem'><a href={props.href}>{props.name}</a></li>
	);
}

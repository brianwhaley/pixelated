import React, { } from 'react';
import PropTypes from 'prop-types';
import './pixelated.menu-simple.css';

/* ========== MENU ========== */
export function MenuSimple(props) {
	MenuSimple.propTypes = {
		menuItems: PropTypes.object.isRequired,
	};

	function generateMenuItems() {
		const myItems = [];
		for (const itemKey in props.menuItems) {
			myItems.push(<MenuSimpleItem key={itemKey} name={itemKey} href={props.menuItems[itemKey]} />);
		}
		return myItems;
	}

	const menu = document.getElementById('menu');
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

/* ========== MENU ITEM ========== */
export function MenuSimpleItem(props) {
	MenuSimpleItem.propTypes = {
		name: PropTypes.string.isRequired,
		href: PropTypes.string.isRequired,
	};

	return (
		<li className='menuItem'><a href={props.href}>{props.name}</a></li>
	);
}

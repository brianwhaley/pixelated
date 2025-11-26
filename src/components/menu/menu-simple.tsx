import React, { useEffect } from 'react';
import PropTypes, { InferProps } from "prop-types";
import './menu-simple.css';


/* ========== MENU ========== */
MenuSimple.propTypes = {
	// 	menuItems: PropTypes.object.isRequired,
	menuItems: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired,
		path: PropTypes.string.isRequired,
		target: PropTypes.string,
		hidden: PropTypes.bool,
		routes: PropTypes.array,
	})).isRequired,
};
export function MenuSimple(props: { menuItems: MenuSimpleItemType[] }) {
	function generateMenuItems() {
		const myItems = [];
		for (const itemKey in props.menuItems) {
			const myItem = props.menuItems[itemKey];
			if (myItem && myItem.routes ) { continue; } // Skip nested routes
			myItems.push(<MenuSimpleItem 
				key={itemKey} 
				name={myItem.name} 
				path={myItem.path} 
				target={myItem.target || undefined} 
				hidden={myItem.hidden || undefined}  
			/>);
		}
		return myItems;
	}
	function styleSelectedMenuItem() {
		const menuitems = document.querySelectorAll('.menuItem a');
		const currentURL = window.location.href;
		menuitems.forEach( (menuitem) => {
			if ((menuitem as HTMLAnchorElement).href === currentURL) {
				menuitem.classList.add('selected');
			}
		});
	}
	useEffect(() => {
		styleSelectedMenuItem();
	}, []);
	return (
		<div className="menuWrapper">
			{ /* <hr /> */ }
			<div className="menu" id="menu">
				<ul>{ generateMenuItems() }</ul>
			</div>
			{ /* <hr /> */}
		</div>
	);
}


/* ========== MENU ITEM ========== */

MenuSimpleItem.propTypes = {
	name: PropTypes.string.isRequired,
	path: PropTypes.string,
	target: PropTypes.string,
	hidden: PropTypes.bool,
	routes: PropTypes.array,
};
export type MenuSimpleItemType = InferProps<typeof MenuSimpleItem.propTypes>;
export function MenuSimpleItem(props: MenuSimpleItemType) {
	if( props.hidden ) return null;
	return (
		<li className='menuItem'>
			{props.target 
				? <a href={props.path || undefined} target={props.target}>{props.name}</a>
				: <a href={props.path || undefined}>{props.name}</a>}
		</li>
	);
}

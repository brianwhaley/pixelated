import React, { useRef, useState } from 'react';
import { MenuAccordionButton, MenuAccordion } from '../components/menu/pixelated.menu-accordion';
import '../components/menu/pixelated.menu-accordion.css';
import '../css/pixelated.global.css';
import myRoutes from '../data/routes.json';
const allRoutes = myRoutes.routes;

/* const menuItems = {
	Home: '/',
	Resume: '/resume',
	Readme: '/readme',
	'Work Portfolio': '/gworkportfolio',
	'Pixelated Blog': 'https://blog.pixelated.tech',
	Stkr: '/stkr',
	NerdJokes: '/nerdjokes',
	'Social Media': '/socialmedia',
	Photography: '/photography',
	'Photo Gallery': '/photogallery',
	'Custom Sunglasses': '/customsunglasses',
	Recipes: '/recipes',
	Sandbox: {
		"Form": '/form',
		"Form Builder": '/form/build',
		"Form Extractor": '/form/extract',
	},
}; */

/* const menuItems = allRoutes.map((thisRoute) => (
	{ [thisRoute.name]: thisRoute.path } 
)).reduce((obj, item) => {
	Object.assign(obj, item);
	return obj; 
}); */

const menuItems = allRoutes.map((thisRoute) => (
	thisRoute.routes
		? { [thisRoute.name]: thisRoute.routes.map((subRoute) => ({ [subRoute.name]: subRoute.path })) }
		: { [thisRoute.name]: thisRoute.path }
)).reduce((obj, item) => {
	if( typeof Object.values(item)[0] == "object") {
		// Nested Object
		const subitems = Object.values(item)[0];
		const newSubitems = subitems.reduce((obj2, item2) => {
			Object.assign(obj2, item2);
			return obj2;
		});
		Object.assign(obj, { [Object.keys(item)[0]]: newSubitems } );
		return obj;
	} else {
		// String
		Object.assign(obj, item);
		return obj; 
	}
});

// console.log("Menu Items: ", menuItems);



export default {
	title: 'Menu - Accordion',
	component: MenuAccordion
};

// Parent Component
const ParentAccordionMenu = () => {
	return (
	  	<>
			<div style={{ position: 'absolute', left: '10px', top:'10px' }} >
				<MenuAccordionButton />
			</div>
			<div style={{ position: 'fixed', left: '10px', top:'100px' }}>
				<MenuAccordion menuItems={menuItems} />
			</div>
		</>
	);
};

export const Primary = () => <ParentAccordionMenu />;
Primary.args = { menuItems: menuItems};
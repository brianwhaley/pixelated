import React, { useRef, useState } from 'react';
import { MenuAccordionButton, MenuAccordion } from '../components/menu/pixelated.menu-accordion';
import '../components/menu/pixelated.menu-accordion.css';
import '../css/pixelated.global.css';

const menuItems = {
	Home: '/index.html',
	Resume: '/resume.html',
	Readme: '/readme.html',
	'Work Portfolio': '/gallery.html?tag=portfolio-all',
	'Pixelated Blog': 'https://blog.pixelated.tech',
	Stkr: '/stkr.html',
	NerdJokes: '/nerdjokes.html',
	'Social Media': '/socialmedia.html',
	Photography: '/photography.html',
	'Photo Gallery': '/gallery.html?tag=pixelatedviewsgallery',
	'Custom Sunglasses': '/customsunglasses.html',
	Recipes: '/recipes.html'
};

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
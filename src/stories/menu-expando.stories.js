import React, { useRef, useState } from 'react';
import { MenuExpandoButton, MenuExpando } from '../components/menu/pixelated.menu-expando';
import '../components/menu/pixelated.menu-expando.css';
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
	title: 'Menu - Expando',
	component: MenuExpando
};

// Parent Component
const ParentExpandoMenu = () => {
	return (
	  	<>
			<div style={{ position: 'absolute', left: '10px', top:'10px' }} >
				<MenuExpandoButton />
			</div>
			<div style={{ position: 'fixed', left: '10px', top:'100px' }}>
				<MenuExpando menuItems={menuItems} />
			</div>
		</>
	);
};

export const Primary = () => <ParentExpandoMenu />;
Primary.args = { menuItems: menuItems};
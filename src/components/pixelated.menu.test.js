import React from 'react';
import renderer from 'react-test-renderer';
import Menu from './pixelated.menu.js';

const menuItems = {
	"Home" : "./index.html" ,
	"Work Portfolio" : "./gallery.html?tag=portfolio-all" ,
	"Photo Gallery" : "./gallery.html?tag=pixelatedviewsgallery" ,
	"Pixelated Views Blog" : "https://blog.pixelated.tech" ,
	"Social Media" : "./socialmedia.html" ,
	"Photography" : "./photography.html" ,
	"Recipes" : "./recipes.html"
}

describe('Menu', () => {

	test('Menu with props snapshot renders', () => {
		const cMenu = renderer.create(<Menu menuItems={menuItems} />);
		let tree = cMenu.toJSON();
		expect(tree).toMatchSnapshot();
	});

});
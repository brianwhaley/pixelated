import React from 'react';
import renderer from 'react-test-renderer';
import Menu from '../components/menu/pixelated.menu-accordion';

const menuItems = {
	Home: './index.html',
	Resume: '/resume.html',
	'Work Portfolio': './gallery.html?tag=portfolio-all',
	'Photo Gallery': './gallery.html?tag=pixelatedviewsgallery',
	'Pixelated Blog': 'https://blog.pixelated.tech',
	'Custom Sunglasses': './customsunglasses',
	'Social Media': './socialmedia.html',
	Stkr: '/stkr.html',
	TechJokes: '/techjokes.html',
	Photography: './photography.html',
	Recipes: './recipes.html'
};

describe('Menu', () => {
	test('Menu with props snapshot renders', () => {
		const cMenu = renderer.create(<Menu menuItems={menuItems} />);
		const tree = cMenu.toJSON();
		expect(tree).toMatchSnapshot();
	});
});

import { MenuSimple } from '../components/menu/pixelated.menu-simple'
import '../components/menu/pixelated.menu-accordion.css'

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
}

export default {
	title: 'Menu - Simple',
	component: MenuSimple
}

export const Primary = {
	args: {
		menuItems
	}
}

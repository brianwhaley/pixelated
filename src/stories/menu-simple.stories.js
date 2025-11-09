import { MenuSimple } from '../components/menu/pixelated.menu-simple';
import myRoutes from '../data/routes2.json';
const allRoutes = myRoutes.routes;
import '../components/menu/pixelated.menu-accordion.css';
import '../css/pixelated.global.css';

export default {
	title: 'Menu',
	component: MenuSimple
};

export const Simple = {
	args: {
		menuItems: allRoutes
	}
};

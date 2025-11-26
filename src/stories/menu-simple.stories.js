import { MenuSimple } from '../components/menu/menu-simple';
import myRoutes from '../data/routes2.json';
const allRoutes = myRoutes.routes;
import '../components/menu/menu-accordion.css';
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

import { Sitemap } from '../components/sitemap/pixelated.sitemap';
import myRoutes from "../data/routes.json";

export default {
	title: 'Sitemap XML',
	component: Sitemap
};

export const Primary = {
	args: {
		routes: myRoutes.routes,
		origin: "https://www.pixelated.tech",
		xsl: "https://pixelated.tech/sitemap.xsl"
	}
};

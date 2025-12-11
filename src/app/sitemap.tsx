export const runtime = 'nodejs';

import type { MetadataRoute } from 'next';
import { generateSitemap, type SitemapConfig, getOriginFromNextHeaders } from "@pixelated-tech/components/server";
import myRoutes from "@/app/data/routes.json";

const wpSite = "blog.pixelated.tech";

export default async function SiteMapXML(): Promise<MetadataRoute.Sitemap> {
	const origin = await getOriginFromNextHeaders();
	
	const config: SitemapConfig = {
		createPageURLs: true,
		createWordPressURLs: true,
		createWordPressImageURLs: true,
		createImageURLsFromJSON: true,
		createContentfulURLs: false,
		wordpress: { site: wpSite },
		routes: myRoutes.routes,
	};
	const sitemap = await generateSitemap(config, origin);
	return sitemap;
}
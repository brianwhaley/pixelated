export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import type { MetadataRoute } from 'next';
import { generateSitemap, type SitemapConfig, getOriginFromNextHeaders } from "@pixelated-tech/components/server";
import myRoutes from "@/app/data/routes.json";

const wpSite = "blog.pixelated.tech";

export default async function SiteMapXML(): Promise<MetadataRoute.Sitemap> {
	const origin = await getOriginFromNextHeaders();
	
	const config: SitemapConfig = {
		routes: myRoutes.routes,
		createPageURLs: true,
		createImageURLsFromJSON: true,
		
		createContentfulURLs: false,

		wordpress: { site: wpSite },
		createWordPressURLs: true,
		createWordPressImageURLs: true,
	};
	const sitemap = await generateSitemap(config, origin);
	return sitemap;
}
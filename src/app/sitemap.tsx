export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import type { MetadataRoute } from 'next';
import { generateSitemap, type SitemapConfig, getOriginFromNextHeaders, getFullPixelatedConfig } from "@pixelated-tech/components/server";
import myRoutes from "@/app/data/routes.json";

const wpSite = "blog.pixelated.tech";
const config = getFullPixelatedConfig();
const contentfulApiProps = {
	base_url: config.contentful?.base_url ?? "",
	space_id: config.contentful?.space_id ?? "",
	environment: config.contentful?.environment ?? "",
	access_token: config.contentful?.delivery_access_token ?? "",
};
const hasCompleteContentfulConfig = !!(contentfulApiProps.access_token);

export default async function SiteMapXML(): Promise<MetadataRoute.Sitemap> {
	const origin = await getOriginFromNextHeaders();
	
	const sitemapConfig: SitemapConfig = {
		routes: myRoutes.routes,
		createPageURLs: true,
		createImageURLsFromJSON: true,
		
		createContentfulURLs: false,
		createContentfulAssetURLs: hasCompleteContentfulConfig,
		contentful: contentfulApiProps,

		wordpress: { site: wpSite },
		createWordPressURLs: true,
		createWordPressImageURLs: true,
	};
	const sitemap = await generateSitemap(sitemapConfig, origin);
	return sitemap;
}
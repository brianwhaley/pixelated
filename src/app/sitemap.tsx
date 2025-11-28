export const runtime = 'nodejs';

import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { createPageURLs, createWordPressURLs, /* createImageURLs,*/ createImageURLsFromJSON /* createPageBuilderURLs */ } from "@brianwhaley/pixelated-components/server";
// import type { SitemapEntry } from '@brianwhaley/pixelated-components/dist/types';
import myRoutes from "@/app/data/routes.json";
const wpSite = "blog.pixelated.tech";

async function getOrigin(): Promise<string> {
	const headerList = await headers();
	const protocol = headerList.get('x-forwarded-proto') || 'http';
	const host = headerList.get('host') || 'localhost:3000';
	return `${protocol}://${host}`;
}

export default async function SiteMapXML(): Promise<MetadataRoute.Sitemap> {
	const origin = await getOrigin();
	
	type Route = {
		path?: string;
		routes?: Route[];
	};
	function flattenRoutes(routes: Route[]): { path: string }[] {
		return routes.flatMap(route =>
			route.path
				? [{ path: route.path }] : route.routes
					? flattenRoutes(route.routes) : []
		);
	}
	const flatRoutes = flattenRoutes(myRoutes.routes);

	const sitemap = [
		...(await createPageURLs(flatRoutes, origin)),
		...(await createWordPressURLs({site: wpSite})),
		// ...(await createImageURLs(origin)),
		...(await createImageURLsFromJSON(origin /*, optional jsonPath */)),
		// ...(await createPageBuilderURLs({
		// 	// Use the unified PIXELATED config blob (server-side) instead of individual CONTENTFUL_* env vars.
		// 	// For example, on the server you can call `getFullPixelatedConfig()` from the pixelated-components server
		// 	// package and pass `cfg.contentful` to the PageBuilder URL helper.
		// 	// Example (server-side):
		// 	// const cfg = getFullPixelatedConfig();
		// 	// const apiProps = cfg.contentful;
		// 	// ...(await createPageBuilderURLs({ apiProps, origin })),
		// })),
	];
	console.log("Generated sitemap entries:", sitemap.length);
	return sitemap;
}
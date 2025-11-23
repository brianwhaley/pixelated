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
		// 	apiProps: {
		// 		base_url: 'https://cdn.contentful.com',
		// 		space_id: process.env.CONTENTFUL_SPACE_ID!,
		// 		environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
		// 		access_token: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN!,
		// 	},
		// 	origin,
		// })),
	];
	console.log("Generated sitemap entries:", sitemap.length);
	return sitemap;
}
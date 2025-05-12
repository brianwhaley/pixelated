
import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';

import myRoutes from "@/app/data/routes.json";

export default async function SiteMapXML(): Promise<MetadataRoute.Sitemap> {

	async function getOrigin(): Promise<string> {
		const headerList = await headers();
		const protocol = headerList.get('x-forwarded-proto') || 'http';
		const host = headerList.get('host') || 'localhost:3000';
		return `${protocol}://${host}`;
	}

	const sitemap = [];
	const origin = await getOrigin();
	for ( const route of myRoutes.routes ){
		sitemap.push({
			url: `${origin}${route.path}` ,
			lastModified: new Date(),
			changeFrequency: "hourly" as const,
			priority: 1.0,
		});			
	}
	return sitemap;
	
}
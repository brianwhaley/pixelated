
import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';

import myRoutes from "@/app/data/routes.json";

export default async function SiteMapXML(): Promise<MetadataRoute.Sitemap> {

	const blogPostsURL = "https://public-api.wordpress.com/rest/v1/sites/pixelatedviews.wordpress.com/posts?number=100";

	async function getOrigin(): Promise<string> {
		const headerList = await headers();
		const protocol = headerList.get('x-forwarded-proto') || 'http';
		const host = headerList.get('host') || 'localhost:3000';
		return `${protocol}://${host}`;
	}

	async function getBlogItems(){
		try {
			const response = await fetch(blogPostsURL);
			if (!response.ok) {
			  throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			return data;
		} catch (error) {
			console.error("Could not fetch the posts:", error);
		}
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
 	const blogPosts = await getBlogItems();
 	for await (const post of blogPosts.posts) {
  	sitemap.push({
			url: post.URL ,
			lastModified: post.modified,
			changeFrequency: "hourly" as const,
			priority: 1.0,
  		});
	}
	return sitemap;
	
}

import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';

import myRoutes from "@/app/data/routes.json";

export default async function SiteMapXML(): Promise<MetadataRoute.Sitemap> {

	const blogPostSite = "pixelatedviews.wordpress.com";
	const blogPostPath = "/posts?number=100";
	const blogPostsURL = "https://public-api.wordpress.com/rest/v1/sites/" + blogPostSite + blogPostPath ; 

	async function getOrigin(): Promise<string> {
		const headerList = await headers();
		const protocol = headerList.get('x-forwarded-proto') || 'http';
		const host = headerList.get('host') || 'localhost:3000';
		return `${protocol}://${host}`;
	}

	async function getBlogItems(){
		const posts = [];
  		let page = 1;
  		let totalPages = 1;  // Initialize to 1 for the first request
  		while (page <= totalPages) {
    		try {
      			const response = await fetch(`${blogPostsURL}&page=${page}`);				
				const data = await response.json();
				// Check for total pages on the first page
				if (page === 1) {
					totalPages = Math.ceil(data.found / 100); // Assuming 100 posts per page
				}
				posts.push(...data.posts);
				page++; // Increment gets next page or breaks the while loop
			} catch (error) {
				console.error("Error fetching posts:", error);
				return;
			}
		}
		return posts; // Return the complete list of posts
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
	for await (const post of blogPosts ?? []) {
  	sitemap.push({
			url: post.URL ,
			lastModified: post.modified,
			changeFrequency: "hourly" as const,
			priority: 1.0,
  		});
	}
	return sitemap;
	
}
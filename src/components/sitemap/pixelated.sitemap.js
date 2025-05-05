import React from 'react';
import myRoutes from "../../data/routes.json";

/* 
TODO #10 Sitemap Component : Build out v1 of this component
*/
 
export async function Sitemap(){

	const blogPostsURL = "https://public-api.wordpress.com/rest/v1/sites/pixelatedviews.wordpress.com/posts?number=100";

	async function getOrigin() {
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
		sitemap.push(
			<url>
				<loc>${origin}${route.path}</loc>
				<lastmod>${new Date()}</lastmod>
				<changefreq>hourly</changefreq>
				<priority>1.0</priority>
			</url>
		);			
	}
	const blogPosts = await getBlogItems();
	for await (const post of blogPosts.posts) {
		sitemap.push(
			<url>
				<loc>${post.URL}</loc>
				<lastmod>${post.modified}</lastmod>
				<changefreq>hourly</changefreq>
				<priority>1.0</priority>
			</url>
		);
	}
	// return sitemap;
	return (`
		<?xml version="1.0" encoding="UTF-8"?>
		<?xml-stylesheet type="text/xsl" href=${origin}/sitemap.xsl?>
		<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
			xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
			http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" 
			xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
		${sitemap}
		</urlset>
	`);

}

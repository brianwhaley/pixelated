"use server"; 

import React from 'react';
import { getAllRoutes } from "../utilities/pixelated.routing";
import myRoutes from "../../data/routes.json";

/* 
TODO #10 Sitemap Component : Build out v1 of this component
*/
 
export function Sitemap(){

	const blogPostsURL = "https://public-api.wordpress.com/rest/v1/sites/pixelatedviews.wordpress.com/posts?number=100";

	function getOrigin() {
		const headerList = headers();
		const protocol = headerList.get('x-forwarded-proto') || 'http';
		const host = headerList.get('host') || 'localhost:3000';
		return `${protocol}://${host}`;
	}

	function getBlogItems(){
		try {
			const response = fetch(blogPostsURL);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = response.json();
			return data;
		} catch (error) {
			console.error("Could not fetch the posts:", error);
		}
	}

	const sitemap = [];
	const origin = "https://www.pixelated.tech"; // getOrigin();
	const allRoutes = getAllRoutes(myRoutes, "routes");
	for ( const route of allRoutes ){
		if(route.path){
			sitemap.push(
				`<url>
					<loc>${origin}${route.path}</loc>
					<lastmod>${new Date()}</lastmod>
					<changefreq>hourly</changefreq>
					<priority>1.0</priority>
				</url>`
			);	
		}		
	}
	/* const blogPosts = getBlogItems();
	for (const post of blogPosts.posts) {
		sitemap.push(
			<url>
				<loc>${post.URL}</loc>
				<lastmod>${post.modified}</lastmod>
				<changefreq>hourly</changefreq>
				<priority>1.0</priority>
			</url>
		);
	} */
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

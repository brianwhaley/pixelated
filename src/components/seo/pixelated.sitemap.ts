import PropTypes, { InferProps } from "prop-types";
import { getAllRoutes, getAllImages } from "./pixelated.metadata";
import { getWordPressItems } from "../cms/pixelated.wordpress.functions";
import { getContentfulFieldValues } from "../cms/pixelated.contentful.delivery";
import { getEbayAppToken, getEbayItemsSearch } from "../ebay/pixelated.ebay.functions";
// import { getEbayItems } from "../ebay/pixelated.ebay.functions.js";
// import { getContentfulFieldValues } from "@brianwhaley/pixelated-components";
// import type { SitemapEntry } from "@brianwhaley/pixelated-components/dist/types";
// import myRoutes from "../../data/routes.json";


export type SitemapEntry = {
	url: string;
	lastModified: string;
	changeFrequency: "hourly";
	priority: number;
};



export async function createPageURLs(myRoutes: { path: string }[], origin: string) {
	const sitemap: SitemapEntry[] = [];
	// const origin = await getOrigin();
	const allRoutes = getAllRoutes(myRoutes, "routes");
	for ( const route of allRoutes ){
		if(route.path.substring(0, 4).toLowerCase() !== 'http') {
			sitemap.push({
				url: `${origin}${route.path}` ,
				lastModified: (new Date()).toISOString(),
				changeFrequency: "hourly" as const,
				priority: 1.0,
			});
		}
	}
	return sitemap;
}



export async function createImageURLs(origin: string){
	const sitemap = [];
	// const origin = await getOrigin();
	const images = getAllImages();
	const newImages = images.map((image)=>{return (`${origin}${image}`);});
	sitemap.push({
		url: `${origin}/images`, // Provide a valid URL for the images
		images: newImages,
	});
	return sitemap;
}



export async function createWordPressURLs(props: {site: string}){
	const sitemap: SitemapEntry[] = [];
	const blogPosts = await getWordPressItems({site: props.site});
	for await (const post of blogPosts ?? []) {
		sitemap.push({
			url: post.URL ,
			lastModified: post.modified ?? new Date().toISOString(),
			changeFrequency: "hourly" as const,
			priority: 1.0,
		});
	}
	return sitemap;
}



createContentfulURLs.propTypes = {
	apiProps: PropTypes.shape({
		base_url: PropTypes.string.isRequired,
		space_id: PropTypes.string.isRequired,
		environment: PropTypes.string.isRequired,
		access_token: PropTypes.string.isRequired,
	}).isRequired,
	origin: PropTypes.string.isRequired,
};
export type createContentfulURLsType = InferProps<typeof createContentfulURLs.propTypes>;
export async function createContentfulURLs(props: createContentfulURLsType){
	const sitemap: SitemapEntry[] = [];
	// const origin = await getOrigin();
	const contentType = "carouselCard"; 
	const field = "title";
	const contentfulTitles = await getContentfulFieldValues({
		apiProps: props.apiProps, contentType: contentType, field: field
	});
	for ( const title of contentfulTitles ){
		sitemap.push({
			url: `${props.origin}/projects/${encodeURIComponent(title)}` ,
			lastModified: (new Date()).toISOString(),
			changeFrequency: "hourly" as const,
			priority: 1.0,
		});			
	}
	return sitemap;
}



createContentfulPageBuilderURLs.propTypes = {
	apiProps: PropTypes.shape({
		base_url: PropTypes.string.isRequired,
		space_id: PropTypes.string.isRequired,
		environment: PropTypes.string.isRequired,
		access_token: PropTypes.string.isRequired,
	}).isRequired,
	origin: PropTypes.string.isRequired,
};
export type createContentfulPageBuilderURLsType = InferProps<typeof createContentfulPageBuilderURLs.propTypes>;
export async function createContentfulPageBuilderURLs(props: createContentfulPageBuilderURLsType){
	const sitemap: SitemapEntry[] = [];
	const contentType = "page"; 
	const field = "pageName";
	const pageNames = await getContentfulFieldValues({
		apiProps: props.apiProps, contentType: contentType, field: field
	});
	for ( const pageName of pageNames ){
		sitemap.push({
			url: `${props.origin}/${encodeURIComponent(pageName)}` ,
			lastModified: (new Date()).toISOString(),
			changeFrequency: "hourly" as const,
			priority: 1.0,
		});			
	}
	return sitemap;
}




const defaultEbayProps = {
	proxyURL: "https://proxy.pixelated.tech/prod/proxy?url=",
	baseTokenURL: 'https://api.ebay.com/identity/v1/oauth2/token',
	tokenScope: 'https://api.ebay.com/oauth/api_scope',
	baseSearchURL : 'https://api.ebay.com/buy/browse/v1/item_summary/search',
	qsSearchURL: '?q=sunglasses&fieldgroups=full&category_ids=79720&aspect_filter=categoryId:79720&filter=sellers:{pixelatedtech}&sort=newlyListed&limit=200',
	baseItemURL: 'https://api.ebay.com/buy/browse/v1/item',
	qsItemURL: '/v1|295959752403|0?fieldgroups=PRODUCT,ADDITIONAL_SELLER_DETAILS',
	appId: 'BrianWha-Pixelate-PRD-1fb4458de-1a8431fe', // clientId
	appCertId: 'PRD-fb4458deef01-0d54-496a-b572-a04b', // clientSecret
	sbxAppId: 'BrianWha-Pixelate-SBX-ad482b6ae-8cb8fead', // Sandbox
	sbxAppCertId: '',
	globalId: 'EBAY-US',
};
export async function createEbayItemURLs(origin: string) {
	const sitemap: SitemapEntry[] = [];
	await getEbayAppToken({apiProps: defaultEbayProps})
		.then(async (response: any) => {
			await getEbayItemsSearch({ apiProps: defaultEbayProps, token: response })
				.then( (items: any) => {
					for (const item of items.itemSummaries) {
						sitemap.push({
							url: `${origin}/store/${item.legacyItemId}` ,
							lastModified: item.itemCreationDate,
							changeFrequency: "hourly" as const,
							priority: 1.0,
						});
					}
				});
		});
	return sitemap;
}




export function jsonToSitemapEntries(entries: SitemapEntry[]){
	return entries.map(
		(entry: SitemapEntry) => 
			`<url>
				<loc>${entry.url}</loc>
				<lastmod>${entry.lastModified}</lastmod>
				<changefreq>${entry.changeFrequency}</changefreq>
				<priority>${entry.priority}</priority>
			</url>`
	).join('');
}


/**
 * Read a JSON manifest of image paths and produce sitemap entries.
 *
 * Expected manifest format: an array of relative paths, e.g.
 * ["/images/foo.jpg", "images/bar.png"]
 *
 * @param origin full origin (protocol+host) to prefix image URLs
 * @param jsonPath optional path to manifest (default: `public/site-images.json`)
 */
export async function createImageURLsFromJSON(origin: string, jsonPath = 'public/site-images.json'){
	const sitemap: any[] = [];
	try {
		// only use fs on server side (dynamic import so bundlers don't include it for client)
		const fs = await import('fs');
		const path = await import('path');
		const abs = path.resolve(process.cwd(), jsonPath);
		if (!fs.existsSync(abs)) {
			// fallback to getAllImages() (runtime discovery) if manifest missing
			const images = getAllImages();
			if (!images || images.length === 0) return sitemap;
			const newImages = images.map(i => `${origin}${i.startsWith('/') ? i : `/${i}`}`);
			sitemap.push({ url: `${origin}/images`, images: newImages });
			return sitemap;
		}
		const raw = fs.readFileSync(abs, 'utf8');
		const imgs = JSON.parse(raw) as string[];
		if (!Array.isArray(imgs)) return sitemap;

		const newImages = imgs.map(i => {
			// ensure leading slash
			const rel = i.startsWith('/') ? i : `/${i}`;
			return `${origin}${rel}`;
		});

		sitemap.push({
			url: `${origin}/images`,
			images: newImages,
		});
	} catch (e) {
		if (typeof console !== 'undefined') console.warn('createImageURLsFromJSON failed', e);
	}
	return sitemap;
}

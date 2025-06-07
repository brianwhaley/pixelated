/* eslint-disable @typescript-eslint/no-explicit-any */

const base_url = "https://cdn.contentful.com";
const space_id = "0b82pebh837v";
const environment = "master";
const access_token = "lA5uOeG6iPbrJ2J_R-ntwUdKQesrBNqrHi-qX52Bzh4";

/* ========== GET CONTENTFUL CARDS ========== */
export async function getContentfulEntries() {
	// const full_url = base_url + "/spaces/" + space_id + "/environments/" + environment + "/content_types/" + contentType + "?access_token=" + access_token ;
	const full_url = base_url + "/spaces/" + space_id + "/environments/" + environment + "/entries?access_token=" + access_token ;
	try {
		const response = await fetch(full_url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const json = await response.json();
		return json;
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			console.error(error);
		}
	}
}
/* 
https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/entries/entries-collection/get-all-entries-of-a-space/console/js-plain
*/



/* ========== GET CONTENTFUL CARDS BY TYPE ========== */
export async function getContentfulEntriesByType(contentType: string) {
	const allEntries: any = await getContentfulEntries();
	const typeEntries = [];
	for (const item of allEntries.items) {
		if ( item.sys.contentType.sys.id == contentType ) {
			typeEntries.push(item);
		}
	}
	allEntries.items = typeEntries;
	return allEntries;
}




// Define the type for the params object
interface ContentfulCardParams {
    cards: any, 
    searchField: string;
    searchVal: string;
}
/* ========== GET CONTENTFUL CARD BY FIELD ========== */
export async function getContentfulEntryByField(params: ContentfulCardParams) {
	// const cards: any = await getContentfulEntriesData();
	const searchVal = decodeURIComponent(params.searchVal);
	for (const item of params.cards.items) {
		if ( item?.fields[params.searchField]?.toLowerCase() == searchVal.toLowerCase() ) {
			return item;
		}
	}
	return null;
}



/* ========== GET CONTENTFUL CARD TITLES ========== */
export async function getContentfulFieldValues(contentType: string, field: string) {
	const cards: any = await getContentfulEntriesByType(contentType);
	const fieldVals: string[] = cards.items.map(function (card: any) {
		return card.fields[field];
	});
	return fieldVals;
}



/* ========== GET CONTENTFUL IMAGES FROM CARDS ========== */
export async function getContentfulImagesFromEntries(images: any, assets: any){
	const imageURLs = [];
	for (const image of images) {
		for (const asset of assets) {
			if( image.sys.id == asset.sys.id ) {
				imageURLs.push({ 
					image: asset.fields.file.url,
					imageAlt: asset.fields.description,
				});
			}
		}
	}
	return imageURLs;
}

/* ========== GET CONTENTFUL ASSETS ========== */
export async function getContentfulAssets(){
	const full_url = base_url + "/spaces/" + space_id + "/environments/" + environment + "/assets?access_token=" + access_token ;
	try {
		const response = await fetch(full_url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const json = await response.json();
		return json;
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			console.error(error);
		}
	}
}

/* ========== GET CONTENTFUL ASSET URLS ========== */
export async function getContentfulAssetURLs(){
	const assetURLs = [];
	const assets: any = await getContentfulAssets();
	for (const asset of assets.items) {
		assetURLs.push({ 
			image: asset.fields.file.url,
			imageAlt: asset.fields.description,
		});
	}
	console.log("Asset URLs: ", assetURLs);
	return assetURLs;
}

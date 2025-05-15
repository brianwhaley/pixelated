/* eslint-disable @typescript-eslint/no-explicit-any */

const base_url = "https://cdn.contentful.com";
const space_id = "0b82pebh837v";
const environment = "master";
const access_token = "lA5uOeG6iPbrJ2J_R-ntwUdKQesrBNqrHi-qX52Bzh4";

export async function getContentfulCardsData() {
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
// getContentfulCardsData();
/* 
https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/entries/entries-collection/get-all-entries-of-a-space/console/js-plain
*/




// Define the type for the params object
interface ContentfulCardParams {
    cards: any, 
    searchField: string;
    searchVal: string;
}
export async function getContentfulCardByField(params: ContentfulCardParams) {
	// const cards: any = await getContentfulCardsData();
	const searchVal = decodeURIComponent(params.searchVal);
	for (const item of params.cards.items) {
		if ( item.fields[params.searchField].toLowerCase() == searchVal.toLowerCase() ) {
			return item;
		}
	}
	return null;
}




export async function getContentfulCardTitles() {
	const cards: any = await getContentfulCardsData();
	const headers: string[] = cards.items.map(function (card: any) {
		return card.fields.header;
	});
	return headers;
}



export async function getContentfulImagesFromCards(images: any, assets: any){
	const imageURLs = [];
	for (const image of images) {
		for (const asset of assets) {
			if( image.sys.id == asset.sys.id ) {
				imageURLs.push(asset.fields.file.url);
			}
		}
	}
	return imageURLs;
}


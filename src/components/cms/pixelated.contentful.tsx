import PropTypes, { InferProps } from "prop-types";

const debug = false;

export type ContentfulApiType = {
	base_url: string;
	space_id: string;
	environment: string;
	access_token: string;
};

export type DiscountCodeType = {
	codeName: string,
	codeDescription: string,
	codeType: string,
	codeStart: string,
	codeEnd: string,
	codeValue: number,
};

/* ========== GET CONTENTFUL CARDS ========== */
getContentfulEntries.propTypes = {
	apiProps: PropTypes.shape({
		base_url: PropTypes.string.isRequired,
		space_id: PropTypes.string.isRequired,
		environment: PropTypes.string.isRequired,
		access_token: PropTypes.string.isRequired,
	}).isRequired,
};
export type getContentfulEntriesType = InferProps<typeof getContentfulEntries.propTypes>;
export async function getContentfulEntries(props: getContentfulEntriesType) {
	const { base_url, space_id, environment, access_token } = props.apiProps;
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
getContentfulEntriesByType.propTypes = {
	apiProps: PropTypes.shape({
		base_url: PropTypes.string.isRequired,
		space_id: PropTypes.string.isRequired,
		environment: PropTypes.string.isRequired,
		access_token: PropTypes.string.isRequired,
	}).isRequired,
	contentType: PropTypes.string.isRequired,
};
export type getContentfulEntriesByTypeType = InferProps<typeof getContentfulEntriesByType.propTypes>;
export async function getContentfulEntriesByType(props: getContentfulEntriesByTypeType) {
	const allEntries: any = await getContentfulEntries({ apiProps: props.apiProps });
	const typeEntries = [];
	for (const item of allEntries.items) {
		if ( item.sys.contentType.sys.id == props.contentType ) {
			typeEntries.push(item);
		}
	}
	allEntries.items = typeEntries;
	return allEntries;
}




// Define the type for the params object
type ContentfulCardParams = {
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
getContentfulFieldValues.propTypes = {
	apiProps: PropTypes.shape({
		base_url: PropTypes.string.isRequired,
		space_id: PropTypes.string.isRequired,
		environment: PropTypes.string.isRequired,
		access_token: PropTypes.string.isRequired,
	}).isRequired,
	contentType: PropTypes.string.isRequired,
	field: PropTypes.string.isRequired,
};
export type getContentfulFieldValuesType = InferProps<typeof getContentfulFieldValues.propTypes>;
export async function getContentfulFieldValues(props: getContentfulFieldValuesType) {
	const cards: any = await getContentfulEntriesByType({
		apiProps: props.apiProps,
		contentType: props.contentType,
	});
	const fieldVals: string[] = cards.items.map(function (card: any) {
		return card.fields[props.field];
	});
	return fieldVals;
}



/* ========== GET CONTENTFUL IMAGES FROM CARDS ========== */
getContentfulImagesFromEntries.propTypes = {
	images: PropTypes.any.isRequired, 
	assets: PropTypes.any.isRequired,
};
export type getContentfulImagesFromEntriesType = InferProps<typeof getContentfulImagesFromEntries.propTypes>;
export async function getContentfulImagesFromEntries(props: getContentfulImagesFromEntriesType){
	const imageURLs = [];
	for (const image of props.images) {
		for (const asset of props.assets) {
			if( image.sys.id == asset.sys.id ) {
				imageURLs.push({ 
					image: asset.fields.file.url + "?fm=webp",
					imageAlt: asset.fields.description,
				});
			}
		}
	}
	return imageURLs;
}




/* ========== GET CONTENTFUL ASSETS ========== */
getContentfulAssets.propTypes = {
	apiProps: PropTypes.shape({
		base_url: PropTypes.string.isRequired,
		space_id: PropTypes.string.isRequired,
		environment: PropTypes.string.isRequired,
		access_token: PropTypes.string.isRequired,
	}).isRequired,
};
export type getContentfulAssetsType = InferProps<typeof getContentfulAssets.propTypes>;
export async function getContentfulAssets(props: getContentfulAssetsType){
	const { base_url, space_id, environment, access_token } = props.apiProps;
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
getContentfulAssetURLs.propTypes = {
	apiProps: PropTypes.shape({
		base_url: PropTypes.string.isRequired,
		space_id: PropTypes.string.isRequired,
		environment: PropTypes.string.isRequired,
		access_token: PropTypes.string.isRequired,
	}).isRequired,
};
export type getContentfulAssetURLsType = InferProps<typeof getContentfulAssetURLs.propTypes>;
export async function getContentfulAssetURLs(props: getContentfulAssetURLsType) {
	const assetURLs = [];
	const assets: any = await getContentfulAssets(props);
	for (const asset of assets.items) {
		assetURLs.push({
			image: asset.fields.file.url + "?fm=webp",
			imageAlt: asset.fields.description,
		});
	}
	console.log("Asset URLs: ", assetURLs);
	return assetURLs;
}



/* ========== GET CONTENTFUL DISCOUNT CODES ========== */
getContentfulDiscountCodes.propTypes = {
	apiProps: PropTypes.shape({
		base_url: PropTypes.string.isRequired,
		space_id: PropTypes.string.isRequired,
		environment: PropTypes.string.isRequired,
		access_token: PropTypes.string.isRequired,
	}).isRequired,
	contentType: PropTypes.string.isRequired,
};
export type getContentfulDiscountCodesType = InferProps<typeof getContentfulDiscountCodes.propTypes>;
export async function getContentfulDiscountCodes(props: getContentfulDiscountCodesType) { 
	const contentType = "discountCodes"; 
	try {
		if (debug) console.log("Fetching Discount Codes");
		const response = await getContentfulEntriesByType({ 
			apiProps: props.apiProps, 
			contentType: props.contentType 
		});
		if (!response || !response.items) {
			console.error(`HTTP error! status: ${response.status}`);
			return [];
		}
		const filteredItems = response.items.filter((item: any) => {
			return item.sys.contentType.sys.id === contentType;
		});
		const discountCodes = filteredItems.map((item: any) => ({
			codeName: item.fields.codeName,
			codeDescription: item.fields.codeDescription,
			codeType: item.fields.codeType,
			codeStart: item.fields.codeStart,
			codeEnd: item.fields.codeEnd,
			codeValue: item.fields.codeValue,
		}));
		return discountCodes;
	} catch (error) {
		console.error('Error fetching token:', error);
		return [];
	}
}



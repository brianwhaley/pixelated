import PropTypes, { InferProps } from "prop-types";
import type { ShoppingCartType } from "../shoppingcart/pixelated.shoppingcart";
const debug = false;


/* ===== EBAY BROWSE API DOCUMENTATION =====
https://developer.ebay.com/api-docs/buy/browse/resources/item_summary/methods/search
https://developer.ebay.com/api-docs/buy/static/ref-buy-browse-filters.html
https://developer.ebay.com/api-docs/static/oauth-ui-tokens.html
https://developer.ebay.com/my/keys
https://developer.ebay.com/my/auth?env=production&index=0
*/


// category : 0 : {categoryId: '79720', categoryName: 'Sunglasses'}
// category : 0 : {categoryId: '179241', categoryName: 'Accessories'}
// categoryId : "79720"
export const ebaySunglassCategory = '79720'; // Ebay Sunglasses Category


export type EbayApiType = {
    proxyURL?: string,
    baseTokenURL?: string,
    tokenScope: string, // changes per api call
    baseSearchURL?: string,
    qsSearchURL?: string,
    baseItemURL?: string,
    qsItemURL?: string,
    appId: string, // clientId
    appCertId: string, // clientSecret
    globalId: string,
}


getShoppingCartItem.propTypes = {
	thisItem: PropTypes.object.isRequired,
};
export type getShoppingCartItemType = InferProps<typeof getShoppingCartItem.propTypes>;
export function getShoppingCartItem(thisItem: any) {
	let qty = 0;
	if (thisItem.categoryId && thisItem.categoryId == ebaySunglassCategory) {
		qty = 1;
	} else if (thisItem.categories[0].categoryId && thisItem.categories[0].categoryId == ebaySunglassCategory) {
		qty = 1;
	} else {
		qty = 10;
	}
	const shoppingCartItem: ShoppingCartType = {
		itemImageURL : thisItem.image.imageUrl,
		itemID: thisItem.legacyItemId,
		itemURL: thisItem.itemWebUrl,
		itemTitle: thisItem.title,
		itemQuantity: qty,
		itemCost: thisItem.price.value,
	};
	return shoppingCartItem;
}

/* 
search tokenScope: 'https://api.ebay.com/oauth/api_scope',
item tokenScope: 'https://api.ebay.com/oauth/api_scope/buy.item.bulk',
getItem tokenScope: 'https://api.ebay.com/oauth/api_scope',
*/


export const defaultEbayProps = {
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


/* ========== GET TOKEN ========== */

getEbayAppToken.propTypes = {
	apiProps: PropTypes.object.isRequired,
};
export type getEbayAppTokenType = InferProps<typeof getEbayAppToken.propTypes>;
export function getEbayAppToken(props: getEbayAppTokenType){
	const apiProps = { ...defaultEbayProps, ...props.apiProps };
	const fetchToken = async () => {
		if (debug) console.log("Fetching Token");
		try {
			const response = await fetch(
				apiProps.proxyURL + apiProps.baseTokenURL, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Authorization': 'Basic ' + btoa(`${apiProps.appId}:${apiProps.appCertId}`) // Base64 encoded
					},
					body: new URLSearchParams({
						grant_type: 'client_credentials',
						scope: apiProps.tokenScope
					})
				});
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			const accessToken = data.access_token;
			return accessToken;
		} catch (error) {
			console.error('Error fetching token:', error);
		}
	};
	return fetchToken();
}


/* ========== ITEM SEARCH ========== */

getEbayItemsSearch.propTypes = {
	apiProps: PropTypes.object.isRequired,
	token: PropTypes.string.isRequired,
};
export type getEbayItemsSearchType = InferProps<typeof getEbayItemsSearch.propTypes>;
export function getEbayItemsSearch(props: getEbayItemsSearchType){
	const apiProps = { ...defaultEbayProps, ...props.apiProps };
	const fetchData = async (token: string) => {
		if (debug) console.log("Fetching ebay API Data");
		try {
			const response = await fetch(
				apiProps.proxyURL + encodeURIComponent( apiProps.baseSearchURL + apiProps.qsSearchURL ) , {
					method: 'GET',
					headers: {
						'Authorization' : 'Bearer ' + token ,
						'X-EBAY-C-MARKETPLACE-ID' : 'EBAY_US',
						'X-EBAY-C-ENDUSERCTX' : 'affiliateCampaignId=<ePNCampaignId>,affiliateReferenceId=<referenceId>',
						'X-EBAY-SOA-SECURITY-APPNAME' : 'BrianWha-Pixelate-PRD-1fb4458de-1a8431fe',
					}
				});
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};
	return fetchData(props.token);
}


/* ========== GET ITEM ========== */

getEbayItem.propTypes = {
	apiProps: PropTypes.object.isRequired,
	token: PropTypes.string.isRequired,
};
export type getEbayItemType = InferProps<typeof getEbayItem.propTypes>;
export function getEbayItem(props: getEbayItemType){
	const apiProps: EbayApiType = { ...defaultEbayProps, ...props.apiProps };
	const fetchData = async (token: string) => {
		if (debug) console.log("Fetching ebay API Data");
		try {
			const response = await fetch(
				apiProps.proxyURL + encodeURIComponent( (apiProps.baseItemURL ?? '') + (apiProps.qsItemURL ?? '') ) , {
					method: 'GET',
					headers: {
						'Authorization' : 'Bearer ' + token ,
						'X-EBAY-C-MARKETPLACE-ID' : 'EBAY_US',
						'X-EBAY-C-ENDUSERCTX' : 'affiliateCampaignId=<ePNCampaignId>,affiliateReferenceId=<referenceId>',
						'X-EBAY-SOA-SECURITY-APPNAME' : 'BrianWha-Pixelate-PRD-1fb4458de-1a8431fe',
					}
				});
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};
	return fetchData(props.token);
}

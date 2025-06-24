 
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Carousel } from '../carousel2/pixelated.carousel';
import { AddToShoppingCart, AddToCartButton, GoToCartButton } from "../shoppingcart/pixelated.shoppingcart";
import type { ShoppingCartType } from "../shoppingcart/pixelated.shoppingcart";
import "../../css/pixelated.grid.scss";
import "./pixelated.ebay.css";
const debug = false;

/* 
TODO #2 Fix Ebay Items Api Call
TODO #3 Convert eBay Component to Typescript
TODO #4 Add eBay Item Details Component
*/



/* ===== EBAY BROWSE API DOCUMENTATION =====
https://developer.ebay.com/api-docs/buy/browse/resources/item_summary/methods/search
https://developer.ebay.com/api-docs/buy/static/ref-buy-browse-filters.html
https://developer.ebay.com/api-docs/static/oauth-ui-tokens.html
https://developer.ebay.com/my/keys
https://developer.ebay.com/my/auth?env=production&index=0
*/



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

function getShoppingCartItem(thisItem: any) {
	const shoppingCartItem: ShoppingCartType = {
		itemImageURL : thisItem.image.imageUrl,
		itemID: thisItem.legacyItemId,
		itemURL: thisItem.itemWebUrl,
		itemTitle: thisItem.title,
		itemQuantity: 1,
		itemCost: thisItem.price.value,
	};
	return shoppingCartItem;
}

/* 
search tokenScope: 'https://api.ebay.com/oauth/api_scope',
item tokenScope: 'https://api.ebay.com/oauth/api_scope/buy.item.bulk',
getItem tokenScope: 'https://api.ebay.com/oauth/api_scope',
*/


const defaultEbayProps = {
	proxyURL: "https://proxy.pixelated.tech/prod/proxy?url=",
	baseTokenURL: 'https://api.ebay.com/identity/v1/oauth2/token',
	tokenScope: 'https://api.ebay.com/oauth/api_scope',
	baseSearchURL : 'https://api.ebay.com/buy/browse/v1/item_summary/search',
	qsSearchURL: '?q=sunglasses&filter=sellers:{pixelatedtech}&limit=100',
	baseItemURL: 'https://api.ebay.com/buy/browse/v1/item',
	qsItemURL: '/v1|295959752403|0?fieldgroups=PRODUCT,ADDITIONAL_SELLER_DETAILS',
	appId: 'BrianWha-Pixelate-PRD-1fb4458de-1a8431fe', // clientId
	appCertId: 'PRD-fb4458deef01-0d54-496a-b572-a04b', // clientSecret
	sbxAppId: 'BrianWha-Pixelate-SBX-ad482b6ae-8cb8fead', // Sandbox
	sbxAppCertId: '',
	globalId: 'EBAY-US',
};


/* ========== GET TOKEN ========== */


export function getEbayAppToken(props: any){
	const apiProps = props.apiProps;
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


export function getEbayItemsSearch(props: any){
	const apiProps = props.apiProps;
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


export function getEbayItem(props: any){
	const apiProps = props.apiProps;
	const fetchData = async (token: string) => {
		if (debug) console.log("Fetching ebay API Data");
		try {
			const response = await fetch(
				apiProps.proxyURL + encodeURIComponent( apiProps.baseItemURL + apiProps.qsItemURL ) , {
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


/* ========== EBAY ITEMS PAGE ========== */


export function EbayItems(props: any) {
	// https://developer.ebay.com/devzone/finding/HowTo/GettingStarted_JS_NV_JSON/GettingStarted_JS_NV_JSON.html
	const [ items, setItems ] = useState([]);
	const [ apiProps, setApiProps ] = useState(defaultEbayProps);

	useEffect(() => {
		const newState = {...apiProps, ...props.apiProps};
    	setApiProps(newState);
  	}, [props]);

	function paintItems(props: any){
		if (debug) console.log("Painting Items");
		let newItems = [];
		for (let key in props.items) {
			const item = props.items[key];
			const newItem = <EbayItem item={item} key={item.legacyItemId}  />;
			newItems.push(newItem);
		}
		return newItems;
	}
	paintItems.PropTypes = {
		items: PropTypes.array.isRequired
	};

	useEffect(() => {
		if (debug) console.log("Running useEffect");
		getEbayAppToken({apiProps: apiProps})
			.then(response => {
				getEbayItemsSearch({ apiProps: apiProps, token: response })
					.then( data => {
						if (debug) console.log("eBay API Search Data",data);
						setItems(data.itemSummaries);
					});
			});
	}, []);

	if (items.length > 0 ) {
		return (
			<div className="section-container">
				<div id="ebayItems" className="ebayItems">
					{ paintItems({items}) }
				</div>
			</div>
		);
	} else {
		return (
			<div className="section-container">
				<div id="ebayItems" className="ebayItems">
					<div className="centered">Loading...</div>
				</div>
			</div>
		);
	}

}
EbayItems.propTypes = {
	apiProps: PropTypes.object.isRequired,
};


export function EbayItem(props: any) {
	const thisItem = props.item;
	// const itemURL = thisItem.itemWebUrl;
	const itemURL = "./ebay/" + thisItem.legacyItemId;
	const itemURLTarget = "_self"; /* "_blank" */
	const shoppingCartItem = getShoppingCartItem(thisItem);
	shoppingCartItem.itemURL = itemURL;
	return (
		<div className="ebayItem row-12col">
			<div className="ebayItemPhoto grid-s1-e4">
				{ itemURL
					? <a href={itemURL} target={itemURLTarget} rel="noopener noreferrer"><img src={thisItem.image.imageUrl} alt={thisItem.title} /></a>
					: <img src={thisItem.image.imageUrl} alt={thisItem.title} />
				}
			</div>
			<div className="grid-s5-e8">
				<div className="ebayItemHeader">
					{ itemURL
						? <EbayItemHeader url={itemURL} target={itemURLTarget} title={thisItem.title} />
						: <EbayItemHeader title={thisItem.title} />
					}
				</div>
				<div className="ebayItemDetails grid12">
					<div><b>Item ID: </b>{thisItem.legacyItemId}</div>
					<div><b>Condition: </b>{thisItem.condition}</div>
					<div><b>Seller: </b>{thisItem.seller.username} ({thisItem.seller.feedbackScore})<br />{thisItem.seller.feedbackPercentage}% positive</div>
					<div><b>Buying Options: </b>{thisItem.buyingOptions[0]}</div>
					<div><b>Location: </b>{thisItem.itemLocation.postalCode + ", " + thisItem.itemLocation.country}</div>
				</div>
				<div className="ebayItemPrice">
					{ itemURL
						? <a href={itemURL} target={itemURLTarget} rel="noreferrer">${thisItem.price.value + " " + thisItem.price.currency}</a>
						: thisItem.price.value + " " + thisItem.price.currency
					}
				</div>

				<div className="ebayItemAddToCart">
					<AddToCartButton handler={AddToShoppingCart} item={shoppingCartItem} itemID={thisItem.legacyItemId} />
					<GoToCartButton href={"./cart"} itemID={thisItem.legacyItemId} />
				</div>
			</div>
		</div>
	);
}
EbayItem.propTypes = {
	item: PropTypes.object.isRequired
};


export function EbayItemHeader(props: any) {
	return (
		<span>
			{ props.url
				? <a href={props.url} target={props.target} rel="noopener noreferrer"><h2 className="">{props.title}</h2></a>
				: <h2 className="">{props.title}</h2>
			}
		</span>
	);
}
EbayItemHeader.propTypes = {
	title: PropTypes.string.isRequired,
	url: PropTypes.string,
	target: PropTypes.string,
};


/* ========== EBAY ITEM DETAIL PAGE ========== */


export function EbayItemDetail(props: any)  {
	const [ item, setItem ] = useState({});
	const [ apiProps, setApiProps ] = useState(defaultEbayProps);

	useEffect(() => {
		const newState = {...apiProps, ...props.apiProps};
    	setApiProps(newState);
  	}, [props]);

	useEffect(() => {
		if (debug) console.log("Running useEffect");
		getEbayAppToken({apiProps: apiProps})
			.then(response => {
				getEbayItem({ apiProps: apiProps, token: response })
					.then( data => {
						if (debug) console.log("eBay API Item Data",data);
						setItem({...data});
					});
			});
	}, []);

	if ( item && Object.keys(item) && Object.keys(item).length > 0 ) {
		const thisItem = { ...item } as any;
		if (debug) console.log(thisItem);
		const images = thisItem.additionalImages.map(( thisImage: any ) => (
			{ image: thisImage.imageUrl }
		));
		const itemURL = undefined;
		const itemURLTarget = "_self"; /* "_blank" */

		const shoppingCartItem = getShoppingCartItem(thisItem);
		shoppingCartItem.itemURL = itemURL;

		return (
			<div className="section-container">
				<div id="ebayItems" className="ebayItems">
					<div className="ebayItem row-12col">
						<div className="ebayItemHeader grid-s1-e12">
							{ itemURL
								? <EbayItemHeader url={itemURL} title={thisItem.title} />
								: <EbayItemHeader title={thisItem.title} />
							}
						</div>
						<br />
						<div className="ebayItemPhotoCarousel grid-s1-e6">
							<Carousel 
								cards={images} 
								draggable={true} 
								imgFit={"contain"}
							/>
						</div>
						<div className="grid-s7-e6">
							<div className="ebayItemDetails grid12">
								<div dangerouslySetInnerHTML={{ __html: thisItem.description.replace(/(<br\s*\/?>\s*){2,}/gi, '') }} />
							</div>
							<br />
							<div className="ebayItemDetails grid12">
								<div><b>Item ID: </b>{thisItem.legacyItemId}</div>
								<div><b>Category: </b>{thisItem.categoryPath}</div>
								<div><b>Condition: </b>{thisItem.condition}</div>
								<div><b>Seller: </b>{thisItem.seller.username} ({thisItem.seller.feedbackScore})<br />{thisItem.seller.feedbackPercentage}% positive</div>
								<div><b>Buying Options: </b>{thisItem.buyingOptions[0]}</div>
								<div><b>Location: </b>{thisItem.itemLocation.city + ", " + thisItem.itemLocation.stateOrProvince}</div>
								<br />
							</div>
							<div className="ebayItemPrice">
								{ itemURL
									? <a href={itemURL} target={itemURLTarget} rel="noreferrer">${thisItem.price.value + " " + thisItem.price.currency}</a>
									: thisItem.price.value + " " + thisItem.price.currency
								}
							</div>
							<br />
							<div className="ebayItemAddToCart">
								<AddToCartButton handler={AddToShoppingCart} item={shoppingCartItem} itemID={thisItem.legacyItemId} />
								<GoToCartButton href={"./cart"} itemID={thisItem.legacyItemId} />
							</div>

						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="section-container">
				<div id="ebayItems" className="ebayItems">
					<div className="centered">Loading...</div>
				</div>
			</div>
		);
	}
}
EbayItemDetail.propTypes = {
	apiProps: PropTypes.object.isRequired
};


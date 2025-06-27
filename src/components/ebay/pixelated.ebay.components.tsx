 
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Carousel } from '../carousel2/pixelated.carousel';
import { defaultEbayProps, ebaySunglassCategory, getEbayAppToken, getEbayItemsSearch, getEbayItem, getShoppingCartItem } from "./pixelated.ebay.functions";
import { AddToShoppingCart, AddToCartButton, GoToCartButton } from "../shoppingcart/pixelated.shoppingcart";
import "../../css/pixelated.grid.scss";
import "./pixelated.ebay.css";
const debug = false;



/* 
TODO #2 Fix Ebay Items Api Call
TODO #3 Convert eBay Component to Typescript
TODO #4 Add eBay Item Details Component
*/



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
			const newItem = <EbayListItem item={item} key={item.legacyItemId}  />;
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


export function EbayListItem(props: any) {
	const thisItem = props.item;
	// const itemURL = thisItem.itemWebUrl;
	const itemURL = "./store/" + thisItem.legacyItemId;
	const itemURLTarget = "_self"; /* "_blank" */
	const shoppingCartItem = getShoppingCartItem(thisItem);
	// CHANGE EBAY URL TO LOCAL EBAY ITEM DETAIL URL
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
					<div><b>Quantity: </b>{thisItem.categories[0].categoryId == ebaySunglassCategory ? 1 : 10}</div>
					<div><b>Condition: </b>{thisItem.condition}</div>
					<div><b>Seller: </b>{thisItem.seller.username} ({thisItem.seller.feedbackScore})<br />{thisItem.seller.feedbackPercentage}% positive</div>
					<div><b>Buying Options: </b>{thisItem.buyingOptions[0]}</div>
					<div><b>Location: </b>{thisItem.itemLocation.postalCode + ", " + thisItem.itemLocation.country}</div>
					<div><b>Listing Date: </b>{thisItem.itemCreationDate}</div>
				</div>
				<div className="ebayItemPrice">
					{ itemURL
						? <a href={itemURL} target={itemURLTarget} rel="noreferrer">${thisItem.price.value + " " + thisItem.price.currency}</a>
						: "$" + thisItem.price.value + " " + thisItem.price.currency
					}
				</div>
				<br />
				<div className="ebayItemAddToCart">
					<AddToCartButton handler={AddToShoppingCart} item={shoppingCartItem} itemID={thisItem.legacyItemId} />
					<GoToCartButton href={"/cart"} itemID={thisItem.legacyItemId} />
				</div>
			</div>
		</div>
	);
}
EbayListItem.propTypes = {
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
								<div><b>Quantity: </b>{thisItem.categoryId == ebaySunglassCategory ? 1 : 10}</div>
								<div><b>Category: </b>{thisItem.categoryPath}</div>
								<div><b>Condition: </b>{thisItem.condition}</div>
								<div><b>Seller: </b>{thisItem.seller.username} ({thisItem.seller.feedbackScore})<br />{thisItem.seller.feedbackPercentage}% positive</div>
								<div><b>Buying Options: </b>{thisItem.buyingOptions[0]}</div>
								<div><b>Location: </b>{thisItem.itemLocation.city + ", " + thisItem.itemLocation.stateOrProvince}</div>
								<div><b>Listing Date: </b>{thisItem.itemCreationDate}</div>
								<br />
							</div>
							<div className="ebayItemPrice">
								{ itemURL
									? <a href={itemURL} target={itemURLTarget} rel="noreferrer">${thisItem.price.value + " " + thisItem.price.currency}</a>
									: "$" + thisItem.price.value + " " + thisItem.price.currency
								}
							</div>
							<br />
							<div className="ebayItemAddToCart">
								<AddToCartButton handler={AddToShoppingCart} item={shoppingCartItem} itemID={thisItem.legacyItemId} />
								<GoToCartButton href={"/cart"} itemID={thisItem.legacyItemId} />
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


"use client";

import React, { useState, useEffect } from "react";
import PropTypes, { InferProps } from "prop-types";
import { Carousel } from '../carousel2/pixelated.carousel';
import { defaultEbayProps, ebaySunglassCategory, getEbayItems, getEbayItem, getShoppingCartItem } from "./pixelated.ebay.functions";
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

EbayItems.propTypes = {
	apiProps: PropTypes.object.isRequired,
};
export type EbayItemsType = InferProps<typeof EbayItems.propTypes>;
export function EbayItems(props: EbayItemsType) {
	// https://developer.ebay.com/devzone/finding/HowTo/GettingStarted_JS_NV_JSON/GettingStarted_JS_NV_JSON.html
	const [ items, setItems ] = useState<any[]>([]);
	const [ apiProps ] = useState({ ...defaultEbayProps , ...props.apiProps});

	function paintItems(props: any){
		if (debug) console.log("Painting Items");
		let newItems = [];
		for (let key in props.items) {
			const item = props.items[key];
			const newItem = <EbayListItem item={item} key={item.legacyItemId} />;
			newItems.push(newItem);
		}
		return newItems;
	}
	paintItems.PropTypes = {
		items: PropTypes.array.isRequired
	};

	useEffect(() => {
		if (debug) console.log("Running useEffect");
		async function fetchItems() {
			try {
				const response: any = await getEbayItems({ apiProps: apiProps });
				if (debug) console.log("eBay API Get Items Data", response);
				setItems(response.itemSummaries);
			} catch (error) {
				console.error("Error fetching eBay items:", error);
			}
		}
		fetchItems();
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



EbayListItem.propTypes = {
	item: PropTypes.any.isRequired
};
export type EbayListItemType = InferProps<typeof EbayListItem.propTypes>;
export function EbayListItem(props: EbayListItemType) {
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



EbayItemHeader.propTypes = {
	title: PropTypes.string.isRequired,
	url: PropTypes.string,
	target: PropTypes.string,
};
export type EbayItemHeaderType = InferProps<typeof EbayItemHeader.propTypes>;
export function EbayItemHeader(props: EbayItemHeaderType) {
	return (
		<span>
			{ props.url
				? <a href={props.url} target={props.target ?? ''} rel="noopener noreferrer"><h2 className="">{props.title}</h2></a>
				: <h2 className="">{props.title}</h2>
			}
		</span>
	);
}


/* ========== EBAY ITEM DETAIL PAGE ========== */


EbayItemDetail.propTypes = {
	apiProps: PropTypes.object.isRequired,
	itemID: PropTypes.string.isRequired, // currently not used
};
export type EbayItemDetailType = InferProps<typeof EbayItemDetail.propTypes>;
export function EbayItemDetail(props: EbayItemDetailType)  {
	const [ item, setItem ] = useState({});
	const [ apiProps ] = useState({ ...defaultEbayProps, ...props.apiProps });

	useEffect(() => {
		if (debug) console.log("Running useEffect");
		async function fetchItems() {
			try {
				const response: any = await getEbayItem({ apiProps: apiProps });
				if (debug) console.log("eBay API Get Items Data", response);
				setItem(response);
			} catch (error) {
				console.error("Error fetching eBay items:", error);
			}
		}
		fetchItems();
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

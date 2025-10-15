/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import PropTypes, { InferProps } from 'prop-types';
import { PayPal } from "./pixelated.paypal";
import { CalloutHeader } from "../callout/pixelated.callout";
import { getContentfulDiscountCodes } from "../cms/pixelated.contentful";
import { FormEngine } from "../form/pixelated.form";
import { FormButton } from '../form/pixelated.formcomponents';
import { emailJSON } from "../form/pixelated.form.submit";
import '../form/pixelated.form.css';
import { MicroInteractions } from '../microinteractions/pixelated.microinteractions';
import { Modal, handleModalOpen } from '../modal/pixelated.modal';
import { Table } from "../table/pixelated.table";
// import shippingFromData from "../../data/shipping.from.json";
import shippingToData from "../../data/shipping.to.json";
// import shippingParcelData from "../../data/shipping.parcel.json";

// import dc from "../../data/shoppingCartDiscountCodes.json";
// const codeList2 = dc.discountCodes;

import "./pixelated.shoppingcart.css";
import { get } from 'http';
import { Url } from 'url';

const debug = false;
/* ========== LOCALSTORAGE KEYS ========== */
const shoppingCartKey = "pixelvividCart";
const shippingInfoKey = "pixelvividCartShipping";
const discountCodesKey = "pixelvividDiscountCodes";
const checkoutInfoKey = "pixelvividCartCheckout";
// const sbPayPalApiKey = "AT10GG2ZHoApTtEw7dJoU6XRDYkf3wEvK2k_-eZ9GOvOK-REphG8yKCyZCqFi95OrxKgrdctlfWxayHG";
// const sbPayPalSecret = "EDUrdPonwcNYZwO5j7hNmFSmF-13zptaCndUnO0-Vr_j0GYEW4m-Tfar9IaukHwm0ixL5fUojOOFtZVk";
// const payPalApiKey = "AeWRwYpsrfslATCndF6xjL4GLcqA1UxQZLC5vxQE-FTvPezXfLbCJO_uAFk5zoXUKRFnP-zJ_73yEkBE";
// const payPalSecret = "EBvYvynRXZCI6RbK4rg2NiENNG4N8tbgl8qAmpxB6f9nUkZjXMODxXJZ91JycP439kPrQcnB7uRKp0-F";


const apiProps = {
	base_url: "https://cdn.contentful.com",
	space_id: "soi9w77t7027",
	environment: "master",
	access_token: "muY9LfpCt4qoXosDsnRkkoH3DAVVuUFEuB0WRKRdBUM",
};

/* 
https://stackoverflow.com/questions/55328748/how-to-store-and-retrieve-shopping-cart-items-in-localstorage
https://michalkotowski.pl/writings/how-to-refresh-a-react-component-when-local-storage-has-changed
*/

/* ========== TYPES ========== */

export type ShoppingCartType = {
    itemID: string,
	itemURL?: string,
    itemTitle: string,
	itemImageURL? : string,
    itemQuantity: number,
    itemCost: number,
}

export type ShoppingCartItemType = {
    itemID: string,
	itemURL?: string,
    itemTitle: string,
	itemDescription: string,
    itemCost: number,
	itemCategory?: string,
	itemCondition?: string,
	itemProperties?: { [key: string]: any },
	itemImageThumbnail? : string,
	itemImages?: string[],
    itemQuantity: number,
	itemSeller?: string,
	itemBuyingFormat?: string,
	itemLocation?: string,
	itemListingDate: string, 
}

export type AddressType = {
    name: string,
    street1: string,
    city: string,
    state: string,
    zip: string,
    country: string,
    email?: string,
    phone?: string,
}

export type DiscountCodeType = {
	codeName: string,
	codeDescription: string,
	codeType: string,
	codeStart: string,
	codeEnd: string,
	codeValue: number,
};

export type CheckoutType = {
	items: ShoppingCartType[];
	subtotal: number,
	subtotal_discount: number,
	shippingTo: AddressType,
	shippingCost: number,
	handlingFee: number,
	insuranceCost?: number,
	shipping_discount?: number,
	salesTax: number;
	total: number;
}




/* ========== ARRAYS ========== */

const shippingOptions = [
	{
		id: "USPS-GA",
		region: "Domestic US",
		provider: "USPS",
		service: "Ground Advantage",
		price: "9.99",
		speed: "2 - 5 days",
	},{
		id: "USPS-PM",
		region: "Domestic US",
		provider: "USPS",
		service: "Priority Mail",
		price: "14.99",
		speed: "2 - 3 days",
	},{
		id: "USPS-PMX",
		region: "Domestic US",
		provider: "USPS",
		service: "Priority Mail Express",
		price: "39.99",
		speed: "1 - 3 days",
	},{
		id: "USPS-FCP-I",
		region: "International",
		provider: "USPS",
		service: "First-Class Package International",
		price: "24.99",
		speed: "Varies",
	},{
		id: "USPS-PM-I",
		region: "International",
		provider: "USPS",
		service: "Priority Mail International",
		price: "39.99",
		speed: "6 - 10 days",
	},{
		id: "USPS-PMX-I",
		region: "International",
		provider: "USPS",
		service: "Priority Mail Express International",
		price: "69.99",
		speed: "3 - 5 days",
	}
];




/* ======================================= */
/* ========== BACKEND FUNCTIONS ========== */
/* ======================================= */




/* ========== SHOPPING CART FUNCTIONS ========== */


function formatAsUSD(cost: number) {
	return cost.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}


function formatAsHundredths(num: number) {
  	return Math.trunc(num * 100) / 100;
}


function getCart() {
	const cart = localStorage.getItem(shoppingCartKey);
	return cart ? JSON.parse(cart) : [];
}


function setCart(shoppingCartJSON: ShoppingCartType[]) {
	localStorage.setItem(shoppingCartKey, JSON.stringify(shoppingCartJSON));
	window.dispatchEvent(new Event('storage'));
}


function alreadyInCart(cart: ShoppingCartType[], itemID: string) {
	for (const key in cart) {
		const item = cart[key];
		if (typeof item === 'object' && item !== null && Object.prototype.hasOwnProperty.call(item, 'itemID') && item.itemID == itemID) {
			return true;
		} 
	}
	return false;
}


function increaseQuantityCart(cart: ShoppingCartType[], itemID: string) {
	for (const key in cart) {
		const item = cart[key];
		if (typeof item === 'object' && item !== null && Object.prototype.hasOwnProperty.call(item, 'itemID') && item.itemID == itemID) {
			item.itemQuantity += 1;
		} 
	}
}


function getIndexInCart(cart: ShoppingCartType[], itemID: string) {
	for (let i = 0; i < cart.length; i++) {
		const item = cart[i];
		if (typeof item === 'object' && item !== null && Object.prototype.hasOwnProperty.call(item, 'itemID') && item.itemID == itemID) {
			return i;
		} 
	}
	return -1;
}


function getCartItemCount(cart: ShoppingCartType[]) {
	let cartCount = 0 ;
	for (let i = 0; i < cart.length; i++) {
		const item = cart[i];
		if (typeof item === 'object' && item !== null && Object.prototype.hasOwnProperty.call(item, 'itemID') ) {
			cartCount = cartCount + ( item.itemQuantity );
		} 
	}
	return cartCount;
}


function getCartSubTotal(cart: ShoppingCartType[]) {
	let cartSubTotal = 0;
	for (let i = 0; i < cart.length; i++) {
		const item = cart[i];
		if (typeof item === 'object' && item !== null && 
			Object.prototype.hasOwnProperty.call(item, 'itemQuantity') && 
			Object.prototype.hasOwnProperty.call(item, 'itemCost') ) {
			cartSubTotal += (item.itemQuantity * item.itemCost);
		} 
	}
	return formatAsHundredths(cartSubTotal);
}


export function AddToShoppingCart(thisItem: ShoppingCartType) {
	let cart: ShoppingCartType[] = getCart();
	if(alreadyInCart(cart, thisItem.itemID)){
		const index = getIndexInCart(cart, thisItem.itemID);
		if ( cart[index].itemQuantity < thisItem.itemQuantity) {
			if (debug) console.log("Increasing quantity in cart");
			increaseQuantityCart(cart, thisItem.itemID);
		} else {
			if (debug) console.log("Cant add more than item quantity to the cart");
			// cant add moe than quantity
		}
	} else {
		// BE SURE TO ADD ONLY ONE TO THE CART
		if (debug) console.log("Adding only one to the cart");
		const cartItem = { ...thisItem };
		cartItem.itemQuantity = 1;
		cart.push(cartItem);
	} 
	localStorage.setItem(shoppingCartKey, JSON.stringify(cart));
	window.dispatchEvent(new Event('storage'));
}


export function RemoveFromShoppingCart(thisItem: ShoppingCartType) { 
	let cart: ShoppingCartType[] = getCart();
	if(alreadyInCart(cart, thisItem.itemID)){
		cart.splice(getIndexInCart(cart, thisItem.itemID), 1);
	}
 	localStorage.setItem(shoppingCartKey, JSON.stringify(cart));
	window.dispatchEvent(new Event('storage'));
}


export function ClearShoppingCart() { 
	localStorage.removeItem( shoppingCartKey );
	localStorage.removeItem( shippingInfoKey );
	window.dispatchEvent(new Event('storage'));
}


/* ========== SHIPPING INFO FUNCTIONS ========== */


function getShippingInfo(){
	const ship = localStorage.getItem(shippingInfoKey);
	return ship ? JSON.parse(ship) : [];
}


export function SetShippingInfo(shippingFormData: any) { 
	localStorage.setItem(shippingInfoKey, JSON.stringify(shippingFormData) );
	window.dispatchEvent(new Event('storage'));
}


function getShippingCost(): number {
	const ship = getShippingInfo();
	const method = ship.shippingMethod;
	const option = shippingOptions.find(item => item.id === method);
	return (option && option.price) ? formatAsHundredths(Number(option.price)) : 0;
}


/* ========== DISCOUNT CODE FUNCTIONS ========== */


export async function validateDiscountCode(field: { value: string ; }) { 
	try {
		const codeList = await getContentfulDiscountCodes({ apiProps: apiProps, contentType: "discountCodes" });
		if (!codeList) { return false; } // If no codes are found, return false
		if(field.value == '') { return true; } // If the field is empty, return true (no code entered)
		if ( codeList.some((code : DiscountCodeType) => code && code.codeName.toLowerCase() === field.value.toLowerCase() )) {
			// if code is in the codeList
			const foundCode = codeList.find((code : DiscountCodeType) => code.codeName.toLowerCase() === field.value.toLowerCase() );
			if(foundCode) {
				// if code is active - between start and end date
				const startDate = new Date(foundCode.codeStart);
				const endDate = new Date(foundCode.codeEnd);
				const today = new Date();
				const isActive = today >= startDate && today <= endDate;
				return isActive;
			}
		} else {
			// if code is not in the codeList
			return false;
		}
	} catch (error) {
		console.error("Error fetching discount codes:", error); // Handle potential errors
		throw error; // Or return false;
	}
}


async function getRemoteDiscountCodes(){
	if (debug) console.log("Getting Contentful Discount Codes");
	try {
		const discountCodes = await getContentfulDiscountCodes({ 
			apiProps: apiProps, 
			contentType: "discountCodes" 
		});
		if (debug) console.log("Retrieved Contentful Discount Codes: ", discountCodes);
		return discountCodes;
	} catch ( error ) {
		console.error("An error occurred getting discount codes:", error);
	};
}


function getLocalDiscountCodes(){
	const discountCodes = localStorage.getItem(discountCodesKey);
	return discountCodes ? JSON.parse(discountCodes) : [];

}


function setDiscountCodes(discountCodesJSON: DiscountCodeType[]) {
	if (debug) console.log("Set Discount Codes LocalStorage: ", discountCodesJSON);
	localStorage.setItem(discountCodesKey, JSON.stringify(discountCodesJSON));
	window.dispatchEvent(new Event('storage'));
}


function getDiscountCode(codeString: string){
	if (debug) console.log("Getting Discount Code Object");
	if (!codeString || codeString === '') { return undefined; } // If the code is empty, return null
	const discountCodes: DiscountCodeType[] = getLocalDiscountCodes();
	if (!discountCodes) { return undefined; } // If no codes are found, return null
	// Find the discount code in the list
	const discountCode = discountCodes.find((code: DiscountCodeType) => {
		if (code && code.codeName){
			return code.codeName.toLowerCase() === codeString.toLowerCase();
		}else {
			return undefined;
		}
	});
	return discountCode;
}


function getCartSubtotalDiscount(cart: ShoppingCartType[]) {
	if (!cart) { return 0; } // If cart is empty, return null
	const cartSubTotal = getCartSubTotal(cart);
	const shippingInfo = getShippingInfo();
	const discountCode = getDiscountCode(shippingInfo.discountCode);
	if (!discountCode) { return 0; } // If no codes are found, return null
	const discountAmount = formatAsHundredths(cartSubTotal * discountCode.codeValue);
	return discountAmount;
}


/* ========== CHECKOUT FUNCTIONS ========== */


function getHandlingFee(){
	return 3.99;
}


function getSalesTax(): number {
	const itemCost = getCartSubTotal(getCart());
	const shippingCost = getShippingCost();
	const handlingFee = getHandlingFee();
	const njSalesTaxRate = 0.06675;
	const salesTax = njSalesTaxRate * (itemCost + shippingCost + handlingFee);
	return formatAsHundredths(salesTax); 
}


export function getCheckoutTotal() {
	const itemCost = getCartSubTotal(getCart());
	const itemDiscount = getCartSubtotalDiscount(getCart());	
	const shippingCost = getShippingCost();
	const handlingFee = getHandlingFee();
	const insuranceCost = 0;
	const shipping_discount = 0;
	const salesTax = getSalesTax();
	const checkoutTotal = itemCost - itemDiscount + shippingCost + handlingFee + insuranceCost + shipping_discount + salesTax;
	return formatAsHundredths(checkoutTotal);
}


function getCheckoutData(){
	const checkoutObj: CheckoutType = {
		items: getCart(),
		subtotal: getCartSubTotal(getCart()),
		subtotal_discount: getCartSubtotalDiscount(getCart()),
		shippingTo: getShippingInfo(),
		shippingCost: getShippingCost(),
		handlingFee: getHandlingFee(),
		insuranceCost: undefined,
		shipping_discount: undefined,
		salesTax: getSalesTax(),
		total: getCheckoutTotal(),
	};
	if (debug) console.log(checkoutObj);
	return checkoutObj;
}


function completeCheckout() {
}



/* ================================================ */
/* ========== SHOPPING CART UI COMPONENT ========== */
/* ================================================ */

export function ShoppingCart( props: {payPalClientID: string} ) {

	const [ shoppingCart, setShoppingCart ] = useState<ShoppingCartType[]>();
	const [ shippingInfo, setShippingInfo ] = useState<AddressType[]>();
	const [ checkoutInfo, setCheckoutInfo ] = useState<CheckoutType>();
	const [ orderData, setOrderData ] = useState() as any;
	const [ progressStep, setProgressStep ] = useState<ProgressStepType>("EmptyCart");

	type ProgressStepType = "EmptyCart" | "CartItems" | "ShippingInfo" | "Checkout" | "ThankYou" ;
	function SetProgressStep(step?: ProgressStepType){
		if (step) {
			setProgressStep(step);
		} else {
			const hasShoppingCart = getCart().length > 0;
			if (debug) console.log("hasShoppingCart", hasShoppingCart);
			const hasShippingInfo = Object.keys(getShippingInfo()).length > 0 ;
			if (debug) console.log("hasShippingInfo", hasShippingInfo);
			const hasOrderData = orderData && orderData.length > 0 ;
			if (debug) console.log("hasOrderData", hasOrderData);
			if (debug) console.log(orderData?.length);
			if ( hasOrderData ) {
				setProgressStep("ThankYou");
			} else if ( hasShippingInfo && hasShoppingCart ) {
				setProgressStep("Checkout");
			} else if (hasShoppingCart) {
				setProgressStep("ShippingInfo");
			} else {
				setProgressStep("EmptyCart");
			}
		}
	}

	/* useEffect(() => {
		// UPDATE LOCALSTORAGE IF SHOPPINGCART STATE CHANGES
		setCart(shoppingCart ?? []);
	}, [shoppingCart]); */

	/* useEffect(() => {
		// UPDATE LOCALSTORAGE IF SHIPPINGINFO STATE CHANGES
		setShippingInfo(shippingInfo);
	}, [shippingInfo]); */

	useEffect(() => {
		// UPDATE DISCOUNT CODES ON EACH PAGE LOAD
		(async () => {
			setDiscountCodes(await getRemoteDiscountCodes());
		})();
		// UPDATE SHOPPINGCART AND SHIPPINGINFO STATES IF LOCALSTORAGE CHANGES
		function handleStorageChange(){
			setShoppingCart( getCart() );
			setShippingInfo( getShippingInfo() );
			setCheckoutInfo( getCheckoutData() );
			SetProgressStep();
		}
		window.addEventListener('storage', handleStorageChange);
		window.dispatchEvent(new Event('storage'));
		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};
	}, []);

	useEffect(() => {
		// LOAD THE SHIPPING INFO FORM WITH VALUES IF SHIPPING INFO HAS ALREADY BEEN SAVED
  		const form: HTMLFormElement = document.getElementById("address_to") as HTMLFormElement;
		if( shippingInfo && form ) {
			for (const key in shippingInfo) {
				const input = form.elements[key] as HTMLInputElement;
				if (input) { // Check if the form element exists
					input.value = shippingInfo[key].toString();
				}
  			}
		}
	}, [progressStep]);

	paintCartItems.PropTypes = {
		items: PropTypes.array.isRequired
	};
	function paintCartItems(items: ShoppingCartType[]){
		if (debug) console.log("Painting Shopping Cart Items");
		let newItems = [];
		for (let key in items) {
			const myItem: ShoppingCartType = items[key];
			const newItem = <ShoppingCartItem item={myItem} key={myItem.itemID}  />;
			newItems.push(newItem);
		}
		return newItems;
	}

	function onShippingSubmit(event: Event){
		const formID = 'address_to' as const;
		const formElement = document.getElementById(formID) as HTMLFormElement;
		const formData = new FormData(formElement);
		const formObject = Object.fromEntries(formData);
		SetShippingInfo(formObject);
	}

	handleOnApprove.propTypes = {
		data: PropTypes.object.isRequired
	};
	type handleOnApproveType = InferProps<typeof handleOnApprove.propTypes>;
	function handleOnApprove(props: handleOnApproveType ){
		if (debug) console.log("Handling onApprove");
		// eslint-disable-next-line react/prop-types
		setOrderData(props.data);
		ClearShoppingCart();
		// SetProgressStep();
		SetProgressStep("ThankYou");
	}

	if ( progressStep === "ThankYou" ) {
		// ========== SENDMAIL ==========
		const json = {
			'to' : 'brian@pixelvivid.com',
			'from' : 'brian@pixelvivid.com',
			'subject' : 'PixelVivid Purchase',
			'orderData' : JSON.stringify(orderData, null, 2),
		};
		const sendMailResponse = emailJSON(json);
		console.log("SendMail Response:", sendMailResponse);

		// ========== THANK YOU ==========
		const pmt = orderData.purchase_units[0].payments.captures[0];
		return (
			<div className="pixCart">
				<CalloutHeader title="Shopping Cart : " />
				<br />
				<div id="paypal-button-container" className="paypal-button-container" />
				<div>
					<h3>Thank you for your payment!</h3>
                        Payment ID : {pmt.id} <br />
                        Status : {pmt.status} <br />
                        Amount : ${pmt.amount.value + " " + pmt.amount.currency_code} <br />
                        Created : {pmt.create_time} <br />
				</div>
			</div>

		);
	} else if ( progressStep === "Checkout" ) {
		// ========== CHECKOUT ==========
		return (
			<div className="pixCart">
				<CalloutHeader title="Checkout Summary : " />
				{ checkoutInfo && <CheckoutItems checkoutData={checkoutInfo} /> }
				<br />
				<FormButton className="pixCartButton" type="button" id="backToCart" text="<= Back To Cart"
					onClick={() => SetProgressStep("ShippingInfo")} />
				<br />
				<PayPal payPalClientID={props.payPalClientID} 
					checkoutData={getCheckoutData()} 
					onApprove={handleOnApprove} />
			</div>
		);
	} else if ( progressStep === "ShippingInfo" ) {
		// ========== SHOPPING CART ==========
		// ========== SHIPPING INFO ==========
		return (
			<div className="pixCart">
				<CalloutHeader title="Shopping Cart : " />
				{ paintCartItems(shoppingCart ?? []) }
				<br />
				<div>
					<FormButton className="pixCartButton" type="button" id="backToCart" text="Clear Cart"
						onClick={() => ClearShoppingCart()} />
				</div>
				<br /><br /><hr /><br /><br />
				<div>
					<CalloutHeader title="Shipping To : " />
					<FormEngine name="address_to" id="address_to" formData={shippingToData} onSubmitHandler={onShippingSubmit} />
				</div>
			</div>
		);
	} else {
		// ========== EMPTY SHOPPING CART ==========
		return (
			<div className="pixCart">
				<CalloutHeader title="Shopping Cart : " />
				<br />
				<div className="centered">No items in your shopping cart</div>
				<div id="paypal-button-container" className="paypal-button-container" />
			</div>

		);
	}
}


ShoppingCartItem.PropTypes = {
	item: PropTypes.object.isRequired
};
export function ShoppingCartItem(props: {item: ShoppingCartType}) {
	const thisItem = props.item;
	const thisItemTarget = "_self"; // "_blank"
	return (
		<div className="pixCartItem row-12col">
			<div className="pixCartItemPhoto grid-s1-e3">
				{ thisItem.itemURL && thisItem.itemImageURL
					? <a href={thisItem.itemURL} target={thisItemTarget} rel="noopener noreferrer"><img src={thisItem.itemImageURL} alt={thisItem.itemTitle} /></a>
					: thisItem.itemImageURL 
						? <img src={thisItem.itemImageURL} alt={thisItem.itemTitle} />
						: <></>
				}
			</div>
			<div className="grid-s4-e7">
				<div className="pixCartItemHeader">
					<span>
						{ thisItem.itemURL
							? <a href={thisItem.itemURL} target={thisItemTarget} rel="noopener noreferrer"><h2 className="">{thisItem.itemTitle}</h2></a>
							: <h2 className="">{thisItem.itemTitle}</h2>
						}
					</span>
				</div>
				<div className="pixCartItemDetails grid12">
					<br />
					<div><b>Item ID: </b>{thisItem.itemID}</div>
					<div><b>Quantity: </b>{thisItem.itemQuantity}</div>
					<br />
					<div>
						<FormButton className="pixCartButton" type="button" id={`btn-rm-${thisItem.itemID}`} text="Remove Item From Cart"
							onClick={()=>RemoveFromShoppingCart(thisItem)} />
					</div>
				</div>
			</div>
			<div className="grid-s11-e2">
				<div className="pixCartItemPrice">
					{ formatAsUSD(thisItem.itemCost) }
				</div>
			</div>
		</div>
	);
}



export function CheckoutItems(props: { checkoutData: CheckoutType }) {
	const items = props.checkoutData.items.map((item: ShoppingCartType, i: number) => (
		<div key={item.itemID}>{item.itemQuantity} X - {item.itemTitle} ( {formatAsUSD(item.itemCost)} )</div> 		
	));
	const to = props.checkoutData.shippingTo;
	const addr = <><div>{to.name}</div><div>{to.street1}</div><div>{to.city}, {to.state} {to.zip}</div></> ;
	let checkoutTableData = [{
		"Name": "Shopping Cart Items : ",
		"Value": items,
	}, {
		"Name": "Subtotal Discount : ",
		"Value": formatAsUSD(props.checkoutData.subtotal_discount),
	}, {
		"Name": "Subtotal : ",
		"Value": formatAsUSD(props.checkoutData.subtotal),
	},{
		"Name": "Shipping Address : ",
		"Value": addr,
	},{
		"Name": "Shipping Cost : ",
		"Value": formatAsUSD(props.checkoutData.shippingCost),
	},{
		"Name": "Handling Fee : ",
		"Value": formatAsUSD(props.checkoutData.handlingFee),
	}, /* {
		"Name": "Insurance Cost : ",
		"Value": formatAsUSD(checkoutData.insuranceCost ?? 0),
	}, */ /* {
		"Name": "Shipping Discount : ",
		"Value": formatAsUSD(checkoutData.shipping_discount ?? 0),
	}, */{
		"Name": "Sales Tax : ",
		"Value": formatAsUSD(props.checkoutData.salesTax),
	},{
		"Name": "TOTAL : ",
		"Value": formatAsUSD(props.checkoutData.total),
	}];

	if (props.checkoutData.subtotal_discount == 0) {
		checkoutTableData = checkoutTableData.filter(obj => obj.Name !== "Subtotal Discount : ");
	}
	return (
		<Table id="pixCheckout" data={checkoutTableData} />
	);
}


export function CartButton(props: {href: string}) {
	const [ cartCount, setCartCount ] = useState(0);
	useEffect(() => {
		// UPDATE CARTCOUNT STATES IF LOCALSTORAGE CHANGES
		function handleStorageChange(){
			setCartCount( getCartItemCount( getCart() ) );
		}
		window.addEventListener('storage', handleStorageChange);
		window.dispatchEvent(new Event('storage'));
		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};
	}, []);
	useEffect(() => {
		if (cartCount && cartCount > 0) {
			console.log("Start Pulsing: " + cartCount);
			MicroInteractions({cartpulse: true});
		} else {
			console.log("Stop Pulsing: " + cartCount);
			MicroInteractions({cartpulse: false});
		}
	}, [cartCount]);
	return (
		<div className="pixCart">
			<button className="pixCartButton" type="button" id="pixCartButton"
				onClick={()=>window.location.href=props.href} >
				<img src="/images/icons/cart-icon.png" />
				<span>&nbsp;{`(${cartCount})`}</span>
			</button>
		</div>
	);
}


export function ViewItemDetails(props: {href: string, itemID: string}){
	return (
		<div>
			<FormButton className="pixCartButton" type="button" 
				id={`btn-item-${props.itemID}`} text="View Item Details"
				onClick={()=>window.location.href = `${props.href}/${props.itemID}`} />
		</div>
	);
}


export function AddToCartButton(props: {handler: any, item: ShoppingCartType, itemID: string}){
	const [modalContent, setModalContent] = useState<React.ReactNode>();
	useEffect(() => {
		const myContent = <div className="centered"><br /><br />Item {props.itemID} has been added to your cart.<br /><br />{GoToCartButton({href: "/cart", itemID: props.itemID})}<br /><br /></div>;
		setModalContent(myContent);
	}, []);
	function handleClick(e: React.MouseEvent<HTMLButtonElement>){
		props.handler(props.item);
		handleModalOpen(e.nativeEvent, "-" + props.itemID);
	}
	return (
		<div>
			<FormButton className="pixCartButton" type="button" 
				id={`btn-add-${props.itemID}`} text="Add to Shopping Cart"
				onClick={(e)=>handleClick(e)} />
			<Modal modalContent={modalContent} modalID={"-" + props.itemID} />
		</div>
	);
}


export function GoToCartButton(props: {href: string, itemID: string}){
	return (
		<div>
			<FormButton className="pixCartButton" type="button" 
				id={`btn-cart-${props.itemID}`} text="Go to Shopping Cart"
				onClick={()=>window.location.href=props.href} />
		</div>
	);
}


function ThankYou() { }


function WishList() { }




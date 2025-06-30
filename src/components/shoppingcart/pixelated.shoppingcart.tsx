/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import React, { useState, useEffect } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { PayPal } from "./pixelated.paypal";
import { FormEngine } from "../form/pixelated.form";
import { FormButton } from '../form/pixelated.formcomponents';
import '../form/pixelated.form.css';
import { CalloutHeader } from "../callout/pixelated.callout";
import { Table } from "../table/pixelated.table";
import { Modal, handleModalOpen } from '../modal/pixelated.modal';
// import shippingFromData from "../../data/shipping.from.json";
import shippingToData from "../../data/shipping.to.json";
// import shippingParcelData from "../../data/shipping.parcel.json";
import dc from "../../data/shoppingCartDiscountCodes.json";
const codeList = dc.discountCodes;
import "./pixelated.shoppingcart.css";

const debug = false;
const shoppingCartKey = "pixelatedCart";
const shippingInfoKey = "pixelatedCartShipping";
// const sbPayPalApiKey = "AT10GG2ZHoApTtEw7dJoU6XRDYkf3wEvK2k_-eZ9GOvOK-REphG8yKCyZCqFi95OrxKgrdctlfWxayHG";
// const sbPayPalSecret = "EDUrdPonwcNYZwO5j7hNmFSmF-13zptaCndUnO0-Vr_j0GYEW4m-Tfar9IaukHwm0ixL5fUojOOFtZVk";
// const payPalApiKey = "AeWRwYpsrfslATCndF6xjL4GLcqA1UxQZLC5vxQE-FTvPezXfLbCJO_uAFk5zoXUKRFnP-zJ_73yEkBE";
// const payPalSecret = "EBvYvynRXZCI6RbK4rg2NiENNG4N8tbgl8qAmpxB6f9nUkZjXMODxXJZ91JycP439kPrQcnB7uRKp0-F";

/* 
TODO #5 Build eCommerce Components
*/

/* 
https://stackoverflow.com/questions/55328748/how-to-store-and-retrieve-shopping-cart-items-in-localstorage
https://michalkotowski.pl/writings/how-to-refresh-a-react-component-when-local-storage-has-changed
*/

/* ========== TYPES ========== */

export type ShoppingCartType = {
	itemImageURL? : string,
    itemID: string,
	itemURL?: string,
    itemTitle: string,
    itemQuantity: number,
    itemCost: number,
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

export type CheckoutType = {
	items: ShoppingCartType[];
	subtotal: number,
	subtotal_discount?: number,
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

function getCart() {
	const cart = localStorage.getItem(shoppingCartKey);
	return cart ? JSON.parse(cart) : [];
}

function setCart(shoppingCartJSON: ShoppingCartType[]) {
	localStorage.setItem('pixelatedCart', JSON.stringify(shoppingCartJSON));
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
	return cartSubTotal;
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
	localStorage.setItem("pixelatedCart", JSON.stringify(cart));
	window.dispatchEvent(new Event('storage'));
}

export function RemoveFromShoppingCart(thisItem: ShoppingCartType) { 
	let cart: ShoppingCartType[] = getCart();
	if(alreadyInCart(cart, thisItem.itemID)){
		cart.splice(getIndexInCart(cart, thisItem.itemID), 1);
	}
 	localStorage.setItem("pixelatedCart", JSON.stringify(cart));
	window.dispatchEvent(new Event('storage'));
}

export function ClearShoppingCart() { 
	// localStorage.setItem("pixelatedCart", JSON.stringify([]) );
	localStorage.removeItem("pixelatedCart");
	localStorage.removeItem("pixelatedCartShipping" );
	window.dispatchEvent(new Event('storage'));
}

function formatAsUSD(cost: number) {
	return cost.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

/* ========== SHIPPING INFO FUNCTIONS ========== */

function getShippingInfo(){
	const ship = localStorage.getItem(shippingInfoKey);
	return ship ? JSON.parse(ship) : [];
}

export function SetShippingInfo(shippingFormData: any) { 
	localStorage.setItem(shippingInfoKey, JSON.stringify(shippingFormData) );
	// localStorage.setItem("pixelatedCartFinal", "0");
	window.dispatchEvent(new Event('storage'));
}

function getDiscountCodeInfo(code: string){
	const discountCode = codeList.find(item => item.codeName.toLowerCase() === code.toLowerCase());
	return discountCode ? discountCode : null;
}

function getShippingCost(): number {
	const ship = getShippingInfo();
	const method = ship.shippingMethod;
	const option = shippingOptions.find(item => item.id === method);
	return (option && option.price) ? Math.ceil(Number(option.price)*100)/100 : 0;
}

function getHandlingFee(){
	return 3.99;
}

function getSalesTax(): number {
	const itemCost = getCartSubTotal(getCart());
	const shippingCost = getShippingCost();
	const handlingFee = getHandlingFee();
	const njSalesTaxRate = 0.06675;
	const salesTax = njSalesTaxRate * (itemCost + shippingCost + handlingFee);
	return ( Math.ceil(salesTax * 100) / 100 ) ; 
}

export function getCheckoutTotal(): number {
	const itemCost = getCartSubTotal(getCart());
	const shippingCost = getShippingCost();
	const handlingFee = getHandlingFee();
	const salesTax = getSalesTax();
	const checkoutTotal = itemCost + shippingCost + handlingFee + salesTax;
	return ( Math.ceil(checkoutTotal * 100) / 100 ) ;
}

export function validateDiscountCode(field: { value: string ; }) { 
	// if code is in the codeList
	if(field.value == '') {
		return true;
	} else if ( codeList.some(code => code && code.codeName.toLowerCase() === field.value.toLowerCase() )) {
		if (debug) console.log("Found code in the list");
		const foundCode = codeList.find(code => code.codeName.toLowerCase() === field.value.toLowerCase() );
		if(foundCode) {
			// if code is active - between start and end date
			const startDate = new Date(foundCode.codeStart);
			const endDate = new Date(foundCode.codeEnd);
			const today = new Date();
			return today >= startDate && today <= endDate;
		}
	}
	return false;
}

/* ========== CHECKOUT FUNCTIONS ========== */

function AddDiscountToCart() {
	let cart: ShoppingCartType[] = getCart();
	const shippingInfo = getShippingInfo();
	const discountCode = getDiscountCodeInfo(shippingInfo.discountCode);
	if(discountCode){
		const discountItem: ShoppingCartType = {
			itemImageURL: undefined,
			itemID: discountCode?.codeName || '',
			itemTitle: discountCode?.codeName + " - " + discountCode?.codeDescription,
			itemQuantity: 1,
			itemCost: -1 * Number(getCartSubTotal(getCart())) * Number(discountCode?.codeValue) || 0,
		};
		cart.push(discountItem);
		if (debug) console.log("Adding discount item to cart", discountItem);
		AddToShoppingCart(discountItem);
	}
}

function getCheckoutData(){
	const checkoutObj: CheckoutType = {
		items: getCart(),
		subtotal: getCartSubTotal(getCart()),
		subtotal_discount: undefined,
		shippingTo: getShippingInfo(),
		shippingCost: getShippingCost(),
		handlingFee: getHandlingFee(),
		insuranceCost: undefined,
		shipping_discount: undefined,
		salesTax: getSalesTax(),
		total: getCheckoutTotal(),
	};
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
		// UPDATE SHOPPINGCART AND SHIPPINGINFO STATES IF LOCALSTORAGE CHANGES
		function handleStorageChange(){
			setShoppingCart( getCart() );
			setShippingInfo( getShippingInfo() );
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
		AddDiscountToCart();
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
				{ CheckoutItems() }
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
					${ formatAsUSD(thisItem.itemCost) }
				</div>
			</div>
		</div>
	);
}
ShoppingCartItem.PropTypes = {
	item: PropTypes.object.isRequired
};


export function CheckoutItems() {
	const checkoutData = getCheckoutData();
	const items = checkoutData.items.map((item: ShoppingCartType, i: number) => (
		<div key={item.itemID}>{item.itemQuantity} X - {item.itemTitle} ( {formatAsUSD(item.itemCost)} )</div> 		
	));
	const to = checkoutData.shippingTo;
	const addr = <><div>{to.name}</div><div>{to.street1}</div><div>{to.city}, {to.state} {to.zip}</div></> ;
	const checkoutTableData = [{
		"Name": "Shopping Cart Items : ",
		"Value": items,
	}, /* {
		"Name": "Subtotal Discount : ",
		"Value": formatAsUSD(checkoutData.subtotal_discount ?? 0),
	}, */ {
		"Name": "Subtotal : ",
		"Value": formatAsUSD(checkoutData.subtotal),
	},{
		"Name": "Shipping Address : ",
		"Value": addr,
	},{
		"Name": "Shipping Cost : ",
		"Value": formatAsUSD(checkoutData.shippingCost),
	},{
		"Name": "Handling Fee : ",
		"Value": formatAsUSD(checkoutData.handlingFee),
	}, /* {
		"Name": "Insurance Cost : ",
		"Value": formatAsUSD(checkoutData.insuranceCost ?? 0),
	}, */ /* {
		"Name": "Shipping Discount : ",
		"Value": formatAsUSD(checkoutData.shipping_discount ?? 0),
	}, */{
		"Name": "Sales Tax : ",
		"Value": formatAsUSD(checkoutData.salesTax),
	},{
		"Name": "TOTAL : ",
		"Value": formatAsUSD(checkoutData.total),
	}];
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

export function AddToCartButton(props: {handler: any, item: ShoppingCartType, itemID: string}){
	const [modalContent, setModalContent] = useState<React.ReactNode>();
	useEffect(() => {
		const myContent = <div className="centered"><br /><br />Item {props.itemID} has been added to your cart.<br /><br /><br /></div>;
		setModalContent(myContent);
	}, []);
	function handleClick(e: React.MouseEvent<HTMLButtonElement>){
		props.handler(props.item);
		handleModalOpen(e.nativeEvent, "-" + props.itemID);
	}
	return (
		<div>
			<FormButton className="pixCartButton" type="button" id={`btn-add-${props.itemID}`} text="Add to Shopping Cart"
				onClick={(e)=>handleClick(e)} />
			{ /* <button className="pixCartButton" type="button" id={`btn-add-${props.itemID}`}
				onClick={(e)=>handleClick(e)} >
				Add To Shopping Cart
			</button> */ }
			<Modal modalContent={modalContent} modalID={"-" + props.itemID} />
		</div>
	);
}

export function GoToCartButton(props: {href: string, itemID: string}){
	return (
		<div>
			<FormButton className="pixCartButton" type="button" id={`btn-cart-${props.itemID}`} text="Go to Shopping Cart"
				onClick={()=>window.location.href=props.href} />
			{ /* <button className="pixCartButton" type="button" id={`btn-cart-${props.itemID}`}
				onClick={()=>window.location.href=props.href} >
				Go To Shopping Cart
			</button> */ }
		</div>
	);
}

function ThankYou() { }

function WishList() { }




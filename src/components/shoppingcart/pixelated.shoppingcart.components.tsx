
"use client";

import React, { useState, useEffect } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { PayPal } from "./pixelated.paypal";
import { CalloutHeader } from "../callout/pixelated.callout";
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
// import { get } from 'http';
// import { Url } from 'url';

import { getCart, getShippingInfo, SetShippingInfo, setDiscountCodes, getRemoteDiscountCodes, getCheckoutData, RemoveFromShoppingCart, ClearShoppingCart, formatAsUSD, getCartItemCount } from "./pixelated.shoppingcart.functions";
import type { ShoppingCartType, AddressType, CheckoutType } from "./pixelated.shoppingcart.functions";



const debug = false;

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

	function onShippingSubmit(/* event: Event */){
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
	const items = props.checkoutData.items.map((item: ShoppingCartType, /* i: number */) => (
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
			MicroInteractions({cartpulse: true});
		} else {
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


// function ThankYou() { }


// function WishList() { }




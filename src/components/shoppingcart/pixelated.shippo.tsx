
import React from "react";
import { FormEngine } from "@brianwhaley/pixelated-components";
import { CalloutHeader } from "../callout/pixelated.callout";
import '../form/pixelated.form.css';
import './pixelated.shoppingcart.css';
import shippingFromData from "../../data/shipping.from.json";
import shippingToData from "../../data/shipping.to.json";
import shippingParcelData from "../../data/shipping.parcel.json";


/* 
https://apps.goshippo.com/settings/api
https://www.npmjs.com/package/shippo
https://rollout.com/integration-guides/shippo/sdk/step-by-step-guide-to-building-a-shippo-api-integration-in-js
*/


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

export type ParcelType = {
    length: number,
    width: number,
    height: number,
    distance_unit: string,
    weight: number,
    mass_unit: string
};

export type ShippoShipmentType = {
    address_from: AddressType,
    address_to: AddressType,
    parcels: ParcelType,
    async: boolean
}

export function ShippoShipping() {
	function onSubmit(event: Event){
		console.log(event);
		const shippoData: ShippoShipmentType = {
			"address_from" : {} as AddressType,
			"address_to" : {} as AddressType,
			"parcels" : {} as ParcelType,
			"async" : false
		};
		const formNames = ['address_from', 'address_to', 'parcels'] as const;
		type FormName = typeof formNames[number];
		formNames.forEach((form: FormName) => {
			const formElement = document.getElementById(form) as HTMLFormElement;
			const formData = new FormData(formElement);
			const formObject = Object.fromEntries(formData);
			if (form === 'address_from' || form === 'address_to') {
				shippoData[form] = formObject as AddressType;
			} else if (form === 'parcels') {
				shippoData[form] = formObject as unknown as ParcelType;
			}
		});
		console.log(shippoData);
		alert("Hooray!  Submitted!");
	}
	return (
		<div className="section-container">
			<CalloutHeader title="Shipped From : " />
			<FormEngine name="address_from" id="address_from" formData={shippingFromData} onSubmitHandler={onSubmit} />
			<br /><br />
			<CalloutHeader title="Shipping To : " />
			<FormEngine name="address_to" id="address_to" formData={shippingToData} onSubmitHandler={onSubmit} />
			<br /><br />
			<CalloutHeader title="Parcel : " />
			<FormEngine name="parcels" id="parcels" formData={shippingParcelData} onSubmitHandler={onSubmit} />
		</div>
	);
}

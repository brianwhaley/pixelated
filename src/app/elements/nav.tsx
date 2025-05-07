"use client";

import React from "react";
import { MenuAccordion } from "@brianwhaley/pixelated-components";
import myroutes from '../data/routes.json';
const allRoutes = myroutes.routes;

const menuItems = allRoutes.map((thisRoute) => (
	thisRoute.routes
		? { [thisRoute.name]: thisRoute.routes.map((subRoute) => ({ [subRoute.name]: subRoute.path })) }
		: { [thisRoute.name]: thisRoute.path }
)).reduce((obj, item) => {
	if( typeof Object.values(item)[0] == "object") {
		// Nested Object
		const subitems = Object.values(item)[0];
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const newSubitems = subitems.reduce((obj2: any, item2: any) => {
			Object.assign(obj2, item2);
			return obj2;
		});
		Object.assign(obj, { [Object.keys(item)[0]]: newSubitems } );
		return obj;
	} else {
		// String
		Object.assign(obj, item);
		return obj; 
	}
});

// console.log("Menu Items: ", menuItems);

export default function Nav() {
	/* const menuItems = allRoutes.map((thisRoute) => (
		{ [thisRoute.name]: thisRoute.path } 
	)).reduce((obj, item) => {
		Object.assign(obj, item);
		return obj; 
	}); */
	return (
		<MenuAccordion menuItems={menuItems} />
	);
}

"use client";

import React from "react";
import { MenuSimple } from "@brianwhaley/pixelated-components";
import myRoutes from '@/app/data/routes.json';
const allRoutes = myRoutes.routes;

const menuItems = allRoutes.map((thisRoute) => (
	thisRoute.routes
		? { [thisRoute.name]: thisRoute.routes.map((subRoute) => ({ [subRoute.name]: subRoute.path })) }
		: { [thisRoute.name]: thisRoute.path }
)).reduce((obj, item) => {
	if( typeof Object.values(item)[0] == "object") {
		// Nested Object
		const subitems = Object.values(item)[0];
		const newSubitems = subitems.reduce((obj2, item2) => {
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

export default function Nav() {
	return (
		<div className="section-container">
			<MenuSimple menuItems={menuItems} />
		</div>
	);
}

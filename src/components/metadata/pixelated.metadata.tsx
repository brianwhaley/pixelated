/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Route } from "../../types";

export function getRouteByKey(obj: any, key: string, value: any): any {
	if (typeof obj !== 'object' || obj === null) {
		return null;
	}
	if (obj[key] && obj[key] === value) {
		return obj;
	}
	for (const prop in obj) {
		if (obj[prop] && typeof obj[prop] === 'object') {
	  		const result = getRouteByKey(obj[prop], key, value);
	  		if (result) {
				return result;
	  		} 
		}
	}
	return null;
}

export function getAllRoutes(routes: Route, key: string) {
	const result: any[] = [];
	function traverse(obj: any[] | Route | null) {
		if (typeof obj !== 'object' || obj === null) {
			return;
		}
		if (Array.isArray(obj)) {
			obj.forEach(item => traverse(item));
		} else {
			if (obj[key]) {
				traverse(obj[key]);
			} else {
				result.push(obj);
			}
		}
	}
	traverse(routes);
	return result;
}


export const getMetadata = (routes: any, key: string = "name", value: string = "Home" ) => {
	// const allRoutes = getAllRoutes(routes, "routes");
	// const foundObject = allRoutes.find((obj: { [x: string]: string; }) => obj && Object.prototype.hasOwnProperty.call(obj, key) && obj[key as keyof typeof obj] === value);
	const foundObject = getRouteByKey(routes, key, value);
	if (foundObject) {
		return {
			title: foundObject.title,
			description: foundObject.description,
			keywords: foundObject.keywords,
		};
	} else {
		return {
			title: "",
			description: "",
			keywords: "",
		} ;
	}
};


export const setClientMetadata = ({title, description, keywords}: {title: string, description: string, keywords: string}) => {
	const titleElem = document.querySelector('title');
	if (titleElem) {
		titleElem.innerText = title;
	}
	const metaDesc = document.querySelector("meta[name='description']");
	if (metaDesc) {
		metaDesc.setAttribute('content', description);
	}
	const metaKeywords = document.querySelector("meta[name='keywords']");
	if (metaKeywords) {
		metaKeywords.setAttribute('content', keywords);
	}
};

export const setServerMetadata = ({key, value}: { key: string; value: string }) => {
	const myMetaData = getMetadata({key, value});
	return {
		title: myMetaData.title,
		description: myMetaData.description,
		keywords: myMetaData.keywords
	};
};


export function getAccordionMenuData(myRoutes: Route) {
	const menuItems = myRoutes.map((thisRoute: Route) => (
		thisRoute.routes
			? { [thisRoute.name as string]: thisRoute.routes.map((subRoute: Route) => ({ [subRoute.name as string]: subRoute.path })) }
			: { [thisRoute.name as string]: thisRoute.path }
	)).reduce((obj: any[], item: any[]) => {
		if( typeof Object.values(item)[0] == "object") {
			// Nested Object
			const subitems = Object.values(item)[0];
			const newSubitems = subitems.reduce((obj2: any[], item2: any[]) => {
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
	return menuItems;
}


import type { Route } from "@/types";

// import myroutes from '@/data/routes.json';

/*
TODO #7 Finish setClientMetadata Function in MEtadata component
TODO #8 Finish setServerMetadata Function in MEtadata component
*/


export function getAllRoutes(json: Route, key: string) {
	const result: any[] = [];
	function traverse(obj: any[] | Route | null) {
		if (typeof obj !== 'object' || obj === null) {
			return;
		}
		if (Array.isArray(obj)) {
			obj.forEach(item => traverse(item));
		} else {
			for (const k in obj) {
				if (k === key) {
					result.push(...obj[k]);
				}
				if (typeof obj[k] === 'object') {
					traverse(obj[k]);
				}
			}
		}
	}
	traverse(json);
	return result;
}


export function getRouteByKey(obj: any, key: string, value: any): Route | null {
	if (typeof obj !== 'object' || obj === null) {
		return null;
	}
	if (obj.hasOwnProperty(key) && obj[key] === value) {
		return obj;
	}
	for (const prop in obj) {
		if (obj.hasOwnProperty(prop) && typeof obj[prop] === 'object') {
	  		const result: Route | null = getRouteByKey(obj[prop], key, value);
	  		if (result) {
				return result;
	  		} 
		}
	}
	return null;
}


export function getAccordionMenuData(myRoutes: Route) {
	const menuItems = myRoutes.map((thisRoute: Route) => (
		thisRoute.routes
			? { [thisRoute.name]: thisRoute.routes.map((subRoute: Route) => ({ [subRoute.name]: subRoute.path })) }
			: { [thisRoute.name]: thisRoute.path }
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


/* export const getMetadata =  (routes: any, key: string = "name", value: string = "Home" ) => {
	const allRoutes = getAllRoutes(routes, "routes");
	// const foundObject = routes.routes.find((obj: { [x: string]: string; }) => obj && Object.prototype.hasOwnProperty.call(obj, key) && obj[key as keyof typeof obj] === value);
	const foundObject =  allRoutes.find((obj: { [x: string]: string; }) => obj && Object.prototype.hasOwnProperty.call(obj, key) && obj[key as keyof typeof obj] === value);
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
}; */


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
    
}

// export const setServerMetadata = async ({key, value}: { key: string; value: string }) => {
export const setServerMetadata = async (obj: any, key: string = "name", value: any = "Home") => {
    const myMetaData = getRouteByKey( obj, key, value );
    return {
        title: myMetaData?.title,
        description: myMetaData?.description,
        keywords: myMetaData?.keywords
    }
}
import React, { Component } from "react";
import { MenuAccordion } from "@brianwhaley/pixelated-components";
import { routes } from './pixelated.routing.js'


export default class Nav extends Component {
	render () {
		const menuItems = routes.filter((thisRoute) => {
			if ( thisRoute.name == null ) return false /* skip */ ; 
			return true ;
		}).map((thisRoute) => (
			{ [thisRoute.name] : thisRoute.path } 
		)).reduce((obj, item) => {
			Object.assign(obj, item);
			return obj; 
		});
		/* const menuItems = {
			"Home": "/index.html",
			"Resume": "/resume.html",
			"Readme": "/readme.html",
			"Work Portfolio": "/gallery.html?tag=portfolio-all",
			"Pixelated Blog": "https://blog.pixelated.tech",
			"Stkr": "/stkr.html",
			"NerdJokes": "/nerdjokes.html",
			"Social Media": "/socialmedia.html",
			"Photography": "/photography.html",
			"Photo Gallery": "/gallery.html?tag=pixelatedviewsgallery",
			"Custom Sunglasses": "/customsunglasses.html",
			"Requests": "/requests.html",
			"Recipes": "/recipes.html",
		}; */

		return (
			<MenuAccordion menuItems={menuItems} ref={(myMenu) => { window.myMenu = myMenu; }}/>
		);
	}
}

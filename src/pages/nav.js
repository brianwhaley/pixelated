import React, { Component } from "react";
import { MenuAccordion } from "@brianwhaley/pixelated-components/dist/index";
import "@brianwhaley/pixelated-components/dist/css/pixelated.menu-accordion.css";

export default class Nav extends Component {
	render () {
		const menuItems = {
			"Home": "/index.html",
			"Resume": "/resume.html",
			"Work Portfolio": "/gallery.html?tag=portfolio-all",
			"Photography": "/photography.html",
			"Photo Gallery": "/gallery.html?tag=pixelatedviewsgallery",
			"Custom Sunglasses": "/customsunglasses.html",
			"Pixelated Blog": "https://blog.pixelated.tech",
			"Social Media": "/socialmedia.html",
			"Stkr": "/stkr.html",
			"NerdJokes": "/nerdjokes.html",
			"Recipes": "/recipes.html",
		};

		return (
			<MenuAccordion menuItems={menuItems} ref={(myMenu) => { window.myMenu = myMenu; }}/>
		);
	}
}

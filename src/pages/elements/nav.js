import React, { Component } from "react";
import { MenuAccordion } from "@brianwhaley/pixelated-components";

export default class Nav extends Component {
	render () {
		const menuItems = {
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
			"Recipes": "/recipes.html",
		};

		return (
			<MenuAccordion menuItems={menuItems} ref={(myMenu) => { window.myMenu = myMenu; }}/>
		);
	}
}

import React, { Component } from "react";
import Menu from "../components/pixelated.menu.js";

export default class Nav extends Component {
	render () {
		const menuItems = {
			"Home": "/index.html",
			"Resume": "/resume.html",
			"Work Portfolio": "/gallery.html?tag=portfolio-all",
			"Photography": "/photography.html",
			"Photo Gallery": "/gallery.html?tag=pixelatedviewsgallery",
			// "Custom Oakleys": "/customoakleys.html", 
			// "Custom Oakely Gallery": "/gallery.html?tag=customoakleys",
			"Pixelated Blog": "https://blog.pixelated.tech",
			"Social Media": "/socialmedia.html",
			"Stkr": "/stkr.html",
			"NerdJokes": "/nerdjokes.html",
			"Recipes": "/recipes.html"
		};

		return (
			<Menu menuItems={menuItems} ref={(myMenu) => { window.myMenu = myMenu; }}/>
		);
	}
}

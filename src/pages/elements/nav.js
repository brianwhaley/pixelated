import React, { Component } from "react";
import { MenuAccordion } from "@brianwhaley/pixelated-components";
import { routes } from "./pixelated.routing"


export default class Nav extends Component {
	render () {
		const menuItems = routes.filter((thisRoute) => {
			/* ONLY FIND ROUTES WITH NAMES */
			if ( thisRoute.name == null ) return false /* skip */ ; 
			return true ;
		}).map((thisRoute) => (
			{ [thisRoute.name] : thisRoute.path } 
		)).reduce((obj, item) => {
			Object.assign(obj, item);
			return obj; 
		});

		return (
			<MenuAccordion menuItems={menuItems} ref={(myMenu) => { window.myMenu = myMenu; }}/>
		);
	}
}

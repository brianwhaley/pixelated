"use client";

import React from "react"
// import { MenuAccordionButton } from "../components/menu/pixelated.menu-accordion";
import { MenuAccordionButton } from "@brianwhaley/pixelated-components";

export default function Header() {
	return (
		<div className="section-container">
				<MenuAccordionButton />
				<h1 className="pull-left">Pixelated </h1>
				<h2 className="pull-left pad"> - by Brian Whaley</h2>
				<div className="addthis_sharing_toolbox push-right noMobile"></div>
			</div>
	);
}

"use client";

import React from "react";
import { MenuSimple } from "@brianwhaley/pixelated-components";
// import { getAccordionMenuData } from "../components/metadata/pixelated.metadata";
import myroutes from '../data/routes.json';
const allRoutes = myroutes.routes;

// const menuItems = getAccordionMenuData(allRoutes);

export default function HeaderNav() {
	return (

		<>
			<MenuSimple menuItems={allRoutes} />
		</>
	);
}

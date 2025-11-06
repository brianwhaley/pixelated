"use client";

import React from "react";
import { MenuAccordion } from "@brianwhaley/pixelated-components";
// import { getAccordionMenuData } from "../components/metadata/pixelated.metadata";
import myroutes from '../data/routes.json';
const allRoutes = myroutes.routes;

// const menuItems = getAccordionMenuData(allRoutes);

export default function Nav() {
	// DIRTY FIX FOR CSS DEFER AND ACCORDION MENU
	// copied from pixelated-components/src/components/menu/menu-accordion.tsx
	const customCSS = `
      	.accordionUp {
			top: 60px;
			transition: transform 0.55s ease-out 0.0s;
			transform: translateY(-150%);
		}
    `;
	return (
		<>
			<style dangerouslySetInnerHTML={{ __html: customCSS }} />
			<MenuAccordion menuItems={allRoutes} />
		</>
	);
}

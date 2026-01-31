"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { MenuAccordion } from "@pixelated-tech/components";
// import { getAccordionMenuData } from "../components/metadata/pixelated.metadata";
import myroutes from '../data/routes.json';
const allRoutes = myroutes.routes;

// const menuItems = getAccordionMenuData(allRoutes);

export default function Nav() {
	const searchParams = useSearchParams();
	const fullMenuParam = searchParams.get('fullmenu');
	const fullMenu = fullMenuParam !== null && fullMenuParam !== 'false';
	// DIRTY FIX FOR CSS DEFER AND ACCORDION MENU
	// copied from pixelated-components/src/components/menu/menu-accordion.tsx
	const customCSS = `
      	.accordionUp {
			top: 60px;
			transition: transform 0.55s ease-out 0.0s;
			transform: translateY(-150%);
		}`;
	const fullMenuCSS = `
		.panel-menu-button, #panel-menu-button {
    		display: block;
		}`;
	return fullMenu ? (
		<div suppressHydrationWarning={true}>
			<style dangerouslySetInnerHTML={{ __html: customCSS + fullMenuCSS }} />
			<MenuAccordion menuItems={allRoutes} showHidden={fullMenu} />
		</div>
	) : (
		<div suppressHydrationWarning={true}>
			<style dangerouslySetInnerHTML={{ __html: customCSS }} />
			<MenuAccordion menuItems={allRoutes} />
		</div>
	);
}

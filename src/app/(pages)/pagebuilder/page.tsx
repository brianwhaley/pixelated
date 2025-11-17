 
 
"use client";

import React from "react";
import { Callout } from "@brianwhaley/pixelated-components";

const componentMap = {
	"Callout": Callout,
};

export default function PageBuilder() {

	async function getComponentProps(componentName: string) {
		// const thisComponent = React.createElement(thisComponentType, {});
		const thisComponent = componentMap[componentName as keyof typeof componentMap];
		const thisComponentProps = thisComponent.propTypes;
		console.log("this component", thisComponent);
		console.log("this component props", thisComponentProps);
		for (const prop of Object.keys(thisComponentProps) as Array<keyof typeof thisComponentProps>) {
			console.log(`Prop: ${prop}, Type: ${thisComponentProps[prop]}`);
		}
		return null;
	}
	getComponentProps("Callout");

	return ( <></> );
}

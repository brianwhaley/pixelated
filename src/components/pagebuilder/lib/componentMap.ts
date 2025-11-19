import { PageHeader, PageSectionHeader } from "../../general/pixelated.headers";
import { Callout } from "../../callout/pixelated.callout";
import { PageSection, GridItem, FlexItem } from '../../general/pixelated.layout';

/**
 * Component registry and constants
 */

export const componentMap = {
	"Page Header": PageHeader,
	"Page Section Header": PageSectionHeader,
	"Callout": Callout,
	"Page Section": PageSection,
	"Grid Item": GridItem,
	"Flex Item": FlexItem,
};

export const layoutComponents = [
	'Page Section',
	'Grid Item',
	'Flex Item'
];

export const componentTypes = Object.keys(componentMap).toString();

/**
 * Check if a component is a layout component (can have children)
 */
export function isLayoutComponent(componentName: string): boolean {
	return layoutComponents.includes(componentName);
}

/**
 * Get component type from the registry
 */
export function getComponentType(componentName: string) {
	return componentMap[componentName as keyof typeof componentMap];
}

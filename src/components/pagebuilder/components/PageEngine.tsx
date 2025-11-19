
import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { generateKey } from '@/components/utilities/pixelated.functions';
import { componentMap } from '../lib/componentMap';

/**
 * PageEngine - Renders the live preview of components
 * Recursively renders components with their children
 */

PageEngine.propTypes = {
	pageData: PropTypes.shape({
		components: PropTypes.arrayOf(
			PropTypes.shape({
				component: PropTypes.string.isRequired,
				props: PropTypes.object.isRequired,
				children: PropTypes.array,
			})
		).isRequired,
	}).isRequired,
};

export type PageEngineType = InferProps<typeof PageEngine.propTypes>;

export function PageEngine(props: PageEngineType) {
	// Recursive function to render components with children
	function renderComponent(componentData: any, index: number): React.JSX.Element {
		const componentName: string = componentData.component;
		const componentProps: any = { ...componentData.props };
		delete componentProps.type;
		
		const componentType = (componentMap as Record<string, React.ElementType>)[componentName];
		
		if (!componentType) {
			return <div key={index}>Unknown component: {componentName}</div>;
		}
		
		// If component has children, recursively render them
		let children = null;
		if (componentData.children && componentData.children.length > 0) {
			children = componentData.children.map((child: any, childIndex: number) => 
				renderComponent(child, childIndex)
			);
		}
		
		componentProps.key = generateKey();
		
		if (children) {
			return React.createElement(componentType, componentProps, children);
		}
		
		return React.createElement(componentType, componentProps);
	}

	const components: React.JSX.Element[] = [];
	const pageComponents = props?.pageData?.components;
	
	if (pageComponents) {
		pageComponents.forEach((component, index) => {
			components.push(renderComponent(component, index));
		});
	}
	
	return <>{components}</>;
}

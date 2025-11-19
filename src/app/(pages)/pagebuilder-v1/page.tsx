/* eslint-disable @typescript-eslint/no-explicit-any */
 
"use client";

import React, { useState } from "react";
import PropTypes, { InferProps } from "prop-types";
import { PageHeader, PageSectionHeader } from "@brianwhaley/pixelated-components";
import { Callout } from "@brianwhaley/pixelated-components";
import { FormEngine } from "@brianwhaley/pixelated-components";
import { generateKey } from '@brianwhaley/pixelated-components';



/* 
STEP 1 : PAGE BUILDER
STEP 2 : COMPONENT SELECTOR
STEP 3 : COMPONENT PROPERTIES
STEP 4 : GENERATE JSON 
STEP 5 : GENERATE COMPONENTS & PAGE ENGINE
*/


const componentMap = {
	"Page Header": PageHeader,
	"Page Section Header": PageSectionHeader,
	"Callout": Callout,
};
const componentTypes = componentMap ? Object.keys(componentMap).toString() : '';



ComponentSelector.propTypes = {
	setEditableComponent: PropTypes.func.isRequired,
};
type ComponentSelectorProps = InferProps<typeof ComponentSelector.propTypes>;
export function ComponentSelector(props: ComponentSelectorProps) {
	// GENERATE THE JSON TO DISPLAY A FORM TO ADD A COMPONENT - INTERNAL
	function generateFieldJSON (component: string) {
		const form: { fields: { [key: string]: any }[] } = { fields: [] };
		// ADD COMPONENT TYPE FIELD 
		form.fields[0] = {
			component: 'FormInput',
			props: {
				label: 'Type : ',
				name: 'type',
				id: 'type',
				type: 'text',
				disabled: true,
				// value: componentMap[component as keyof typeof componentMap].name || component
				value: component
			}
		};
		// ADD FIELDS FOR EACH PROP IN THE COMPONENT'S PROP TYPES
		for (const prop in componentMap[component as keyof typeof componentMap].propTypes) {
			const field: { [key: string]: any } = {};
			field.component = 'FormInput';
			const props: { [key: string]: any } = {};
			props.label = prop;
			props.name = prop;
			props.id = prop;
			props.type = 'text';
			field.props = props;
			form.fields[form.fields.length] = field;
		}
		// ADD SUBMIT BUTTON
		const addButton = {
			component: 'FormButton',
			props: {
				label: 'Add ' + component,
				type: 'submit',
				id: 'Add ' + component,
				text: 'Add ' + component
			}
		};
		form.fields[form.fields.length] = addButton;
		return (form);
	}
	// GENERATE THE JSON TO DISPLAY A FORM TO ADD A FIELD - EXTERNAL
	function handlePhaseOneSubmit(event: Event){
		const target = event.target as HTMLFormElement;
		const myType = target.type.value;
		const myComponent = componentMap[myType as keyof typeof componentMap] ? myType : Object.keys(componentMap)[0];
		const componentJSON = generateFieldJSON(myComponent);
		props.setEditableComponent(componentJSON);
		return true;
	}

	function generateTypeField() {
		const form: { [key: string]: any } = {};
		const typeField = {
			component: 'FormInput',
			props: {
				label: 'Type : ',
				name: 'type',
				id: 'type',
				type: 'text',
				list: 'componentTypes',
				listItems: componentTypes
			}
		};
		const addButton = {
			component: 'FormButton',
			props: {
				label: 'Build',
				type: 'submit',
				id: 'build',
				text: '===  Build  ==='
			}
		};
		form.fields = [typeField, addButton];
		return (form) ;
	}

	return (
		<>
			<FormEngine 
				formData={generateTypeField()}
				onSubmitHandler={ event => { handlePhaseOneSubmit(event); } } 
				name="build" 
				id="build" 
				method="post" />
		</>
	);
}





function generateComponentObject(event: Event) {
	// APPEND JSON FOR NEW FIELD TO EXISTING JSON CONFIG OBJECT - EXPOSED EXTERNAL
	const props: { [key: string]: any } = {};
	const target = event.target as HTMLFormElement;
	for (const prop in target) {
		const thisProp = (target as any)[prop];
		if (thisProp && thisProp.value && ( thisProp.value !== Object(thisProp.value) ) ) { 
			props[thisProp.name] = thisProp.value; 
		}
	}
	const newComponent: any = {};
	newComponent.props = props;
	newComponent.component = props.type;
	return (newComponent);
}





PageEngine.propTypes = {
	pageData: PropTypes.shape({
		components: PropTypes.arrayOf(
			PropTypes.shape({
				component: PropTypes.string.isRequired,
				props: PropTypes.object.isRequired,
			})
		).isRequired,
	}).isRequired,
};
export type PageEngineType = InferProps<typeof PageEngine.propTypes>;
export function PageEngine(props: PageEngineType) {
	// CORE OF THE PAGE ENGINE - CONVERT JSON TO COMPONENTS - INTERNAL
	const components: React.JSX.Element[] = [];
	const pageComponents = props?.pageData?.components;
	if (pageComponents) {
		for( const component in pageComponents ) {
			const thisComponent = pageComponents[component];
			if(thisComponent) {
				const componentName: string = thisComponent.component;
				const componentProps: any = thisComponent.props;
				delete componentProps["type"];
				componentProps["key"] = generateKey();
				// const componentType = componentMap[componentName as keyof typeof componentMap];
				const componentType = (componentMap as Record<string, React.ElementType>)[componentName];
				const newComponent = React.createElement(componentType, componentProps);
				components.push(newComponent);
			}
		}
	}
	return (
		<>{components}</>
	);
}



export default function PageBuilder() {
	const [ pageJSON, setPageJSON ] = useState({components: []});
	const [ editableComponent, setEditableComponent ] = useState({});
	function handleAddNewComponent(event: Event) {
		const newComponent = generateComponentObject(event);
		let components = [];
		if (pageJSON && Object.keys(pageJSON) && Object.keys(pageJSON).length > 0) { 
			components = JSON.parse(JSON.stringify(pageJSON.components)); 
		}
		components[components.length] = newComponent;
		const componentJSON = { components: components };
		setEditableComponent({});
		setPageJSON(componentJSON);
	}

	return ( 
		<>
			<div className="row-2col">

				<div className="gridItem">
					<PageSectionHeader title="Components" />
					<ComponentSelector setEditableComponent={setEditableComponent} />
					<div></div>
					<PageSectionHeader title="Properties" />
					<FormEngine name="field_props" id="field_props"
						onSubmitHandler={handleAddNewComponent}
						formData={editableComponent} />
				</div>

				<div className="gridItem">
					<PageSectionHeader title="Page JSON" />
					<pre>{JSON.stringify(pageJSON, null, 2)}</pre>
				</div>

				<div className="grid-s1-e2">
					<PageSectionHeader title="Preview" />
					<section id="preview-section">
						<div className="section-container">
							<PageEngine pageData={pageJSON} />
						</div>
					</section>
				</div>

			</div>
		</> 
	);
}

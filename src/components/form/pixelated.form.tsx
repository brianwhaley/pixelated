import React, { useState, useEffect } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import * as FC from './pixelated.formcomponents';
import * as FV from './pixelated.formvalidations';
import { generateKey, capitalize, attributeMap } from '../utilities/pixelated.functions';
import './pixelated.form.css';

const debug = false ;

/* ===== FORM ENGINE =====
Generate all the elements to display a form */

FormEngine.propTypes = {
	name: PropTypes.string,
	id: PropTypes.string,
	method: PropTypes.string,
	onSubmitHandler: PropTypes.func,
	formData: PropTypes.object.isRequired
};
export type FormEngineType = InferProps<typeof FormEngine.propTypes>;
export function FormEngine(props: FormEngineType) {

	function generateFormProps(props: any) {
		// GENERATE PROPS TO RENDER THE FORM CONTAINER, INTERNAL FUNCTION
		if (debug) console.log("Generating Form Props");
		const formProps = JSON.parse(JSON.stringify(props));
		['formData', 'onSubmitHandler'].forEach(e => delete formProps[e]);
		return formProps;
	}

	generateNewFields.propTypes = {
		formData: PropTypes.any.isRequired,
	};
	type generateNewFieldsType = InferProps<typeof generateNewFields.propTypes>;
	function generateNewFields(props: generateNewFieldsType) {
		// CORE OF THE FORM ENGINE - CONVERT JSON TO COMPONENTS - INTERNAL
		if (debug) console.log("Generating Form Fields");
		const newFields = [];
		const formFields = props.formData.fields;
		if (props.formData && formFields) {
			// const thisFields = formFields;
			for (let field = 0; field < formFields.length; field++) {
				const thisField = formFields[field];
				const newProps = JSON.parse(JSON.stringify(thisField.props));
				newProps.key = generateKey();

				// Convert string numeric props to numbers where needed
				const numericProps = ['maxLength', 'minLength', 'rows', 'cols', 'size', 'step'];
				numericProps.forEach(prop => {
					if (
						newProps[prop] !== undefined &&
						newProps[prop] !== null &&
						newProps[prop] !== ''
					) {
						// Only convert if the value is not already a number
						if (typeof newProps[prop] === 'string') {
							const num = Number(newProps[prop]);
							if (!isNaN(num)) {
								newProps[prop] = num;
							}
						}
					}
				});

				const componentName: string = thisField.component;
				const newElementType = (FC as Record<string, React.ElementType>)[componentName];
				const newElement = React.createElement(newElementType, newProps);
				newFields.push(newElement);
			}
		}
		return newFields;
	}

	function handleSubmit(event: React.FormEvent) {
		// HANDLES THE FORM ACTION / FORM SUBMIT - EXPOSED EXTERNAL
		event.preventDefault();
		if (props.onSubmitHandler) props.onSubmitHandler(event);
		return true;
	}

	return (
		<form {...generateFormProps(props)} onSubmit={(event) => { handleSubmit(event); }} suppressHydrationWarning >{generateNewFields(props)}</form>
	);
}


/* =====  FORM BUILDER ===== 
Display all the components for a Form Builder - 
Element Buttons, Element Details, and the Form */

function mapTypeToComponent(myType: string){
	if (debug) console.log("Mapping Type Field to Component");
	let myComponent = 
	(["button"].includes(myType)) ? 'FormButton' : 
		(["checkbox"].includes(myType)) ? 'FormCheckbox' : 
			(["datalist"].includes(myType)) ? 'FormDataList' : 
				(["radio"].includes(myType)) ? 'FormRadio' : 
					(["select"].includes(myType)) ? 'FormSelect' : 
						(["textarea"].includes(myType)) ? 'FormTextarea' : 
							"FormInput";
	return myComponent;
}

export function FormBuilder() {
	// const [ url, setURL ] = useState('');
	// const [ htmlPaste, setHtmlPaste ] = useState('');
	type FormFieldsType = { [key: string]: any }
	const [ formData, setFormData ] = useState<FormFieldsType>({});
	const [ fieldFormData, setFieldFormData ] = useState<FormFieldsType>({});

	function appendFormData(event: Event) {
		// APPEND JSON FOR NEW FIELD TO EXISTING JSON CONFIG OBJECT - EXPOSED EXTERNAL
		if (debug) console.log("Appending form Data...");
		const props: { [key: string]: any } = {};
		const target = event.target as HTMLFormElement;
		for (const prop in target) {
			const thisProp = (target as any)[prop];
			if (thisProp && thisProp.value && ( thisProp.value !== Object(thisProp.value) ) ) { 
				props[thisProp.name] = thisProp.value; 
			}
		}
		const field: { [key: string]: any } = {};
		field.props = props;
		field.component = mapTypeToComponent(field.props.type);
		let fields = [];
		if (Object.keys(formData).length > 0) { fields = JSON.parse(JSON.stringify(formData.fields)); }
		fields[fields.length] = field;
		setFormData( { fields: fields } );
		setFieldFormData({});
		return (field);
	}

	/* function getCircularReplacer() {
		const seen = new WeakSet();
		return (key, value) => {
		  	if (typeof value === 'object' && value !== null) {
				if (seen.has(value)) {
			  		return ; // return undefined ;
				}
				seen.add(value);
		  	}
		  	return value;
		};
	} */

	return (
		<div className="section-container">
			<div style={{ display: 'inline-block', verticalAlign: 'top' }}>
				<FormBuild setFormData={setFieldFormData} />
				<div></div>
				<FormEngine name="field_props" id="field_props"
					onSubmitHandler={appendFormData}
					formData={fieldFormData} />
			</div>
			<div style={{ display: 'inline-block', verticalAlign: 'top' }} >
				<pre style={{ width: '100%' }} >{ JSON.stringify(formData, null, 2) }</pre>
			</div>
			<div><br /><br /><hr /><br /><br /></div>
			<div style={{ display: 'block', verticalAlign: 'top' }}>
				<FormEngine formData={formData || {}} />
			</div>
		</div>
	);
}



/* 
===== FORM BUILD =====
Dynamically generate, component by component, and prop by prop, 
the JSON to create a form via FormEngine 
*/

FormBuild.propTypes = {
	setFormData: PropTypes.func.isRequired,
};
type FormBuildType = InferProps<typeof FormBuild.propTypes>;
export function FormBuild(props: FormBuildType) {

	function generateFieldJSON (component: string, type: string) {
		// GENERATE THE JSON TO DISPLAY A FORM TO ADD A FIELD - INTERNAL
		if (debug) console.log("Generating Form JSON for ", component , " Type : ", type);
		const form: { fields: { [key: string]: any }[] } = { fields: [] };
		let i = 0;
		for (const prop in FC[component as keyof typeof FC].propTypes) {
			const field: { [key: string]: any } = {};
			field.component = 'FormInput';
			const props: { [key: string]: any } = {};
			props.label = prop;
			props.name = prop;
			props.id = prop;
			props.type = 'text';
			if (prop === 'type') {
				props.disabled = true; 
				props.value = type;
				props.list = 'inputTypes';
			}
			field.props = props;
			form.fields[i] = field;
			i++;
		}
		const addButton = {
			component: 'FormButton',
			props: {
				label: 'Add ' + component,
				type: 'submit',
				id: 'Add ' + component,
				text: 'Add ' + component
			}
		};
		form.fields[i] = addButton;
		return (form);
	}

	function handlePhaseOneSubmit(event: Event){
		// GENERATE THE JSON TO DISPLAY A FORM TO ADD A FIELD - EXTERNAL
		const target = event.target as HTMLFormElement;
		const myType = target.type.value;
		const myComponent = mapTypeToComponent(myType);
		const fieldJSON = generateFieldJSON(myComponent, myType);
		props.setFormData(fieldJSON);
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
				list: 'inputTypes'
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



/* 
===== FORM EXTRACT ===== 
Submit a page URL of a form to extract all form elements and 
convert them to JSON to create a form via FormEngine 
*/

FormExtractor.propTypes = {
	url: PropTypes.string
};
export type FormExtractorType = InferProps<typeof FormExtractor.propTypes>;
export function FormExtractor(props: FormExtractorType) {
	
	const [ url, setURL ] = useState<string>(props.url || "");
	const [ htmlPaste, setHtmlPaste ] = useState<string | undefined>();
	const [ formData, setFormData ] = useState ({});

	setParentState.propTypes = {
		url: PropTypes.string.isRequired,
		htmlPaste: PropTypes.string.isRequired,
	};
	type setParentStateType = InferProps<typeof setParentState.propTypes>;
	function setParentState(childState: setParentStateType) {
		// SET STATE FROM PARENT VALUES - EXPOSED EXTERNAL
		if (debug) console.log("Setting Parent State...");
		setURL(childState.url);
		setHtmlPaste(childState.htmlPaste);
	}

	return (
		<div>
			<div className="section-container">
				<FormExtractUI setParentState={setParentState} />
			</div>

			<div className="section-container">
				<br /><br /><hr /><br /><br />
			</div>

			<div className="section-container">
				<FormExtractEngine url={url} htmlPaste={htmlPaste} setFormData={setFormData} />
			</div>

			<div className="section-container">
				<br /><br /><hr /><br /><br />
			</div>

			<div className="section-container">
				<FormEngine formData={formData} />
			</div>
		</div>
	);
}

FormExtractUI.propTypes = {
	setParentState: PropTypes.func.isRequired
};
type FormExtractUIType = InferProps<typeof FormExtractUI.propTypes>;
export function FormExtractUI(props: FormExtractUIType) {
	const [url, setURL] = useState();
	const [htmlPaste, setHtmlPaste] = useState();

	function onChange (event: React.ChangeEvent) {
		// UPDATE URL OR HTML_PASTE ON CHANGE - EXTERNAL
		if (debug) console.log("Element Changed...");
		const target = event.target as HTMLFormElement;
		if(target.name == "url") {
			setURL(target.value);
		} else if (target.name == "htmlPaste") {
			setHtmlPaste(target.value);
		}
	}

	function onSubmit() {
		// SET PARENT STATE WITH URL OR HTML PASTE - EXTERNAL
		if (debug) console.log("Form Submitted...");
		props.setParentState({url: url, htmlPaste: htmlPaste});
	}

	return (
		<form onSubmit={ e => { e.preventDefault(); } } method="post" name="extract">
			<label htmlFor="url">URL : </label>
			<input type="text" list="form_urls" id="url" name="url" size={100} onChange={onChange} />
			<FC.FormDataList id='form_urls' items={FV.formURLs} />
			<div style={{ width: '100%', textAlign: 'center' }}>OR</div>
			<label htmlFor="htmlPaste">HTML : </label>
			<textarea id="htmlPaste" name="htmlPaste" rows={10} cols={80} onChange={onChange} /><br />
			<div style={{ width: '100%', textAlign: 'center' }}>
				<button type="button" onClick={onSubmit}>Extract</button>
				<input type="reset" />
			</div>
		</form>
	);
}

FormExtractEngine.propTypes = {
	url: PropTypes.string,
	htmlPaste: PropTypes.string,
	setFormData: PropTypes.func.isRequired
};
type FormExtractEngineType = InferProps<typeof FormExtractEngine.propTypes>;
export function FormExtractEngine(props: FormExtractEngineType) {
	const proxy = 'https://proxy.pixelated.tech/prod/proxy?url=';
	// const proxy = "https://x3cf4kv0nk.execute-api.us-east-2.amazonaws.com/prod/proxy?url=";
	// const proxy = "https://thingproxy.freeboard.io/fetch/";
	const [ url, setURL ] = useState<string | null | undefined>(props.url);
	const [ htmlPaste, setHtmlPaste ] = useState<string | null | undefined>(props.htmlPaste);
	const [ formJson, setFormJson ] = useState<any>();

	function extractOptions (thisElement: HTMLSelectElement) {
		// GENERATE OPTIONS FOR SELECT FIELD - INTERNAL
		if (debug) console.log("Extracting Options...");
		if (thisElement.tagName.toLowerCase() === 'select' && thisElement.options && thisElement.options.length) {
			const options = [];
			for (let option = 0; option < thisElement.options.length; option++) {
				const thisOption = thisElement.options[option];
				const attribs: { [key: string]: any } = {};
				for (let attrib = 0; attrib < thisOption.attributes.length; attrib++) {
					const thisAttrib = thisOption.attributes[attrib];
					attribs[attributeMap(thisAttrib.name)] = thisAttrib.value;
				}
				if (thisOption.innerText) attribs.text = thisOption.innerText;
				if (Object.keys(attribs).length > 0) options.push(attribs); // not empty then add
			}
			if (options.length > 0) return options;
		}
		return false;
	}

	function extractSelectedOptions (thisOptions: any) {
		if (debug) console.log("Extracting Selected Options...");
		// GENERATE LIST OF SELECTED OPTIONS FOR SELECT FIELD - INTERNAL
		if (thisOptions && thisOptions.length) {
			const selected = [];
			for (let option = 0; option < thisOptions.length; option++) {
				const thisOption = thisOptions[option];
				 
				if (Object.prototype.hasOwnProperty.call(thisOption, 'selected')) {
					selected.push(thisOption.value);
					delete thisOptions[option].selected;
				}
			}
			// MULTIPLE - Return array
			if (selected.length > 1) return selected;
			// Not Multiple = return string
			if (selected.length === 1) return selected.toString();
		}
		return false;
	}

	function extractAttribs (thisElement: HTMLFormElement) {
		if (debug) console.log("Extracting Attributes...");
		// EXTRACT ALL ATTRIBUTES FOR A FORM ELEMENT - INTERNAL
		// LOOK AT THAT - JAVASCRIPT REFLECTION!
		if (thisElement && thisElement.attributes && thisElement.attributes.length) {
			const props: { [key: string]: any } = {};
			for (let attrib = 0; attrib < thisElement.attributes.length; attrib++) {
				const thisAttrib = thisElement.attributes[attrib];
				if (thisAttrib.name === 'style') {
					// Do not gather styles
				} else if (['disabled', 'multiple', 'readonly', 'required', 'selected'].indexOf(thisAttrib.name.toLowerCase()) > -1) {
					// Flag type Attributes
					props[attributeMap(thisAttrib.name)] = attributeMap(thisAttrib.name);
				} else if (thisAttrib && thisAttrib.name && thisAttrib.value) {
					// use attributeMap to map html props to React props
					props[attributeMap(thisAttrib.name)] = thisAttrib.value;
				}
			}
			if (Object.keys(props).length > 0) return props;
		}
		return false;
	}

	function extractLabel (html: any, thisElement: HTMLFormElement) {
		// IDENTIFY AND EXTRACT LABEL PROPERTIES FOR A SPECIFIC FIELD - INTERNAL
		if (debug) console.log("Extracting Label...");
		const myElement = thisElement.attributes.getNamedItem('id');
		if (myElement && myElement.value) {
			const thisID = myElement.value;
			const thisLabel = html.querySelector("label[for='" + thisID + "']");
			if (thisLabel) return thisLabel;
		}
		return false;
	}

	function formToJSON (html: any) {
		// CONVERT HTML TO CONFIG JSON - INTERNAL
		if (debug) console.log("Converting Form to JSON...");
		const json: { [key: string]: any } = {};
		json.fields = [];
		const forms = html.getElementsByTagName('form');
		// ----- FORMS
		for (let form = 0; form < forms.length; form++) {
			const thisForm = forms[form];
			if (Object.keys(thisForm).length > 0) {
				// ----- ELEMENTS
				for (let element = 0; element < thisForm.elements.length; element++) {
					const thisElement = thisForm[element];
					const elem: { [key: string]: any } = {};
					if (thisElement && thisElement.attributes && thisElement.tagName) {
						// ----- COMPONENT
						elem.component = 'Form' + capitalize(thisElement.tagName);
						let props: { [key: string]: any } = {};
						// ----- ELEMENT ATTRIBUTES
						const thisProps = extractAttribs(thisElement);
						if (thisProps) props = thisProps;
						// ----- ELEMENT OPTIONS
						const thisOptions = extractOptions(thisElement);
						if (thisOptions) {
							// only true for SELECT elements
							const thisSelected = extractSelectedOptions(thisOptions);
							if (thisSelected) props.defaultValue = thisSelected;
							props.options = thisOptions;
						} else {
							// get innerText on all but SELECT elements
							if (thisElement.innerText) props.text = thisElement.innerText;
						}
						elem.props = props;
						// ----- LABEL
						const thisLabel = extractLabel(html, thisElement);
						if (thisLabel) {
							elem.props.label = (thisLabel.innerText || thisLabel.textContent);
						}
					}
					if (Object.keys(elem).length > 0) json.fields.push(elem);
				}
			}
		}
		return json;
	}

	function getHTML (url: string, callback: any) {
		// GET SERVER SIDE HTML THROUGH XMLHTTPREQUEST - INTERNAL
		if (debug) console.log("Getting HTML From URL...");
		const xhr = new XMLHttpRequest();
		// xhr.onreadystatechange = (e) => {
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4 && xhr.status === 200) {
				const json = callback(xhr.responseXML);
				setFormJson( json );
				props.setFormData(json);
			}
		};
		xhr.open('GET', url);
		xhr.responseType = 'document';
		xhr.send(null);
	}

	useEffect(() => {
		if (debug) console.log("Component Is Mounted...");
		if (props.url) {
			const newURL = proxy + props.url;
			if (!url || (props.url !== url)) {
				setURL( props.url );
				getHTML(newURL, formToJSON);
			} else if (url && !formJson) {
				getHTML(newURL, formToJSON);
			}
		} else if (props.htmlPaste) {
			let json: { [key: string]: any } = {};
			if (!htmlPaste || (props.htmlPaste !== htmlPaste)) {
				setHtmlPaste( props.htmlPaste );
				const thisHTML = new DOMParser().parseFromString(props.htmlPaste, 'text/html');
				json = formToJSON(thisHTML);
				setFormJson( json );
				props.setFormData(json);
			} else if (htmlPaste && !formJson) {
				const thisHTML = new DOMParser().parseFromString(htmlPaste, 'text/html');
				json = formToJSON(thisHTML);
				setFormJson( json );
				props.setFormData(json);
			}
		}
	}); // no dependencies = run on every render

	return (
		<div>
			<pre id='formJson'>{ JSON.stringify(formJson, null, 2) }</pre>
		</div>
	);
}

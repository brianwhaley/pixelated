import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as FC from './pixelated.formcomponents';
import * as FV from './pixelated.formvalidations';
import { generateKey, capitalize, attributeMap } from '../utilities/pixelated.functions';
import './pixelated.form.css';


/* ===== FORM ENGINE =====
Generate all the elements to display a form */

export function FormEngine(props) {
	FormEngine.propTypes = {
		name: PropTypes.string,
		id: PropTypes.string,
		method: PropTypes.string,
		onSubmitHandler: PropTypes.func,
		formData: PropTypes.object.isRequired
	};

	function generateFormProps() {
		// GENERATE PROPS TO RENDER THE FORM CONTAINER, INTERNAL FUNCTION
		const formProps = JSON.parse(JSON.stringify(props));
		['formData', 'onSubmitHandler'].forEach(e => delete formProps[e]);
		return formProps;
	}

	function generateNewFields() {
		// CORE OF THE FORM ENGINE - CONVERT JSON TO COMPONENTS - INTERNAL
		const newFields = [];
		if (props.formData && props.formData.fields) {
			const thisFields = props.formData.fields;
			for (let field = 0; field < thisFields.length; field++) {
				const thisField = thisFields[field];
				const newProps = JSON.parse(JSON.stringify(thisField.props));
				newProps.key = generateKey();
				const newElement = React.createElement(FC[thisField.component], newProps);
				newFields.push(newElement);
			}
		}
		return newFields;
	}

	function handleSubmit(e) {
		// HANDLES THE FORM ACTION / FORM SUBMIT - EXPOSED EXTERNAL
		e.preventDefault();
		if (props.onSubmitHandler) props.onSubmitHandler(e);
		return true;
	}

	return (
		<form {...generateFormProps()} onSubmit={(e) => { handleSubmit(e); }} suppressHydrationWarning >{generateNewFields()}</form>
	);
}


/* =====  FORM BUILDER ===== 
Display all the components for a Form Builder - 
Element Buttons, Element Details, and the Form */

export function FormBuilder(props) {

	const [ url, setURL ] = useState('');
	const [ htmlPaste, setHtmlPaste ] = useState('');
	const [ formData, setFormData ] = useState({});
	const [ fieldFormData, setFieldFormData ] = useState({});

	function mapTypeToComponent(myType){
		let myComponent = 
		(["button"].includes(myType)) ? 'FormButton' : 
			(["checkbox"].includes(myType)) ? 'FormCheckbox' : 
				(["datalist"].includes(myType)) ? 'FormDataList' : 
					(["radio"].includes(myType)) ? 'FormRadio' : 
						(["select"].includes(myType)) ? 'FormSelect' : 
							(["textarea"].includes(myType)) ? 'FormTextarea' : 
								"FormImput";
		return myComponent;
	}

	function appendFormData(event) {
		// APPEND JSON FOR NEW FIELD TO EXISTING JSON CONFIG OBJECT - EXPOSED EXTERNAL
		const props = {};
		for (const prop in event.target) {
			const thisProp = event.target[prop];
			if (thisProp && thisProp.value) { props[thisProp.name] = thisProp.value; }
		}
		const field = {};
		field.props = props;
		field.component = mapTypeToComponent(field.props.type);
		let fields = [];
		if (Object.keys(formData).length > 0) { fields = JSON.parse(JSON.stringify(formData.fields)); }
		fields[fields.length] = field;
		setFormData( fields );
		return (field);
	}

	return (
		<div className="section-container">
			<div style={{ display: 'inline-block', verticalAlign: 'top' }}>
				<FormBuild setFormData={setFieldFormData} />
			</div>
			<div style={{ display: 'inline-block', verticalAlign: 'top' }}>
				<FormEngine name="field_props" id="field_props"
					onSubmitHandler={appendFormData}
					formData={fieldFormData} />
			</div>
			<div style={{ display: 'inline-block', verticalAlign: 'top' }} >
				<pre style={{ width: '100%' }} >{ JSON.stringify(formData, null, 2) }</pre>
			</div>
			<div><br /><br /><hr /><br /><br /></div>
			<div style={{ display: 'block', verticalAlign: 'top' }}>
				<FormEngine formData={formData} />
			</div>
		</div>
	);
}



/* 
===== FORM BUILD =====
Dynamically generate, component by component, and prop by prop, 
the JSON to create a form via FormEngine 
*/

export function FormBuild(props) {
	FormBuild.propTypes = {
		setFormData: PropTypes.func
	};

	function generateFieldJSON (component) {
		// GENERATE THE JSON TO DISPLAY A FORM TO ADD A FIELD - INTERNAL
		const form = { fields: [] };
		let i = 0;
		for (const prop in FC[component].propTypes) {
			const field = {};
			field.component = 'FormInput';
			const props = {};
			props.label = prop;
			props.name = prop;
			props.id = prop;
			props.type = 'text';
			if (prop === 'type') props.list = 'inputTypes';
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

	function addComponent (component) {
		// GENERATE THE JSON TO DISPLAY A FORM TO ADD A FIELD - EXTERNAL
		const fieldJSON = generateFieldJSON(component);
		props.setFormData(fieldJSON);
		return true;
	}

	function generateComponentButtons () {
		// GENERATES THE COMPENENT BUTTONS FORM TO ADD NEW FIELDS - INTERNAL
		const components = [];
		for (const component in Object.keys(FC)) {
			const thisComponent = Object.keys(FC)[component];
			const newComponent = <button key={thisComponent} style={{ display: 'block', width: 200 }} onClick={ () => addComponent(thisComponent)}>{thisComponent}</button>;
			components.push(newComponent);
		}
		return components;
	}

	return (
		<Fragment>
			<form onSubmit={ e => { e.preventDefault(); } } method="post" name="build" id="build">
				{ generateComponentButtons() }
			</form>
		</Fragment>
	);
}



/* 
===== FORM EXTRACT ===== 
Submit a page URL of a form to extract all form elements and 
convert them to JSON to create a form via FormEngine 
*/

export function FormExtractor(props) {
	FormExtractor.propTypes = {
		url: PropTypes.string
	};

	const debug = false;
	const [ url, setURL ] = useState('');
	const [ htmlPaste, setHtmlPaste ] = useState('');
	const [ formData, setFormData ] = useState ({});

	function setParentState(childState) {
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


export function FormExtractUI(props) {
	FormExtractUI.propTypes = {
		setParentState: PropTypes.func.isRequired
	};

	const debug = false;
	const [url, setURL] = useState('');
	const [htmlPaste, setHtmlPaste] = useState('');

	function onChange (event) {
		// UPDATE URL OR HTML_PASTE ON CHANGE - EXTERNAL
		if (debug) console.log("Element Changed...");
		if(event.target.name == "url") {
			setURL(event.target.value);
		} else if (event.target.name == "htmlPaste") {
			setHtmlPaste(event.target.value);
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
			<input type="text" list="form_urls" id="url" name="url" size="100" onChange={onChange} />
			<FC.FormDataList id='form_urls' items={FV.formURLs} />
			<div style={{ width: '100%', textAlign: 'center' }}>OR</div>
			<label htmlFor="htmlPaste">HTML : </label>
			<textarea id="htmlPaste" name="htmlPaste" rows="10" cols="80" onChange={onChange} /><br />
			<div style={{ width: '100%', textAlign: 'center' }}>
				<button type="button" onClick={onSubmit}>Extract</button>
				<input type="reset" />
			</div>
		</form>
	);
}

export function FormExtractEngine(props) {
	FormExtractEngine.propTypes = {
		url: PropTypes.string,
		htmlPaste: PropTypes.string,
		setFormData: PropTypes.func.isRequired
	};

	const debug = false;
	const proxy = 'https://proxy.pixelated.tech/prod/proxy?url=';
	// const proxy = "https://x3cf4kv0nk.execute-api.us-east-2.amazonaws.com/prod/proxy?url=";
	// const proxy = "https://thingproxy.freeboard.io/fetch/";
	const [ url, setURL ] = useState('');
	const [ htmlPaste, setHtmlPaste ] = useState('');
	const [ formJson, setFormJson ] = useState(null);

	function extractOptions (thisElement) {
		// GENERATE OPTIONS FOR SELECT FIELD - INTERNAL
		if (debug) console.log("Extracting Options...");
		if (thisElement.tagName.toLowerCase() === 'select' && thisElement.options && thisElement.options.length) {
			const options = [];
			for (let option = 0; option < thisElement.options.length; option++) {
				const thisOption = thisElement.options[option];
				const attribs = {};
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

	function extractSelectedOptions (thisOptions) {
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

	function extractAttribs (thisElement) {
		if (debug) console.log("Extracting Attributes...");
		// EXTRACT ALL ATTRIBUTES FOR A FORM ELEMENT - INTERNAL
		// LOOK AT THAT - JAVASCRIPT REFLECTION!
		if (thisElement && thisElement.attributes && thisElement.attributes.length) {
			const props = {};
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

	function extractLabel (html, thisElement) {
		// IDENTIFY AND EXTRACT LABEL PROPERTIES FOR A SPECIFIC FIELD - INTERNAL
		if (debug) console.log("Extracting Label...");
		if (thisElement.attributes.id && thisElement.attributes.id.value) {
			const thisID = thisElement.attributes.id.value;
			const thisLabel = html.querySelector("label[for='" + thisID + "']");
			if (thisLabel) return thisLabel;
		}
		return false;
	}

	function formToJSON (html) {
		// CONVERT HTML TO CONFIG JSON - INTERNAL
		if (debug) console.log("Converting Form to JSON...");
		const json = {};
		json.fields = [];
		const forms = html.getElementsByTagName('form');
		// ----- FORMS
		for (let form = 0; form < forms.length; form++) {
			const thisForm = forms[form];
			if (Object.keys(thisForm).length > 0) {
				// ----- ELEMENTS
				for (let element = 0; element < thisForm.elements.length; element++) {
					const thisElement = thisForm[element];
					const elem = {};
					if (thisElement && thisElement.attributes && thisElement.tagName) {
						// ----- COMPONENT
						elem.component = 'Form' + capitalize(thisElement.tagName);
						let props = {};
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

	function getHTML (url, callback) {
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
		if (debug) console.log("Mounted : ", mounted.current);
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
			let json = '';
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

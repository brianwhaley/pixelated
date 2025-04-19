
import React, { Component, Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as FV from "./pixelated.formvalidations";
import "./pixelated.form.css";

const onChange = (me, event) => {
	let myValidate = me.props.validate ? FV[me.props.validate](event.target) : true ;
	let myParentValidate = me.props.parent && me.props.parent.validate ? FV[me.props.parent.validate](event.target) : true ;
	let myRequired = me.props.required ? event.target.checkValidity() : true ;
	let myRequiredNotEmpty = (me.props.required && (!event.target.value)) ? false : true ;
	let myValid = (myValidate && myParentValidate && myRequired && myRequiredNotEmpty ) ? true : false ;
	// me.setState({ isValid : myValid });
	if (me.props.setIsValid) me.props.setIsValid(myValid);
	if (me.props.parent && me.props.parent.setIsValid) me.props.parent.setIsValid(myValid);
	return true;
};



function FormLabel(props) {
	return (
		<Fragment >
			{ props.label && props.id 
				? <label id={props.id} htmlFor={props.id}>{props.label}</label> 
				: "" }
			{ props.tooltip 
				? <FormTooltip
					id={props.id}
					text={props.tooltip}
				/>
				: "" }
		</Fragment>
	);
}
FormLabel.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string,
	tooltip: PropTypes.string,
};
FormLabel.defaultProps = {
	id: "",
	label: "",
	tooltip: "",
};


function FormTooltip(props) {
	
	function toggleTooltip(e) {
		e.preventDefault();
		if (e.target.nextSibling.style.display == "block") {
			e.target.nextSibling.style.display = "none";
		} else {
			e.target.nextSibling.style.display = "block";
		}
		return false;
	}
	// ℹ	8505	2139	 	INFORMATION SOURCE
	// ⚠	9888	26A0	 	WARNING SIGN
	// 				24BE		I IN CIRCLE
	let thisID = "tooltip-" + props.id;
	return (
		<Fragment >
			{ props.text && props.id 
				? <Fragment>
					<div id={thisID} className="tooltip">
						<a href="#" className="tooltipIcon" onClick={toggleTooltip}>{'\u2139'}</a>
						<div className="tooltipText">{props.text}</div>
					</div>
				</Fragment>
				: "" }
		</Fragment>
	);
}
FormTooltip.propTypes = {
	id: PropTypes.string,
	text: PropTypes.string,
};
FormTooltip.defaultProps = {
	id: "",
	text: "",
};



function FormValidate(props) {
	
	return ( 
		<Fragment>
			{ !props.valid ? 
				<span id={props.id}>{ props.valid  ? "\u2705" : "\u274C" }</span> : "" }
		</Fragment>
	);
}
FormValidate.propTypes = {
	id: PropTypes.string,
	valid: PropTypes.bool,
};



export function FormInput(props) {

	const [isValid, setIsValid] = useState(true);
	
	let formValidate = <FormValidate id={`${props.id}-validate`} valid={isValid} /> ;
	// ----- Input Props
	let inputProps = JSON.parse(JSON.stringify(props));
	["display", "label", "validate"].forEach(e => delete inputProps[e]);
	inputProps["onChange"] = (e) => onChange({props: {...props, isValid: isValid, setIsValid: setIsValid }}, e) ;
	inputProps["className"] = (props.display == "vertical") ? "displayVertical" : "" ;
	if ( ["submit","button"].indexOf(props.type) > -1 ) { inputProps["value"] = props.value; } ;
	return (
		<div>
			{ props.type == "checkbox" ? <input {...inputProps} /> : "" }
			<FormLabel key={"label-" + props.id} id={props.id} label={props.label} />
			{ props.tooltip ? <FormTooltip id={props.id} text={props.tooltip} /> : "" }
			{ props.display == "vertical" ? formValidate : "" }
			{ props.type != "checkbox" ? <input {...inputProps} /> : "" }
			{ props.list ? <FormDataList id={props.list} items={FV[props.list]} /> : "" }
			{ props.display != "vertical" ? formValidate : "" }
		</div>
	);
}
FormInput.propTypes = {
	type: PropTypes.string,
	id: PropTypes.string,
	name: PropTypes.string,
	defaultValue: PropTypes.string,
	value: PropTypes.string,
	list: PropTypes.string,
	size: PropTypes.string,
	maxLength: PropTypes.string,
	placeholder: PropTypes.string,
	autoComplete: PropTypes.string,
	"aria-label": PropTypes.string,
	min: PropTypes.string,
	max: PropTypes.string,
	step: PropTypes.string,
	// flag attributes
	autoFocus: PropTypes.string,
	disabled: PropTypes.string,
	readOnly: PropTypes.string,
	required: PropTypes.string,
	// className, 
	// data-mapping, data-component-endpoint, data-testid
	// aria-invalid, aria-describedby, 
	// ----- for calculations
	display: PropTypes.string,
	label: PropTypes.string,
	tooltip: PropTypes.string,
	validate: PropTypes.string,
};



export function FormSelect(props) {
	
	const [isValid, setIsValid] = useState(true);

	function generateOptions(){
		let options = [];
		for (var option in props.options) {
			let thisOption = props.options[option];
			let thisKey = "select-" + props.id + "-" + thisOption.value ;
			let newOption = <FormSelectOption key={thisKey} {...thisOption} parent={{ isValid: isValid, setisValid: setIsValid }} />;
			options.push(newOption);
		}
		return options ;
	}

	let formValidate = <FormValidate id={`${props.id}-validate`} valid={isValid} /> ;
	// ----- Input Props
	let inputProps = JSON.parse(JSON.stringify(props));
	["options", "display", "label", "validate"].forEach(e => delete inputProps[e]);
	inputProps["onChange"] = (e) => onChange({props: {...props, isValid: isValid, setIsValid: setIsValid }}, e) ;
	inputProps["className"] = (props.display == "vertical") ? "displayVertical" : "" ;
	return (
		<div>
			<FormLabel key={"label-" + props.id} id={props.id} label = {props.label} />
			{ props.tooltip ? <FormTooltip id={props.id} text={props.tooltip} /> : "" }
			{ props.display == "vertical" ? formValidate : "" }
			<select {...inputProps} suppressHydrationWarning >
				{generateOptions()}
			</select>
			{ props.display != "vertical" ? formValidate : "" }
		</div>
	);
}
FormSelect.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	size: PropTypes.string,
	autoComplete: PropTypes.string,
	defaultValue: PropTypes.oneOfType([
		  PropTypes.string,
		  PropTypes.array
	]),
	// flag attributes
	autoFocus: PropTypes.string,
	disabled: PropTypes.string,
	multiple: PropTypes.string,
	readOnly: PropTypes.string,
	required: PropTypes.string,
	// selected: PropTypes.string, // not used
	// ----- for calculations
	options : PropTypes.array,
	display: PropTypes.string,
	label: PropTypes.string,
	tooltip: PropTypes.string,
	validate: PropTypes.string,
};



function FormSelectOption(props) {
	let inputProps = JSON.parse(JSON.stringify(props));
	["selected"].forEach(e => delete inputProps[e]);
	return (
		<option {...inputProps} >{props.text}</option>
	);
}
FormSelectOption.propTypes = {
	text: PropTypes.string,
	value: PropTypes.string,
	// flag attributes
	disabled: PropTypes.string,
	// selected : PropTypes.string
};



export function FormTextarea(props) {
	
	const [isValid, setIsValid] = useState(true);

	let formValidate = <FormValidate id={`${props.id}-validate`} valid={isValid} /> ;
	// ----- Input Props
	let inputProps = JSON.parse(JSON.stringify(props));
	["display", "label", "validate"].forEach(e => delete inputProps[e]);
	inputProps["onChange"] = (e) => onChange({props: {...props, isValid: isValid, setIsValid: setIsValid }}, e) ;
	inputProps["className"] = (props.display == "vertical") ? "displayVertical" : "" ;
	return (
		<div>
			<FormLabel key={"label-" + props.id} id={props.id} label = {props.label} />
			{ props.tooltip ? <FormTooltip id={props.id} text={props.tooltip} /> : "" }
			{ props.display == "vertical" ? formValidate : "" }
			<textarea {...inputProps} />
			{ props.display != "vertical" ? formValidate : "" }
		</div>
	);
}
FormTextarea.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	rows: PropTypes.string,
	cols: PropTypes.string,
	defaultValue: PropTypes.string,
	maxLength: PropTypes.number,
	placeholder: PropTypes.string,
	autoComplete: PropTypes.string,
	// flag attributes
	autoFocus: PropTypes.string,
	disabled: PropTypes.string,
	readOnly: PropTypes.string,
	required: PropTypes.string,
	// ----- for calculations
	display: PropTypes.string,
	label: PropTypes.string,
	tooltip: PropTypes.string,
	validate: PropTypes.string,
};



export function FormRadio(props) {
	
	const [isValid, setIsValid] = useState(true);
	
	function generateOptions(){
		let options = [];
		for (var option in props.options) {
			let thisOption = props.options[option];
			thisOption.setIsValid = setIsValid;
			thisOption.parent = { ...props };
			thisOption.parent.isValid = isValid;
			thisOption.parent.setIsValid = setIsValid;
			let thisKey = "radio-" + props.id + "-" + thisOption.value ;
			let newOption = <FormRadioOption key={thisKey} {...thisOption} />;
			options.push(newOption);
		}
		return options;
	}
	let formValidate = <FormValidate id={`${props.id}-validate`} valid={isValid} /> ;
	return (
		<div>
			<FormLabel key={"label-" + props.id} id={props.name} label={props.label} />
			{ props.tooltip ? <FormTooltip id={props.id} text={props.tooltip} /> : "" }
			{ props.display == "vertical" ? formValidate : "" }
			{generateOptions()}
			{ props.display != "vertical" ? formValidate : "" }
		</div>
	);
}
FormRadio.propTypes = {
	id: PropTypes.string, // not using?
	name: PropTypes.string,
	options : PropTypes.array,
	// flag attributes
	autoFocus: PropTypes.string,
	disabled: PropTypes.string,
	readOnly: PropTypes.string,
	required: PropTypes.string,
	// ? selected: PropTypes.string,
	// ----- for calculations
	display: PropTypes.string,
	label: PropTypes.string,
	tooltip: PropTypes.string,
	validate: PropTypes.string,
};



function FormRadioOption(props) {
	return (
		<span className={ props.parent.display == "vertical" ? "displayVertical" : ""}>
			<input type="radio" 
				id={`${props.name}-${props.value}`} 
				name={props.parent.name} 
				value={props.value} 
				defaultChecked={props.checked ? "checked" : ""} 
				required={props.parent.required ? "required" : ""} 
				onChange={ (e) => onChange({props}, e) } />
			<label htmlFor={props.text}>{props.text}</label>
		</span>
	);
}
FormRadioOption.propTypes = {
	name: PropTypes.string,
	text: PropTypes.string,
	value: PropTypes.string,
	// flag attributes
	checked : PropTypes.string,
	// ----- for calculations
	parent : PropTypes.object,
	setIsValid : PropTypes.func,
};



export function FormCheckbox(props) {
	
	const [ isValid, setIsValid ] = useState(true);
	
	function generateOptions(){
		let options = [];
		for (var option in props.options) {
			let thisOption = props.options[option];
			thisOption.setIsValid = setIsValid;
			thisOption.parent = { ...props };
			thisOption.parent.isValid = isValid;
			thisOption.parent.setIsValid = setIsValid;
			let thisKey = "checkbox-" + props.name + "-" + thisOption.value ;
			let newOption = <FormCheckboxOption key={thisKey} {...thisOption} />;
			options.push(newOption);
		}
		return options;
	}

	let formValidate = <FormValidate id={`${props.id}-validate`} valid={isValid} /> ;
	return (
		<div>
			<FormLabel key={"label-" + props.id} id={props.name} label = {props.label} />
			{ props.tooltip ? <FormTooltip id={props.id} text={props.tooltip} /> : "" }
			{ props.display == "vertical" ? formValidate : "" }
			{ generateOptions() }
			{ props.display != "vertical" ? formValidate : "" }
		</div>
	);
}
FormCheckbox.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	options : PropTypes.array,
	// flag attributes
	autoFocus: PropTypes.string,
	disabled: PropTypes.string,
	readOnly: PropTypes.string,
	// ----- for calculations
	display: PropTypes.string,
	label: PropTypes.string,
	tooltip: PropTypes.string,
	validate: PropTypes.string,
};



function FormCheckboxOption(props) {
	return (
		<span className={ props.parent.display == "vertical" ? "displayVertical" : ""}>
			<input type="checkbox" 
				id={props.parent.name + "_" + props.text} 
				name={props.text} value={props.value} 
				onChange={ (e) => onChange({props}, e) } 
			/>
			<label htmlFor={props.text}>{props.text}</label>
		</span>
	);
}
FormCheckboxOption.propTypes = {
	text: PropTypes.string,
	value: PropTypes.string,
	// flag attributes
	selected : PropTypes.string,
	// ----- for calculations
	parent : PropTypes.object,
	setIsValid: PropTypes.func,
	
};



export function FormButton(props) {
	return (
		<div>
			<button 
				type={props.type} 
				id={props.id} 
				onClick={props.onClick}>{props.text}</button>
		</div>
	);
}
FormButton.propTypes = {
	type: PropTypes.string,
	id: PropTypes.string,
	text: PropTypes.string,
	// ----- for calculations
	onClick: PropTypes.func
};




export function FormDataList(props) {
	const options = [];
	for (const item in props.items) {
		const thisItem = props.items[item];
		const newOption = <option key={props.id + '-' + thisItem} value={thisItem} />;
		options.push(newOption);
	}
	return (
		<datalist id={props.id}>{options}</datalist>
	);
}
FormDataList.propTypes = {
	id: PropTypes.string,
	items: PropTypes.array,
};



export function FormFieldset(props) {
	return (
		<Fragment />
	);
}
FormFieldset.propTypes = {
};

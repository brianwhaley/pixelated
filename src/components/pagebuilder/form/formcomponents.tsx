
import React, { useState } from "react";
import PropTypes, { InferProps } from "prop-types";
import { SmartImage } from "../../cms/cloudinary.image";
import { usePixelatedConfig } from "../../config/config.client";
import * as FV from "./formvalidations";
import "./form.css";


/* 
InferProps to generate Types
https://amanhimself.dev/blog/prop-types-in-react-and-typescript/#inferring-proptypes-in-typescript 
*/


const onChange = (me: { props: any; }, event: React.ChangeEvent<HTMLInputElement>) => {
	// TEST VALUES
	let myValidate = (typeof me.props.validate === "string" && me.props.validate in FV)
		? (FV as unknown as Record<string, (target: EventTarget & HTMLInputElement) => boolean>)[me.props.validate](event.target)
		: true ;
	let myParentValidate = me.props.parent && me.props.parent.validate
		? (FV as unknown as Record<string, (target: EventTarget & HTMLInputElement) => boolean>)[me.props.parent.validate](event.target)
		: true ;
	let myRequired = me.props.required ? event.target.checkValidity() : true ;
	let myRequiredNotEmpty = (me.props.required && (!event.target.value)) ? false : true ;
	// RETURN VALUES
	Promise.all([myValidate, myParentValidate, myRequired, myRequiredNotEmpty])
		.then((result) => {
			let myValid = (result[0] && result[1] && result[2] && result[3]) ? true : false ;
			if (me.props.setIsValid) me.props.setIsValid(myValid);
			if (me.props.parent && me.props.parent.setIsValid) me.props.parent.setIsValid(myValid);
			return true;
		});
};






FormLabel.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	tooltip: PropTypes.string,
	className: PropTypes.string,
};
FormLabel.defaultProps = {
	id: "",
	label: "",
	tooltip: "",
};
export type FormLabelType = InferProps<typeof FormLabel.propTypes>;
function FormLabel(props: FormLabelType) {
	return (
		< >
			{ props.label && props.id 
				? <label className={props.className || ''} 
					id={`lbl-${props.id}`} htmlFor={props.id}>{props.label}</label> 
				: "" }
			{ props.tooltip 
				? <FormTooltip id={props.id} text={props.tooltip} />
				: "" }
		</>
	);
}





FormTooltip.propTypes = {
	id: PropTypes.string,
	text: PropTypes.string,
	className: PropTypes.string,
};
FormTooltip.defaultProps = {
	id: "",
	text: "",
};
export type FormTooltipType = InferProps<typeof FormTooltip.propTypes>;
function FormTooltip(props: FormTooltipType) {
	function toggleTooltip(e: React.MouseEvent<HTMLAnchorElement>) {
		e.preventDefault();
		const target = e.currentTarget as HTMLAnchorElement;
		const nextSibling = target.nextSibling as HTMLElement | null;
		if (nextSibling) {
			if (nextSibling.style.display === "block") {
				nextSibling.style.display = "none";
			} else {
				nextSibling.style.display = "block";
			}
		}
		return false;
	}
	// ℹ	8505	2139	 	INFORMATION SOURCE
	// ⚠	9888	26A0	 	WARNING SIGN
	// 				24BE		I IN CIRCLE
	// {'\u2139'}
	let thisID = "tooltip-" + props.id;
	const config = usePixelatedConfig();
	let tooltipImg = <SmartImage src="/images/icons/tooltip-icon-2.png" 
		title={props.id + " - " + props.text} 
		alt={props.id + " - " + props.text} 
		cloudinaryEnv={config?.cloudinary?.product_env ?? undefined}
		cloudinaryDomain={config?.cloudinary?.baseUrl ?? undefined}
		cloudinaryTransforms={config?.cloudinary?.transforms ?? undefined} />;
	/* <img title={props.id + " - " + props.text} 
		alt={props.id + " - " + props.text} 
		src="/images/icons/tooltip-icon-2.png" /> */
	return (
		<>
			{ props.text && props.id 
				? <>
					<div id={thisID} className={`tooltip ${props.className || ''}`}>
						<a href="#" className="tooltipIcon" onClick={toggleTooltip}>
							{tooltipImg}
						</a>
						<div className="tooltipText">{props.text}</div>
					</div>
				</>
				: "" }
		</>
	);
}





FormValidate.propTypes = {
	id: PropTypes.string.isRequired,
	valid: PropTypes.bool,
};
export type FormValidateType = InferProps<typeof FormValidate.propTypes>;
function FormValidate(props: FormValidateType) {
	return ( 
		<>
			{ !props.valid ? 
				<span id={props.id}>{ props.valid  ? "\u2705" : "\u274C" }</span> : "" }
		</>
	);
}





FormInput.propTypes = {
	type: PropTypes.string,
	id: PropTypes.string.isRequired,
	name: PropTypes.string,
	defaultValue: PropTypes.string,
	value: PropTypes.string,
	list: PropTypes.string,
	listItems: PropTypes.string, /* this one is mine */
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
	className: PropTypes.string,
	validate: PropTypes.string,
};
export type FormInputType = InferProps<typeof FormInput.propTypes>;
export function FormInput(props: FormInputType) {
	const [isValid, setIsValid] = useState(true);
	let formValidate = <FormValidate id={`${props.id}-validate`} valid={isValid} /> ;
	// ----- Input Props
	let inputProps = JSON.parse(JSON.stringify(props));
	["display", "label", "listItems", "validate"].forEach(e => delete inputProps[e]);
	inputProps["onChange"] = (e: any) => onChange({props: {...props, isValid: isValid, setIsValid: setIsValid }}, e) ;
	inputProps["className"] = (props.display == "vertical") ? "displayVertical" : "" ;
	if ( ["submit","button"].indexOf(props.type ?? "") > -1 ) { inputProps["value"] = props.value; } ;
	let formDataList = props.list && props.list in FV
		? FV[props.list as keyof typeof FV]
		: props.list && props.listItems
			? props.listItems.split(',')
			: undefined ;

	return (
		<div>
			{ props.type == "checkbox" ? <input {...inputProps} /> : "" }
			<FormLabel key={"label-" + props.id} id={props.id} label={props.label} />
			{ props.tooltip ? <FormTooltip id={props.id} text={props.tooltip} /> : "" }
			{ props.display == "vertical" ? formValidate : "" }
			{ props.type != "checkbox" ? <input {...inputProps} /> : "" }
			{ formDataList && Array.isArray(formDataList) ? <FormDataList id={props.list ?? ''} items={formDataList} /> : "" }
			{ props.display != "vertical" ? formValidate : "" }
		</div>
	);
}







FormSelect.propTypes = {
	id: PropTypes.string.isRequired,
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
	className: PropTypes.string,
	validate: PropTypes.string,
};
export type FormSelectType = InferProps<typeof FormSelect.propTypes>;
export function FormSelect(props: FormSelectType) {
	const [isValid, setIsValid] = useState(true);
	function generateOptions(){
		let options = [];
		for (let option in props.options) {
			let key: any = option;
			let thisOption = props.options[key];
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
	inputProps["onChange"] = (e: any) => onChange({props: {...props, isValid: isValid, setIsValid: setIsValid }}, e) ;
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







FormSelectOption.propTypes = {
	text: PropTypes.string,
	value: PropTypes.string,
	// flag attributes
	disabled: PropTypes.string,
	// selected : PropTypes.string
};
export type FormSelectOptionType = InferProps<typeof FormSelectOption.propTypes>;
function FormSelectOption(props: FormSelectOptionType) {
	let inputProps = JSON.parse(JSON.stringify(props));
	["selected"].forEach(e => delete inputProps[e]);
	return (
		<option {...inputProps} >{props.text}</option>
	);
}








FormTextarea.propTypes = {
	id: PropTypes.string.isRequired,
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
	className: PropTypes.string,
	validate: PropTypes.string,
};
export type FormTextareaType = InferProps<typeof FormTextarea.propTypes>;
export function FormTextarea(props: FormTextareaType) {
	const [isValid, setIsValid] = useState(true);

	let formValidate = <FormValidate id={`${props.id}-validate`} valid={isValid} /> ;
	// ----- Input Props
	let inputProps = JSON.parse(JSON.stringify(props));
	["display", "label", "validate"].forEach(e => delete inputProps[e]);
	inputProps["onChange"] = (e: any) => onChange({props: {...props, isValid: isValid, setIsValid: setIsValid }}, e) ;
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






FormRadio.propTypes = {
	id: PropTypes.string.isRequired, // not using?
	name: PropTypes.string.isRequired,
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
export type FormRadioType = InferProps<typeof FormRadio.propTypes>;
export function FormRadio(props: FormRadioType) {
	const [isValid, setIsValid] = useState(true);
	function generateOptions(){
		let options = [];
		for (var option in props.options) {
			let key: any = option;
			let thisOption = props.options[key];
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






FormRadioOption.propTypes = {
	name: PropTypes.string,
	text: PropTypes.string,
	value: PropTypes.string.isRequired,
	// flag attributes
	checked : PropTypes.string,
	// ----- for calculations
	parent : FormRadio,
	setIsValid : PropTypes.func,
};
export type FormRadioOptionType = InferProps<typeof FormRadioOption.propTypes>;
function FormRadioOption(props: FormRadioOptionType) {
	return (
		<span className={ props.parent.display == "vertical" ? "displayVertical" : ""}>
			<input type="radio" 
				id={`${props.parent.name}-${props.value}`} 
				name={props.parent.name} 
				value={props.value} 
				defaultChecked={!!props.checked} 
				required={!!props.parent.required} 
				onChange={ (e) => onChange({props}, e) } />
			<label htmlFor={`${props.parent.name}-${props.value}`}>{props.text}</label>
		</span>
	);
}






FormCheckbox.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	options : PropTypes.array,
	// flag attributes
	autoFocus: PropTypes.string,
	disabled: PropTypes.string,
	readOnly: PropTypes.string,
	// ----- for calculations
	display: PropTypes.string,
	label: PropTypes.string,
	tooltip: PropTypes.string,
	className: PropTypes.string,
	validate: PropTypes.string,
};
export type FormCheckboxType = InferProps<typeof FormCheckbox.propTypes>;
export function FormCheckbox(props: FormCheckboxType) {
	const [ isValid, setIsValid ] = useState(true);
	function generateOptions(){
		let options = [];
		for (var option in props.options) {
			let key: any = option;
			let thisOption = props.options[key];
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
			<FormLabel key={"label-" + props.id} id={props.name} label={props.label} />
			{ props.tooltip ? <FormTooltip id={props.id} text={props.tooltip} /> : "" }
			{ props.display == "vertical" ? formValidate : "" }
			{ generateOptions() }
			{ props.display != "vertical" ? formValidate : "" }
		</div>
	);
}







FormCheckboxOption.propTypes = {
	text: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	// flag attributes
	selected : PropTypes.string,
	// ----- for calculations
	parent : FormCheckbox,
	setIsValid: PropTypes.func,
	
};
export type FormCheckboxOptionType = InferProps<typeof FormCheckboxOption.propTypes>;
function FormCheckboxOption(props: FormCheckboxOptionType) {
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






FormButton.propTypes = {
	type: PropTypes.string,
	id: PropTypes.string.isRequired,
	text: PropTypes.string,
	// ----- for calculations
	className: PropTypes.string,
	onClick: PropTypes.func.isRequired
};
export type FormButtonType = InferProps<typeof FormButton.propTypes>;
export function FormButton(props: FormButtonType) {
	return (
		<div>
			<button 
				type={props.type as "button" | "submit" | "reset" | undefined} 
				id={props.id} 
				className={props.className || ""} 
				onClick={props.onClick}>{props.text}</button>
		</div>
	);
}








FormDataList.propTypes = {
	id: PropTypes.string.isRequired,
	items: PropTypes.array,
};
export type FormDataListType = InferProps<typeof FormDataList.propTypes>;
export function FormDataList(props: FormDataListType) {
	const options = [];
	for (const item in props.items) {
		let key: any = item;
		const thisItem = props.items[key];
		const newOption = <option key={props.id + '-' + thisItem} value={thisItem} />;
		options.push(newOption);
	}
	return (
		<datalist id={props.id}>{options}</datalist>
	);
}








FormFieldset.propTypes = {
};
export type FormFieldsetType = InferProps<typeof FormFieldset.propTypes>;
export function FormFieldset() {
	return (
		<></>
	);
}


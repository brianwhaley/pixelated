
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import * as FV from "./pixelated.formvalidations";
import "./pixelated.form.css";

const onChange = (me, event) => {
	let myValidate = me.props.validate ? FV[me.props.validate](event.target) : true ;
	let myParentValidate = me.props.parent && me.props.parent.validate ? FV[me.props.parent.validate](event.target) : true ;
	let myRequired = me.props.required ? event.target.checkValidity() : true ;
	let myRequiredNotEmpty = (me.props.required && (!event.target.value)) ? false : true ;
	let myValid = (myValidate && myParentValidate && myRequired && myRequiredNotEmpty ) ? true : false ;
	me.setState({ isValid : myValid });
	if (me.props.setIsValid) me.props.setIsValid(myValid);
	// if (me.props.parent && me.props.parent.setIsValid) me.props.parent.setIsValid(myValid);
	return true;
};



class FormLabel extends Component {
	static propTypes = {
		id: PropTypes.string,
		label: PropTypes.string,
		tooltip: PropTypes.string,
	};
	static defaultProps = {
		id: "",
		label: "",
		tooltip: "",
	}
	constructor (props) {
		super(props);
	}
	render () {
		return (
			<Fragment >
				{ this.props.label && this.props.id 
					? <label id={this.props.id} htmlFor={this.props.id}>{this.props.label}</label> 
					: "" }
				{ this.props.tooltip 
					? <FormTooltip
						id={this.props.id}
						text={this.props.tooltip}
						/>
					: "" }
			</Fragment>
		);
	}
}


class FormTooltip extends Component {
	static propTypes = {
		id: PropTypes.string,
		text: PropTypes.string,
	};
	static defaultProps = {
		id: "",
		text: "",
	}
	constructor (props) {
		super(props);
		this.toggleTooltip = this.toggleTooltip.bind(this);
	}
	toggleTooltip = (e) => {
		e.preventDefault();
		if (e.target.nextSibling.style.display == "block") {
			e.target.nextSibling.style.display = "none"
		} else {
			e.target.nextSibling.style.display = "block"
		}
		return false;
	}
	// ℹ	8505	2139	 	INFORMATION SOURCE
	// ⚠	9888	26A0	 	WARNING SIGN
	// 				24BE		I IN CIRCLE
	render () {
		let thisID = "tooltip-" + this.props.id;
		return (
			<Fragment >
				{ this.props.text && this.props.id 
					? <Fragment>
						<div id={thisID} className="tooltip">
							<a href="#" className="tooltipIcon" onClick={this.toggleTooltip}>{'\u2139'}</a>
							<div className="tooltipText">{this.props.text}</div>
						</div>
					</Fragment>
					: "" }
			</Fragment>
		);
	}
}



class FormValidate extends Component {
	static propTypes = {
		id: PropTypes.string,
		valid: PropTypes.bool,
	};
	constructor (props) {
		super(props);
	}
	render () {
		return ( 
			<Fragment>
				{ !this.props.valid ? 
				<span id={this.props.id}>{ this.props.valid  ? "\u2705" : "\u274C" }</span> : "" }
			</Fragment>
		);
	}
}



export class FormInput extends Component {
	static propTypes = {
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
	constructor (props) {
		super(props);
		this.state = { 
			isValid: true 
		};
	}
	render () {
		let formValidate = <FormValidate id={`${this.props.id}-validate`} valid={this.state.isValid} /> ;
		// ----- Input Props
		let inputProps = JSON.parse(JSON.stringify(this.props));
		["display", "label", "validate"].forEach(e => delete inputProps[e]);
		inputProps["onChange"] = (e) => onChange(this, e) ;
		inputProps["className"] = (this.props.display == "vertical") ? "displayVertical" : "" ;
		if ( ["submit","button"].indexOf(this.props.type) > -1 ) { inputProps["value"] = this.props.value } ;
		return (
			<div>
				{ this.props.type == "checkbox" ? <input {...inputProps} /> : "" }
				<FormLabel key={"label-" + this.props.id} id={this.props.id} label={this.props.label} />
				{ this.props.tooltip ? <FormTooltip id={this.props.id} text={this.props.tooltip} /> : "" }
				{ this.props.display == "vertical" ? formValidate : "" }
				{ this.props.type != "checkbox" ? <input {...inputProps} /> : "" }
				{ this.props.list ? <FormDataList id={this.props.list} items={FV[this.props.list]} /> : "" }
				{ this.props.display != "vertical" ? formValidate : "" }
			</div>
		);
	}
}



export class FormSelect extends Component {
	static propTypes = {
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
	constructor (props) {
		super(props);
		this.state = {
			isValid: true
		};
	}
	generateOptions(){
		let options = [];
		for (var option in this.props.options) {
			let thisOption = this.props.options[option];
			let thisKey = "select-" + this.props.id + "-" + thisOption.value ;
			let newOption = <FormSelectOption key={thisKey} {...thisOption} />
			options.push(newOption);
		}
		return options ;
	}
	render () {
		let formValidate = <FormValidate id={`${this.props.id}-validate`} valid={this.state.isValid} /> ;
		// ----- Input Props
		let inputProps = JSON.parse(JSON.stringify(this.props));
		["options", "display", "label", "validate"].forEach(e => delete inputProps[e]);
		inputProps["onChange"] = (e) => onChange(this, e) ;
		inputProps["className"] = (this.props.display == "vertical") ? "displayVertical" : "" ;
		return (
			<div>
				<FormLabel key={"label-" + this.props.id} id={this.props.id} label = {this.props.label} />
				{ this.props.tooltip ? <FormTooltip id={this.props.id} text={this.props.tooltip} /> : "" }
				{ this.props.display == "vertical" ? formValidate : "" }
				<select {...inputProps} suppressHydrationWarning >
					{this.generateOptions()}
				</select>
				{ this.props.display != "vertical" ? formValidate : "" }
			</div>
		);
	}
}



class FormSelectOption extends Component {
	static propTypes = {
		text: PropTypes.string,
		value: PropTypes.string,
		// flag attributes
		disabled: PropTypes.string,
		// selected : PropTypes.string
	};
	constructor (props) {
		super(props);
	}
	render () {
		let inputProps = JSON.parse(JSON.stringify(this.props));
		["selected"].forEach(e => delete inputProps[e]);
		return (
			<option {...inputProps} >{this.props.text}</option>
		);
	}
}



export class FormTextarea extends Component {
	static propTypes = {
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
	constructor (props) {
		super(props);
		this.state = {
			isValid: true
		};
	}
	render () {
		let formValidate = <FormValidate id={`${this.props.id}-validate`} valid={this.state.isValid} /> ;
		// ----- Input Props
		let inputProps = JSON.parse(JSON.stringify(this.props));
		["display", "label", "validate"].forEach(e => delete inputProps[e]);
		inputProps["onChange"] = (e) => onChange(this, e) ;
		inputProps["className"] = (this.props.display == "vertical") ? "displayVertical" : "" ;
		return (
			<div>
				<FormLabel key={"label-" + this.props.id} id={this.props.id} label = {this.props.label} />
				{ this.props.tooltip ? <FormTooltip id={this.props.id} text={this.props.tooltip} /> : "" }
				{ this.props.display == "vertical" ? formValidate : "" }
				<textarea {...inputProps} />
				{ this.props.display != "vertical" ? formValidate : "" }
			</div>
		);
	}
}



export class FormRadio extends Component {
	static propTypes = {
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
	constructor (props) {
		super(props);
		this.state = {
			isValid: true
		};
		this.setIsValid = this.setIsValid.bind(this);
	}
	setIsValid(validValue){
		this.setState({ isValid : validValue })
	}
	generateOptions(){
		let options = [];
		for (var option in this.props.options) {
			let thisOption = this.props.options[option];
			thisOption.parent = this.props;
			thisOption.setIsValid = this.setIsValid;
			let thisKey = "radio-" + this.props.id + "-" + thisOption.value ;
			let newOption = <FormRadioOption key={thisKey} {...thisOption} />
			options.push(newOption);
		}
		return options;
	}
	render () {
		let formValidate = <FormValidate id={`${this.props.id}-validate`} valid={this.state.isValid} /> ;
		return (
			<div>
				<FormLabel key={"label-" + this.props.id} id={this.props.name} label={this.props.label} />
				{ this.props.tooltip ? <FormTooltip id={this.props.id} text={this.props.tooltip} /> : "" }
				{ this.props.display == "vertical" ? formValidate : "" }
				{this.generateOptions()}
				{ this.props.display != "vertical" ? formValidate : "" }
			</div>
		);
	}
}



class FormRadioOption extends Component {
	static propTypes = {
		name: PropTypes.string,
		text: PropTypes.string,
		value: PropTypes.string,
		// flag attributes
		checked : PropTypes.string,
		// ----- for calculations
		parent : PropTypes.object,
		setIsValid : PropTypes.func,
	};
	constructor (props) {
		super(props);
	}
	render () {
		return (
			<span className={ this.props.parent.display == "vertical" ? "displayVertical" : ""}>
				<input type="radio" 
					id={`${this.props.name}-${this.props.value}`} 
					name={this.props.parent.name} 
					value={this.props.value} 
					defaultChecked={this.props.checked ? "checked" : ""} 
					required={this.props.parent.required ? "required" : ""} 
					onChange={ (e) => onChange(this, e) } />
				<label htmlFor={this.props.text}>{this.props.text}</label>
			</span>
		);
	}
}



export class FormCheckbox extends Component {
	static propTypes = {
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
	constructor (props) {
		super(props);
		this.state = {
			isValid: true
		};
		this.setIsValid = this.setIsValid.bind(this);
	}
	setIsValid(validValue){
		this.setState({ isValid : validValue })
	}
	generateOptions(){
		let options = [];
		for (var option in this.props.options) {
			let thisOption = this.props.options[option];
			thisOption.parent = this.props;
			thisOption.setIsValid = this.setIsValid;
			let thisKey = "checkbox-" + this.props.name + "-" + thisOption.value ;
			let newOption = <FormCheckboxOption key={thisKey} {...thisOption} />
			options.push(newOption);
		}
		return options;
	}
	render () {
		let formValidate = <FormValidate id={`${this.props.id}-validate`} valid={this.state.isValid} /> ;
		return (
			<div>
				<FormLabel key={"label-" + this.props.id} id={this.props.name} label = {this.props.label} />
				{ this.props.tooltip ? <FormTooltip id={this.props.id} text={this.props.tooltip} /> : "" }
				{ this.props.display == "vertical" ? formValidate : "" }
				{this.generateOptions()}
				{ this.props.display != "vertical" ? formValidate : "" }
			</div>
		);
	}
}



class FormCheckboxOption extends Component {
	static propTypes = {
		text: PropTypes.string,
		value: PropTypes.string,
		// flag attributes
		selected : PropTypes.string,
		// ----- for calculations
		parent : PropTypes.object,
		setIsValid: PropTypes.func,
		
	};
	constructor (props) {
		super(props);
	}
	render () {
		return (
			<span className={ this.props.parent.display == "vertical" ? "displayVertical" : ""}>
				<input type="checkbox" 
					id={this.props.parent.name + "_" + this.props.text} 
					name={this.props.text} value={this.props.value} 
					onChange={ (e) => onChange(this, e) } 
				/>
				<label htmlFor={this.props.text}>{this.props.text}</label>
			</span>
		);
	}
}



export class FormButton extends Component {
	static propTypes = {
		type: PropTypes.string,
		id: PropTypes.string,
		text: PropTypes.string,
		// ----- for calculations
		onClick: PropTypes.func
	};
	constructor (props) {
		super(props);
	}
	render () {
		return (
			<div>
				<button 
					type={this.props.type} 
					id={this.props.id} 
					onClick={this.props.onClick}>{this.props.text}</button>
			</div>
		);
	}
}



export class FormDataList extends Component {
	static propTypes = {
		id: PropTypes.string,
		items: PropTypes.array,
	};
	constructor (props) {
		super(props);
	}
	render () {
		const options = []
		for (const item in this.props.items) {
			const thisItem = this.props.items[item]
			const newOption = <option key={this.props.id + '-' + thisItem} value={thisItem} />
			options.push(newOption)
		}
		return (
			<datalist id={this.props.id}>{options}</datalist>
		);
	}
}



export class FormFieldset extends Component {
	static propTypes = {
	};
	constructor (props) {
		super(props);
	}
	render () {
		return (
			<Fragment />
		);
	}
}

/* eslint-disable */

import React, { Component } from "react";
import PropTypes from "prop-types";
import * as FC from "./pixelated.formcomponents";
import { generateKey, capitalize, attributeMap } from "./pixelated.functions";
import "../css/pixelated.form.css";
import data from "../data/pixelated.form.v2.json";


export class FormEngine extends Component {
	static propTypes = {
		formdata: PropTypes.object.isRequired
	};
	constructor (props) {
		super(props);
	}
	render () {
		var newFields = [];
		if (this.props.formdata.fields) {
			let fields = this.props.formdata.fields;
			for (var field = 0; field < fields.length; field++) {
				let thisField = fields[field];
				let thisProps = thisField.props;
				thisProps.key = generateKey();
				let newElement = React.createElement(FC[thisField.component], thisProps);
				newFields.push(newElement);
			}
		}
		return ( 
			<form>{newFields}</form>
		)
	}
}




export class FormExtractUI extends Component {
	static propTypes = {
		setURL : PropTypes.func.isRequired
	};
	constructor(props) {
		super(props);
		this.state = {
			url : ""
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	onChange(event) {
		this.setState({url: event.target.value});
	  }
	onSubmit = () => {
		this.props.setURL(this.state.url);
	};
	render () {
		return (
			<form action="javascript:void(0)" method="post" name="extract">
				<label htmlFor="url">URL : </label>
				<input type="text" id="url" name="url" size="80" onChange={this.onChange}  />
				<button type="button" onClick={this.onSubmit}>Extract</button>
				<input type="reset" />
			</form>
		)
	}
}




export class FormExtract extends Component {
	static propTypes = {
		url: PropTypes.string.isRequired,
		setFormData : PropTypes.func.isRequired
	};
	constructor (props) {
		super(props);
		this.proxy="https://proxy.pixelated.tech/prod/proxy?url=";
		// this.proxy = "https://x3cf4kv0nk.execute-api.us-east-2.amazonaws.com/prod/proxy?url=";
		// this.proxy = "https://thingproxy.freeboard.io/fetch/";
		this.state = {
			url :  "",
			formjson : null
		};
		this.extractOptions = this.extractOptions.bind(this);
		this.extractSelectedOptions = this.extractSelectedOptions.bind(this);
		this.extractAttribs = this.extractAttribs.bind(this);
		this.extractLabel = this.extractLabel.bind(this);
		this.formToJSON = this.formToJSON.bind(this);
		this.getHTML = this.getHTML.bind(this);
	}
	extractOptions (thisElement) {
		if (thisElement.tagName.toLowerCase() == "select" && thisElement.options && thisElement.options.length) {
			var options = []
			for (let option = 0; option < thisElement.options.length; option++) {
				var thisOption = thisElement.options[option];
				var attribs = {};
				for (var attrib = 0; attrib < thisOption.attributes.length; attrib++) {
					var thisAttrib = thisOption.attributes[attrib];
					attribs[attributeMap(thisAttrib.name)] = thisAttrib.value;
				}
				if (thisOption.innerText) attribs["text"] = thisOption.innerText;
				if (Object.keys(attribs).length > 0) options.push(attribs); // not empty then add
			}
			if(options.length > 0) return options;
		}
		return false;
	}
	extractSelectedOptions (thisOptions) {
		if (thisOptions && thisOptions.length) {
			var selected = []
			for (let option = 0; option < thisOptions.length; option++) {
				var thisOption = thisOptions[option];
				if (thisOption.hasOwnProperty("selected")) {
					selected.push(thisOption.value);
					delete thisOptions[option]["selected"];
				}
			}
			// MULTIPLE - Return array
			if(selected.length > 1) return selected;
			// Not Multiple = return string
			if(selected.length == 1) return selected.toString() ;
		}
		return false;
	}
	extractAttribs (thisElement) {
		if (thisElement && thisElement.attributes && thisElement.attributes.length) {
			var props = {};
			for (var attrib = 0; attrib < thisElement.attributes.length; attrib++) {
				var thisAttrib = thisElement.attributes[attrib];
				if(thisAttrib.name == "style") {
					// Do not gather styles
				} else if( ["disabled","multiple","readonly","required","selected"].indexOf(thisAttrib.name.toLowerCase()) > -1 ) {
					// Flag type Attributes
					props[attributeMap(thisAttrib.name)] = attributeMap(thisAttrib.name);
				} else if(thisAttrib && thisAttrib.name && thisAttrib.value){
					// use attributeMap to map html props to React props
					props[attributeMap(thisAttrib.name)] = thisAttrib.value;
				}
			}
			if(Object.keys(props).length > 0) return props;
		}
		return false;
	}
	extractLabel (html, thisElement) {
		if (thisElement.attributes["id"] && thisElement.attributes["id"].value) {
			var thisID = thisElement.attributes["id"].value;
			var thisLabel = html.querySelector("label[for='" + thisID + "']");
			if (thisLabel) return thisLabel;
		}
		return false;
	}
	formToJSON (html) {
		var json = {};
		json.fields = [];
		var forms = html.getElementsByTagName("form");
		// ----- FORMS
		for (var form = 0; form < forms.length; form++) {
			var thisForm = forms[form];
			if (Object.keys( thisForm ).length > 0) {
				// ----- ELEMENTS
				for (var element = 0; element < thisForm.elements.length; element++) {
					var thisElement = thisForm[element];
					var elem = {};
					if(thisElement && thisElement.attributes && thisElement.tagName){
						// ----- COMPONENT
						elem["component"] = "Form" + capitalize(thisElement.tagName);
						var props = {};
						// ----- ELEMENT ATTRIBUTES
						var thisProps = this.extractAttribs(thisElement);
						if(thisProps) props = thisProps;
						// ----- ELEMENT OPTIONS
						var thisOptions = this.extractOptions(thisElement);
						if (thisOptions) {
							// only true for SELECT elements
							var thisSelected = this.extractSelectedOptions(thisOptions);
							if(thisSelected) props["defaultValue"] = thisSelected;
							props["options"] = thisOptions;
						} else {
							// get innerText on all but SELECT elements
							if (thisElement.innerText) props["text"] = thisElement.innerText; 
						}
						elem["props"] = props;
						// ----- LABEL
						var thisLabel = this.extractLabel(html, thisElement);
						if (thisLabel){
							elem["props"]["label"] = (thisLabel.innerText || thisLabel.textContent);
						}
					}
					if ( Object.keys( elem ).length > 0 ) json.fields.push(elem);
				}
			}
		}
		console.log(json);
		return json;
	}
	getHTML (url, callback){
		const xhr = new XMLHttpRequest();
		xhr.onreadystatechange = (e) => {
			if (xhr.readyState == 4 && xhr.status == 200) {
				var json = callback(xhr.responseXML);
				console.log(xhr.responseXML);
				this.setState({formjson: json});
				this.props.setFormData(json);
			}
		};
		xhr.open("GET", url);
		xhr.responseType = "document";
		xhr.send(null);
	}
	componentDidMount (){
	}
	componentDidUpdate (){
		if (this.props.url){
			var newURL = this.proxy + this.props.url;
			if (!this.state.url || (this.props.url != this.state.url) ){
				this.setState({url: this.props.url});
				var myjson = this.getHTML(newURL, this.formToJSON);
			} else if (this.state.url && !this.state.formjson){
				var myjson = this.getHTML(newURL, this.formToJSON);
			}
		}
	}
	render () {
		return (
			<div>{ JSON.stringify(this.state.formjson, null, 2) }</div>
		)
	}
}
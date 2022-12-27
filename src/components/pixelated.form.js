/* eslint-disable */

import React, { Component } from "react";
import PropTypes from "prop-types";
import "../css/pixelated.form.css";
import data from "../data/pixelated.form.json";



export class FormEngine extends Component {

	static propTypes = {
		formdata: PropTypes.array
	};

	constructor (props) {
		super(props);
		// this.state = {};
	}

	render () {
		var toHTML = "";
		toHTML += "<form>";
		for (var field in this.props.formdata) {
			var elements = this.props.formdata[field]
			for (var element in elements) {
				var thisElement = elements[element];
				switch(element.toLowerCase()){
					case "label": 
						toHTML += "<label for=" + 
							( thisElement.for != undefined ? thisElement.for : "" ) + ">" + 
							( thisElement.text != undefined ? thisElement.text : "" ) + "</label>" ;
						break;
					case "input":
						toHTML += "<input type=" + 
							( thisElement.type != undefined ? thisElement.type : "" ) + " id=" + 
							( thisElement.id != undefined ? thisElement.id : "" ) + " name=" + 
							( thisElement.name != undefined ? thisElement.name : "" ) + " value=" + 
							( thisElement.value != undefined ? thisElement.value : "" ) + ">";
						if ( thisElement.type != "hidden" ) toHTML += "<br />";
						break;
					case "select":
						toHTML += "<select id=" + 
							( thisElement.id != undefined ? thisElement.id : "" ) + " name=" + 
							( thisElement.name != undefined ? thisElement.name : "" ) + ">";
						toHTML += "<option />";
						for (var option in thisElement.options) {
							var thisOption = thisElement.options[option] ;
							toHTML += "<option value=" + 
								( thisOption.value != undefined ? thisOption.value : "" ) + ">" + 
								( thisOption.text != undefined ? thisOption.text : "" ) + "</option>";
						}
						toHTML += "</select>";
						toHTML += "<br />";
						break;
					case "textarea" :
						toHTML += "<textarea name=" + 
							( thisElement.name != undefined ? thisElement.name : "" ) + " rows=" + 
							( thisElement.rows != undefined ? thisElement.rows : "" ) + " cols=" + 
							( thisElement.cols != undefined ? thisElement.cols : "" ) + ">" + 
							( thisElement.text != undefined ? thisElement.text : "" ) + "</textarea>";
						toHTML += "<br />";
						break;
					case "button" : 
						toHTML += "<br /><button type=" + 
							( thisElement.type != undefined ? thisElement.type : "" ) + " onclick=" + 
							( thisElement.onclick != undefined ? thisElement.onclick : "" ) + ">" + 
							( thisElement.text != undefined ? thisElement.text : "" ) + "</button>";
						toHTML += "<br />";
						break;
					default:
				}
			}
		}
		toHTML += "</form>";
		return ( 
			<div dangerouslySetInnerHTML={{__html: toHTML.trim() }} />
		) // using trim method to remove whitespace
	}
}




export class FormExtractUI extends Component {

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
		this.props.callback(this.state.url);
	};

	render () {
		return (
			<form>
				<label for="url">URL : </label>
				<input type="text" id="url" name="url" size="80" defaultValue={this.state.url} onChange={this.onChange}  />
				<button type="button" onClick={this.onSubmit}>Extract</button>
			</form>
		)
	}
}




export class FormExtract extends Component {

	static propTypes = {
		url: PropTypes.string
	};

	constructor (props) {
		super(props);
		// this.proxy = "https://x3cf4kv0nk.execute-api.us-east-2.amazonaws.com/prod/proxy?url=";
		this.proxy="https://proxy.pixelated.tech/prod/proxy?url=";
		// this.proxy = "https://thingproxy.freeboard.io/fetch/";
		this.state = {
			url :  "",
			formjson : {}
		};
		this.onUpdate = this.onUpdate.bind(this);
	}

	formToJSON(html) {
		var json = [];
		var forms = html.getElementsByTagName("form");
		// ----- FORMS
		for (var form = 0; form < forms.length; form++) {
			var thisForm = forms[form];
			if (Object.keys( thisForm ).length > 0) {
				// ----- ELEMENTS
				for (var element = 0; element < thisForm.elements.length; element++) {
					var elem = {};
					var thisElement = thisForm[element];
					if(thisElement && thisElement.attributes && thisElement.tagName){
						// ----- LABEL
						if(thisElement.attributes["id"] && thisElement.attributes["id"].value) {
							var thisID = thisElement.attributes["id"].value;
							var thisLabel = html.querySelector("label[for=" + thisID + "]");
							if(thisLabel){
								elem["label"] = {};
								// ----- LABEL ATTRIBUTES
								for (var attrib = 0; attrib < thisLabel.attributes.length; attrib++) {
									var thisAttrib = thisLabel.attributes[attrib];
									if(thisAttrib && thisAttrib.name && thisAttrib.value){
										elem["label"][thisAttrib.name] = thisAttrib.value;
									}
								}
								elem["label"]["text"] = (thisLabel.innerText || thisLabel.textContent);
							}
						}
						// ----- ELEMENT ATTRIBUTES
						elem[thisElement.tagName] = {};
						for (var attrib = 0; attrib < thisElement.attributes.length; attrib++) {
							var thisAttrib = thisElement.attributes[attrib];
							if(thisAttrib && thisAttrib.name && thisAttrib.value){
								elem[thisElement.tagName][thisAttrib.name] = thisAttrib.value;
							}
						}
					}
					if ( Object.keys( elem ).length > 0 ) json.push(elem);
				}
			}
		}
		return json;
	}

	getHTML(url, callback){
		const xhr = new XMLHttpRequest();
		xhr.onreadystatechange = (e) => {
			if (xhr.readyState == 4 && xhr.status == 200) {
				var json = callback(xhr.responseXML);
				this.setState({formjson: json});
			}
		};
		xhr.open("GET", url);
		xhr.responseType = "document";
		xhr.send(null);
	}

	onUpdate = (url) => {
		if(url.length > 0){
		var newURL = this.proxy + url;
		this.setState({url: newURL});
		var myjson = this.getHTML(newURL, this.formToJSON);
		} else {
			this.setState({url: ""});
			var myjson = this.getHTML("", this.formToJSON);
		}
	};

	componentDidMount(){
		var myjson = this.getHTML(this.state.url, this.formToJSON);
	}

	render () {
		return (
			<div>{ JSON.stringify(this.state.formjson, null, 2) }</div>
		)
	}
}
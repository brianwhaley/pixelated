
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import * as FC from './pixelated.formcomponents'
import { generateKey, capitalize, attributeMap } from './pixelated.functions'
import '../css/pixelated.form.css'
// import data from '../data/pixelated.form.v2.json'

export class FormEngine extends Component {
	static propTypes = {
		formdata: PropTypes.object.isRequired
	}

	constructor (props) {
		super(props)
		this.state = {}
	}

	render () {
		const newFields = []
		if (this.props.formdata.fields) {
			const fields = this.props.formdata.fields
			for (let field = 0; field < fields.length; field++) {
				const thisField = fields[field]
				const thisProps = thisField.props
				thisProps.key = generateKey()
				const newElement = React.createElement(FC[thisField.component], thisProps)
				newFields.push(newElement)
			}
		}
		return (
			<form>{newFields}</form>
		)
	}
}

export class FormExtractUI extends Component {
	static propTypes = {
		setParentState: PropTypes.func.isRequired
	}

	constructor (props) {
		super(props)
		this.state = {
			url: '',
			html_paste: ''
		}
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	onChange (event) {
		this.setState({ [event.target.name]: event.target.value })
	}

	onSubmit = () => {
		this.props.setParentState(this.state)
	}

	render () {
		return (
			<Fragment>
				<form action="javascript:void(0)" method="post" name="extract">
					<label htmlFor="url">URL : </label>
					<input type="text" id="url" name="url" size="100" onChange={this.onChange} />
					<div style={{ width: '100%', textAlign: 'center' }}>OR</div>
					<label htmlFor="html_paste">HTML : </label>
					<textarea id="html_paste" name="html_paste" rows="10" cols="80" onChange={this.onChange} /><br />
					<div style={{ width: '100%', textAlign: 'center' }}>
						<button type="button" onClick={this.onSubmit}>Extract</button>
						<input type="reset" />
					</div>
				</form>
			</Fragment>
		)
	}
}

export class FormExtract extends Component {
	static propTypes = {
		url: PropTypes.string,
		html_paste: PropTypes.string,
		setFormData: PropTypes.func.isRequired
	}

	constructor (props) {
		super(props)
		this.proxy = 'https://proxy.pixelated.tech/prod/proxy?url='
		// this.proxy = "https://x3cf4kv0nk.execute-api.us-east-2.amazonaws.com/prod/proxy?url=";
		// this.proxy = "https://thingproxy.freeboard.io/fetch/";
		this.state = {
			url: '',
			html_paste: '',
			formjson: null
		}
		this.extractOptions = this.extractOptions.bind(this)
		this.extractSelectedOptions = this.extractSelectedOptions.bind(this)
		this.extractAttribs = this.extractAttribs.bind(this)
		this.extractLabel = this.extractLabel.bind(this)
		this.formToJSON = this.formToJSON.bind(this)
		this.getHTML = this.getHTML.bind(this)
	}

	extractOptions (thisElement) {
		if (thisElement.tagName.toLowerCase() === 'select' && thisElement.options && thisElement.options.length) {
			const options = []
			for (let option = 0; option < thisElement.options.length; option++) {
				const thisOption = thisElement.options[option]
				const attribs = {}
				for (let attrib = 0; attrib < thisOption.attributes.length; attrib++) {
					const thisAttrib = thisOption.attributes[attrib]
					attribs[attributeMap(thisAttrib.name)] = thisAttrib.value
				}
				if (thisOption.innerText) attribs.text = thisOption.innerText
				if (Object.keys(attribs).length > 0) options.push(attribs) // not empty then add
			}
			if (options.length > 0) return options
		}
		return false
	}

	extractSelectedOptions (thisOptions) {
		if (thisOptions && thisOptions.length) {
			const selected = []
			for (let option = 0; option < thisOptions.length; option++) {
				const thisOption = thisOptions[option]
				// eslint-disable-next-line no-prototype-builtins
				if (thisOption.hasOwnProperty('selected')) {
					selected.push(thisOption.value)
					delete thisOptions[option].selected
				}
			}
			// MULTIPLE - Return array
			if (selected.length > 1) return selected
			// Not Multiple = return string
			if (selected.length === 1) return selected.toString()
		}
		return false
	}

	extractAttribs (thisElement) {
		if (thisElement && thisElement.attributes && thisElement.attributes.length) {
			const props = {}
			for (let attrib = 0; attrib < thisElement.attributes.length; attrib++) {
				const thisAttrib = thisElement.attributes[attrib]
				if (thisAttrib.name === 'style') {
					// Do not gather styles
				} else if (['disabled', 'multiple', 'readonly', 'required', 'selected'].indexOf(thisAttrib.name.toLowerCase()) > -1) {
					// Flag type Attributes
					props[attributeMap(thisAttrib.name)] = attributeMap(thisAttrib.name)
				} else if (thisAttrib && thisAttrib.name && thisAttrib.value) {
					// use attributeMap to map html props to React props
					props[attributeMap(thisAttrib.name)] = thisAttrib.value
				}
			}
			if (Object.keys(props).length > 0) return props
		}
		return false
	}

	extractLabel (html, thisElement) {
		if (thisElement.attributes.id && thisElement.attributes.id.value) {
			const thisID = thisElement.attributes.id.value
			const thisLabel = html.querySelector("label[for='" + thisID + "']")
			if (thisLabel) return thisLabel
		}
		return false
	}

	formToJSON (html) {
		const json = {}
		json.fields = []
		const forms = html.getElementsByTagName('form')
		// ----- FORMS
		for (let form = 0; form < forms.length; form++) {
			const thisForm = forms[form]
			if (Object.keys(thisForm).length > 0) {
				// ----- ELEMENTS
				for (let element = 0; element < thisForm.elements.length; element++) {
					const thisElement = thisForm[element]
					const elem = {}
					if (thisElement && thisElement.attributes && thisElement.tagName) {
						// ----- COMPONENT
						elem.component = 'Form' + capitalize(thisElement.tagName)
						let props = {}
						// ----- ELEMENT ATTRIBUTES
						const thisProps = this.extractAttribs(thisElement)
						if (thisProps) props = thisProps
						// ----- ELEMENT OPTIONS
						const thisOptions = this.extractOptions(thisElement)
						if (thisOptions) {
							// only true for SELECT elements
							const thisSelected = this.extractSelectedOptions(thisOptions)
							if (thisSelected) props.defaultValue = thisSelected
							props.options = thisOptions
						} else {
							// get innerText on all but SELECT elements
							if (thisElement.innerText) props.text = thisElement.innerText
						}
						elem.props = props
						// ----- LABEL
						const thisLabel = this.extractLabel(html, thisElement)
						if (thisLabel) {
							elem.props.label = (thisLabel.innerText || thisLabel.textContent)
						}
					}
					if (Object.keys(elem).length > 0) json.fields.push(elem)
				}
			}
		}
		console.log(json)
		return json
	}

	getHTML (url, callback) {
		// eslint-disable-next-line no-undef
		const xhr = new XMLHttpRequest()
		xhr.onreadystatechange = (e) => {
			if (xhr.readyState === 4 && xhr.status === 200) {
				const json = callback(xhr.responseXML)
				console.log(xhr.responseXML)
				this.setState({ formjson: json })
				this.props.setFormData(json)
			}
		}
		xhr.open('GET', url)
		xhr.responseType = 'document'
		xhr.send(null)
	}

	componentDidMount () {
	}

	componentDidUpdate () {
		if (this.props.url) {
			const newURL = this.proxy + this.props.url
			if (!this.state.url || (this.props.url !== this.state.url)) {
				this.setState({ url: this.props.url })
				this.getHTML(newURL, this.formToJSON)
			} else if (this.state.url && !this.state.formjson) {
				this.getHTML(newURL, this.formToJSON)
			}
		} else if (this.props.html_paste) {
			let json = ''
			if (!this.state.html_paste || (this.props.html_paste !== this.state.html_paste)) {
				this.setState({ html_paste: this.props.html_paste })
				const thisHTML = new DOMParser().parseFromString(this.props.html_paste, 'text/html')
				json = this.formToJSON(thisHTML)
				console.log(json)
				this.setState({ formjson: json })
				this.props.setFormData(json)
			} else if (this.state.html_paste && !this.state.formjson) {
				const thisHTML = new DOMParser().parseFromString(this.state.html_paste, 'text/html')
				json = this.formToJSON(thisHTML)
				console.log(json)
				this.setState({ formjson: json })
				this.props.setFormData(json)
			}
		}
	}

	render () {
		return (
			<div>{ JSON.stringify(this.state.formjson, null, 2) }</div>
		)
	}
}

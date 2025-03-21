import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import * as FC from './pixelated.formcomponents'
import * as FV from './pixelated.formvalidations'
import { generateKey, capitalize, attributeMap } from '../utilities/pixelated.functions'
import './pixelated.form.css'
// import data from './pixelated.form.json'

export class FormBuilder extends Component {
	constructor (props) {
		super(props)
		this.state = {
			url: '',
			html_paste: '',
			formdata: {},
			fieldformdata: {}
		}
		this.appendFormData = this.appendFormData.bind(this)
		this.setFieldFormData = this.setFieldFormData.bind(this)
	}

	setFieldFormData = (json) => {
		// UPDATE STATE WITH JSON USED TO CREATE FIELD PROPERTIES - EXPOSED EXTERNAL
		this.setState({ fieldformdata: json })
	}

	appendFormData (event) {
		// APPEND JSON FOR NEW FIELD TO EXISTING JSON CONFIG OBJECT - EXPOSED EXTERNAL
		const field = {}
		field.component = 'FormInput' // TO DO ; HARD CODED - FIX THIS
		const props = {}
		for (const prop in event.target) {
			const thisProp = event.target[prop]
			if (thisProp && thisProp.value) { props[thisProp.name] = thisProp.value }
		}
		field.props = props
		let fields = []
		if (Object.keys(this.state.formdata).length > 0) { fields = JSON.parse(JSON.stringify(this.state.formdata.fields)) }
		fields[fields.length] = field
		this.setState({ formdata: { fields } })
		return (field)
	}

	render () {
		return (
			<div className="section-container">
				<div style={{ display: 'inline-block', verticalAlign: 'top' }}>
					<FormBuild setFormData={this.setFieldFormData} />
				</div>
				<div style={{ display: 'inline-block', verticalAlign: 'top' }}>
					<FormEngine name="field_props" id="field_props"
						onSubmitHandler={this.appendFormData}
						formdata={this.state.fieldformdata} />
				</div>
				<div style={{ display: 'inline-block', verticalAlign: 'top' }} >
					<pre style={{ width: '100%' }} >{ JSON.stringify(this.state.formdata, null, 2) }</pre>
				</div>
				<div><br /><br /><hr /><br /><br /></div>
				<div style={{ display: 'block', verticalAlign: 'top' }}>
					<FormEngine formdata={this.state.formdata} />
				</div>
			</div>
		)
	}
}

export class FormExtractor extends Component {
	static propTypes = {
		url: PropTypes.string
	}

	constructor (props) {
		super(props)
		this.state = {
			url: '',
			formdata: {}
		}
		this.setParentState = this.setParentState.bind(this)
		this.setFormData = this.setFormData.bind(this)
	}

	setParentState = (parentState) => {
		// SET STATE FROM PARENT VALUES - EXPOSED EXTERNAL
		this.setState({ url: parentState.url })
		this.setState({ html_paste: parentState.html_paste })
	}

	setFormData = (json) => {
		// SET STATE WITH JSON TO RENDER THE FORM - EXPOSED EXTERNAL
		this.setState({ formdata: json })
	}

	render () {
		return (
			<div>
				<div className="section-container">
					<FormExtractUI setParentState={this.setParentState} />
				</div>

				<div className="section-container">
					<br /><br /><hr /><br /><br />
				</div>

				<div className="section-container">
					<FormExtractEngine url={this.state.url} html_paste={this.state.html_paste} setFormData={this.setFormData} />
				</div>

				<div className="section-container">
					<br /><br /><hr /><br /><br />
				</div>

				<div className="section-container">
					<FormEngine formdata={this.state.formdata} />
				</div>
			</div>
		)
	}
}

export class FormEngine extends Component {
	static propTypes = {
		name: PropTypes.string,
		id: PropTypes.string,
		method: PropTypes.string,
		onSubmitHandler: PropTypes.func,
		formdata: PropTypes.object.isRequired
	}

	constructor (props) {
		super(props)
		this.state = {}
		this.generateFormProps = this.generateFormProps.bind(this)
		this.generateNewFields = this.generateNewFields.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	generateFormProps = () => {
		// GENERATE PROPS TO RENDER THE FORM CONTAINER, INTERNAL FUNCTION
		const formProps = JSON.parse(JSON.stringify(this.props));
		['formdata', 'onSubmitHandler'].forEach(e => delete formProps[e])
		return formProps
	}

	generateNewFields () {
		// CORE OF THE FORM ENGINE - CONVERT JSON TO COMPONENTS - INTERNAL
		const newFields = []
		if (this.props.formdata && this.props.formdata.fields) {
			const thisFields = this.props.formdata.fields
			for (let field = 0; field < thisFields.length; field++) {
				const thisField = thisFields[field]
				const newProps = JSON.parse(JSON.stringify(thisField.props))
				newProps.key = generateKey()
				const newElement = React.createElement(FC[thisField.component], newProps)
				newFields.push(newElement)
			}
		}
		return newFields
	}

	handleSubmit = (e) => {
		// HANDLES THE FORM ACTION / FORM SUBMIT - EXPOSED EXTERNAL
		e.preventDefault()
		if (this.props.onSubmitHandler) this.props.onSubmitHandler(e)
		return true
	}

	render () {
		return (
			<form {...this.generateFormProps()} onSubmit={(e) => { this.handleSubmit(e) }} >{this.generateNewFields()}</form>
		)
	}
}

export class FormBuild extends Component {
	static propTypes = {
		setFormData: PropTypes.func
	}

	constructor (props) {
		super(props)
		this.state = {
		}
		this.addComponent = this.addComponent.bind(this)
	}

	generateFieldJSON (component) {
		// GENERATE THE JSON TO DISPLAY A FORM TO ADD A FIELD - INTERNAL
		const form = { fields: [] }
		let i = 0
		for (const prop in FC[component].propTypes) {
			const field = {}
			field.component = 'FormInput'
			const props = {}
			props.label = prop
			props.name = prop
			props.id = prop
			props.type = 'text'
			if (prop === 'type') props.list = 'inputTypes'
			field.props = props
			form.fields[i] = field
			i++
		}
		const addButton = {
			component: 'FormButton',
			props: {
				label: 'Add ' + component,
				type: 'submit',
				id: 'Add ' + component,
				text: 'Add ' + component
			}
		}
		form.fields[i] = addButton
		return (form)
	}

	addComponent (component) {
		// GENERATE THE JSON TO DISPLAY A FORM TO ADD A FIELD - EXTERNAL
		const fieldJSON = this.generateFieldJSON(component)
		this.props.setFormData(fieldJSON)
		return true
	}

	generateComponentButtons () {
		// GENERATES THE COMPENENT BUTTONS FORM TO ADD NEW FIELDS - INTERNAL
		const components = []
		for (const component in Object.keys(FC)) {
			const thisComponent = Object.keys(FC)[component]
			const newComponent = <button key={thisComponent} style={{ display: 'block', width: 200 }} onClick={ () => this.addComponent(thisComponent)}>{thisComponent}</button>
			components.push(newComponent)
		}
		return components
	}

	render () {
		return (
			<Fragment>
				<form onSubmit={ e => { e.preventDefault() } } method="post" name="build" id="build">
					{ this.generateComponentButtons() }
				</form>
			</Fragment>
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
		// UPDATE URL OR HTML_PASTE ON CHANGE - EXTERNAL
		this.setState({ [event.target.name]: event.target.value })
	}

	onSubmit = () => {
		// SET PARENT STATE WITH URL OR HTML PASTE - EXTERNAL
		this.props.setParentState(this.state)
	}

	render () {
		return (
			<form onSubmit={ e => { e.preventDefault() } } method="post" name="extract">
				<label htmlFor="url">URL : </label>
				<input type="text" list="form_urls" id="url" name="url" size="100" onChange={this.onChange} />
				<FC.FormDataList id='form_urls' items={FV.formURLs} />
				<div style={{ width: '100%', textAlign: 'center' }}>OR</div>
				<label htmlFor="html_paste">HTML : </label>
				<textarea id="html_paste" name="html_paste" rows="10" cols="80" onChange={this.onChange} /><br />
				<div style={{ width: '100%', textAlign: 'center' }}>
					<button type="button" onClick={this.onSubmit}>Extract</button>
					<input type="reset" />
				</div>
			</form>
		)
	}
}

export class FormExtractEngine extends Component {
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
		// GENERATE OPTIONS FOR SELECT FIELD - INTERNAL
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
		// GENERATE LIST OF SELECTED OPTIONS FOR SELECT FIELD - INTERNAL
		if (thisOptions && thisOptions.length) {
			const selected = []
			for (let option = 0; option < thisOptions.length; option++) {
				const thisOption = thisOptions[option]
				 
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
		// EXTRACT ALL ATTRIBUTES FOR A FORM ELEMENT - INTERNAL
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
		// IDENTIFY AND EXTRACT LABEL PROPERTIES FOR A SPECIFIC FIELD - INTERNAL
		if (thisElement.attributes.id && thisElement.attributes.id.value) {
			const thisID = thisElement.attributes.id.value
			const thisLabel = html.querySelector("label[for='" + thisID + "']")
			if (thisLabel) return thisLabel
		}
		return false
	}

	formToJSON (html) {
		// CONVERT HTML TO CONFIG JSON - INTERNAL
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
		return json
	}

	getHTML (url, callback) {
		// GET SERVER SIDE HTML THROUGH XMLHTTPREQUEST - INTERNAL
		 
		const xhr = new XMLHttpRequest()
		// xhr.onreadystatechange = (e) => {
		xhr.onreadystatechange = () => {
				if (xhr.readyState === 4 && xhr.status === 200) {
				const json = callback(xhr.responseXML)
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
				this.setState({ formjson: json })
				this.props.setFormData(json)
			} else if (this.state.html_paste && !this.state.formjson) {
				const thisHTML = new DOMParser().parseFromString(this.state.html_paste, 'text/html')
				json = this.formToJSON(thisHTML)
				this.setState({ formjson: json })
				this.props.setFormData(json)
			}
		}
	}

	render () {
		return (
			<div>
				<pre id='formjson'>{ JSON.stringify(this.state.formjson, null, 2) }</pre>
			</div>
		)
	}
}

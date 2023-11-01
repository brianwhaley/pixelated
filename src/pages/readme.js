import React, { Component } from "react";
import { Markdown } from "@brianwhaley/pixelated-components";
// import mdfile from '../data/readme.md';

export default class Readme extends Component {
	constructor(props) {
		super(props)
		this.state = { 
			readmeText: '' 
		}
	}

	async componentDidMount() {
		const filePath = '../data/readme.md'
		await fetch(filePath)
			.then ( ( async (response) => await response.text() ) )
			.then ( (text) => {
				this.setState({ readmeText: text })
			})
	}

	render() {
		return (
			<div className="section-container">
				<Markdown markdowndata={this.state.readmeText} />
			</div>
		)
	}
}

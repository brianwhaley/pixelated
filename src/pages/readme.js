import React, { Component } from "react";
import { Markdown } from "@brianwhaley/pixelated-components";

export default class Readme extends Component {
	constructor(props) {
		super(props)
		this.state = { 
			readmeText: '' 
		}
	}
	componentDidMount() {
		const filePath = '/data/readme.md'
		fetch(filePath).then((response) => response.text()).then((text) => {
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

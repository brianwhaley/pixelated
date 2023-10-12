import React, { Component } from "react";
import { Markdown } from "@brianwhaley/pixelated-components";

export default class Readme extends Component {
	constructor(props) {
		super(props)
		this.state = { 
			readmeText: '' 
		}
	}
	/*
	componentDidMount() {
		const filePath = '/data/readme.md'
		fetch(filePath).then((response) => response.text()).then((text) => {
			console.log(text);
			this.setState({ readmeText: text })
		})
	}
	*/
	async componentDidMount() {
		console.log("ComponentDidMount");
		const file = await import('../data/readme.md');
		console.log(file);
		const response = await fetch(file.default);
		console.log(response);
		const text = await response.text();
		console.log(text);
		this.setState({
			readmeText: text
		})
		console.log(this.state.readmeText);
	}
	render() {
		return (
			<div className="section-container">
				<Markdown markdowndata={this.state.readmeText} />
			</div>
		)
	}
}

/* eslint-disable */

import React, { Component } from "react";
import { markdownParser } from "./pixelated.markdown";
import "./pixelated.markdown.css";
import ReadmeData from "../data/readme.md";

export default class Readme extends Component {

	constructor(props) {
		super(props);
		this.state = { markdown: '' };
	}

	UNSAFE_componentWillMount() {  
		fetch(ReadmeData)
			.then(response => { return response.text(); })
			.then(text => { this.setState({ markdown: text }); })
			.catch(err => console.log(err));
	}

	render () {
		return (
			<div className="section-container">
				<div className = "markdown" dangerouslySetInnerHTML={{__html: markdownParser(this.state.markdown) }} />
			</div>
		);
	}
}

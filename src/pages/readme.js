import React, { Component } from "react";
import { Markdown } from "@brianwhaley/pixelated-components/dist/index";
import data from "../data/readme.md";

export default class Readme extends Component {

	render () {
		console.log(data);
		return (
			<div className="section-container">
				<Markdown markdowndata={data} />
			</div>
		);
	}
}

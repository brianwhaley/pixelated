import React, { Component } from "react";

import { FormEngine } from "@brianwhaley/pixelated-components/dist/index";
import "@brianwhaley/pixelated-components/dist/css/pixelated.form.css";

import data from "../data/pixelated.form.json";

export default class Form extends Component {
	render() {
		return (
			<div className="section-container">
				<FormEngine formdata={data} />
			</div>
		);
	}
}

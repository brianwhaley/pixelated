import React, { Component } from "react";
import { FormBuilder } from "@brianwhaley/pixelated-components/dist/index";
import "@brianwhaley/pixelated-components/dist/css/pixelated.form.css";

export default class FormBuildv1 extends Component {
	constructor (props) {
		super(props);
		this.state = {
		};
	}
	render() {
		return (
			<FormBuilder />
		);
	}
}

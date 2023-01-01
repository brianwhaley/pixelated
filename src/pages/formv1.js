import React, { Component } from "react";

import { FormEngine_v1 } from "@brianwhaley/pixelated-components/dist/index";
import "@brianwhaley/pixelated-components/dist/css/pixelated.form.css";

import data from "../data/pixelated.form.v1.json";

export default class Formv1 extends Component {
	render() {
		return (
			<div className="section-container">
				<FormEngine_v1 formdata={data} />
			</div>
		);
	}
}

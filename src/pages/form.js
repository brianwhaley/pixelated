import React, { Component } from "react";
import { FormEngine } from "@brianwhaley/pixelated-components";

import data from "../data/pixelated.form.json";

export default class Formv2 extends Component {
	render() {
		return (
			<div className="section-container">
				<FormEngine formdata={data} />
			</div>
		);
	}
}

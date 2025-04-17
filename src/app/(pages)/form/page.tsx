"use client";

import React from "react";
import { FormEngine } from "@brianwhaley/pixelated-components";
import data from "@/app/data/form.json";

export default function Formv2() {
	function onSubmit(){
		alert("Hooray!  Submitted!");
	}
	return (
		<div className="section-container">
			<FormEngine formData={data} onSubmitHandler={onSubmit} />
		</div>
	);
}

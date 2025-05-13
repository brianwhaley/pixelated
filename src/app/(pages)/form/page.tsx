"use client";

import React from "react";
import { PageHeader } from "@/app/components/general/pixelated.general";
import { FormEngine } from "@brianwhaley/pixelated-components";
import data from "@/app/data/form.json";

export default function Formv2() {
	function onSubmit(){
		alert("Hooray!  Submitted!");
	}
	return (
		<div className="section-container">
			<PageHeader title="Form Engine" />
			<FormEngine formData={data} onSubmitHandler={onSubmit} />
		</div>
	);
}

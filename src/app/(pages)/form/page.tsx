"use client";

import React from "react";
import { PageTitleHeader } from "@pixelated-tech/components";
import { FormEngine } from "@pixelated-tech/components";
import data from "@/app/data/form.json";

export default function Formv2() {
	function onSubmit(){
		alert("Hooray!  Submitted!");
	}
	return (
		<div className="section-container">
			<PageTitleHeader title="Form Engine" />
			<FormEngine formData={data} onSubmitHandler={onSubmit} />
		</div>
	);
}

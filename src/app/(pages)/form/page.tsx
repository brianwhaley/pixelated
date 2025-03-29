"use client";

import React from "react";
import { FormEngine } from "@/app/components/form/pixelated.form";
import data from "@/app/data/form.json";

export default function Formv2() {
	return (
		<div className="section-container">
			<FormEngine formdata={data} />
		</div>
	);
}

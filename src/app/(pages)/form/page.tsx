"use client";

import React from "react";
import { FormEngine } from "@brianwhaley/pixelated-components";
import data from "@/app/data/form.json";

export default function Formv2() {
	return (
		<div className="section-container">
			<FormEngine formdata={data} />
		</div>
	);
}

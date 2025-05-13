"use client";

import React from "react";
import { PageHeader } from "@/app/components/general/pixelated.general";
import { FormBuilder } from "@brianwhaley/pixelated-components";

export default function FormBuild() {
	return (
		<>
			<PageHeader title="Form Builer" />
			<FormBuilder />
		</>
		
	);
}

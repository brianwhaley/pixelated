"use client";

import React from "react";
import { PageHeader } from "@/app/components/general/pixelated.general";
import { FormExtractor } from "@brianwhaley/pixelated-components";

export default function FormExtract() {
	return (
		<>
			<PageHeader title="Form Extractor" />
			<FormExtractor />
		</>
	);
}

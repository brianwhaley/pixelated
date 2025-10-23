"use client";

import React from "react";
import { PageHeader } from "@brianwhaley/pixelated-components";
import { FormExtractor } from "@brianwhaley/pixelated-components";

export default function FormExtract() {
	return (
		<>
			<PageHeader title="Form Extractor" />
			<FormExtractor url={''} />
		</>
	);
}

"use client";

import React from "react";
import { PageHeader } from "@pixelated-tech/components";
import { FormExtractor } from "@pixelated-tech/components";

export default function FormExtract() {
	return (
		<>
			<PageHeader title="Form Extractor" />
			<FormExtractor url={''} />
		</>
	);
}

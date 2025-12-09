"use client";

import React from "react";
import { PageTitleHeader } from "@pixelated-tech/components";
import { FormExtractor } from "@pixelated-tech/components";

export default function FormExtract() {
	return (
		<>
			<PageTitleHeader title="Form Extractor" />
			<FormExtractor url={''} />
		</>
	);
}

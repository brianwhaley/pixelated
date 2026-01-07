"use client";

import React from "react";
import { PageSection, PageTitleHeader } from '@pixelated-tech/components';
import Terms from "@/app/elements/terms";
import Privacy from "@/app/elements/privacy";

export default function Legal() {
	return (
		<>
			<PageTitleHeader title="Legal Information" />
			<PageSection columns={1} id="terms-section">
				<Terms />
			</PageSection>

			<PageSection columns={1} id="privacy-section">
				<Privacy />
			</PageSection>

		</>
	);
}

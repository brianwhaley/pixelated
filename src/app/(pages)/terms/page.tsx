"use client";

import React, { Fragment } from "react";
import { PageSection } from '@pixelated-tech/components';
import Terms from "@/app/elements/terms";

export default function TOS() {
	return (
		<Fragment>
			
			<PageSection columns={1} id="terms-section">
				<Terms />
			</PageSection>
		</Fragment>
	);
}

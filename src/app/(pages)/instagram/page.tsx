"use client";

import React from "react";
import Script from "next/script";
import { PageSection, PageTitleHeader } from '@pixelated-tech/components';

export default function Instagram() {
	return (
		<>
			<PageTitleHeader title="Instagram Feed" />
			<PageSection columns={1} id="instagram-section">
				<div id="curator-feed-default-feed-layout" />
				<Script
					src="https://cdn.curator.io/published/a997f463-40a0-49e8-9f34-3de237b3fc5b.js"
					strategy="afterInteractive"
				/>
			</PageSection>
		</>
	);
}

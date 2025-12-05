/* eslint-disable @next/next/no-css-tags */
 
"use client";

import React from 'react';
import { PageHeader } from "@pixelated-tech/components";
import { PageSection, GridItem } from "@pixelated-tech/components";
import "./page.css";

export default function ByTheWay() {
	
	return ( 
		<>
			<link rel="stylesheet" href="/fonts/bytheway/bytheway.css" />

			<PageHeader title="By The Way - Font Sample" />
			<PageSection columns={12} id="portfolio-section">
				<GridItem columnStart={3} columnEnd={11}>
					<p className="btw">By The Way Regular<br />The quick brown fox jumps over the lazy dog.</p>
					<p className="btw-bd">By The Way Bold<br />The quick brown fox jumps over the lazy dog.</p>
					<p className="btw-bd-smcp">By The Way Bold SmallCaps<br />The quick brown fox jumps over the lazy dog.</p>
					<p className="btw-smcp">By The Way SmallCaps<br />The quick brown fox jumps over the lazy dog.</p>

					<p className="btw-nw">By The Way Narrow<br />The quick brown fox jumps over the lazy dog.</p>
					<p className="btw-nw-bd">By The Way Narrow Bold<br />The quick brown fox jumps over the lazy dog.</p>
					<p className="btw-nw-bd-smcp">By The Way Narrow Bold SmallCaps<br />The quick brown fox jumps over the lazy dog.</p>
					<p className="btw-nw-smcp">By The Way Narrow SmallCaps<br />The quick brown fox jumps over the lazy dog.</p>
				</GridItem>
			</PageSection>
		</>
	);
    
}

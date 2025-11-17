/* eslint-disable @next/next/no-css-tags */
 
"use client";

import React from 'react';
import { PageHeader } from "@brianwhaley/pixelated-components";
import "./page.css";

export default function ByTheWay() {
	
	return ( 
		<>
			<link rel="stylesheet" href="/fonts/bytheway/bytheway.css" />

			<section id="portfolio-section">
				<div className='section-container'>
					<PageHeader title="By The Way - Font Sample" />
					<div className="row-12col">
						<div className="grid-s3-e8"> 
							<p className="btw">By The Way Regular<br />The quick brown fox jumps over the lazy dog.</p>
							<p className="btw-bd">By The Way Bold<br />The quick brown fox jumps over the lazy dog.</p>
							<p className="btw-bd-smcp">By The Way Bold SmallCaps<br />The quick brown fox jumps over the lazy dog.</p>
							<p className="btw-smcp">By The Way SmallCaps<br />The quick brown fox jumps over the lazy dog.</p>

							<p className="btw-nw">By The Way Narrow<br />The quick brown fox jumps over the lazy dog.</p>
							<p className="btw-nw-bd">By The Way Narrow Bold<br />The quick brown fox jumps over the lazy dog.</p>
							<p className="btw-nw-bd-smcp">By The Way Narrow Bold SmallCaps<br />The quick brown fox jumps over the lazy dog.</p>
							<p className="btw-nw-smcp">By The Way Narrow SmallCaps<br />The quick brown fox jumps over the lazy dog.</p>
						</div>
					</div>
				</div>
			</section>
		</>
	);
    
}

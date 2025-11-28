
"use client";

import React from "react";
import Social from "@/app/elements/social";
import Nav from "@/app/elements/nav";

export default function Header() {
	return (
		<div className="section-container">

			<div className="row-10col">
				<div className="grid-s1-e3 headerLogo">
					<a href="/"><img src="/images/palmetto-epoxy-logo.jpg" alt="Palmetto Epoxy Logo" fetchPriority="high" loading="eager" /></a>
				</div>
				

				<div className="grid-s3-e10 headerRight">

					<div className="row-1col">
						
						<div className="gridItem headerAddress">
							<h3>Dennis and Martha Aberle</h3>
							<h3>Bluffton, SC</h3>
							<h3>palmettoepoxy@gmail.com</h3>
							<h3>Tel : 516-510-8186</h3>
							<br />
						</div>

						<div className="gridItem headerSocial centered">
							<Social />
						</div>

					</div>

				</div>

			</div>

			<div>
				<Nav />
			</div>
			
		</div>
	);
}

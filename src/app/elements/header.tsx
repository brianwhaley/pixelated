/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Social from "@/app/elements/social";
import Nav from "@/app/elements/nav";

export default function Header() {
	return (
		<div className="section-container">
			<div className="row-12col">
				<div className="grid-s1-e3 headerLogo">
					<a href="/"><img src="/images/palmetto-epoxy-logo.jpg" alt="Palmetto Epoxy Logo" /></a>
				</div>
				<div className="grid-s4-e9 headerRight">
					<div className="row-12col">
						<div className="grid-s1-e5 centered">
							<h3>Dennis and Martha Aberle</h3>
							<h3>Bluffton, SC</h3>
							<h3>palmettoepoxy@gmail.com</h3>
							<h3>Tel : 516-510-8186</h3>
							<br />
						</div>
						<div className="grid-s6-e7 centered">
							<Social />
						</div>
					</div>
					<div>
						<Nav />
					</div>
				</div>
			</div>
			
		</div>
	);
}

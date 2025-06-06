"use client";

import React from "react";

export default function PageTitle(params: {title?: string}) {
	return (
		<>
			<br />
      		<section className="section-bwchip textOutline" id="page-title-section">
				<h1>{params.title}</h1>
			</section>
		</>
	);
}

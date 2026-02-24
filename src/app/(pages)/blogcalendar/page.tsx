"use client";

import React, { useEffect, useState } from "react";
import { PageSection } from "@pixelated-tech/components";
import { Markdown } from "@pixelated-tech/components";
const filePath = '/data/blogcalendar.md';

export default function BlogCalendar() {
	const [readmeText, setReadmeText] = useState('');
	useEffect(() => {
		const fetchMarkdown = async () => { 
			const response = await fetch(filePath);
			const markdownText = await response.text();
			setReadmeText(markdownText);
		};
		fetchMarkdown();
	}, []); 
	return (
		<PageSection columns={1} id="markdown-container">
			<Markdown markdowndata={readmeText} />
		</PageSection>
	);
}

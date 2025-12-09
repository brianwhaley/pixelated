"use client";

import { PageTitleHeader, PageSection } from "@pixelated-tech/components";

export default function Home() {
    
	return (
		<>
			<PageTitleHeader title="Style Guide - Pixelated Technologies" />

			<PageSection columns={1} maxWidth="1024px" padding="20px" id="colors-section">
				<h2>Color Palette</h2>
				<div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
					<div style={{ backgroundColor: 'var(--primary-color)', color: '#fff' }} className="colorSwatch">Primary Color</div>
					<div style={{ backgroundColor: 'var(--secondary-color)' }} className="colorSwatch">Secondary Color</div>
					<div style={{ backgroundColor: 'var(--accent1-color)' }} className="colorSwatch">Accent 1 Color</div>
					<div style={{ backgroundColor: 'var(--accent2-color)' }} className="colorSwatch">Accent 2 Color</div>
					<div style={{ backgroundColor: 'var(--bg-color)' }} className="colorSwatch">Background Color</div>
					<div style={{ backgroundColor: 'var(--text-color)' }} className="colorSwatch">Text Color</div>
				</div>
			</PageSection>

			<style jsx>{`
			.colorSwatch {
				color: #000; 
				border: 1px solid #ccc; 
				padding: 10px; 
				flex: 1 0 150px; 
				text-align: center;
				align-items: center;
				justify-content: center;
				display: flex;
			}
			`}</style>

			<PageSection columns={1} maxWidth="1024px" padding="20px" id="fonts-section">
				<h1>H1 - Montserrat Font</h1>
				<h2>H2 - Montserrat Font</h2>
				<h3>H3 - Montserrat Font</h3>
				<h4>H4 - Montserrat Font</h4>
				<h5>H5 - Montserrat Font</h5>
				<h6>H6 - Montserrat Font</h6>
				<p>Roboto Font.  This is a paragraph of text to demonstrate the body font style. </p>
				<p>Montserrat Font.  The quick brown fox jumps over the lazy dog. </p>
				<p>Montserrat Font.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
			</PageSection>

			<PageSection columns={1} maxWidth="1024px" padding="20px" id="fonts-section">
				<h2>Information Architecture</h2>
				<ul>
					<li>Home</li>
					<li>Our Process</li>
					<li>Portfolio</li>
					<li>Blog</li>
					<li>Schedule Assessment</li>
					<li>Terms</li>
					<li>Privacy Policy</li>
				</ul>
			</PageSection>

		</>
	);
}

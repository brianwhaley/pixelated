import React from 'react';
import { generateGoogleFontsUrl } from './google-fonts';

export function VisualDesignStyles({ visualdesign }: { visualdesign?: Record<string, any> }) {
	const tokens = visualdesign || {};

	const resolveValue = (v: any) => (v && typeof v === 'object' && 'value' in v) ? v.value : v;

	const varLines: string[] = [];
	// Always include base font sizing first (from pixelated.visualdesign.scss)
	varLines.push(
		'--font-size1-min: 2.00rem;',
		'--font-size1-max: 3.00rem;',
		'--font-size2-min: 1.35rem;',
		'--font-size2-max: 1.75rem;',
		'--font-size3-min: 1.17rem;',
		'--font-size3-max: 1.35rem;',
		'--font-size4-min: 1.00rem;',
		'--font-size4-max: 1.25rem;',
		'--font-size5-min: 0.83rem;',
		'--font-size5-max: 1.00rem;',
		'--font-size6-min: 0.67rem;',
		'--font-size6-max: 0.85rem;',
		'--font-min-screen: 375px;',
		'--font-max-screen: 1440px;'
	);

	for (const [key, val] of Object.entries(tokens)) {
		const value = resolveValue(val);
		if (value === undefined || value === null) continue;

		// Handle font family construction from 3-field structure (legacy)
		if (key.endsWith('-primary')) {
			const baseKey = key.replace('-primary', '');
			const primary = value;
			const fallback = resolveValue(tokens[`${baseKey}-fallback`]);
			const generic = resolveValue(tokens[`${baseKey}-generic`]);

			// Build font stack: "Primary Font", Fallback, generic
			const fontStack = [primary, fallback, generic].filter(Boolean).map(f => `"${f}"`).join(', ');
			varLines.push(`--${baseKey}-family: ${fontStack};`);
		} else if (key === 'header-font' || key === 'body-font') {
			// Handle compound font values (new format)
			varLines.push(`--${key}: ${value};`);
		} else if (!key.endsWith('-fallback') && !key.endsWith('-generic')) {
			// Skip fallback and generic fields as they're handled above
			varLines.push(`--${key}: ${value};`);
		}
	}

	const fontLines: string[] = [];
	// Generate clamp calculations for font sizes
	for (let i = 1; i <= 6; i++) {
		varLines.push(
			`--font-size${i}: clamp(var(--font-size${i}-min), calc(var(--font-size${i}-min) + ((var(--font-size${i}-max) - var(--font-size${i}-min)) * ((100vw - var(--font-min-screen)) / (var(--font-max-screen) - var(--font-min-screen))))), var(--font-size${i}-max));`
		);
	}

	// Generate h1-h6 font-size rules
	for (let i = 1; i <= 6; i++) {
		fontLines.push(`h${i} { font-size: var(--font-size${i}); }`);
	}

	const css = [
		':root {',
		...varLines.map(l => `  ${l}`),
		'}',
		'',
		'/* Base visual design styles */',
		'body {',
		'  background-color: var(--bg-color) !important;',
		'  color: var(--text-color);',
		'  font-family: var(--body-font);',
		'}',
		'h1, h2, h3, h4, h5, h6 {',
		'  line-height: 1.1;',
		'  font-family: var(--header-font);',
		'}',
		'html { font-size: 1.0rem; /* 16px; */ }',
		'',
		...fontLines
	].join('\n');

	return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

/**
 * Component to handle Google Fonts imports - should be used in the document head
 */
export function GoogleFontsImports({ visualdesign }: { visualdesign?: Record<string, any> }) {
	const tokens = visualdesign || {};
	const fonts: string[] = [];

	// Extract Google font names from the new 3-field font structure
	for (const [key, val] of Object.entries(tokens)) {
		if (key.endsWith('-primary') && typeof val === 'string' && val.trim()) {
			// Only include fonts that are not web-safe (web-safe fonts don't need Google Fonts import)
			const webSafeFonts = ['Arial', 'Helvetica', 'Times New Roman', 'Times', 'Courier New', 'Courier', 'Georgia', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS', 'Trebuchet MS', 'Arial Black', 'Impact', 'Lucida Sans Unicode', 'Lucida Grande', 'MS Sans Serif', 'MS Serif', 'New York', 'System', 'Apple System', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'];
			if (!webSafeFonts.includes(val.trim())) {
				fonts.push(val.trim());
			}
		}
	}

	const googleFontsUrl = generateGoogleFontsUrl(fonts);
	if (!googleFontsUrl) return null;

	return (
		<>
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
			<link href={googleFontsUrl} rel="stylesheet" />
		</>
	);
}

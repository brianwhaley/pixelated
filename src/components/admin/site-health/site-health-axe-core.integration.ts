"use server";

import puppeteer from 'puppeteer';

/**
 * Axe-Core Accessibility Analysis Integration Services
 * Server-side utilities for performing comprehensive accessibility analysis on websites
 * Note: This makes external HTTP requests and should only be used server-side
 */

interface AxeNode {
  target: string[];
  html: string;
  failureSummary?: string;
  ancestry?: string[];
}

interface AxeViolation {
  id: string;
  impact: 'minor' | 'moderate' | 'serious' | 'critical';
  description: string;
  help: string;
  helpUrl: string;
  nodes: AxeNode[];
  tags: string[];
}

interface AxeResult {
  violations: AxeViolation[];
  passes: AxeViolation[];
  incomplete: AxeViolation[];
  inapplicable: AxeViolation[];
  testEngine: {
    name: string;
    version: string;
  };
  testRunner: {
    name: string;
  };
  testEnvironment: {
    userAgent: string;
    windowWidth: number;
    windowHeight: number;
    orientationAngle?: number;
    orientationType?: string;
  };
  timestamp: string;
  url: string;
}

export interface AxeCoreData {
  site: string;
  url: string;
  result: AxeResult;
  summary: {
    violations: number;
    passes: number;
    incomplete: number;
    inapplicable: number;
    critical: number;
    serious: number;
    moderate: number;
    minor: number;
  };
  timestamp: string;
  status: 'success' | 'error';
  error?: string;
}

export async function performAxeCoreAnalysis(url: string): Promise<AxeCoreData> {
	try {
		// Run axe-core analysis
		const axeResult = await runAxeCoreAnalysis(url);

		// Calculate summary
		const summary = {
			violations: axeResult.violations.length,
			passes: axeResult.passes.length,
			incomplete: axeResult.incomplete.length,
			inapplicable: axeResult.inapplicable.length,
			critical: axeResult.violations.filter(v => v.impact === 'critical').length,
			serious: axeResult.violations.filter(v => v.impact === 'serious').length,
			moderate: axeResult.violations.filter(v => v.impact === 'moderate').length,
			minor: axeResult.violations.filter(v => v.impact === 'minor').length,
		};

		return {
			site: '', // Will be set by the caller
			url: url,
			result: axeResult,
			summary,
			timestamp: new Date().toISOString(),
			status: 'success',
		};
	} catch (error) {
		console.error('Axe-core analysis failed:', error);

		return {
			site: '', // Will be set by the caller
			url: url,
			result: {
				violations: [],
				passes: [],
				incomplete: [],
				inapplicable: [],
				testEngine: { name: 'axe-core', version: 'unknown' },
				testRunner: { name: 'unknown' },
				testEnvironment: {
					userAgent: 'unknown',
					windowWidth: 0,
					windowHeight: 0,
				},
				timestamp: new Date().toISOString(),
				url: url,
			},
			summary: {
				violations: 0,
				passes: 0,
				incomplete: 0,
				inapplicable: 0,
				critical: 0,
				serious: 0,
				moderate: 0,
				minor: 0,
			},
			timestamp: new Date().toISOString(),
			status: 'error',
			error: error instanceof Error ? error.message : 'Unknown error occurred during axe-core analysis',
		};
	}
}

async function runAxeCoreAnalysis(url: string): Promise<AxeResult> {
	let browser;
	try {
		// Launch browser with options for better compatibility
		browser = await puppeteer.launch({
			headless: true,
			args: [
				'--no-sandbox',
				'--disable-setuid-sandbox',
				'--disable-dev-shm-usage',
				'--disable-accelerated-2d-canvas',
				'--no-first-run',
				'--no-zygote',
				'--single-process', // <- this one doesn't work in Windows
				'--disable-gpu'
			]
		});

		const page = await browser.newPage();

		// Set viewport for consistent results
		await page.setViewport({ width: 1280, height: 720 });

		// Set user agent to avoid bot detection
		await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

		// Navigate to the page with timeout
		await page.goto(url, {
			waitUntil: 'networkidle2',
			timeout: 30000
		});

		// Wait a bit for dynamic content to load
		await new Promise(resolve => setTimeout(resolve, 2000));

		// Inject axe-core by adding the script tag
		await page.addScriptTag({
			url: 'https://cdn.jsdelivr.net/npm/axe-core@4.8.2/axe.min.js'
		});

		// Wait a bit for axe to load
		await new Promise(resolve => setTimeout(resolve, 1000));

		// Run axe-core analysis
		const result = await page.evaluate(async () => {
			// Check if axe is available
			if (typeof (window as any).axe === 'undefined') {
				throw new Error('axe-core not loaded');
			}

			// Run axe with all rules enabled
			const axeResults = await (window as any).axe.run(document, {
				rules: {}, // Run all rules
				runOnly: undefined, // Don't restrict to specific rule sets
				reporter: 'v2'
			});

			return axeResults;
		});

		return result;

	} finally {
		if (browser) {
			await browser.close();
		}
	}
}
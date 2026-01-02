/**
 * Google Search Console Integration Services
 * Server-side utilities for Google Search Console data retrieval
 */

"use server";

import { RouteCache } from './site-health-cache';
import { createSearchConsoleClient } from './google-api-auth';

export interface SearchConsoleConfig {
  siteUrl: string;
  serviceAccountKey?: string;
  clientId?: string;
  clientSecret?: string;
  refreshToken?: string;
}

export interface SearchConsoleData {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  topQueries: Array<{ query: string; clicks: number; impressions: number; position: number }>;
  topPages: Array<{ page: string; clicks: number; impressions: number; position: number }>;
}

export interface SearchConsoleChartDataPoint {
	date: string;
	currentImpressions: number;
	currentClicks: number;
	previousImpressions: number;
	previousClicks: number;
}

export interface SearchConsoleResponse {
	success: boolean;
	data?: SearchConsoleChartDataPoint[];
	error?: string;
}

// Cache for search console data (1 hour)
const searchConsoleCache = new RouteCache();

/**
 * Get Google Search Console data for a site with current/previous period comparison
 */
export async function getSearchConsoleData(
	config: SearchConsoleConfig,
	siteName: string,
	startDate?: string,
	endDate?: string
): Promise<SearchConsoleResponse> {
	try {
		// Check cache first
		const cacheKey = `searchconsole-${siteName}-${startDate || 'default'}-${endDate || 'default'}`;
		const cached = searchConsoleCache.get(cacheKey);
		if (cached) {
			return { success: true, data: cached };
		}

		if (!config.siteUrl) {
			return {
				success: false,
				error: 'Site URL not configured for Search Console'
			};
		}

		// Set up authentication
		const authResult = await createSearchConsoleClient(config);
		if (!authResult.success) {
			return {
				success: false,
				error: authResult.error || 'Authentication failed'
			};
		}

		const searchconsole = (authResult as any).client;

		// Calculate date ranges
		const currentEndDate = endDate ? new Date(endDate) : new Date();
		const currentStartDate = startDate ? new Date(startDate) : new Date(currentEndDate.getTime() - 30 * 24 * 60 * 60 * 1000);

		// Calculate previous period (same duration before the current period)
		const periodDuration = currentEndDate.getTime() - currentStartDate.getTime();
		const previousEndDate = new Date(currentStartDate.getTime() - 24 * 60 * 60 * 1000); // One day before start
		const previousStartDate = new Date(previousEndDate.getTime() - periodDuration);

		const currentStartStr = currentStartDate.toISOString().split('T')[0];
		const currentEndStr = currentEndDate.toISOString().split('T')[0];
		const previousStartStr = previousStartDate.toISOString().split('T')[0];
		const previousEndStr = previousEndDate.toISOString().split('T')[0];

		// Fetch current period data
		const currentResponse = await searchconsole.searchanalytics.query({
			siteUrl: config.siteUrl,
			requestBody: {
				startDate: currentStartStr,
				endDate: currentEndStr,
				dimensions: ['date'],
				rowLimit: 10000,
			},
		});

		// Fetch previous period data
		const previousResponse = await searchconsole.searchanalytics.query({
			siteUrl: config.siteUrl,
			requestBody: {
				startDate: previousStartStr,
				endDate: previousEndStr,
				dimensions: ['date'],
				rowLimit: 10000,
			},
		});

		// Create a map of previous period data by date
		const previousDataMap = new Map();
		previousResponse.data.rows?.forEach((row: any) => {
			const dateStr = row.keys?.[0] || '';
			if (dateStr) {
				previousDataMap.set(dateStr, {
					clicks: parseFloat(String(row.clicks || '0')),
					impressions: parseFloat(String(row.impressions || '0'))
				});
			}
		});

		// Combine current and previous period data
		const chartData: SearchConsoleChartDataPoint[] = [];
		const daysInRange = Math.ceil((currentEndDate.getTime() - currentStartDate.getTime()) / (24 * 60 * 60 * 1000));

		for (let i = daysInRange - 1; i >= 0; i--) {
			const currentDate = new Date(currentEndDate);
			currentDate.setDate(currentDate.getDate() - i);
			const currentDateStr = currentDate.toISOString().split('T')[0];

			// Calculate corresponding previous period date
			const previousDate = new Date(currentDate.getTime() - periodDuration);
			const previousDateStr = previousDate.toISOString().split('T')[0];

			// Get current period data
			const currentRow = currentResponse.data.rows?.find((row: any) =>
				row.keys?.[0] === currentDateStr
			);
			const currentClicks = parseFloat(String(currentRow?.clicks || '0'));
			const currentImpressions = parseFloat(String(currentRow?.impressions || '0'));

			// Get previous period data
			const previousData = previousDataMap.get(previousDateStr) || { clicks: 0, impressions: 0 };

			// Format date for display
			const formattedDate = currentDate.toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric'
			});

			chartData.push({
				date: formattedDate,
				currentImpressions: Math.round(currentImpressions),
				currentClicks: Math.round(currentClicks),
				previousImpressions: Math.round(previousData.impressions),
				previousClicks: Math.round(previousData.clicks),
			});
		}

		// Cache the result
		searchConsoleCache.set(cacheKey, chartData);

		return { success: true, data: chartData };
	} catch (error) {
		console.error('Google Search Console error:', error);
		return {
			success: false,
			error: (error as Error).message
		};
	}
}
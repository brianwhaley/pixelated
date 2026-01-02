/**
 * Google Analytics Integration Services
 * Server-side utilities for Google Analytics data retrieval
 */

"use server";

import { RouteCache } from './site-health-cache';
import { createAnalyticsClient } from './google-api-auth';

export interface GoogleAnalyticsConfig {
  ga4PropertyId: string;
  serviceAccountKey?: string;
  clientId?: string;
  clientSecret?: string;
  refreshToken?: string;
}

export interface ChartDataPoint {
	date: string;
	currentPageViews: number;
	previousPageViews: number;
}

export interface GoogleAnalyticsResponse {
	success: boolean;
	data?: ChartDataPoint[];
	error?: string;
}

// Cache for analytics data (1 hour)
const analyticsCache = new RouteCache();

/**
 * Get Google Analytics data for a site with current/previous period comparison
 */
export async function getGoogleAnalyticsData(
	config: GoogleAnalyticsConfig,
	siteName: string,
	startDate?: string,
	endDate?: string
): Promise<GoogleAnalyticsResponse> {
	try {
		// Check cache first
		const cacheKey = `analytics-${siteName}-${startDate || 'default'}-${endDate || 'default'}`;
		const cached = analyticsCache.get(cacheKey);
		if (cached) {
			return { success: true, data: cached };
		}

		if (!config.ga4PropertyId || config.ga4PropertyId === 'GA4_PROPERTY_ID_HERE') {
			return {
				success: false,
				error: 'GA4 Property ID not configured for this site'
			};
		}

		// Set up authentication
		const authResult = await createAnalyticsClient(config);
		if (!authResult.success) {
			return {
				success: false,
				error: authResult.error || 'Authentication failed'
			};
		}

		const analyticsData = (authResult as any).client;

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
		const currentResponse = await analyticsData.properties.runReport({
			property: `properties/${config.ga4PropertyId}`,
			requestBody: {
				dateRanges: [{ startDate: currentStartStr, endDate: currentEndStr }],
				dimensions: [{ name: 'date' }],
				metrics: [{ name: 'screenPageViews' }],
				orderBys: [{ dimension: { dimensionName: 'date' } }],
			},
		});

		// Fetch previous period data
		const previousResponse = await analyticsData.properties.runReport({
			property: `properties/${config.ga4PropertyId}`,
			requestBody: {
				dateRanges: [{ startDate: previousStartStr, endDate: previousEndStr }],
				dimensions: [{ name: 'date' }],
				metrics: [{ name: 'screenPageViews' }],
				orderBys: [{ dimension: { dimensionName: 'date' } }],
			},
		});

		// Create a map of previous period data by date
		const previousDataMap = new Map();
		previousResponse.data.rows?.forEach((row: any) => {
			const dateStr = row.dimensionValues?.[0]?.value || '';
			if (dateStr) {
				previousDataMap.set(dateStr, parseInt(row.metricValues?.[0]?.value || '0'));
			}
		});

		// Combine current and previous period data
		const chartData: ChartDataPoint[] = [];
		const daysInRange = Math.ceil((currentEndDate.getTime() - currentStartDate.getTime()) / (24 * 60 * 60 * 1000));

		for (let i = daysInRange - 1; i >= 0; i--) {
			const currentDate = new Date(currentEndDate);
			currentDate.setDate(currentDate.getDate() - i);
			const currentDateStr = currentDate.toISOString().split('T')[0].replace(/-/g, ''); // YYYYMMDD format

			// Calculate corresponding previous period date
			const previousDate = new Date(currentDate.getTime() - periodDuration);
			const previousDateStr = previousDate.toISOString().split('T')[0].replace(/-/g, ''); // YYYYMMDD format

			// Get current period data
			const currentRow = currentResponse.data.rows?.find((row: any) =>
				row.dimensionValues?.[0]?.value === currentDateStr
			);
			const currentPageViews = parseInt(currentRow?.metricValues?.[0]?.value || '0');

			// Get previous period data
			const previousPageViews = previousDataMap.get(previousDateStr) || 0;

			// Format date for display
			const formattedDate = currentDate.toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric'
			});

			chartData.push({
				date: formattedDate,
				currentPageViews: currentPageViews,
				previousPageViews: previousPageViews,
			});
		}

		// Cache the result
		analyticsCache.set(cacheKey, chartData);

		return { success: true, data: chartData };
	} catch (error) {
		console.error('Google Analytics error:', error);
		return {
			success: false,
			error: (error as Error).message
		};
	}
}
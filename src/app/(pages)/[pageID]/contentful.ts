/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Contentful PageBuilder utilities for server-side rendering
 * Uses Delivery API for fast, cached reads of published content
 */

import { getContentfulEntriesByType, getFullPixelatedConfig } from '@brianwhaley/pixelated-components/server';
import type { ContentfulApiType } from '@brianwhaley/pixelated-components/server';

const CONTENT_TYPE = 'page';

/**
 * Get Contentful Delivery API config from environment variables
 */
export function getContentfulDeliveryConfig(): ContentfulApiType {
	try {
		const config = getFullPixelatedConfig();
		const contentful = (config as any)?.contentful || {};
		const base_url = contentful.base_url ;
		const space_id = contentful.space_id || contentful.spaceId || '';
		const environment = contentful.environment || contentful.env || 'master';
		const delivery_access_token = contentful.delivery_access_token || contentful.deliveryAccessToken || '';

		return {
			base_url,
			space_id,
			environment,
			delivery_access_token,
		} as ContentfulApiType;
	} catch (_e) {
		void _e;
		// Fallback to environment variables if unified config not present
		console.error('getContentfulDeliveryConfig: failed to read unified config');
		return {
			base_url : "",
			space_id : "",
			environment : "",
			delivery_access_token : "",
		} as ContentfulApiType;
	}
}

/**
 * List all PageBuilder pages from Contentful
 */
export async function listContentfulPages(): Promise<string[]> {
	const apiProps = getContentfulDeliveryConfig();
	// If the config is missing critical fields, return empty list to avoid build-time crash
	if (!apiProps.space_id || !apiProps.delivery_access_token) return [];
	const result = await getContentfulEntriesByType({ apiProps, contentType: CONTENT_TYPE });
    
	if (!result || !Array.isArray(result.items)) {
		return [];
	}

	interface ContentfulEntry {
		fields: {
			pageName?: string;
			pageData?: any;
		};
	}

	const pages = result.items
		.map((entry: ContentfulEntry) => entry.fields.pageName)
		.filter((name: any): name is string => typeof name === 'string')
		.sort();

	return pages;
}

/**
 * Load a PageBuilder page from Contentful by slug/name
 */
export async function loadContentfulPage(slug: string) {
	const apiProps = getContentfulDeliveryConfig();
	if (!apiProps.space_id || !apiProps.delivery_access_token) return null;
	const result = await getContentfulEntriesByType({ apiProps, contentType: CONTENT_TYPE });
    
	if (!result || !Array.isArray(result.items)) {
		return null;
	}

	interface ContentfulEntry {
		fields: {
			pageName?: string;
			pageData?: any;
		};
	}

	// Find the page by slug
	const entry = result.items.find((item: ContentfulEntry) => item.fields.pageName === slug);
	
	if (!entry) {
		return null;
	}

	return entry.fields.pageData;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Contentful PageBuilder utilities for server-side rendering
 * Uses Delivery API for fast, cached reads of published content
 */

import { getContentfulEntriesByType } from '@brianwhaley/pixelated-components/server';
import type { ContentfulApiType } from '@brianwhaley/pixelated-components/server';

const CONTENT_TYPE = 'page';

/**
 * Get Contentful Delivery API config from environment variables
 */
export function getContentfulDeliveryConfig(): ContentfulApiType {
	return {
		base_url: 'https://cdn.contentful.com',
		space_id: process.env.CONTENTFUL_SPACE_ID!,
		environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
		access_token: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN!,
	};
}

/**
 * List all PageBuilder pages from Contentful
 */
export async function listContentfulPages(): Promise<string[]> {
	const apiProps = getContentfulDeliveryConfig();
	const result = await getContentfulEntriesByType({ apiProps, contentType: CONTENT_TYPE });
	
	if (!result || !result.items) {
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
	const result = await getContentfulEntriesByType({ apiProps, contentType: CONTENT_TYPE });
	
	if (!result || !result.items) {
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

/**
 * PageBuilder-specific Contentful storage implementation
 * 
 * Uses generic Contentful management functions with PageBuilder-specific logic
 */

import {
	ContentfulConfig,
	listEntries,
	searchEntriesByField,
	createEntry,
	updateEntry,
	deleteEntry,
} from '../../cms/pixelated.contentful.management';
import type { PageData } from './types';
import type {
	ListPagesResponse,
	LoadPageResponse,
	SavePageResponse,
	DeletePageResponse,
} from './pageStorageTypes';

const CONTENT_TYPE = 'page';

/**
 * Validate page name format
 */
function validatePageName(name: string): boolean {
	return /^[a-zA-Z0-9-_]+$/.test(name);
}

/**
 * List all saved pages
 */
export async function listPages(
	config: ContentfulConfig
): Promise<ListPagesResponse> {
	const result = await listEntries(CONTENT_TYPE, config);
	
	if (!result.success) {
		return {
			success: false,
			pages: [],
			message: result.message,
		};
	}

	const pages = result.entries
		.map((entry: any) => entry.fields.pageName?.['en-US'])
		.filter((name: any) => name !== undefined)
		.sort();

	return {
		success: true,
		pages,
	};
}

/**
 * Load a page by name
 */
export async function loadPage(
	name: string,
	config: ContentfulConfig
): Promise<LoadPageResponse> {
	if (!validatePageName(name)) {
		return {
			success: false,
			message: 'Invalid page name. Use only letters, numbers, dashes, and underscores.',
		};
	}

	const result = await searchEntriesByField(CONTENT_TYPE, 'pageName', name, config);
	
	if (!result.success) {
		return {
			success: false,
			message: result.message || 'Failed to load page.',
		};
	}

	if (result.entries.length === 0) {
		return {
			success: false,
			message: `Page "${name}" not found.`,
		};
	}

	const entry = result.entries[0];
	const pageData = entry.fields.pageData?.['en-US'];

	return {
		success: true,
		data: pageData,
	};
}

/**
 * Save a page (create or update)
 */
export async function savePage(
	name: string,
	data: PageData,
	config: ContentfulConfig
): Promise<SavePageResponse> {
	if (!validatePageName(name)) {
		return {
			success: false,
			message: 'Invalid page name. Use only letters, numbers, dashes, and underscores.',
		};
	}

	// Check if page exists
	const searchResult = await searchEntriesByField(CONTENT_TYPE, 'pageName', name, config);
	
	if (!searchResult.success) {
		return {
			success: false,
			message: searchResult.message || 'Failed to check existing page.',
		};
	}

	const fields = {
		pageName: name,
		pageData: data,
		title: name,
		status: 'published',
	};

	if (searchResult.entries.length > 0) {
		// Update existing entry
		const entryId = searchResult.entries[0].sys.id;
		const result = await updateEntry(entryId, fields, config, true);
		
		return {
			success: result.success,
			message: result.success ? `Page "${name}" updated successfully.` : result.message,
			filename: name,
		};
	} else {
		// Create new entry
		const result = await createEntry(CONTENT_TYPE, fields, config, true);
		
		return {
			success: result.success,
			message: result.success ? `Page "${name}" created successfully.` : result.message,
			filename: name,
		};
	}
}

/**
 * Delete a page by name
 */
export async function deletePage(
	name: string,
	config: ContentfulConfig
): Promise<DeletePageResponse> {
	if (!validatePageName(name)) {
		return {
			success: false,
			message: 'Invalid page name.',
		};
	}

	// Find the entry
	const searchResult = await searchEntriesByField(CONTENT_TYPE, 'pageName', name, config);
	
	if (!searchResult.success) {
		return {
			success: false,
			message: searchResult.message || 'Failed to find page.',
		};
	}

	if (searchResult.entries.length === 0) {
		return {
			success: false,
			message: `Page "${name}" not found.`,
		};
	}

	const entryId = searchResult.entries[0].sys.id;
	const result = await deleteEntry(entryId, config);
	
	return {
		success: result.success,
		message: result.success ? `Page "${name}" deleted successfully.` : result.message,
	};
}

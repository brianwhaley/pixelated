import type { PageData } from './types';
import type {
	LoadPageResponse,
	ListPagesResponse,
	SavePageResponse,
	DeletePageResponse
} from './pageStorageTypes';

/**
 * Contentful configuration
 */
export interface ContentfulConfig {
	spaceId: string;
	accessToken: string;
	environment?: string;
}

/**
 * Contentful Page Entry
 */
interface ContentfulPageEntry {
	sys: {
		id: string;
		version: number;
	};
	fields: {
		pageName: {
			'en-US': string;
		};
		title?: {
			'en-US': string;
		};
		pageData: {
			'en-US': PageData;
		};
		status?: {
			'en-US': string;
		};
	};
}

/**
 * Validate page name (alphanumeric, dashes, underscores only)
 */
export function validatePageName(name: string): boolean {
	const validPattern = /^[a-zA-Z0-9_-]+$/;
	return validPattern.test(name) && name.length > 0 && name.length <= 100;
}

/**
 * List all pages from Contentful
 */
export async function listPages(config: ContentfulConfig): Promise<ListPagesResponse> {
	const { spaceId, accessToken, environment = 'master' } = config;
	
	try {
		const response = await fetch(
			`https://api.contentful.com/spaces/${spaceId}/environments/${environment}/entries?content_type=page`,
			{
				headers: {
					'Authorization': `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
			}
		);

		if (!response.ok) {
			throw new Error(`Contentful API error: ${response.status}`);
		}

		const data = await response.json();
		const pages = data.items
			.map((item: ContentfulPageEntry) => item.fields.pageName['en-US'])
			.sort();

		return {
			success: true,
			pages,
		};
	} catch (error) {
		return {
			success: false,
			pages: [],
			message: `Failed to list pages: ${error}`,
		};
	}
}

/**
 * Load a page from Contentful by name
 */
export async function loadPage(
	name: string,
	config: ContentfulConfig
): Promise<LoadPageResponse> {
	const { spaceId, accessToken, environment = 'master' } = config;
	
	try {
		if (!validatePageName(name)) {
			return {
				success: false,
				message: 'Invalid page name. Use only letters, numbers, dashes, and underscores.',
			};
		}

		// Search for entry by pageName
		const response = await fetch(
			`https://api.contentful.com/spaces/${spaceId}/environments/${environment}/entries?content_type=page&fields.pageName=${encodeURIComponent(name)}`,
			{
				headers: {
					'Authorization': `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
			}
		);

		if (!response.ok) {
			throw new Error(`Contentful API error: ${response.status}`);
		}

		const data = await response.json();

		if (data.items.length === 0) {
			return {
				success: false,
				message: `Page "${name}" not found.`,
			};
		}

		const entry = data.items[0] as ContentfulPageEntry;
		const pageData = entry.fields.pageData['en-US'];

		return {
			success: true,
			data: pageData,
		};
	} catch (error) {
		return {
			success: false,
			message: `Failed to load page: ${error}`,
		};
	}
}

/**
 * Save a page to Contentful (create or update)
 */
export async function savePage(
	name: string,
	data: PageData,
	config: ContentfulConfig
): Promise<SavePageResponse> {
	const { spaceId, accessToken, environment = 'master' } = config;
	
	try {
		if (!validatePageName(name)) {
			return {
				success: false,
				message: 'Invalid page name. Use only letters, numbers, dashes, and underscores.',
			};
		}

		// Check if page already exists
		const existingResponse = await fetch(
			`https://api.contentful.com/spaces/${spaceId}/environments/${environment}/entries?content_type=page&fields.pageName=${encodeURIComponent(name)}`,
			{
				headers: {
					'Authorization': `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
			}
		);

		const existingData = await existingResponse.json();
		const entryExists = existingData.items.length > 0;

		if (entryExists) {
			// Update existing entry
			const entry = existingData.items[0] as ContentfulPageEntry;
			const updateResponse = await fetch(
				`https://api.contentful.com/spaces/${spaceId}/environments/${environment}/entries/${entry.sys.id}`,
				{
					method: 'PUT',
					headers: {
						'Authorization': `Bearer ${accessToken}`,
						'Content-Type': 'application/vnd.contentful.management.v1+json',
						'X-Contentful-Version': entry.sys.version.toString(),
					},
					body: JSON.stringify({
						fields: {
							pageName: { 'en-US': name },
							pageData: { 'en-US': data },
							status: { 'en-US': 'published' },
						},
					}),
				}
			);

			if (!updateResponse.ok) {
				const error = await updateResponse.json();
				throw new Error(`Update failed: ${JSON.stringify(error)}`);
			}

			// Publish the updated entry
			await fetch(
				`https://api.contentful.com/spaces/${spaceId}/environments/${environment}/entries/${entry.sys.id}/published`,
				{
					method: 'PUT',
					headers: {
						'Authorization': `Bearer ${accessToken}`,
						'X-Contentful-Version': (entry.sys.version + 1).toString(),
					},
				}
			);

			return {
				success: true,
				message: `Page "${name}" updated successfully.`,
				filename: name,
			};
		} else {
			// Create new entry
			const createResponse = await fetch(
				`https://api.contentful.com/spaces/${spaceId}/environments/${environment}/entries`,
				{
					method: 'POST',
					headers: {
						'Authorization': `Bearer ${accessToken}`,
						'Content-Type': 'application/vnd.contentful.management.v1+json',
						'X-Contentful-Content-Type': 'page',
					},
					body: JSON.stringify({
						fields: {
							pageName: { 'en-US': name },
							pageData: { 'en-US': data },
							status: { 'en-US': 'published' },
						},
					}),
				}
			);

			if (!createResponse.ok) {
				const error = await createResponse.json();
				throw new Error(`Create failed: ${JSON.stringify(error)}`);
			}

			const newEntry = await createResponse.json();

			// Publish the new entry
			await fetch(
				`https://api.contentful.com/spaces/${spaceId}/environments/${environment}/entries/${newEntry.sys.id}/published`,
				{
					method: 'PUT',
					headers: {
						'Authorization': `Bearer ${accessToken}`,
						'X-Contentful-Version': '1',
					},
				}
			);

			return {
				success: true,
				message: `Page "${name}" created successfully.`,
				filename: name,
			};
		}
	} catch (error) {
		return {
			success: false,
			message: `Failed to save page: ${error}`,
		};
	}
}

/**
 * Delete a page from Contentful
 */
export async function deletePage(
	name: string,
	config: ContentfulConfig
): Promise<DeletePageResponse> {
	const { spaceId, accessToken, environment = 'master' } = config;
	
	try {
		if (!validatePageName(name)) {
			return {
				success: false,
				message: 'Invalid page name.',
			};
		}

		// Find the entry
		const response = await fetch(
			`https://api.contentful.com/spaces/${spaceId}/environments/${environment}/entries?content_type=page&fields.pageName=${encodeURIComponent(name)}`,
			{
				headers: {
					'Authorization': `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
			}
		);

		const data = await response.json();

		if (data.items.length === 0) {
			return {
				success: false,
				message: `Page "${name}" not found.`,
			};
		}

		const entry = data.items[0] as ContentfulPageEntry;

		// Unpublish first
		await fetch(
			`https://api.contentful.com/spaces/${spaceId}/environments/${environment}/entries/${entry.sys.id}/published`,
			{
				method: 'DELETE',
				headers: {
					'Authorization': `Bearer ${accessToken}`,
				},
			}
		);

		// Then delete
		const deleteResponse = await fetch(
			`https://api.contentful.com/spaces/${spaceId}/environments/${environment}/entries/${entry.sys.id}`,
			{
				method: 'DELETE',
				headers: {
					'Authorization': `Bearer ${accessToken}`,
				},
			}
		);

		if (!deleteResponse.ok) {
			throw new Error(`Delete failed: ${deleteResponse.status}`);
		}

		return {
			success: true,
			message: `Page "${name}" deleted successfully.`,
		};
	} catch (error) {
		return {
			success: false,
			message: `Failed to delete page: ${error}`,
		};
	}
}

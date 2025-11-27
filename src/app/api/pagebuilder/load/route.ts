import { NextResponse } from 'next/server';
import { loadContentfulPage, getFullConfig } from '@brianwhaley/pixelated-components/server';
import type { ContentfulConfig } from '@brianwhaley/pixelated-components/server';

function buildContentfulConfigFromFull(): ContentfulConfig {
	const config = getFullConfig();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const contentfulConfig = (config as any)?.contentful || {};
	return {
		spaceId: contentfulConfig.space_id || contentfulConfig.spaceId || '',
		// For loading pages for rendering use the delivery token first (CDN)
		accessToken: contentfulConfig.delivery_access_token || contentfulConfig.preview_access_token || contentfulConfig.management_access_token || '',
		environment: contentfulConfig.environment || contentfulConfig.env || 'master',
	} as ContentfulConfig;
}

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const name = searchParams.get('name');

	if (!name) {
		return NextResponse.json({
			success: false,
			message: 'Page name is required'
		}, { status: 400 });
	}

	const config: ContentfulConfig = buildContentfulConfigFromFull();
	if (!config.spaceId || !config.accessToken) {
		console.error('pagebuilder/load: missing contentful config', { spaceId: config.spaceId, accessTokenPresent: !!config.accessToken });
		return NextResponse.json({ success: false, message: 'Missing Contentful configuration on server' }, { status: 500 });
	}

	const result = await loadContentfulPage(name, config);
	return NextResponse.json(result);
}

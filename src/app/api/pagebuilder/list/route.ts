import { NextResponse } from 'next/server';
import { listContentfulPages, getFullConfig } from '@brianwhaley/pixelated-components/server';
import type { ContentfulConfig } from '@brianwhaley/pixelated-components/server';

function buildContentfulConfigFromFull(): ContentfulConfig {
	const config = getFullConfig();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const contentfulConfig = (config as any)?.contentful || {};
	return {
		spaceId: contentfulConfig.space_id || contentfulConfig.spaceId || '',
		accessToken: contentfulConfig.management_access_token || contentfulConfig.preview_access_token || contentfulConfig.delivery_access_token || '',
		environment: contentfulConfig.environment || contentfulConfig.env || 'master',
	} as ContentfulConfig;
}

export async function GET() {
	const config: ContentfulConfig = buildContentfulConfigFromFull();
	if (!config.spaceId || !config.accessToken) {
		console.error('pagebuilder/list: missing contentful config', { spaceId: config.spaceId, accessTokenPresent: !!config.accessToken });
		return NextResponse.json({ success: false, pages: [], message: 'Missing Contentful configuration on server' });
	}
	const result = await listContentfulPages(config);
	return NextResponse.json(result);
}

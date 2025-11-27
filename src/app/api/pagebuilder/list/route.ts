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
	// Diagnostic logging for CI builds: show which env var is present and whether decoding/parsing succeeds.
	try {
		console.info('DEBUG PIXELATED_CONFIG envs:', {
			PIXELATED_CONFIG_JSON: !!process.env.PIXELATED_CONFIG_JSON,
			PIXELATED_CONFIG_B64: !!process.env.PIXELATED_CONFIG_B64,
		});
		if (process.env.PIXELATED_CONFIG_B64) {
			try {
				const decoded = Buffer.from(process.env.PIXELATED_CONFIG_B64, 'base64').toString('utf8');
				const parsed = JSON.parse(decoded);
				console.info('DEBUG PIXELATED_CONFIG parsed: contentful.space_id=', parsed?.contentful?.space_id || '<none>', 'delivery_token_len=', parsed?.contentful?.delivery_access_token?.length || 0);
			} catch (e) {
				console.error('DEBUG PIXELATED_CONFIG_B64 parse error', e);
			}
		}
	} catch (e) {
		console.error('DEBUG PIXELATED_CONFIG logging failed', e);
	}
	const config: ContentfulConfig = buildContentfulConfigFromFull();
	if (!config.spaceId || !config.accessToken) {
		console.error('pagebuilder/list: missing contentful config', { spaceId: config.spaceId, accessTokenPresent: !!config.accessToken });
		return NextResponse.json({ success: false, pages: [], message: 'Missing Contentful configuration on server' });
	}
	const result = await listContentfulPages(config);
	return NextResponse.json(result);
}

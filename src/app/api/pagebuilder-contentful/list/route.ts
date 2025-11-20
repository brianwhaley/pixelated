import { NextResponse } from 'next/server';
import { listPages } from '@brianwhaley/pixelated-components/server';
import type { ContentfulConfig } from '@brianwhaley/pixelated-components/server';

export async function GET() {
	const config: ContentfulConfig = {
		spaceId: process.env.CONTENTFUL_SPACE_ID!,
		accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN!,
		environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
	};

	console.log('Config:', {
		spaceId: config.spaceId,
		hasToken: !!config.accessToken,
		tokenStart: config.accessToken?.substring(0, 10),
		environment: config.environment
	});

	const result = await listPages(config);
	console.log('Result:', result);
	return NextResponse.json(result);
}

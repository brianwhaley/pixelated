import { NextResponse } from 'next/server';
import { listPages } from '@brianwhaley/pixelated-components/server';
import type { ContentfulConfig } from '@brianwhaley/pixelated-components/server';

export async function GET() {
	const config: ContentfulConfig = {
		spaceId: process.env.CONTENTFUL_SPACE_ID!,
		accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN!,
		environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
	};

	const result = await listPages(config);
	return NextResponse.json(result);
}

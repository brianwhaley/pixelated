import { NextResponse } from 'next/server';
import { deletePage } from '@brianwhaley/pixelated-components/server';
import type { ContentfulConfig } from '@brianwhaley/pixelated-components/server';

export async function DELETE(request: Request) {
	const { searchParams } = new URL(request.url);
	const name = searchParams.get('name');

	if (!name) {
		return NextResponse.json({
			success: false,
			message: 'Page name is required'
		}, { status: 400 });
	}

	const config: ContentfulConfig = {
		spaceId: process.env.CONTENTFUL_SPACE_ID!,
		accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN!,
		environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
	};

	const result = await deleteContentfulPage(name, config);
	return NextResponse.json(result);
}

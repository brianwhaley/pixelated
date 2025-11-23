import { NextResponse } from 'next/server';
import { savePage } from '@brianwhaley/pixelated-components/server';
import type { ContentfulConfig } from '@brianwhaley/pixelated-components/server';

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { name, data } = body;

		if (!name || !data) {
			return NextResponse.json({
				success: false,
				message: 'Name and data are required'
			}, { status: 400 });
		}

		const config: ContentfulConfig = {
			spaceId: process.env.CONTENTFUL_SPACE_ID!,
			accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN!,
			environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
		};

		const result = await saveContentfulPage(name, data, config);
		return NextResponse.json(result);
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: `Invalid request: ${error}`
		}, { status: 400 });
	}
}

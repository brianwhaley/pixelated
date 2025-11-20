import { NextResponse } from 'next/server';
// Choose ONE of these imports:

// Option 1: File-based storage
import { savePage } from '@brianwhaley/pixelated-components/server';

// Option 2: Contentful storage
// import { savePage } from '@brianwhaley/pixelated-components/server';
// import type { ContentfulConfig } from '@brianwhaley/pixelated-components/server';

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

		// ===== OPTION 1: File-based storage =====
		const result = await savePage(name, data);
		
		// ===== OPTION 2: Contentful storage =====
		// const config: ContentfulConfig = {
		// 	spaceId: process.env.CONTENTFUL_SPACE_ID || '',
		// 	accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN || '',
		// 	environment: 'master', // or your environment name
		// };
		// const result = await savePage(name, data, config);

		return NextResponse.json(result);
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: `Invalid request: ${error}`
		}, { status: 400 });
	}
}

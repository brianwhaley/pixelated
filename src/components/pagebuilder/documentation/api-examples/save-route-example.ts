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
		// ===== OPTION 2: Contentful storage (recommended when using the unified PIXELATED config blob) =====
		// The app reads the unified config on the server via `getFullConfig()` which
		// sources values from `PIXELATED_CONFIG_JSON` or `PIXELATED_CONFIG_B64`.
		// Example (server-side):
		// import { getFullConfig } from '@brianwhaley/pixelated-components/server';
		// const cfg = getFullConfig();
		// const contentfulConfig = cfg.contentful;
		// const result = await savePage(name, data, contentfulConfig);

		return NextResponse.json(result);
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: `Invalid request: ${error}`
		}, { status: 400 });
	}
}

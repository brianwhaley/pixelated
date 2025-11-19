import { NextResponse } from 'next/server';
import { loadPage } from '@brianwhaley/pixelated-components/server';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const name = searchParams.get('name');

	if (!name) {
		return NextResponse.json({
			success: false,
			message: 'Page name is required'
		}, { status: 400 });
	}

	const result = await loadPage(name);
	return NextResponse.json(result);
}

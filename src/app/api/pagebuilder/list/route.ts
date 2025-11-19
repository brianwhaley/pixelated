import { NextResponse } from 'next/server';
import { listPages } from '@brianwhaley/pixelated-components/server';

export async function GET() {
	const result = await listPages();
	return NextResponse.json(result);
}

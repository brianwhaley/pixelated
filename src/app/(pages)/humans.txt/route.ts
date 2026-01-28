import type { NextRequest } from 'next/server';
import { createHumansTxtResponse } from '@pixelated-tech/components/server';

export async function GET(req: NextRequest) {
	return createHumansTxtResponse(req);
}

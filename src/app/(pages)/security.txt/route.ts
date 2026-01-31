import type { NextRequest } from 'next/server';
import { createWellKnownResponse } from '@pixelated-tech/components/server';

export async function GET(req: NextRequest) {
	return createWellKnownResponse('security', req);
}   

/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { PageEngine } from '@pixelated-tech/components';

export default function ClientPageEngine({ pageData }: { pageData: any }) {
	return <PageEngine pageData={pageData} />;
}

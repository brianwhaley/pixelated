'use client';

import routesData from './data/routes.json';
import { GlobalErrorUI } from '@pixelated-tech/components';

const site = (routesData as any).siteInfo ?? {};

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
	return <GlobalErrorUI error={error} reset={reset} siteInfo={site} />;
}

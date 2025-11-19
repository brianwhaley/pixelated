import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';
 
export default async function robots(): Promise<MetadataRoute.Robots> {
	const headerList = await headers();
	const domain = headerList.get('host') || '';
	const isLocal = domain.includes('localhost');
	const isDev = domain.includes('dev.pixelated.tech');
	// console.log("isLocal:", isLocal, "isDev:", isDev);
	if (isLocal || isDev) {
		return {
			rules: {
				userAgent: '*',
				disallow: '/',
			},
		};
	} else {
		return {
			rules: {
				userAgent: '*',
				allow: '/',
				disallow: '/samples',
			},
			sitemap: 'https://www.pixelated.tech/sitemap.xml',
		};
	}
}
import { notFound } from 'next/navigation';
import { unstable_cache } from 'next/cache';
import { listContentfulPages, loadContentfulPage } from './contentful';
import ClientPageEngine from './client.pageengine';

// ISR: Revalidate page content every 24 hours
export const revalidate = 86400;

// Cached function to get list of all page slugs (revalidate every hour)
const getCachedPageList = unstable_cache(
	async () => {
		return await listContentfulPages();
	},
	['pagebuilder-page-list'],
	{ revalidate: 3600, tags: ['pagebuilder-pages'] }
);

// Generate static params for all existing pages at build time
export async function generateStaticParams() {
	const slugs = await getCachedPageList();
	return slugs.map((slug: string) => ({
		slug,
	}));
}

// Main page component
export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	
	// Check if slug exists in cached page list
	const validSlugs = await getCachedPageList();
	if (!validSlugs.includes(slug)) {
		notFound();
	}

	// Fetch page data from Contentful
	const pageData = await loadContentfulPage(slug);

	if (!pageData) {
		notFound();
	}

	return <ClientPageEngine pageData={pageData} />;
}

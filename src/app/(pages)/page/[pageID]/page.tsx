"use client";

import { PageEngine } from '@brianwhaley/pixelated-components';
import { useEffect, useState } from 'react';
import { use } from 'react';

export default function DynamicPage({ params }: { params: Promise<{ pageID: string }> }) {
	const resolvedParams = use(params);
	const [pageData, setPageData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		async function fetchPage() {
			try {
				const url = `${window.location.origin}/api/pagebuilder-contentful/load?name=${resolvedParams.pageID}`;
				const response = await fetch(url);
				const result = await response.json();
				if (result.success && result.data) {
					setPageData(result.data);
				} else {
					console.error('Load failed:', result.message);
					setError(true);
				}
			} catch (err) {
				console.error("Error loading page:", err);
				setError(true);
			} finally {
				setLoading(false);
			}
		}
		fetchPage();
	}, [resolvedParams.pageID]);
	if (loading) {
		return (
			<div style={{ padding: '2rem', textAlign: 'center' }}>
				<p>Loading...</p>
			</div>
		);
	}
	if (error || !pageData) {
		return (
			<div style={{ padding: '2rem', textAlign: 'center' }}>
				<h1>Page Not Found</h1>
				<p>The page &quot;{resolvedParams.pageID}&quot; could not be found.</p>
			</div>
		);
	}
	return <PageEngine pageData={pageData} />;
}

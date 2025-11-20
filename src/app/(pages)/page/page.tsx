"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PageIndex() {
	const [pages, setPages] = useState<string[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchPages() {
			try {
				const response = await fetch('/api/pagebuilder-contentful/list');
				const result = await response.json();
				
				if (result.success) {
					setPages(result.pages);
				}
			} catch (err) {
				console.error('Error fetching pages:', err);
			} finally {
				setLoading(false);
			}
		}

		fetchPages();
	}, []);

	if (loading) {
		return (
			<div style={{ padding: '2rem' }}>
				<h1>Available Pages</h1>
				<p>Loading...</p>
			</div>
		);
	}

	return (
		<div style={{ padding: '2rem' }}>
			<h1>Available Pages</h1>
			{pages.length === 0 ? (
				<p>No pages found. Create pages in the <Link href="/pagebuilder">PageBuilder</Link>.</p>
			) : (
				<ul style={{ listStyle: 'none', padding: 0 }}>
					{pages.map(page => (
						<li key={page} style={{ marginBottom: '0.5rem' }}>
							<Link 
								href={`/page/${page}`}
								style={{ 
									color: '#2196F3', 
									textDecoration: 'none',
									fontSize: '1.1rem'
								}}
							>
								{page}
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

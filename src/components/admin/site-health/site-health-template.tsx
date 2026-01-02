'use client';

import React, { useEffect, useState, ReactNode } from 'react';
import { PageGridItem } from '../../general/semantic';

interface SiteHealthTemplateProps<T> {
  siteName: string;
  title?: string;
  children: (data: T | null) => ReactNode;
  fetchData: (siteName: string, cache?: boolean) => Promise<T>;
  enableCacheControl?: boolean;
  columnSpan?: number;
}

export function SiteHealthTemplate<T>({
	siteName,
	title,
	children,
	fetchData,
	enableCacheControl = false,
	columnSpan = 1
}: SiteHealthTemplateProps<T>) {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;

		const loadData = async () => {
			if (!siteName) {
				if (isMounted) {
					setData(null);
					setLoading(false);
					setError(null);
				}
				return;
			}

			if (isMounted) {
				setLoading(true);
				setError(null);
			}

			try {
				// Check for cache control from URL query parameters
				const urlParams = new URLSearchParams(window.location.search);
				const cacheParam = urlParams.get('cache');
				const useCache = enableCacheControl ? (cacheParam !== 'false') : true;

				const result = await fetchData(siteName, useCache);
				if (isMounted) {
					setData(result);
					setError(null);
				}
			} catch (err) {
				if (isMounted) {
					setError(err instanceof Error ? err.message : 'Failed to load data');
					setData(null);
				}
			} finally {
				if (isMounted) {
					setLoading(false);
				}
			}
		};

		loadData();

		return () => {
			isMounted = false;
		};
	}, [siteName, fetchData]);

	// If no site selected, show nothing
	if (!siteName) {
		return null;
	}

	// If title is provided, render the complete card structure
	if (title) {
		return (
			<PageGridItem className="health-card" columnSpan={columnSpan}>
				<h2 className="health-card-title">{title}</h2>
				<div className="health-card-content">
					{loading ? (
						<div className="health-loading">
							<div className="health-loading-spinner"></div>
							<p className="health-loading-text">Loading...</p>
						</div>
					) : error ? (
						<div className="health-error">
							<p className="health-error-text">Error: {error}</p>
						</div>
					) : (
						children(data)
					)}
				</div>
			</PageGridItem>
		);
	}

	// Legacy mode: render content directly without wrapper
	return (
		<>
			{loading ? (
				<div className="health-loading">
					<div className="health-loading-spinner"></div>
					<p className="health-loading-text">Loading...</p>
				</div>
			) : error ? (
				<div className="health-error">
					<p className="health-error-text">Error: {error}</p>
				</div>
			) : (
				children(data)
			)}
		</>
	);
}
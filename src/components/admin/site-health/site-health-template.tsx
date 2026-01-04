'use client';

import React, { useEffect, useState, ReactNode } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { PageGridItem } from '../../general/semantic';

SiteHealthTemplate.propTypes = {
	siteName: PropTypes.string.isRequired,
	title: PropTypes.string,
	children: PropTypes.func.isRequired,
	fetchData: PropTypes.func.isRequired,
	enableCacheControl: PropTypes.bool,
	columnSpan: PropTypes.number,
};
export type SiteHealthTemplateType = InferProps<typeof SiteHealthTemplate.propTypes>;
export function SiteHealthTemplate<T>(
	props: SiteHealthTemplateType
) {
	const typedProps = props as SiteHealthTemplateType & {
		children: (data: T | null) => ReactNode;
		fetchData: (siteName: string, cache?: boolean) => Promise<T>;
	};
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;

		const loadData = async () => {
			if (!typedProps.siteName) {
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
				const useCache = typedProps.enableCacheControl ? (cacheParam !== 'false') : true;

				const result = await typedProps.fetchData(typedProps.siteName, useCache);
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
	}, [typedProps.siteName, typedProps.fetchData]);

	// If no site selected, show nothing
	if (!typedProps.siteName) {
		return null;
	}

	// If title is provided, render the complete card structure
	if (typedProps.title) {
		return (
			<PageGridItem className="health-card" columnSpan={typedProps.columnSpan}>
				<h2 className="health-card-title">{typedProps.title}</h2>
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
						typedProps.children(data)
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
				typedProps.children(data)
			)}
		</>
	);
}
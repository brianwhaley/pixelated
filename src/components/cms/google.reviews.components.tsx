'use client';

import React, { useState, useEffect } from 'react';
import { getGoogleReviewsByPlaceId, GoogleReview, GooglePlaceSummary } from './google.reviews.functions';

export function GoogleReviewsCard(props: {
	placeId: string;
	language?: string;
	maxReviews?: number;
	proxyBase?: string;
}) {
	const [place, setPlace] = useState<GooglePlaceSummary | undefined>();
	const [reviews, setReviews] = useState<GoogleReview[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			try {
				const result = await getGoogleReviewsByPlaceId({
					placeId: props.placeId,
					language: props.language,
					maxReviews: props.maxReviews,
					proxyBase: props.proxyBase,
				});
				setPlace(result.place);
				setReviews(result.reviews);
				setLoading(false);
			} catch (e: any) {
				setError(e?.message || 'Failed to fetch reviews');
				setLoading(false);
			}
		})();
	}, [props.placeId, props.language, props.maxReviews, props.proxyBase]);

	if (loading) {
		return (
			<div style={{ padding: 16 }}>
				<p>Loading reviews...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div style={{ padding: 16 }}>
				<p style={{ color: 'tomato' }}>Error: {error}</p>
			</div>
		);
	}

	return (
		<div style={{ padding: 16 }}>
			<h3>{place?.name || 'Reviews'}</h3>
			{place?.formatted_address && (
				<p style={{ fontSize: '0.9em', color: '#666', marginBottom: 16 }}>
					{place.formatted_address}
				</p>
			)}
			{reviews.length === 0 ? (
				<p>No reviews found.</p>
			) : (
				<ul style={{ listStyle: 'none', padding: 0 }}>
					{reviews.map((r, i) => (
						<li key={i} style={{ marginBottom: 16, borderBottom: '1px solid #eee', paddingBottom: 12 }}>
							<div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
								{r.profile_photo_url && (
									<img
										src={r.profile_photo_url}
										alt={r.author_name}
										style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 12 }}
									/>
								)}
								<div>
									<strong>{r.author_name}</strong>
									<div style={{ fontSize: '0.9em', color: '#666' }}>
										{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)} {r.rating}/5
										{r.relative_time_description && <span> · {r.relative_time_description}</span>}
									</div>
								</div>
							</div>
							{r.text && <div style={{ marginTop: 8, lineHeight: 1.5 }}>{r.text}</div>}
						</li>
					))}
				</ul>
			)}
			{place && (
				<a
					href={`https://search.google.com/local/writereview?placeid=${place.place_id}`}
					target="_blank"
					rel="noopener noreferrer"
					style={{ display: 'inline-block', marginTop: 16, color: '#1a73e8', textDecoration: 'none' }}
				>
					Write a review on Google →
				</a>
			)}
		</div>
	);
}

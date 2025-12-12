import React from 'react';

/**
 * LocalBusiness Schema Component
 * Generates JSON-LD structured data for SEO
 * https://schema.org/LocalBusiness
 */

export interface LocalBusinessSchemaProps {
	name: string;
	streetAddress: string;
	addressLocality: string;
	addressRegion: string;
	postalCode: string;
	addressCountry?: string;
	telephone: string;
	url: string;
	logo?: string;
	image?: string;
	openingHours?: string | string[];
	description?: string;
	email?: string;
	priceRange?: string;
	sameAs?: string[]; // Social media profiles
}

export function LocalBusinessSchema ({
	name,
	streetAddress,
	addressLocality,
	addressRegion,
	postalCode,
	addressCountry = 'United States',
	telephone,
	url,
	logo,
	image,
	openingHours,
	description,
	email,
	priceRange,
	sameAs
}: LocalBusinessSchemaProps) {
	const schemaData = {
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		name,
		address: {
			'@type': 'PostalAddress',
			streetAddress,
			addressLocality,
			addressRegion,
			postalCode,
			addressCountry
		},
		telephone,
		url,
		...(logo && { logo }),
		...(image && { image }),
		...(openingHours && { openingHours }),
		...(description && { description }),
		...(email && { email }),
		...(priceRange && { priceRange }),
		...(sameAs && sameAs.length > 0 && { sameAs })
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
		/>
	);
}

export default LocalBusinessSchema;

import React from 'react';

/**
 * Services Schema Component
 * Generates JSON-LD structured data for services
 * https://schema.org/Service
 */

export interface ServiceItem {
	name: string;
	description: string;
	url?: string;
	image?: string;
	areaServed?: string | string[];
}

export interface ServicesSchemaProps {
	provider: {
		name: string;
		url: string;
		logo?: string;
		telephone?: string;
		email?: string;
	};
	services: ServiceItem[];
}

export function ServicesSchema ({
	provider,
	services
}: ServicesSchemaProps) {
	const serviceObjects = services.map(service => ({
		'@type': 'Service',
		name: service.name,
		description: service.description,
		...(service.url && { url: service.url }),
		...(service.image && { image: service.image }),
		...(service.areaServed && { areaServed: service.areaServed }),
		provider: {
			'@type': 'LocalBusiness',
			name: provider.name,
			url: provider.url,
			...(provider.logo && { logo: provider.logo }),
			...(provider.telephone && { telephone: provider.telephone }),
			...(provider.email && { email: provider.email })
		}
	}));

	return (
		<>
			{serviceObjects.map((service, idx) => (
				<script
					key={idx}
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify({
						'@context': 'https://schema.org',
						...service
					}) }}
				/>
			))}
		</>
	);
}

export default ServicesSchema;

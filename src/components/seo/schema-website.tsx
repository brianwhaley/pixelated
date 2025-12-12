import React from 'react';

/**
 * Website Schema Component
 * Generates JSON-LD structured data for websites
 * https://schema.org/WebSite
 */

export interface WebsiteSchemaProps {
	name: string;
	url: string;
	description?: string;
	potentialAction?: {
		'@type': 'SearchAction';
		target: {
			'@type': 'EntryPoint';
			urlTemplate: string;
		};
		query?: string;
	};
}

export function WebsiteSchema ({
	name,
	url,
	description,
	potentialAction
}: WebsiteSchemaProps) {
	const schemaData = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name,
		url,
		...(description && { description }),
		...(potentialAction && { potentialAction })
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
		/>
	);
}

export default WebsiteSchema;

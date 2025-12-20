import React from 'react';
import type { BlogPostingSchema } from './schema-blogposting.functions';

interface SchemaBlogPostingProps {
	post: BlogPostingSchema;
}

export function SchemaBlogPosting({ post }: SchemaBlogPostingProps) {
	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(post),
			}}
		/>
	);
}

export default SchemaBlogPosting;

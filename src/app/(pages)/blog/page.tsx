"use client";

import React, { useEffect, useState } from 'react';
import { PageHeader } from '@brianwhaley/pixelated-components';
import { PageSection, GridItem } from '@brianwhaley/pixelated-components';
import { MicroInteractions } from "@brianwhaley/pixelated-components";
import { BlogPostCategories, BlogPostList } from '@brianwhaley/pixelated-components';
import { getWordPressCategories } from '@brianwhaley/pixelated-components';

const wpSite = "blog.pixelated.tech";

export default function Blog() {
	const [ wpCategories, setWpCategories ] = useState<string[]>([]);
	useEffect(() => {
		async function fetchCategories() {
			const categories = (await getWordPressCategories({ site: wpSite })) ?? [];
			if(categories) { 
				setWpCategories(categories);
			}
		}
		fetchCategories();
	}, []); 
	useEffect(() => {
		MicroInteractions({ 
			scrollfadeElements: '.tile , .blogPostSummary',
		});
	}, []); 

	return (
		<>
			<PageHeader title="Pixelated Technologies Blog Posts" />
			<PageSection columns={1} maxWidth="1024px" id="blog-section">
				<GridItem>
					<BlogPostCategories categories={wpCategories} />
				</GridItem>
				<BlogPostList site={wpSite} />
			</PageSection>
		</>
	);
    
}


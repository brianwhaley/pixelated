"use client";

import React, { useEffect, useState } from 'react';
import { PageHeader } from '@pixelated-tech/components';
import { PageSection, GridItem } from '@pixelated-tech/components';
import { MicroInteractions } from "@pixelated-tech/components";
import { BlogPostCategories, BlogPostList } from '@pixelated-tech/components';
import { getWordPressCategories } from '@pixelated-tech/components';

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


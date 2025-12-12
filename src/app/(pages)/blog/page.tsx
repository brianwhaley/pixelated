"use client";

import React, { useEffect, useState } from 'react';
import { PageTitleHeader } from '@pixelated-tech/components';
import { PageSection, PageGridItem } from '@pixelated-tech/components';
import { MicroInteractions } from "@pixelated-tech/components";
import { BlogPostCategories, BlogPostList } from '@pixelated-tech/components';
import { getWordPressCategories } from '@pixelated-tech/components';
import { useBlogPosts } from '@/app/providers/blog-posts-provider';

const wpSite = "blog.pixelated.tech";

export default function Blog() {
	const cachedPosts = useBlogPosts();
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
			scrollfadeElements: '.tile , .blog-post-summary',
		});
	}, []); 

	return (
		<>
			<PageTitleHeader title="Pixelated Technologies Blog Posts" />
			<PageSection columns={1} maxWidth="1024px" id="blog-section">
				<PageGridItem>
					<BlogPostCategories categories={wpCategories} />
				</PageGridItem>
				<BlogPostList site={wpSite} posts={cachedPosts} />
			</PageSection>
		</>
	);
}

"use client";

import React, { useEffect, useState } from 'react';
import { PageTitleHeader } from '@pixelated-tech/components';
import { PageSection, PageGridItem } from '@pixelated-tech/components';
import { MicroInteractions } from "@pixelated-tech/components";
import { BlogPostCategories, BlogPostList, type BlogPostType } from '@pixelated-tech/components';
import { getWordPressCategories } from '@pixelated-tech/components';
import { ToggleLoading } from '@pixelated-tech/components';
import { getCachedWordPressItems } from '@pixelated-tech/components';

const wpSite = "blog.pixelated.tech";
export default function Blog() {

	const [ wpCategories, setWpCategories ] = useState<string[]>([]);
	const [ wpPosts, setWpPosts ] = useState<BlogPostType[]>([]);

	useEffect(() => {
		ToggleLoading({show: true});
		(async () => {
			const posts = await getCachedWordPressItems({ site: wpSite }); // 1 week
			setWpPosts(posts ?? []);
			ToggleLoading({show: false});
		})();
		getWordPressCategories({ site: wpSite }).then((categories) => {
			setWpCategories(categories ?? []);
		});
	}, []);
	
	useEffect(() => {
		MicroInteractions({ 
			scrollfadeElements: '.tile , .blogPostSummary',
		});
	}, [wpPosts]); 

	return (
		<>
			<PageTitleHeader title="Pixelated Technologies Blog Posts" />
			<PageSection columns={1} maxWidth="1024px" id="blog-section">
				<PageGridItem>
					<BlogPostCategories categories={wpCategories} />
				</PageGridItem>
				<BlogPostList site={wpSite} posts={wpPosts} />
			</PageSection>
		</>
	);
}
"use client";

import React, { useEffect, useState } from 'react';
import { PageTitleHeader } from '@pixelated-tech/components';
import { PageSection, PageGridItem } from '@pixelated-tech/components';
import { MicroInteractions } from "@pixelated-tech/components";
import { BlogPostCategories, BlogPostList, type BlogPostType } from '@pixelated-tech/components';
import { getWordPressCategories, getWordPressItems, mapWordPressToBlogPosting, SchemaBlogPosting } from '@pixelated-tech/components';
import { ToggleLoading } from '@pixelated-tech/components';

const wpSite = "blog.pixelated.tech";

export default function Blog() {
	const [ wpCategories, setWpCategories ] = useState<string[]>([]);
	const [ wpPosts, setWpPosts ] = useState<BlogPostType[]>([]);
	const [ wpSchemas, setWpSchemas ] = useState<any[]>([]);
	useEffect(() => {
		async function fetchPosts() {
	        ToggleLoading({show: true});
			const posts = (await getWordPressItems({ site: wpSite })) ?? [];
			if(posts) { 
				const myPosts = posts.sort((a, b) => ((a.date ?? '') < (b.date ?? '')) ? 1 : -1);
				setWpPosts(myPosts);
				setWpSchemas(myPosts.map(post => mapWordPressToBlogPosting(post, false)));
	            ToggleLoading({show: false});
			}
		}
		fetchPosts();
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
	}, [wpPosts]); 

	return (
		<>
			{ wpSchemas.map((schema, index) => (
				<SchemaBlogPosting key={index} post={schema} />
			)) }
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
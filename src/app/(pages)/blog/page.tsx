/* eslint-disable @typescript-eslint/no-explicit-any */
 
"use client";

import React, { useEffect, useState } from 'react';
import { PageHeader } from '@brianwhaley/pixelated-components';
import { PageSection, GridItem } from '@brianwhaley/pixelated-components';
import { MicroInteractions } from "@brianwhaley/pixelated-components";
import { BlogPostSummary, BlogPostCategories } from '@brianwhaley/pixelated-components';
import { getWordPressItems, getWordPressCategories } from '@brianwhaley/pixelated-components';
import { Loading, ToggleLoading } from '@brianwhaley/pixelated-components';


const wpSite = "blog.pixelated.tech";


export default function Blog() {
	const [ wpPosts, setWpPosts ] = useState<any[]>([]);
	const [ wpCategories, setWpCategories ] = useState<string[]>([]);

	useEffect(() => {
		async function fetchPosts() {
	        ToggleLoading({show: true});
			const posts = (await getWordPressItems({ site: wpSite })) ?? [];
			if(posts) { 
				const myPosts = posts.sort((a, b) => ((a.date ?? '') < (b.date ?? '')) ? 1 : -1);
				setWpPosts(myPosts);
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
			<PageHeader title="Pixelated Technologies Blog Posts" />
			<PageSection columns={1} maxWidth="1024px" id="blog-section">
				<GridItem>
					<BlogPostCategories categories={wpCategories} />
				</GridItem>
				{wpPosts.map((post, index) => (
					<GridItem key={index + "-" + post.id}>
						<BlogPostSummary
							ID={post.id}
							title={post.title}
							date={post.date}
							excerpt={post.excerpt}
							URL={post.URL}
							categories={post.categories} />
					</GridItem>
				))}
			</PageSection>
			<Loading />
		</>
	);
    
}


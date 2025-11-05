/* eslint-disable @typescript-eslint/no-explicit-any */
 
"use client";

import React, { useEffect, useState } from 'react';
import { PageHeader } from '@brianwhaley/pixelated-components';
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
			<section id="portfolio-section">
				<div className='section-container'>
					<PageHeader title="Pixelated Technologies Blog Posts" />
					<div className="row-12col">
						<div className="gridItem grid-s2-e10">
							<BlogPostCategories categories={wpCategories} />
						</div>
						{wpPosts.map((post, index) => (
							<div className="gridItem grid-s2-e10" key={index + "-" + post.id}>
								<BlogPostSummary
									ID={post.id}
									title={post.title}
									date={post.date}
									excerpt={post.excerpt}
									URL={post.URL}
									categories={post.categories} />
							</div>
						))}
					</div>
				</div>
			</section>
			<Loading />
		</>
	);
    
}


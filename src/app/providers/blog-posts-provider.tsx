'use client';

import React, { createContext, useContext } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import type { BlogPostType } from '@pixelated-tech/components';

interface BlogPostsContextType {
	posts: BlogPostType[];
}

const BlogPostsContext = createContext<BlogPostsContextType | undefined>(undefined);

/**
 * BlogPostsProvider - Context provider for blog posts
 * @param children - React children components
 * @param posts - Array of blog post objects
 */
BlogPostsProvider.propTypes = {
	children: PropTypes.node.isRequired,
	posts: PropTypes.array.isRequired
};
export type BlogPostsProviderType = InferProps<typeof BlogPostsProvider.propTypes>;
export function BlogPostsProvider(props: BlogPostsProviderType) {
	/* { children, posts }: { children: React.ReactNode; posts: any[] } */
	const { children, posts } = props;
	return (
		<BlogPostsContext.Provider value={{ posts }}>
			{children}
		</BlogPostsContext.Provider>
	);
}

export function useBlogPosts() {
	const context = useContext(BlogPostsContext);
	if (!context) {
		throw new Error('useBlogPosts must be used within BlogPostsProvider');
	}
	return context.posts;
}

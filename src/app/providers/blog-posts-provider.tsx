'use client';

import React, { createContext, useContext } from 'react';
import type { BlogPostType } from '@pixelated-tech/components';

interface BlogPostsContextType {
	posts: BlogPostType[];
}

const BlogPostsContext = createContext<BlogPostsContextType | undefined>(undefined);

export function BlogPostsProvider({ 
	children, 
	posts 
}: { 
	children: React.ReactNode; 
	posts: BlogPostType[];
}) {
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

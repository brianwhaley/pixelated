import React, { useEffect, useState } from 'react';
import { BlogPostSummary } from '@/components/cms/wordpress.components';
import { PixelatedClientConfigProvider } from '@/components/config/config.client';
import { getWordPressItems } from '@/components/cms/wordpress.functions';

const mockConfig = {
	cloudinary: {
		product_env: 'dlbon7tpq',
		baseUrl: 'https://res.cloudinary.com',
		transforms: 'f_auto,c_limit,q_auto,dpr_auto',
	},
};

export default {
    title: 'CMS',
    component: BlogPostSummary,
	decorators: [
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(Story) => (
			<PixelatedClientConfigProvider config={mockConfig}>
				<Story />
			</PixelatedClientConfigProvider>
		),
	],
};

export function WordpressBlogPostSummary() {
	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let mounted = true;
		setLoading(true);
		getWordPressItems({ site: 'blog.pixelated.tech', count: 1 })
			.then((posts) => {
				if (!mounted) return;
				setPost(posts?.[0] ?? null);
			})
			.catch((fetchError) => {
				console.error('Fetching latest WordPress post failed', fetchError);
				if (mounted) setError('Unable to load the latest post.');
			})
			.finally(() => {
				if (mounted) setLoading(false);
			});
		return () => {
			mounted = false;
		};
	}, []);

	if (loading) {
		return <div>Loading the latest WordPress post…</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	if (!post) {
		return <div>No post available.</div>;
	}

	return <BlogPostSummary {...post} />;
}

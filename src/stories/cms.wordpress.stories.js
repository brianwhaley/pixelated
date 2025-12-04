import React from 'react';
import { BlogPostSummary } from '../components/cms/wordpress.components';
import { PixelatedClientConfigProvider } from '../components/config/config.client';

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

const samplePost = {
    ID: '706',
    title: 'Why Content Is So Important for Small Businesses',
    date: new Date("2025-11-07T09:00:00-05:00").toISOString(),
    excerpt: '<p>In today’s digital landscape, content is far more than just words on a webpage or a social-media post. For a small business, content is the engine that drives visibility, engagement, trust and growth. Whether it’s the articles on your website, posts on social media, or communications with customers, good content underpins nearly every facet of [&hellip;]</p>\n',
    URL: "http://blog.pixelated.tech/2025/11/07/why-content-is-so-important-for-small-businesses/",
    // categories: ['seo', 'ui-ux', 'web-analytics', 'web-dev'],
    categories: { "SEO":{}, "UI / UX": {}, "Web Analytics": {}, "Web Dev": {} },
    featured_image: 'https://blog.pixelated.tech/wp-content/uploads/2025/11/map-lying-wooden-table.jpg?w=624',
};

export const WordpressBlogPostSummary = {
    args: samplePost,
};

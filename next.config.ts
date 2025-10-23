import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	transpilePackages: ['@brianwhaley/pixelated-components'],
	trailingSlash: false,
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https", 
				hostname: "www.palmetto-epoxy.com", 
			},
			{
				protocol: "https", 
				hostname: "images.ctfassets.net/", 
			},
		],
	},


	async redirects() {
		return [
			{ source: '/cart', destination: '/', permanent: true, },
			{ source: '/home', destination: '/', permanent: true, },
			{ source: '/donate', destination: '/', permanent: true, },
			{ source: '/services-5', destination: '/', permanent: true, },
			{ source: '/blog', destination: '/', permanent: true, },
			{ source: '/projects/category/Culture', destination: '/projects', permanent: true, },
			{ source: '/projects/category/Health', destination: '/projects', permanent: true, },
			{ source: '/projects/category/Relationships', destination: '/projects', permanent: true, },
			{ source: '/projects/tag/Jobs', destination: '/projects', permanent: true, },
			{ source: '/projects/the-beauty-vault-salon-june-2024', destination: '/projects/the%20beauty%20vault%20salon%20june%202024', permanent: true, },
		];
	},

	turbopack: {},
	// webpack5: true,
	webpack: (config) => {
		config.resolve.fallback = { 
			fs: false,
			path: false
		};
		return config;
	},

};

export default nextConfig;

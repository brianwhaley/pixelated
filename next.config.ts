import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
    	optimizeCss: false,
  	},
	transpilePackages: ['@pixelated-tech/components'],
	trailingSlash: false,
	typescript: {
		ignoreBuildErrors: true,
	},
	env: {
		PIXELATED_CONFIG_KEY: process.env.PIXELATED_CONFIG_KEY,
	},
	images: {
    	minimumCacheTTL: 86400, // 1 day 15552000, // 6 months
		remotePatterns: [
			{
				protocol: 'https', // Or 'http' if needed, but 'https' is recommended
				hostname: '**', // Allows any hostname
				port: '', // Optional: specify port if needed
				pathname: '**', // Optional: allows any pathname
			},
		],
	},

	async redirects() {
		return [
			{ source: '/buzzwordbingo', destination: '/', permanent: true, },
			{ source: '/contact', destination: '/schedule', permanent: true, },
			{ source: '/contactus', destination: '/schedule', permanent: true, },
			{ source: '/customsgallery', destination: '/portfolio', permanent: true, },
			{ source: '/customsgallery.html', destination: '/portfolio', permanent: true, },
			{ source: '/customsunglasses', destination: '/portfolio', permanent: true, },
			{ source: '/customsunglasses.html', destination: '/portfolio', permanent: true, },
			{ source: '/designgallery', destination: '/portfolio', permanent: true, },
			{ source: '/ebay', destination: '/', permanent: true, },
			{ source: '/gallery.html', has: [ { type: 'query', key: 'tag', value: 'customsunglasses' } ], destination: '/portfolio', permanent: true, },
			{ source: '/gallery.html', has: [ { type: 'query', key: 'tag', value: 'pixelatedviewsgallery' } ], destination: '/portfolio', permanent: true, },
			{ source: '/homedesign', destination: '/', permanent: true, },
			{ source: '/index.html', destination: '/', permanent: true, },
			{ source: '/joke', destination: '/nerdjokes', permanent: true, },
			{ source: '/mycustoms', destination: '/', permanent: true, },
			{ source: '/mycustoms.html', destination: '/', permanent: true, },
			{ source: '/nerdjokes.html', destination: '/nerdjokes', permanent: true, },
			{ source: '/photogallery', destination: '/portfolio', permanent: true, },
			{ source: '/photogallery.html', destination: '/portfolio', permanent: true, },
			{ source: '/photography.html', destination: '/portfolio', permanent: true, },
			{ source: '/readme', destination: '/', permanent: true, },
			{ source: '/readme.html', destination: '/', permanent: true, },
			{ source: '/recipes', destination: '/', permanent: true, },
			{ source: '/recipes.html', destination: '/', permanent: true, },
			{ source: '/requests', destination: '/schedule', permanent: true, },
			{ source: '/requests.html', destination: '/schedule', permanent: true, },
			{ source: '/resume', destination: '/resume', permanent: true, },
			{ source: '/resume.html', destination: '/resume', permanent: true, },
			{ source: '/store', destination: '/', permanent: true, },
			{ source: '/store/:slug', destination: '/', permanent: true, },
			{ source: '/store/:slug*', destination: '/', permanent: true, },
			{ source: '/socialmedia.html', destination: '/', permanent: true, },
			{ source: '/subscribe', destination: '/schedule', permanent: true, },
			{ source: '/stkr.html', destination: '/stkr', permanent: true, },
			{ source: '/workoverview', destination: '/portfolio', permanent: true, },
			{ source: '/workportfolio', destination: '/portfolio', permanent: true, },
			{ source: '/workportfolio.html', destination: '/portfolio', permanent: true, },
		];
	},

	turbopack: {
		root: __dirname,
	},
	webpack: (config) => {
		config.resolve.fallback = { 
			fs: false,
			path: false
		};
		return config;
	},

};

export default nextConfig;

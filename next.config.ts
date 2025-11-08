import type { NextConfig } from "next";

const nextConfig: NextConfig = {

	/* config options here */
	experimental: {
    	optimizeCss: true,
  	},
	transpilePackages: ['@brianwhaley/pixelated-components'],
	trailingSlash: false,
	typescript: {
		ignoreBuildErrors: true,
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
			{ source: '/socialmedia.html', destination: '/', permanent: true, },
			{ source: '/subscribe', destination: '/schedule', permanent: true, },
			{ source: '/stkr.html', destination: '/stkr', permanent: true, },
			{ source: '/workoverview', destination: '/portfolio', permanent: true, },
			{ source: '/workportfolio', destination: '/portfolio', permanent: true, },
			{ source: '/workportfolio.html', destination: '/portfolio', permanent: true, },
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
	// output:'export'

};

export default nextConfig;

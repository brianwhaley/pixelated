import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  
	/* config options here */
	transpilePackages: ['@brianwhaley/pixelated-components'],
	trailingSlash: false,
	typescript: {
		ignoreBuildErrors: true,
	},


	async redirects() {
		return [
			{ source: '/customsunglasses.html', destination: '/customsunglasses', permanent: true, },
			{ source: '/gallery.html', has: [ { type: 'query', key: 'tag', value: 'customsunglasses' } ], destination: '/customsunglasses', permanent: true, },
			{ source: '/gallery.html', has: [ { type: 'query', key: 'tag', value: 'pixelatedviewsgallery' } ], destination: '/photogallery', permanent: true, },
			{ source: '/index.html', destination: '/', permanent: true, },
			{ source: '/joke', destination: '/nerdjokes', permanent: true, },
			{ source: '/mycustoms.html', destination: '/mycustoms', permanent: true, },
			{ source: '/photogallery.html', destination: '/photogallery', permanent: true, },
			{ source: '/photography.html', destination: '/photography', permanent: true, },
			{ source: '/recipes.html', destination: '/recipes', permanent: true, },
			{ source: '/requests.html', destination: '/requests', permanent: true, },
		];
	},


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

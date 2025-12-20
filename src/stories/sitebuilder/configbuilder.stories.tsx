import { ConfigBuilder } from '@/components/sitebuilder/config/ConfigBuilder';

// Function to download JSON file
const downloadJsonFile = (data: any, filename: string) => {
	const jsonString = JSON.stringify(data, null, 2);
	const blob = new Blob([jsonString], { type: 'application/json' });
	const url = URL.createObjectURL(blob);

	const link = document.createElement('a');
	link.href = url;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);

	URL.revokeObjectURL(url);
};

export default {
	title: 'SiteBuilder/Config',
	component: ConfigBuilder
};

export const ConfigBuilderUI = {
	args: {
		initialConfig: {
			siteInfo: {
				name: 'My Awesome Site',
				author: 'Jane Developer',
				description: 'A comprehensive site configuration example',
				url: 'https://myawesomesite.com',
				email: 'hello@myawesomesite.com',
				favicon: '/favicon.ico',
				favicon_sizes: '64x64 32x32 24x24 16x16',
				favicon_type: 'image/x-icon',
				theme_color: '#ff6b6b',
				background_color: '#ffffff',
				default_locale: 'en',
				display: 'standalone',
				image: '/images/og-image.jpg',
				image_height: '1200',
				image_width: '630',
				telephone: '+1-555-EXAMPLE',
				priceRange: '$$',
				keywords: 'web development, react, typescript',
				address: {
					streetAddress: '456 Tech Street',
					addressLocality: 'San Francisco',
					addressRegion: 'CA',
					postalCode: '94105',
					addressCountry: 'US'
				},
				sameAs: ['https://twitter.com/myawesomesite', 'https://github.com/myawesomesite']
			},
			routes: [
				{ path: '/', component: 'HomePage', title: 'Home', description: 'Welcome to our site' },
				{ path: '/about', component: 'AboutPage', title: 'About', description: 'Learn about our company' },
				{ path: '/services', component: 'ServicesPage', title: 'Services', description: 'What we offer' },
				{ path: '/contact', component: 'ContactPage', title: 'Contact', description: 'Get in touch' },
			],
		},
		onSave: (config: any) => {
			downloadJsonFile(config, 'routes.json');
		}
	},
};
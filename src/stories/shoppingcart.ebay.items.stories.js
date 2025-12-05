import React from 'react';
import { EbayItems } from '../components/shoppingcart/ebay.components';
import { PixelatedClientConfigProvider } from '../components/config/config.client';
import '../components/shoppingcart/ebay.css';
import '../css/pixelated.global.css';

const mockConfig = {
	cloudinary: {
		product_env: 'dlbon7tpq',
		baseUrl: 'https://res.cloudinary.com',
		transforms: 'f_auto,c_limit,q_auto,dpr_auto',
	},
};

export default {
	title: 'ShoppingCart',
	component: EbayItems,
	decorators: [
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(Story) => (
			<PixelatedClientConfigProvider config={mockConfig}>
				<Story />
			</PixelatedClientConfigProvider>
		),
	],
};

export const EbayItemsGrid = {
	args: {
		apiProps: {
			proxyURL: "https://proxy.pixelated.tech/prod/proxy?url=",
			qsSearchURL: '?q=sunglasses&fieldgroups=FULL&category_ids=79720&aspect_filter=categoryId:79720&filter=sellers:{pixelatedtech}&sort=newlyListed&limit=200',
			appId: 'BrianWha-Pixelate-PRD-1fb4458de-1a8431fe', // clientId
			appCertId: 'PRD-fb4458deef01-0d54-496a-b572-a04b', // clientSecret
			tokenScope: 'https://api.ebay.com/oauth/api_scope',
			globalId: 'EBAY-US',
		},
		cloudinaryProductEnv: "dzjibwmev",
	}
};

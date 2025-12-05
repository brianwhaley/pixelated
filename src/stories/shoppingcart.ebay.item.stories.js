import React from 'react';
import { EbayItemDetail } from '../components/shoppingcart/ebay.components';
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
	component: EbayItemDetail,
	decorators: [
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(Story) => (
			<PixelatedClientConfigProvider config={mockConfig}>
				<Story />
			</PixelatedClientConfigProvider>
		),
	],
};

export const EbayItemDetailPage = {
	args: {
		apiProps: {
			proxyURL: "https://proxy.pixelated.tech/prod/proxy?url=",
			qsItemURL: '/v1|295959752403|0?fieldgroups=PRODUCT,ADDITIONAL_SELLER_DETAILS',
			appId: 'BrianWha-Pixelate-PRD-1fb4458de-1a8431fe', // clientId
			appCertId: 'PRD-fb4458deef01-0d54-496a-b572-a04b', // clientSecret
			tokenScope: 'https://api.ebay.com/oauth/api_scope',
			globalId: 'EBAY-US',
		},
		cloudinaryProductEnv: "dzjibwmev",
	}
};

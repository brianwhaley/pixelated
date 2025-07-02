import { EbayItemDetail } from '../components/ebay/pixelated.ebay.components';
import '../components/ebay/pixelated.ebay.css';
import '../css/pixelated.global.css';

export default {
	title: 'Ebay',
	component: EbayItemDetail
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

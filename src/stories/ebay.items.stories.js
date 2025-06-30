import { EbayItems } from '../components/ebay/pixelated.ebay.components';
import '../components/ebay/pixelated.ebay.css';
import '../css/pixelated.global.css';

export default {
	title: 'Ebay',
	component: EbayItems
};

export const EbayItemsGrid = {
	args: {
		apiProps: {
			proxyURL: "https://proxy.pixelated.tech/prod/proxy?url=",
			qsSearchURL: '?q=sunglasses&fieldgroups=full&category_ids=79720&aspect_filter=categoryId:79720&filter=sellers:{pixelatedtech}&sort=newlyListed&limit=200',
			appId: 'BrianWha-Pixelate-PRD-1fb4458de-1a8431fe', // clientId
			appCertId: 'PRD-fb4458deef01-0d54-496a-b572-a04b', // clientSecret
			tokenScope: 'https://api.ebay.com/oauth/api_scope',
			globalId: 'EBAY-US',
		}
	}
};

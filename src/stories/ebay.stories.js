import { EbayItems } from '../components/ebay/pixelated.ebay';
import '../components/ebay/pixelated.ebay.css';
import '../css/pixelated.less';

export default {
	title: 'Ebay Items',
	component: EbayItems
};

export const Primary = {
	args: {
		ebayProps: {
			proxyURL: "https://api.codetabs.com/v1/proxy/?quest=",
			// proxyURL: 'https://x3cf4kv0nk.execute-api.us-east-2.amazonaws.com/prod/proxy?url=',
			// proxyURL: 'https://corsproxy.io/?',
			// proxyURL: 'https://proxy.pixelated.tech/prod/proxy?url=',
			baseURL: 'https://api.ebay.com/buy/browse/v1/item_summary/search?q=sunglasses&filter=sellers:{btw73}&limit=10', // ebay api endpoint
			/* urlProps: {
				'q': 'sunglasses',
				'filter': 'sellers:{btw73}',
				limit: 10,
			}, */
			headers: { 
				'Authorization': 'Bearer v^1.1#i^1#f^0#p^3#I^3#r^1#t^Ul4xMF81OjJDQkZGMTA5ODVBN0MwRTA2RkVDQTE3RkNFMzhEMzlCXzFfMSNFXjI2MA==',
              	'X-Marketplace-Id':'EBAY-US',
			}
		}
	}
};

import { EbayItems } from '../components/ebay/pixelated.ebay'
import '../components/ebay/pixelated.ebay.css'

export default {
	title: 'Ebay Items',
	component: EbayItems
}

export const Primary = {
	args: {
		ebayProps: {
			// proxyURL: 'https://api.codetabs.com/v1/proxy/?quest=',
			// proxyURL: 'https://x3cf4kv0nk.execute-api.us-east-2.amazonaws.com/prod/proxy?url=',
			proxyURL: 'https://corsproxy.io/?',
			baseURL: 'https://svcs.ebay.com/services/search/FindingService/v1?',
			urlProps: {
				'OPERATION-NAME': 'findItemsByKeywords',
				'SERVICE-NAME': 'FindingService',
				'SERVICE-VERSION': '1.13.0',
				'SECURITY-APPNAME': 'BrianWha-Pixelate-PRD-1fb4458de-1a8431fe',
				'SECURITY-APPID': 'BrianWha-Pixelate-PRD-1fb4458de-1a8431fe',
				APPNAME: 'BrianWha-Pixelate-PRD-1fb4458de-1a8431fe',
				APPID: 'BrianWha-Pixelate-PRD-1fb4458de-1a8431fe',
				'GLOBAL-ID': 'EBAY-US',
				'RESPONSE-DATA-FORMAT': 'JSON',
				'REST-PAYLOAD': '',
				// "REQUEST-DATA-FORMAT": "XML",
				// "MESSAGE-PROTOCOL": "SOAP12",
				// "MESSAGE-ENCODING": "UTF-8",
				keywords: 'sunglasses',
				outputSelector: 'PictureURLSuperSize',
				'paginationInput.entriesPerPage': 10,
				'paginationInput.pageNumber': 1,
				sortOrder: 'StartTimeNewest',
				'itemFilter(0).name': 'Seller',
				'itemFilter(0).value': 'btw73'
			}
		}
	}
}

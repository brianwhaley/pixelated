import React, { Component } from "react";
import { EbayItems } from "@brianwhaley/pixelated-components";

export default class Ebay extends Component {
	render() {
		let ebayProps = {
			// proxyURL: 'https://api.codetabs.com/v1/proxy/?quest=',
			// proxyURL: 'https://x3cf4kv0nk.execute-api.us-east-2.amazonaws.com/prod/proxy?url=',
			proxyURL: "https://corsproxy.io/?",
			baseURL: "https://svcs.ebay.com/services/search/FindingService/v1?",
			urlProps: {
				"OPERATION-NAME": "findItemsByKeywords",
				"SERVICE-VERSION": "1.0.0",
				"SECURITY-APPNAME": "BrianWha-Pixelate-PRD-1fb4458de-1a8431fe",
				"GLOBAL-ID": "EBAY-US",
				"RESPONSE-DATA-FORMAT": "JSON",
				"REST-PAYLOAD": "",
				"keywords": "sunglasses",
				"outputSelector": "PictureURLSuperSize",
				"paginationInput.entriesPerPage": 10,
				"paginationInput.pageNumber": 1,
				"sortOrder": "StartTimeNewest",
				"itemFilter(0).name": "Seller",
				"itemFilter(0).value": "btw73"
			}
		};
		return (
			<EbayItems ebayProps={ebayProps} />
		);
	}
}

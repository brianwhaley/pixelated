import React, { Component } from "react";
import { EbayItems } from "@brianwhaley/pixelated-components/dist/index";
import "@brianwhaley/pixelated-components/dist/css/pixelated.ebay.css";


export default class Ebay extends Component {
	render() {
		let ebayProps = {
			proxyURL: "https://api.codetabs.com/v1/proxy/?quest=",
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

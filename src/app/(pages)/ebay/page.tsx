"use client";

import React from "react";
import { EbayItems } from "@/app/components/ebay/pixelated.ebay";

export default function Ebay() {
	const ebayProps = {
		// proxyURL: 'https://api.codetabs.com/v1/proxy/?quest=',
		// proxyURL: 'https://x3cf4kv0nk.execute-api.us-east-2.amazonaws.com/prod/proxy?url=',
		// proxyURL: "https://corsproxy.io/?",
		// proxyURL : "https://thingproxy.freeboard.io/fetch/",
		proxyURL: 'https://proxy.pixelated.tech/prod/proxy?url=',
		baseURL: "https://svcs.ebay.com/services/search/FindingService/v1?",
		// baseURL : "https%3A%2F%2Fsvcs.ebay.com%2Fservices%2Fsearch%2FFindingService%2Fv1%3FOPERATION-NAME%3DfindItemsByKeywords%26SERVICE-VERSION%3D1.0.0%26SECURITY-APPNAME%3DBrianWha-Pixelate-PRD-1fb4458de-1a8431fe%26GLOBAL-ID%3DEBAY-US%26RESPONSE-DATA-FORMAT%3DJSON%26REST-PAYLOAD%3D%26keywords%3Dsunglasses%26outputSelector%3DPictureURLSuperSize%26paginationInput.entriesPerPage%3D10%26paginationInput.pageNumber%3D1%26sortOrder%3DStartTimeNewest%26itemFilter(0).name%3DSeller%26itemFilter(0).value%3Dbtw73",
		
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

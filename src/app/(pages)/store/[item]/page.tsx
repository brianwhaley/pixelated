"use client";

import React, { use } from 'react';
import { EbayItemDetail } from "@brianwhaley/pixelated-components";

export default function EbayItem({params}: { params: Promise<{ item: string }> }){

	const { item } = use(params);
	console.log(item);

	const apiProps = {
		proxyURL: "https://proxy.pixelated.tech/prod/proxy?url=",
		qsItemURL: `/v1|${item}|0?fieldgroups=PRODUCT,ADDITIONAL_SELLER_DETAILS`,
		appId: 'BrianWha-Pixelate-PRD-1fb4458de-1a8431fe', // clientId
		appCertId: 'PRD-fb4458deef01-0d54-496a-b572-a04b', // clientSecret
		tokenScope: 'https://api.ebay.com/oauth/api_scope',
		globalId: 'EBAY-US',
	};

	return (
		<>
			<EbayItemDetail apiProps={apiProps} />
		</>
		
	);
}

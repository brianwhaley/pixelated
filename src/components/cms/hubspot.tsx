
import React from 'react';
import PropTypes, { InferProps } from 'prop-types';

HubspotTrackingCode.propTypes = {
	hubID: PropTypes.string.isRequired,
};
export type HubspotTrackingCodeType = InferProps<typeof HubspotTrackingCode.propTypes>;
export function HubspotTrackingCode(props: HubspotTrackingCodeType) {
	return (
		<>
			{ /* <!-- Start of HubSpot Embed Code --> */ }
			<script type="text/javascript" id="hs-script-loader" async defer src={`//js-na2.hs-scripts.com/${props.hubID}.js`} />
			{ /* <!-- End of HubSpot Embed Code -->*/ }
		</>
	);
}


getHubspotFormSubmissions.propTypes = {
	proxyURL: PropTypes.string.isRequired,
	formGUID: PropTypes.string.isRequired,
	apiToken: PropTypes.string.isRequired,
};
export type getHubspotFormSubmissionsType = InferProps<typeof getHubspotFormSubmissions.propTypes>;
export async function getHubspotFormSubmissions(props: getHubspotFormSubmissionsType) {
	const url = `${props.proxyURL}https://api.hubapi.com/form-integrations/v1/submissions/forms/${props.formGUID}`;
	const headers = {
		Authorization: "Bearer " + props.apiToken,
	};
	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: headers,
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching HubSpot form submissions:', error);
		return null;
	}
}

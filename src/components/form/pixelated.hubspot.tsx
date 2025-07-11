
import React from 'react';
import PropTypes, { InferProps } from 'prop-types';

/* PixelVivid HubSpot Account ID : 243048355 */

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
	// #newRequestForm = 7e9a928d-7905-4acf-9f07-c3db3a48619b
	// pat-na2-1464563d-1cf4-4b72-8ed0-3a38983d3456
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

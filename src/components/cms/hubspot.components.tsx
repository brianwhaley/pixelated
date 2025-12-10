'use client';

import React, { useEffect } from 'react';
import PropTypes, { InferProps } from 'prop-types';




export function initializeHubSpotScript(region: string, portalId: string) {
	if (typeof document === 'undefined') return;
	const scriptId = `hubspot-script-${region}-${portalId}`;
	if (document.getElementById(scriptId)) return;
	const script = document.createElement('script');
	script.id = scriptId;
	script.src = `https://js-${region}.hsforms.net/forms/embed/${portalId}.js`;
	// script.async = true;
	script.defer = true;
	document.head.appendChild(script);
}

HubSpotForm.propTypes = {
	region: PropTypes.string.isRequired,
	portalId: PropTypes.string.isRequired,
	formId: PropTypes.string.isRequired,
	target: PropTypes.string,
	containerId: PropTypes.string,
};
type HubSpotFormType = InferProps<typeof HubSpotForm.propTypes>;
export function HubSpotForm({
	region, portalId, formId, target, containerId = 'hubspot-form-container'
}: HubSpotFormType) {
	const formTarget = target || `#${containerId}`;
	useEffect(() => {
		const createHubspotForm = () => {
			const win = window as any;
			if (win.hbspt && win.hbspt.forms) {
				win.hbspt.forms.create({
					region,
					portalId,
					formId,
					target: formTarget
				});
			} else {
				// no window object yet; this will rerun again
			}
		};
		createHubspotForm();
	}, [region, portalId, formId, formTarget]);

	return <div 
		className="hs-form-frame" 
		data-region={region} 
		data-form-id={formId}
		data-portal-id={portalId} 
	/>;
}




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

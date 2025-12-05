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

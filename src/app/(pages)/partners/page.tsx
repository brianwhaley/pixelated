"use client";

import React from 'react';
import { PageTitleHeader, PageSectionHeader, PageSection, PageGridItem, PageFlexItem } from '@pixelated-tech/components';
import { Callout } from '@pixelated-tech/components';

// https://www.invoiceberry.com/blog/top-57-us-business-directories-to-get-your-small-business-noticed/
// https://www.brightlocal.com/resources/top-citation-sites/location/usa-free/

import partnerData from '@/app/data/partners.json';

export default function Partners() {
	const cssContent = `
		.callout .callout-content {
    		margin: 0 auto;
    		font-size: var(--font-size5);
		}
	`;
	
	return (
		<>
			<style id="dynamic-styles" dangerouslySetInnerHTML={{ __html: cssContent }} />
			<PageTitleHeader title="Pixelated Technologies Partners" />
			<br />
			<PageSectionHeader title="Find us on these platforms" />
			<PageSection columns={12} maxWidth="1024px" id="partners-section">
				{ partnerData.partners.map((partner, index) => {
					if (!partner.url) return null;
					return (
						<PageGridItem key={index}>
							<PartnersBadge name={partner.name} url={partner.url} img={partner.img ?? ''} />
						</PageGridItem>
					);
				})}
			</PageSection>
		</>
	);
}




function PartnersBadge({ name, url, img }: { name: string; url: string; img: string; }) {
	{ /* <li><a href="https://akama.com/company/Pixelated_Technologies_a28773951767.html"  target="_blank" rel="noopener noreferrer">Akama</a></li> */ }

	const myimg = (img) ? img : (() => {
		const domainBits = new URL(url).hostname.split('.');
		let domain = (domainBits.length <= 2) ? domainBits[0] :
			(domainBits.length > 2) ? domainBits.slice(1, -1).join('.') : domainBits.join('.');
		domain = domain.charAt(0).toUpperCase() + domain.slice(1).toLowerCase();
		return `/images/logos/${domain.toLowerCase()}-logo.png`;
	})();

	return (
		<PageFlexItem>
			<Callout variant="full" imgShape="squircle" layout="vertical" 
				url={url} img={myimg} imgAlt={`Pixelated Technologies on ${name}`} content={name} />
		</PageFlexItem>
	);
}
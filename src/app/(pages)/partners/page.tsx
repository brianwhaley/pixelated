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

			<style
				id="dynamic-styles" // Adding an ID can help manage the tag
				dangerouslySetInnerHTML={{ __html: cssContent }}
			/>

			<PageTitleHeader title="Pixelated Technologies Partners" />
			<br />

			<PageSectionHeader title="Find us on these platforms" />
			<PageSection columns={12} maxWidth="1024px" id="partners-section">
				{ partnerData.partners.map((partner, index) => {
					return (
						<PageGridItem key={index}>
							<PartnersBadge name={partner.name} url={partner.url} img={partner.img ?? ''} />
						</PageGridItem>
					);
				})}
			</PageSection>


			{ /* <PageSectionHeader title="Find us on these platforms soon!" />
					<ul>
						https://topdevelopers.co/
						https://itfirms.co/
						https://njbiz.com/
						https://themanifest.com/
						https://rutgersfoundation.org/alumni-owned-business-marketplace-directory
						https://www.bingplaces.com/
						https://www.morristown-nj.org/
						https://www.downtownmorrisplains.org/directory
						https://citylocalpro.com/add-your-business
						https://njbusinessdirectory.org/
						https://localpages.com/business-listing/edit?id=171366
						https://www.macraesbluebook.com/UserCenter/login.cfm
						http://www.myhuckleberry.com/signin.aspx

						https://guidetosouthcarolina.com/denville/business-consulting/pixelated-technologies
						https://www.bbb.org/get-listed
						https://hhibusiness.com/listings/create/
						https://www.yellowpages.com/claim-your-listing
						https://scbizdev.sccommerce.com/suppliers/become-part-sourcesc

					</ul> */ }

			{ /* <PageSectionHeader title="To Do" /> 

						https://www.allpages.com/about/listings-modification.html
						https://www.bbb.org/
						https://www.bbb.org/get-accredited 
						https://www.bestofnj.com/
						https://www.callupcontact.com/active/register/register.php?
						https://www.cloudtango.net/providers/get-listed/
						https://brands.consumeraffairs.com/
						https://www.corfacts.com/
						https://corporation.directory/register
						https://local-listings.data-axle.com/search // CITYSEARCH
						https://elioplus.com/free-sign-up
						https://www.expertise.com/
						https://www.expressbusinessdirectory.com/
						https://www.g2.com/review
						https://www.gartner.com/en/digital-markets/capterra-provider-signup
						https://www.hiltonheadchamber.org/
						https://itrate.co/
						https://www.morrischamber.org/
						https://business.nj.gov/pages/sbe
						https://www.njbusinesslist.com/
						https://www.njchamber.com/
						https://www.shccnj.com/
						https://agencies.semrush.com/list/web-development/new-jersey/small-business/
						https://www.statewidechambers.com/
						https://www.truefirms.co/free-listing
						https://solutions.trustradius.com/claim-your-profile/
						https://www.whitepages.com/business-pricing
						https://yplocal.us/add-your-business/
						https://signup.zoominfo.com/#/

					*/ }
						
			{ /* PAID SERVICES
						https://countywebsite.com/
						https://www.judysbook.com/BusinessCenter/ClaimBusiness.aspx
						https://www.kompass.com/
						https://mspaa.net/member-registration/#join 
						https://www.smartguy.com/
						https://uscity.net/
						http://www.usdirectory.com/
						https://www.yext.com/
					*/ }

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
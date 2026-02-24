"use client";

import React from 'react';
import { PageTitleHeader, PageSectionHeader } from '@pixelated-tech/components';
import { PageSection, PageGridItem } from '@pixelated-tech/components';
import { SmartImage } from '@pixelated-tech/components';
import SocialTags from '../../elements/socialtags';

// https://www.brightlocal.com/resources/top-citation-sites/location/usa-free/

export default function Partners() {
	
	return (
		<>
			<PageTitleHeader title="Pixelated Technologies Partners" />
			<br />

			<PageSection columns={1} maxWidth="768px" id="social-partners-section">
				<PageGridItem>
					<SocialTags />
				</PageGridItem>
			</PageSection>

			<PageSection columns={1} maxWidth="768px" id="partners-section">
				<PageGridItem>
					<PageSectionHeader title="Find us on these platforms" />
					<ul>
						<li><a href="https://www.designrush.com/agency/profile/pixelated-technologies" target="_blank" rel="noopener noreferrer">DesignRush</a></li>
						<li><a href="https://www.goodfirms.co/company/pixelated-technologies" target="_blank" rel="noopener noreferrer">GoodFirms</a></li>
						<li><a href="https://clutch.co/profile/pixelated-technologies" target="_blank" rel="noopener noreferrer">Clutch</a></li>
						<li><a href="https://www.rightfirms.co/company/pixelated-technologies" target="_blank" rel="noopener noreferrer">RightFirms</a></li>
						<li><a href="https://maps.apple/p/xcM4L2198Zo.Fi" target="_blank" rel="noopener noreferrer">Apple Business Connect</a></li>
						<li><a href="https://www.merchantcircle.com/pixelated-technologies-denville-nj" target="_blank" rel="noopener noreferrer">MerchantCircle</a></li>
						<li><a href="https://nextdoor.com/page/pixelated-technologies/" target="_blank" rel="noopener noreferrer">Nextdoor</a></li>
					</ul>

					<PageSectionHeader title="Find us on these platforms soon!" />
					<ul>
						<li><a href="https://topdevelopers.co/" target="_blank" rel="noopener noreferrer">TopDevelopers</a></li>
						<li><a href="https://itfirms.co/" target="_blank" rel="noopener noreferrer">ITFirms</a></li>
						<li><a href="https://njbiz.com/" target="_blank" rel="noopener noreferrer">NJBiz</a></li>
						<li><a href="https://themanifest.com/" target="_blank" rel="noopener noreferrer">The Manifest</a></li>
						<li><a href="https://rutgersfoundation.org/alumni-owned-business-marketplace-directory" target="_blank" rel="noopener noreferrer">Rutgers Alumni Small Business</a></li>
						<li><a href="https://www.bingplaces.com/" target="_blank" rel="noopener noreferrer">Bing Places for Business</a></li>
						<li><a href="https://www.morristown-nj.org/" target="_blank" rel="noopener noreferrer">Morristown, NJ</a></li>
						<li><a href="https://www.downtownmorrisplains.org/directory" target="_blank" rel="noopener noreferrer">Downtown Morris Plains</a></li>
					</ul>

					{ /* <PageSectionHeader title="To Do" /> */ }
					<ul>

						{ /* <li><a href="https://itrate.co/" target="_blank" rel="noopener noreferrer">ITRate</a></li>
						<li><a href="https://agencies.semrush.com/list/web-development/new-jersey/small-business/" target="_blank" rel="noopener noreferrer">Semrush Agency Partners</a></li>
						<li><a href="https://business.nj.gov/pages/sbe" target="_blank" rel="noopener noreferrer">NJ.gov Small Business Enterprise (SBE) Registry</a></li>
						<li><a href="https://www.morrischamber.org/" target="_blank" rel="noopener noreferrer">Morris County Chamber of Commerce</a></li>
						<li><a href="https://www.njchamber.com/" target="_blank" rel="noopener noreferrer">NJ Chamber of Commerce</a></li>
						<li><a href="https://www.bbb.org/" target="_blank" rel="noopener noreferrer">Better Business Bureau (BBB)</a></li>
						<li><a href="https://www.hiltonheadchamber.org/" target="_blank" rel="noopener noreferrer">Hilton Head Island Chamber of Commerce</a></li>
						<li><a href="https://www.expertise.com/" target="_blank" rel="noopener noreferrer">Expertise.com</a></li>
						<li><a href="https://www.bestofnj.com/" target="_blank" rel="noopener noreferrer">Best of NJ</a></li>
						<li><a href="https://www.njbusinesslist.com/" target="_blank" rel="noopener noreferrer">NJBusinessList.com</a></li>
						<li><a href="https://www.statewidechambers.com/" target="_blank" rel="noopener noreferrer">Statewide Chambers of Commerce</a></li>
						<li><a href="https://www.shccnj.com/" target="_blank" rel="noopener noreferrer">SHCCNJ Business Directory</a></li>
						<li><a href="https://www.corfacts.com/" target="_blank" rel="noopener noreferrer">Corfacts Online</a></li>
						<li><a href="https://www.trustpilot.com/" target="_blank" rel="noopener noreferrer">TrustPilot</a></li>
						<li><a href="https://www.manta.com/" target="_blank" rel="noopener noreferrer">Manta</a></li>
						<li><a href="https://solutions.trustradius.com/claim-your-profile/" target="_blank" rel="noopener noreferrer">TrustRadius</a></li>
						<li><a href="https://www.gartner.com/en/digital-markets/capterra-provider-signup" target="_blank" rel="noopener noreferrer">Capterra</a></li>
						<li><a href="https://www.g2.com/review" target="_blank" rel="noopener noreferrer">G2</a></li>
						<li><a href="https://www.truefirms.co/free-listing" target="_blank" rel="noopener noreferrer">TrueFirms</a></li>
						<li><a href="https://elioplus.com/free-sign-up" target="_blank" rel="noopener noreferrer">ElioPlus</a></li>
						<li><a href="https://www.cloudtango.net/providers/get-listed/" target="_blank" rel="noopener noreferrer">CloudTango</a></li>
						<li><a href="https://www.alignable.com/onboarding/welcome?content_code=Website_Home&invite_code=website" target="_blank" rel="noopener noreferrer">Alignable</a></li>
						<li><a href="https://www.hotfrog.com/" target="_blank" rel="noopener noreferrer">Hotfrog</a></li>
						<li><a href="https://www.callupcontact.com/active/register/register.php?" target="_blank" rel="noopener noreferrer">CallUpContact</a></li>
						<li><a href="https://www.expressbusinessdirectory.com/" target="_blank" rel="noopener noreferrer">Express Business Directory</a></li> */ }
						
						{ /* PAID SERVICES
						<li><a href="https://www.kompass.com/" target="_blank" rel="noopener noreferrer">Kompass</a></li>
						<li><a href="https://mspaa.net/member-registration/#join" target="_blank" rel="noopener noreferrer">MSPAA Member Registration</a></li> 
						<li><a href="https://countywebsite.com/" target="_blank" rel="noopener noreferrer">County Website</a></li>
						*/ }
					</ul>
        
				</PageGridItem>
			</PageSection>


			<PageSectionHeader title="Partners Badges" />
			<PageSection columns={3} maxWidth="1024px" id="partners-badges-section">
				<PageGridItem>
					<div style={{textAlign: 'center'}}>
						<div>
							<a href='https://www.designrush.com/agency/profile/pixelated-technologies' target="_blank" rel="noopener noreferrer">
								<SmartImage
									src='/images/verified_agency_v2.png'
									alt='DesignRush Verified Agency'
								/>
							</a>
						</div>
						<div><h2>Listed on DesignRush</h2></div>
						<div>DesignRush is a leading platform for connecting businesses with top service providers.
						Our profile showcases our expertise and successful projects. 
						Check out our profile on DesignRush, read the reviews, and discover why we are a trusted partner for businesses seeking top-notch digital solutions.
						Contact us if to help your business succeed in the digital age.</div>
					</div>
				</PageGridItem>

				<PageGridItem>
					<div style={{textAlign: 'center'}}>
						<a href="https://www.rightfirms.co/company/pixelated-technologies" target="_blank">
							<SmartImage className="rightfirms-badge" src="https://www.rightfirms.co/frontend/images/rf-badges/badge-company.webp" alt="RightFirms Badge" width={300} />
						</a>
					</div>
				</PageGridItem>

			</PageSection>

		</>
	);
}
"use client";

import React, { Fragment, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CalloutHeader } from "@brianwhaley/pixelated-components";
import Terms from "@/app/elements/terms";
import Privacy from "@/app/elements/privacy";


function UseQuery() {
	const searchParams = useSearchParams();
	const isInstalled = searchParams.get("installed");
	const yes = (
		<div className="centered">
			<h2>Congratulations on successfully installing STKR for Slack!</h2><br/><br/>
		</div>
	);
	const no = (
		<div className="centered">
			<a href="https://slack.com/oauth/v2/authorize?client_id=1058085085824.1058509925568&scope=chat:write,commands,files:read,im:write,users:read">
				<img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>
		</div>
	);
	return ( isInstalled && isInstalled === "true" ? yes : no );
}


export default function Stkr() {
	return (
		<Fragment>

			<section className="section" id="stkr-section">
				<div className="section-container">
					<CalloutHeader title="Stkr" />
					<div className="callout-body">
						<Suspense>
							<UseQuery />
						</Suspense>
						<div className="centered">
						Stkr is a sticker sharing application for Slack. You can:<br/>
						1) Upload or Add images to be shared with your teammates<br/>
						2) Use the &#39;/stkr&#39; or &#39;/stkr share&#39; command to share those images<br/>
						3) use the &#39;/stkr delete&#39; command to remove images as necessary<br/>
						</div>
					</div>
				</div>
			</section>

			<section className="section" id="howto-section">
				<div className="section-container">
					<CalloutHeader title="How to Use Stkr" />
					<div className="callout-body">
						
						<div><hr /></div>

						<div>
							<CalloutHeader title="Step 1: Settings" />
							(For Admins Only) Set how you and your workspace will add and use images.  
							You can either drag and drop images and uload them to Stkr for storage, or
							you can add URL links to share with your teammates.<br /><br />
						</div>
						<div>
							<div className="bigpad">
								<img src="/images/stkr/stkr_screenshot_10.png" alt="Set your workspace settings" />
							</div>
							<div className="bigpad">
								<img src="/images/stkr/stkr_screenshot_11.png" alt="Workspace settings have been set" />
							</div>
						</div>
						
						<div><hr /></div>

						<div className="bigpad">
							<CalloutHeader title="Step 2: Upload / Add" />
							<b>UPLOAD:</b><br />
							Drag and drop a new sticker to the Stkr App direct message (or add Stkr to a channel) 
							and you will have an opportunity to upload each JPG or PNG to reuse as a sticker.  
							There is a limit of 200KB file size and a max of 50 stickers per workspace. 
						</div>
						<div>
							<div className="bigpad">
								<img src="/images/stkr/stkr_screenshot_01.png" alt="Upload a JPG or PNG" /><br /><br />
							</div>
							<div className="bigpad">
								<img src="/images/stkr/stkr_screenshot_02.png" alt="Approve the upload" /><br /><br />
							</div>
							<div className="bigpad">
								<img src="/images/stkr/stkr_screenshot_03.png" alt="There is a maximum of 50 per workspace" /><br /><br />
							</div>
						</div>
						<div>
							<b>ADD URL LINKS:</b><br />
							Drag and drop a new sticker to the Stkr App direct message (or add Stkr to a channel) 
							and you will have an opportunity to upload each JPG or PNG to reuse as a sticker.  
							There is a limit of 200KB file size and a max of 50 stickers per workspace. <br /><br />
						</div>
						<div>
							<div className="bigpad">
								<img src="/images/stkr/stkr_screenshot_12.png" alt="Add URL links" /><br /><br />
							</div>
							<div className="bigpad">
								<img src="/images/stkr/stkr_screenshot_13.png" alt="URL Links added" /><br /><br />
							</div>
						</div>
						
						<div><hr /></div>

						<div className="bigpad">
							<CalloutHeader title="Step 3: Share" />
							Type &#39;/stkr&#39; or &#39;/stkr share&#39; in your channel to share a a sticker that you or one of your teammates have uploaded.<br /><br />
							Type &#39;/stkr help&#39; in any channel to get basic help information.<br /><br />
							Type &#39;/stkr bug&#39; in any channel to get information on reporting bugs to the development team.<br /><br />
							Type &#39;/stkr support&#39; to get basic support information, including a support email address.  <br /><br />
							Type &#39;/stkr list&#39; to see a full list of all images that are available to your workspace.  <br /><br />
						</div>
						<div>
							<div className="bigpad">
								<img src="/images/stkr/stkr_screenshot_04.png" alt="Stkr slash command" /><br /><br />
							</div>
							<div className="bigpad">
								<img src="/images/stkr/stkr_screenshot_05.png" alt="Select a stkr to display" /><br /><br />
							</div>
							<div className="bigpad">
								<img src="/images/stkr/stkr_screenshot_06.png" alt="Share the stkr selected" />
							</div>
						</div>
						
						<div><hr /></div>

						<div className="bigpad">
							<CalloutHeader title="Step 4: Delete" />
							Type /stkrdelete to remove any stickers if you reach 50 or if something was inadvertently uploaded.<br /><br />
						</div>
						<div>
							<div className="bigpad">
								<img src="/images/stkr/stkr_screenshot_07.png" alt="Stkrdelete slash command" /><br /><br />
							</div>
							<div className="bigpad">
								<img src="/images/stkr/stkr_screenshot_08.png" alt="Choose a stkr to delete" /><br /><br />
							</div>
							<div className="bigpad">
								<img src="/images/stkr/stkr_screenshot_09.png" alt="Keep your stkr count at 50 or less" />
							</div>
						</div>
						
						<div><hr /></div>
						
					</div>

				</div>
			</section>

			<section className="section-alt" id="cust-support-section">
				<div className="section-container">
					<CalloutHeader title="Customer Support" />
					<div className="callout-body">
						For Customer Support, please contact <a href="mailto:stkr@pixelated.tech?subject=Stkr Customer Support">stkr@pixelated.tech</a> or join the <a href="https://app.slack.com/client/T011Q2H2HQ8/C0126L1UHK4">#stkr-support</a> channel in the <a href="https://pixelated-tech.slack.com">Pixelated Slack Workspace</a>.
						<br/>
					</div>
				</div>
			</section>

			<section className="section" id="terms-section">
				<div className="section-container">
					<Terms />
				</div>
			</section>

			<section className="section-alt" id="privacy-policy-section">
				<div className="section-container">
					<Privacy />
				</div>
			</section>

		</Fragment>
	);
}

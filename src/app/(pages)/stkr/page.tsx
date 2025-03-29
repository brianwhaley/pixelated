"use client";

import React, { Fragment, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CalloutHeader } from "@/app/components/callout/pixelated.callout";


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
					<div className="row">
						<CalloutHeader title="Stkr" />
						<div className="callout-body grid12">
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
				</div>
			</section>

			<section className="section" id="howto-section">
				<div className="section-container">
					<div className="row">
						<CalloutHeader title="How to Use Stkr" />
					</div>
					<div className = "row">
						<div className="callout-body grid12">
							
							<div className="grid12"><hr /></div>

							<div className="grid12">
								<CalloutHeader title="Step 1: Settings" />
								(For Admins Only) Set how you and your workspace will add and use images.  
								You can either drag and drop images and uload them to Stkr for storage, or
								you can add URL links to share with your teammates.<br /><br />
							</div>
							<div className="grid12">
								<div className="grid4 bigpad">
									<img src="/images/stkr/stkr_screenshot_10.png" alt="Set your workspace settings" />
								</div>
								<div className="grid4 bigpad">
									<img src="/images/stkr/stkr_screenshot_11.png" alt="Workspace settings have been set" />
								</div>
							</div>
							
							<div className="grid12"><hr /></div>

							<div className="grid12 bigpad">
								<CalloutHeader title="Step 2: Upload / Add" />
								<b>UPLOAD:</b><br />
								Drag and drop a new sticker to the Stkr App direct message (or add Stkr to a channel) 
								and you will have an opportunity to upload each JPG or PNG to reuse as a sticker.  
								There is a limit of 200KB file size and a max of 50 stickers per workspace. 
							</div>
							<div className="grid12">
								<div className="grid4 bigpad">
									<img src="/images/stkr/stkr_screenshot_01.png" alt="Upload a JPG or PNG" /><br /><br />
								</div>
								<div className="grid4 bigpad">
									<img src="/images/stkr/stkr_screenshot_02.png" alt="Approve the upload" /><br /><br />
								</div>
								<div className="grid4 bigpad">
									<img src="/images/stkr/stkr_screenshot_03.png" alt="There is a maximum of 50 per workspace" /><br /><br />
								</div>
							</div>
							<div className="grid12">
								<b>ADD URL LINKS:</b><br />
								Drag and drop a new sticker to the Stkr App direct message (or add Stkr to a channel) 
								and you will have an opportunity to upload each JPG or PNG to reuse as a sticker.  
								There is a limit of 200KB file size and a max of 50 stickers per workspace. <br /><br />
							</div>
							<div className="grid12">
								<div className="grid4 bigpad">
									<img src="/images/stkr/stkr_screenshot_12.png" alt="Add URL links" /><br /><br />
								</div>
								<div className="grid4 bigpad">
									<img src="/images/stkr/stkr_screenshot_13.png" alt="URL Links added" /><br /><br />
								</div>
							</div>
							
							<div className="grid12"><hr /></div>

							<div className="grid12 bigpad">
								<CalloutHeader title="Step 3: Share" />
								Type &#39;/stkr&#39; or &#39;/stkr share&#39; in your channel to share a a sticker that you or one of your teammates have uploaded.<br /><br />
								Type &#39;/stkr help&#39; in any channel to get basic help information.<br /><br />
								Type &#39;/stkr bug&#39; in any channel to get information on reporting bugs to the development team.<br /><br />
								Type &#39;/stkr support&#39; to get basic support information, including a support email address.  <br /><br />
								Type &#39;/stkr list&#39; to see a full list of all images that are available to your workspace.  <br /><br />
							</div>
							<div className="grid12">
								<div className="grid4 bigpad">
									<img src="/images/stkr/stkr_screenshot_04.png" alt="Stkr slash command" /><br /><br />
								</div>
								<div className="grid4 bigpad">
									<img src="/images/stkr/stkr_screenshot_05.png" alt="Select a stkr to display" /><br /><br />
								</div>
								<div className="grid4 bigpad">
									<img src="/images/stkr/stkr_screenshot_06.png" alt="Share the stkr selected" />
								</div>
							</div>
							
							<div className="grid12"><hr /></div>

							<div className="grid12 bigpad">
								<CalloutHeader title="Step 4: Delete" />
								Type /stkrdelete to remove any stickers if you reach 50 or if something was inadvertently uploaded.<br /><br />
							</div>
							<div className="grid12">
								<div className="grid4 bigpad">
									<img src="/images/stkr/stkr_screenshot_07.png" alt="Stkrdelete slash command" /><br /><br />
								</div>
								<div className="grid4 bigpad">
									<img src="/images/stkr/stkr_screenshot_08.png" alt="Choose a stkr to delete" /><br /><br />
								</div>
								<div className="grid4 bigpad">
									<img src="/images/stkr/stkr_screenshot_09.png" alt="Keep your stkr count at 50 or less" />
								</div>
							</div>
							
							<div className="grid12"><hr /></div>
							
						</div>

					</div>
				</div>
			</section>

			<section className="section-alt" id="cust-support-section">
				<div className="section-container">
					<div className="row">
						<CalloutHeader title="Customer Support" />
						<div className="callout-body grid12">
							For Customer Support, please contact <a href="mailto:stkr@pixelated.tech?subject=Stkr Customer Support">stkr@pixelated.tech</a> or join the <a href="https://app.slack.com/client/T011Q2H2HQ8/C0126L1UHK4">#stkr-support</a> channel in the <a href="https://pixelated-tech.slack.com">Pixelated Slack Workspace</a>.
							<br/>
						</div>
					</div>
				</div>
			</section>

			<section className="section" id="social-section">
				<div className="section-container">
					<div className="row">
						<CalloutHeader title="Terms of Service" />
						<div className="callout-body grid12">
							By using anything offered by Pixelated, you automatically agree to this legal agreement. You also accept any updated version of this agreement by continuing to use the Services.<br/>
							<br/>
							You MUST be at least 13 years old to use the Services (or at least 16 years old if you are a resident of certain European countries as described above). Do not use the Services if it would mean breaking the law.<br/>
							<br/>
							If you sign up for an account on the Services, you are responsible for all activity on your account. Be mindful about protecting your account password and let us know immediately if you think there are any issues.<br/>
							<br/>
							You own all content you contribute to the Services, but you’re ok with Pixelated using it in connection with its Services. Public Information is public, so don’t include any private or sensitive information in any public part of the Services.<br/>
							<br/>
							You’re allowed to use the Services only in accordance with this agreement. Generally speaking, you are only allowed to use content that you find on the site in connection with your use of the Services and solely for personal and non-commercial purposes. We can edit, take down, or block any content on the Services at any time.<br/>
							<br/>
							You must comply with the law and this agreement, and you promise not to take any action or submit any content that is prohibited or harmful, including violating or attempting to violate the security of the Services.<br/>
							<br/>
							We don’t control any third party sites or services and won’t be liable for any issues that may result from your use. Please review the terms of service and privacy policy of any third party site or service.<br/>
							<br/>
							We can choose to terminate or suspend your use of the Services at any time. You can also choose to delete your account or stop use of the Services at any time, but note that parts of this agreement still apply to you even after you stop using the Services.<br/>
							<br/>
							The Services are provided “as is.” You are solely responsible for how you choose to use the Services or what actions you take as a result of your use of the Services.<br/>
							<br/>
							You agree to reimburse us for any loss we suffer that is tied to your use or misuse of the Services, violation of this agreement, or infringement of any third party’s right.<br/>
							<br/>
							Our legal liability to you is limited. Please understand that we cannot run our business without it.<br/>
							<br/>
							NJ and US laws apply to this agreement. Any legal claim relating to your use of the Services must be filed within one year after such claim arose.<br/>
							<br/>
							We hope that we can resolve any problems with our users informally, and we imagine that most people feel the same way. If it unfortunately gets to the point where we need to engage in legal proceedings, you agree to these provisions.<br/>
							<br/>
							We may use open source software in connection with our applications, and such software is subject to the terms of their applicable open source licenses.<br/>
							<br/>
							Effective Date of Terms of Service: April 1, 2020
						</div>
					</div>
				</div>
			</section>

			<section className="section-alt" id="privacy-policy-section">
				<div className="section-container">
					<div className="row">
						<CalloutHeader title="Privacy Policy" />
						<div className="callout-body grid12">
							Stkr is a privacy respecting app. We go out of our way to keep as little information about users as possible.<br/>
							<br/>
							As part of the processing of adding our app to your Slack workspace we receive and store the user_id of the user doing the installing, the team_id and a bot token to use when serving slash command requests. We store this this information so long as you are using the app and we delete it within 30 days of you uninstalling the app.<br/>
							<br/>
							The team_id and token are needed by the bot to be able to communicate with you.  We also keep a log of server traffic which makes note of the IP address of the requestor, what’s being requested and a user_id and team_id if they are available. We record this information purely for troubleshooting and security analysis.  We keep the above log information for a maximum of 30 days and then delete it.<br/>
							<br/>
							Stkr is a serverless application that runs in a data center hosted by AWS in Ohio. We do not explicitly share anything with Amazon but they could have access to our systems if they chose to. We have no reason nor intention to transfer data outside the US.<br/>
							<br/>
							If you’d like to know more about anything we do with regards to your data, please email us at brian.whaley@gmail.com.
							<br/>
						</div>
					</div>
				</div>
			</section>

		</Fragment>
	);
}

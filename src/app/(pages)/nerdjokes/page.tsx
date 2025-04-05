"use client";

import React, { Fragment, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CalloutHeader } from "@brianwhaley/pixelated-components";
import { NerdJoke } from "@brianwhaley/pixelated-components";

function UseQuery() {
	const searchParams = useSearchParams();
	const isInstalled = searchParams.get("installed");
	const yes = (
		<div className="centered">
			<h2>Congratulations on successfully installing NerdJokes for Slack!</h2><br/><br/>
		</div>
	);
	const no = (
		<div className="slackbutton centered">
			<a href="https://slack.com/oauth/v2/authorize?client_id=1058085085824.1093097617364&scope=chat:write,chat:write.public,commands,im:write">
				<img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" 
					srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>
			<br />
		</div>
	);
	return ( isInstalled && isInstalled === "true" ? yes : no );
}

export default function NerdJokes() {
	return (
		<Fragment>
			<section className="section" id="nerdjoke-section">
				<div className="section-container">
					<div className="row">
						<CalloutHeader title="NerdJokes" />
						<div className="callout-body grid12">
							<div className="grid12">
								<div className="grid12 centered">
									<NerdJoke></NerdJoke>
								</div>
								<div className="grid12">
									<Suspense>
										<UseQuery />
    								</Suspense>
								</div>
								<div className="grid8 push2">
									View random science, technology, math, and nerd jokes, or schedule them to be delivered to specific channels in your workspace!<br /><br />
									<li> Type &#39;/nerdjokes&#39; to get a random joke to immediately share with your teammates.</li>
									<li> Type &#39;/nerdjokes help&#39; to get information about nerdjokes slash commands.</li>
									<li> Type &#39;/nerdjokes bug&#39; to get more information about submitting a bug.</li>
									<li> Type &#39;/nerdjokes support&#39; to get more information on how to reach out for support. </li>
									<li> Type &#39;/nerdjokes getjoke&#39; to get a random joke sent immediately. </li>
									<li> Type &#39;/nerdjokes addschedule&#39; to add or edit a schedule for delivering jokes to the current channel. </li>
									<li> Type &#39;/nerdjokes deleteschedule&#39; to delete a schedule for delivering jokes to the current channel. </li>
									<li> Type &#39;/nerdjokes addjoke&#39; to recommend a new joke to be added to the collection.</li>
									<br/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="section" id="howto-section">
				<div className="section-container">
					<div className="row">
						<CalloutHeader title="How to Use NerdJokes" />
					</div>
					<div className = "row">
						<div className="callout-body grid12">

							<div className="grid12"><hr /></div>

							<div className="grid12">
								<CalloutHeader title="Step 1: Random Joke On Demand" />
								<li> Type &#39;/nerdjokes&#39; or &#39;/nerdjokes getjoke&#39; to get a random joke to immediately share with your teammates.</li><br /><br />
							</div>
							<div className="grid6 bigpad">
								<img src="/images/nerdjokes/nerdjokes_step_01a.png" alt="NerdJokes Joke Question" /><br></br>
							</div>
							<div className="grid6 bigpad">
								<img src="/images/nerdjokes/nerdjokes_step_01b.png" alt="NerdJokes Joke Answer" />
							</div>
							
							<div className="grid12"><hr /></div>

							<div className="grid12">
								<CalloutHeader title="Step 2: Create or Delete a Schedule" />
								<li> Type &#39;/nerdjokes addschedule&#39; to add or edit a schedule for delivering jokes to the current channel. </li>
								<li> Type &#39;/nerdjokes deleteschedule&#39; to delete a schedule for delivering jokes to the current channel. </li>
							</div>
							<div className="grid6 bigpad">
								<img src="/images/nerdjokes/nerdjokes_step_02a.png" alt="NerdJokes Add Joke Schedule" /><br /><br />
							</div>
							<div className="grid6 bigpad">
								<img src="/images/nerdjokes/nerdjokes_step_02b.png" alt="NerdJokes Delete Joke Schedule" /><br /><br />
							</div>
							
							<div className="grid12"><hr /></div>

							<div className="grid12 bigpad">
								<CalloutHeader title="Step 3: Add a Joke" />
								<li> Type &#39;/nerdjokes addjoke&#39; to recommend a new joke to be added to the collection.</li>
							</div>
							<div className="grid6 bigpad">
								<img src="/images/nerdjokes/nerdjokes_step_03.png" alt="NerdJokes Add Joke" /><br /><br />
							</div>
							
							<div className="grid12"><hr /></div>

							<div className="grid12 bigpad">
								<CalloutHeader title="Step 4: Help" />
								<li> Type &#39;/nerdjokes help&#39; to get information about nerdjokes slash commands.</li>
								<li> Type &#39;/nerdjokes bug&#39; to get more information about submitting a bug.</li>
								<li> Type &#39;/nerdjokes support&#39; to get more information on how to reach out for support. </li>
							</div>
							<div className="grid6 bigpad">
								<img src="/images/nerdjokes/nerdjokes_step_04a.png" alt="NerdJokes Help" /><br /><br />
							</div>
							<div className="grid6 bigpad">
								<img src="/images/nerdjokes/nerdjokes_step_04b.png" alt="NerdJokes Bugs and Support" /><br /><br />
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
							For Customer Support, please contact <a href="mailto:nerdjokes@pixelated.tech?subject=NerdJokes Customer Support">nerdjokes@pixelated.tech</a> or join the <a href="https://pixelated-tech.slack.com/archives/C013LBYFK9U">#nerdjokes-support</a> channel in the <a href="https://pixelated-tech.slack.com">Pixelated Slack Workspace</a>.
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
							NerdJokes is a privacy respecting app. We go out of our way to keep as little information about users as possible.<br/>
							<br/>
							As part of the processing of adding our app to your Slack workspace we receive and store the user_id of the user doing the installing, the team_id and a bot token to use when serving slash command requests. We store this this information so long as you are using the app and we delete it within 30 days of you uninstalling the app.<br/>
							<br/>
							The team_id and token are needed by the bot to be able to communicate with you.  We also keep a log of server traffic which makes note of the IP address of the requestor, what’s being requested and a user_id and team_id if they are available. We record this information purely for troubleshooting and security analysis.  We keep the above log information for a maximum of 30 days and then delete it.<br/>
							<br/>
							Our partners and international transfer
							NerdJokes is a serverless application that runs in a data center hosted by AWS in Ohio. We do not explicitly share anything with Amazon but they could have access to our systems if they chose to. We have no reason nor intention to transfer data outside the US.<br/>
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

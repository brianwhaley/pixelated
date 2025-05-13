"use client";

import React, { Fragment, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/app/components/general/pixelated.general";
import { CalloutHeader } from "@brianwhaley/pixelated-components";
import { NerdJoke } from "@brianwhaley/pixelated-components";
import Terms from "@/app/elements/terms";
import Privacy from "@/app/elements/privacy";

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
					<PageHeader title="NerdJokes" />
					<div className="callout-body">
						<div className="centered">
							<NerdJoke />
						</div>
						<div>
							<Suspense>
								<UseQuery />
							</Suspense>
						</div>
						<div>
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
			</section>

			<section className="section" id="howto-section">
				<div className="section-container">
					<CalloutHeader title="How to Use NerdJokes" />
					<div className="callout-body">

						<div><hr /></div>

						<div>
							<CalloutHeader title="Step 1: Random Joke On Demand" />
							<li> Type &#39;/nerdjokes&#39; or &#39;/nerdjokes getjoke&#39; to get a random joke to immediately share with your teammates.</li><br /><br />
						</div>
						<div className="bigpad">
							<img src="/images/nerdjokes/nerdjokes_step_01a.png" alt="NerdJokes Joke Question" /><br></br>
						</div>
						<div className="bigpad">
							<img src="/images/nerdjokes/nerdjokes_step_01b.png" alt="NerdJokes Joke Answer" />
						</div>
						
						<div><hr /></div>

						<div>
							<CalloutHeader title="Step 2: Create or Delete a Schedule" />
							<li> Type &#39;/nerdjokes addschedule&#39; to add or edit a schedule for delivering jokes to the current channel. </li>
							<li> Type &#39;/nerdjokes deleteschedule&#39; to delete a schedule for delivering jokes to the current channel. </li>
						</div>
						<div className="bigpad">
							<img src="/images/nerdjokes/nerdjokes_step_02a.png" alt="NerdJokes Add Joke Schedule" /><br /><br />
						</div>
						<div className="bigpad">
							<img src="/images/nerdjokes/nerdjokes_step_02b.png" alt="NerdJokes Delete Joke Schedule" /><br /><br />
						</div>
						
						<div><hr /></div>

						<div className="bigpad">
							<CalloutHeader title="Step 3: Add a Joke" />
							<li> Type &#39;/nerdjokes addjoke&#39; to recommend a new joke to be added to the collection.</li>
						</div>
						<div className="bigpad">
							<img src="/images/nerdjokes/nerdjokes_step_03.png" alt="NerdJokes Add Joke" /><br /><br />
						</div>
						
						<div><hr /></div>

						<div className="bigpad">
							<CalloutHeader title="Step 4: Help" />
							<li> Type &#39;/nerdjokes help&#39; to get information about nerdjokes slash commands.</li>
							<li> Type &#39;/nerdjokes bug&#39; to get more information about submitting a bug.</li>
							<li> Type &#39;/nerdjokes support&#39; to get more information on how to reach out for support. </li>
						</div>
						<div className="bigpad">
							<img src="/images/nerdjokes/nerdjokes_step_04a.png" alt="NerdJokes Help" /><br /><br />
						</div>
						<div className="bigpad">
							<img src="/images/nerdjokes/nerdjokes_step_04b.png" alt="NerdJokes Bugs and Support" /><br /><br />
						</div>
						
						<div><hr /></div>
						
					</div>

				</div>
			</section>

			<section className="section-alt" id="cust-support-section">
				<div className="section-container">
					<CalloutHeader title="Customer Support" />
					<div className="callout-body">
						For Customer Support, please contact <a href="mailto:nerdjokes@pixelated.tech?subject=NerdJokes Customer Support">nerdjokes@pixelated.tech</a> or join the <a href="https://pixelated-tech.slack.com/archives/C013LBYFK9U">#nerdjokes-support</a> channel in the <a href="https://pixelated-tech.slack.com">Pixelated Slack Workspace</a>.
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

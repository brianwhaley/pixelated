import React, { Component, Fragment } from 'react';
import { CalloutHeader } from '../components/pixelated.callout.js';

export default class Stkr extends Component {
	render () {
		return (
			<Fragment>

                <section className="section" id="social-section">
					<div className="section-container">
						<div className="row">
							<CalloutHeader title="Stkr" />
							<div className="callout-body grid12">
                                <div class="centered">
                                Stkr is a sticker sharing application for Slack. You can:<br/>
                                1) Upload images to be shared with your teammates<br/>
                                2) Use the /stkr command to share those images<br/>
                                3) use the /stkrdelete command to remove images as necessary<br/><br/>
                                <a href="https://slack.com/oauth/v2/authorize?client_id=1058085085824.1058509925568&scope=calls:write,chat:write,commands,files:read,im:read,im:write,links:read,links:write,users:read,groups:write,mpim:write">
                                <img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>
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

                                <div class="grid4 pad">
							        <CalloutHeader title="Step 1: Upload" />
                                    Drag and drop a new sticker to the Stkr App direct message (or add Stkr to a channel) 
                                    and you will have an opportunity to upload each JPG or PNG to reuse as a sticker.  
                                    There is a limit of 50 stickers per workspace. <br /><br />
                                    <img src="/images/stkr/stkr_screenshot_01.png" alt="Upload a JPG or PNG" /><br /><br />
                                    <img src="/images/stkr/stkr_screenshot_02.png" alt="Approve the upload" /><br /><br />
                                    <img src="/images/stkr/stkr_screenshot_03.png" alt="There is a maximum of 50 per workspace" />
                                </div>

                                <div class="grid4 pad">
							        <CalloutHeader title="Step 2: Share" />
                                    Type /stkr in your channel to share a sticker that you or one of your teammates have uploaded.<br /><br />
                                    <img src="/images/stkr/stkr_screenshot_04.png" alt="Stkr slash command" /><br /><br />
                                    <img src="/images/stkr/stkr_screenshot_05.png" alt="Select an image to display" /><br /><br />
                                    <img src="/images/stkr/stkr_screenshot_06.png" alt="Share the image selected" />
                                </div>

                                <div class="grid4 pad">
							        <CalloutHeader title="Step 3: Delete" />
                                    Type /stkrdelete to remove any stickers if you reach 50 or if something was inadvertently uploaded.<br /><br />
                                    <img src="/images/stkr/stkr_screenshot_07.png" alt="Stkrdelete slash command" /><br /><br />
                                    <img src="/images/stkr/stkr_screenshot_08.png" alt="Choose an image to delete" /><br /><br />
                                    <img src="/images/stkr/stkr_screenshot_09.png" alt="Keep your image count at 50 or less" />
                                </div>

                            </div>
						</div>
					</div>
				</section>

                <section className="section-alt" id="social-section">
					<div className="section-container">
						<div className="row">
							<CalloutHeader title="Terms of Service" />
							<div className="callout-body grid12">
                            Terms of Service Goes Here
								<br/>
							</div>
						</div>
					</div>
				</section>

			</Fragment>
		);
	}
}

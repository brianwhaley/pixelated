"use client";

import React, { Component, Fragment } from "react";
import { NerdJoke } from "@brianwhaley/pixelated-components";
import "./joke.css";

export default class Joke extends Component {

	render () {
		return (
			<Fragment>
				<section className="section" id="nerdjoke-section">
					<div className="section-container">
						<div className="row">
							<div className="callout-body grid12">
								<div className="grid12">
									<div className="grid12 centered">
										<NerdJoke></NerdJoke>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</Fragment>
		);
	}
}

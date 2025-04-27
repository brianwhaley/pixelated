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
						<div className="callout-body">
							<div className="centered">
								<NerdJoke></NerdJoke>
							</div>
						</div>
					</div>
				</section>
			</Fragment>
		);
	}
}

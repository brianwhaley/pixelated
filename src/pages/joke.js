import React, { Component, Fragment } from "react";
import NerdJoke from "../components/pixelated.nerdjoke.js";

export default class Joke extends Component {

	hideElems(){
		try {
			document.querySelector("footer").style.display = "none";
			document.querySelector("nav").style.display = "none";
			document.querySelector("header").style.display = "none";
			const elems = document.querySelectorAll(".nerdjoke .joketext div");
			for (let elem of elems) { elem.style.fontSize = "2em"; }
		} catch {
		}
	}

	componentDidMount(){
		this.hideElems();
		console.log("did mount");
	}

	componentDidUpdate(){
		this.hideElems();
		console.log("did update");
	}

	render () {
		this.hideElems();
		return (
			<Fragment>
				<section className="section" id="social-section">
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

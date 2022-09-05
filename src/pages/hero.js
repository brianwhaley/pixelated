import React, { Component } from "react";
import { Carousel } from "@brianwhaley/pixelated-components/dist/index";
import "@brianwhaley/pixelated-components/dist/css/pixelated.carousel.css";

export default class Hero extends Component {
	render () {
		return (
			<div id="page-hero" className="grid12">
				<Carousel type='hero' />
			</div>
		);
	}
}

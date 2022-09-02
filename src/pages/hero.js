import React, { Component } from "react";
import Carousel from "../components/pixelated.carousel";

export default class Hero extends Component {
	render () {
		return (
			<div id="page-hero" className="grid12">
				<Carousel type='hero' />
			</div>
		);
	}
}

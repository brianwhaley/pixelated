import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import { Carousel } from "@brianwhaley/pixelated-components/dist/index";
import "@brianwhaley/pixelated-components/dist/css/pixelated.carousel.css";

function UseQuery() {
	const { search } = useLocation();
	let someTags = new URLSearchParams(search).get("tag");
	let flickrProps = {
		urlProps: {
			tags: someTags,
			photoSize: "Large"
		}
	};
	return (
		<Carousel flickr={flickrProps} type="slider"></Carousel>
	);
}

export default class Gallery extends Component {
	render () {
		return (
			<UseQuery />
		);
	}
}

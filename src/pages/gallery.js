import React, { Component } from "react";
import PropTypes from "prop-types";
import Carousel from "../components/pixelated.carousel.js";
import QueryString from "query-string";

export default class Gallery extends Component {
	static propTypes = {
		location: PropTypes.object
	}

	constructor (props) {
		super(props);
		this.flickrProps = {
			urlProps: {
				tags: QueryString.parse(this.props.location.search).tag,
				photoSize: "Large"
			}
		};
	}

	render () {
		return (
			<Carousel flickr={this.flickrProps} type="slider"></Carousel>
		);
	}
}

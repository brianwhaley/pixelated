import React, { Component } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Carousel } from "@brianwhaley/pixelated-components";

function GalleryWrapper(vals) {
	const location = useLocation();
	const params = useParams();
	let myTag = (params && params.tag) ? (params.tag ) : ( 
		(vals) ? ( vals.props.tag ) : ( ( 
			(location) ? ( new URLSearchParams(location.search).get("tag") ) : ( "" )
		) ) 
	) 
	let flickrProps = { urlProps: { tags: myTag, photoSize: "Large" } };
	return (
		<Carousel flickr={flickrProps} type="slider"></Carousel>
	);
}

export default class Gallery extends Component {
	render () {	
		return (
			<GalleryWrapper props={this.props}/>
		);
	}
}
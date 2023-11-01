import React, { Component } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Carousel } from "@brianwhaley/pixelated-components";

function GalleryWrapper(vals) {
	const location = useLocation();
	console.log(location);
	const params = useParams();
	console.log(params);
	let myTag = (params && params.tag) ? (params.tag ) : ( 
		(vals) ? ( vals.props.tag ) : ( ( 
			(location) ? ( new URLSearchParams(location.search).get("tag") ) : ( "" )
		) ) 
	) 
	console.log(myTag);
	let flickrProps = { urlProps: { tags: myTag, photoSize: "Large" } };
	console.log(flickrProps);
	return (
		<Carousel flickr={flickrProps} type="slider"></Carousel>
	);
}

export default class Gallery extends Component {
	render () {	
		console.log(this.props);
		return (
			<GalleryWrapper props={this.props}/>
		);
	}
}
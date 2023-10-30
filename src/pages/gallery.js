import React from "react";
import { useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types"
import { Carousel } from "@brianwhaley/pixelated-components";

function CarouselWrapper(props) {
	CarouselWrapper.propTypes = {
		props: PropTypes.object,
	}
	const params = useParams();
	const location = useLocation();
	let myTag = (params && params.tag) ? (params.tag ) : ( 
		(props) ? ( props.props.tag ) : ( ( 
			(location) ? ( new URLSearchParams(location.search).get("tag") ) : ( "" )
		) ) 
	) 
	let flickrProps = { urlProps: { tags: myTag, photoSize: "Large" } };
	return ( <Carousel flickr={flickrProps} type="slider"></Carousel> );
}

const Gallery = (props) => {
	return (
		<CarouselWrapper props={props} />
	);

}
export default Gallery;

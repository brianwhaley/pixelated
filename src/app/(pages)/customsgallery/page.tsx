"use client";

import React from "react";
import { Carousel } from "@brianwhaley/pixelated-components";

const tags = {tag: "customsunglasses"}

function GalleryWrapper( props: { props: { tag: string; }; } ) {
	const myTag = props.props.tag;
	const flickrProps = { urlProps: { tags: myTag, photoSize: "Large" } };
	return (
		<Carousel flickr={flickrProps} type="slider"></Carousel>
	);
}

export default function Gallery () {
	return (
		<GalleryWrapper props={tags}/>
	);
}
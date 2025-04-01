"use client";

import React from "react";
import { Carousel } from "@/app/components/carousel/pixelated.carousel";

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
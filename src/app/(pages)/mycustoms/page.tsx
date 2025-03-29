"use client";

import React from "react";
import { Carousel } from "@/app/components/carousel/pixelated.carousel";
const props = {tag: "btw-customsunglasses"}

function GalleryWrapper( vals: { props: { tag: string; }; } ) {
	const myTag = vals.props.tag;
	const flickrProps = { urlProps: { tags: myTag, photoSize: "Large" } };
	return (
		<Carousel flickr={flickrProps} type="slider"></Carousel>
	);
}

export default function Gallery() {
	return (
		<GalleryWrapper props={props}/>
	);
}
"use client";

import React from "react";
import { PageHeader } from "@/app/components/general/pixelated.general";
import { Carousel } from "@brianwhaley/pixelated-components";

const tags = {tag: "customsunglasses"};

function GalleryWrapper( props: { props: { tag: string; }; } ) {
	const myTag = props.props.tag;
	const flickrProps = { urlProps: { tags: myTag, photoSize: "Large" } };
	return (
		<div className="section-container">
			<Carousel flickr={flickrProps} type="slider" />
		</div>
	);
}

export default function Gallery () {
	return (
		<>
			<PageHeader title="Custom Sunglasses Gallery" />
			<GalleryWrapper props={tags}/>
		</>
	);
}
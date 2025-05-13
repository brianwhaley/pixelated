"use client";

import React from "react";
import { PageHeader } from "@/app/components/general/pixelated.general";
import { Carousel } from "@brianwhaley/pixelated-components";
const props = {tag: "pixelatedviewsgallery"};

function GalleryWrapper( vals: { props: { tag: string } } ) {
	const myTag = vals.props.tag;
	const flickrProps = { urlProps: { tags: myTag, photoSize: "Large" } };
	return (
		<div className="section-container">
			<Carousel flickr={flickrProps} type="slider" />
		</div>	);
}

export default function Gallery() {
	return (
		<>
			<PageHeader title="Photography Gallery" />
			<GalleryWrapper props={props}/>
		</>
	);
}
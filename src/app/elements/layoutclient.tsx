"use client";

import { useLayoutEffect } from "react";

import { MicroInteractions } from "@pixelated-tech/components";
// import { loadAllImagesFromCloudinary } from "@pixelated-tech/components";
// import { deferAllCSS } from "@pixelated-tech/components";
import { preloadAllCSS } from "@pixelated-tech/components";
import { preloadImages } from "@pixelated-tech/components";

export function LayoutClient() {
	useLayoutEffect(() => {
		preloadAllCSS();
		preloadImages();
		MicroInteractions({ 
			buttonring: true,
			formglow: true,
			imgscale: true,
			scrollfadeElements: '.pageSectionHeader, .callout , .calloutSmall , .carouselContainer, .timelineContainer, .tileContainer, .tile',
		});
	}, []);

	return <></>;
    
}
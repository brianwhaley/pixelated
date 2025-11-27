"use client";

import { useLayoutEffect } from "react";

import { MicroInteractions } from "@brianwhaley/pixelated-components";
// import { loadAllImagesFromCloudinary } from "@brianwhaley/pixelated-components";
// import { deferAllCSS } from "@brianwhaley/pixelated-components";
import { preloadAllCSS } from "@brianwhaley/pixelated-components";
import { preloadImages } from "@brianwhaley/pixelated-components";

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
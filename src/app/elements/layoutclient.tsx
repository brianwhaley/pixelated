"use client";

import { useLayoutEffect } from "react";

import { MicroInteractions } from "@pixelated-tech/components";
// import { loadAllImagesFromCloudinary } from "@pixelated-tech/components";
// import { deferAllCSS } from "@pixelated-tech/components";
import { preloadAllCSS } from "@pixelated-tech/components";
import { preloadImages } from "@pixelated-tech/components";
import { InferProps } from 'prop-types';

/**
 * LayoutClient - Client-side layout setup for micro-interactions and preloading assets
 * @param none
 */
LayoutClient.propTypes = {};
export type LayoutClientType = InferProps<typeof LayoutClient.propTypes>;
export function LayoutClient() {
	useLayoutEffect(() => {
		preloadAllCSS();
		preloadImages();
		MicroInteractions({ 
			buttonring: true,
			formglow: true,
			imgscale: true,
			scrollfadeElements: '.page-section-header, .callout , .calloutSmall , .carousel-container, .timeline-container, .tile-container, .tile',
		});
	}, []);

	return <></>;
    
}
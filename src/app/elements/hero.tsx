"use client";

import React from "react"
import { Carousel } from "../components/carousel/pixelated.carousel";

export default function Hero() {
	return (
		<div id="page-hero" className="grid12">
			<Carousel type='hero' />
		</div>
	);
}

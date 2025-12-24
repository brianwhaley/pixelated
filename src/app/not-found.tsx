"use client";

import { FourOhFour } from "@pixelated-tech/components";
import imagesData from "@/app/data/404-data.json";
const images = imagesData.images;

export default function NotFound () {
	return (
		<section id="notfound-section">
			<div className="section-container" style={{ position: "relative" }}>
				<FourOhFour images={images} />
			</div>
		</section>
	);
}

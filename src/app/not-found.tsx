"use client";

import { FourOhFourLocal } from "@/app/elements/four-oh-four-local";
import imagesData from "@/app/data/404-data.json";
const images = imagesData.images;

export default function NotFound () {
	return (
		<section id="notfound-section">
			<div className="section-container" style={{ position: "relative" }}>
				<FourOhFourLocal images={images} />
			</div>
		</section>
	);
}

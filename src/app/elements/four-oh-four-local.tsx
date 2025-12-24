"use client";

import React, { useState, useEffect } from "react";

interface FourOhFourLocalProps {
	images: Array<{
		img: string;
		text: string;
		description: string;
	}>;
}

export function FourOhFourLocal({ images }: FourOhFourLocalProps) {
	const [randomIndex, setRandomIndex] = useState<number>(0);
	const [imageURL, setImageURL] = useState<string>('');

	useEffect(() => {
		const randomIndex = Math.floor(Math.random() * images.length);
		setRandomIndex(randomIndex);
		setImageURL(images[randomIndex].img);
	}, [images]);

	if (randomIndex !== null && imageURL !== '') {
		return (
			<>
				<div className="fof-body-container">
					<h1 className="centered text-outline">404 - {images[randomIndex].text}</h1>
					<div className="centered-button">
						<a href="/" target="_self" rel="noopener noreferrer">Go Home</a>
					</div>
				</div>
				<div className="fof-image-container">
					<div className="fof-image-wrapper">
						<img
							src={imageURL}
							title={"Page Not Found - " + images[randomIndex].description}
							alt={"Page Not Found - " + images[randomIndex].description}
							style={{ maxWidth: '100%', height: 'auto' }}
						/>
					</div>
				</div>
			</>
		);
	} else {
		return (
			<div className="fof-body-container">
				<h1 className="centered text-outline">404 - Page Not Found</h1>
				<div className="centered-button">
					<a href="/" target="_self" rel="noopener noreferrer">Go Home</a>
				</div>
			</div>
		);
	}
}
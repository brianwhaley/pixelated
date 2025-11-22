import React, { useState, useEffect } from "react";
import PropTypes, { InferProps } from 'prop-types';
import { getCloudinaryRemoteFetchURL } from "../cms/pixelated.cloudinary";
import "./pixelated.404.css";

FourOhFour.propTypes = {
	images: PropTypes.array.isRequired,
};
export type FourOhFourType = InferProps<typeof FourOhFour.propTypes>;
export function FourOhFour (props: FourOhFourType) {
    
	const images = props.images;

	const [ randomIndex, setRandomIndex ] = useState<number>(0);
	const [ cloudinaryURL, setCloudinaryURL ] = useState<string>('');
	useEffect(() => {
		const randomIndex = Math.floor(Math.random() * images.length);
		setRandomIndex(randomIndex);
		const cloudinaryURL = getCloudinaryRemoteFetchURL({ url: images[randomIndex].img, product_env:"dlbon7tpq" });
		setCloudinaryURL(cloudinaryURL);
  	}, []);

	if (randomIndex !== null && cloudinaryURL !== '') {
		return (
			<>
				<div className="fofBodyContainer">
					<h1 className="centered textOutline">404 - {images[randomIndex].text}</h1>
					<div className="centeredbutton"><a href="/" target="_self" rel="noopener noreferrer">Go Home</a></div>
				</div>	
				<div className="fofImageContainer">
					<div className="fofImageWrapper">
						<img src={cloudinaryURL} 
							title={"Page Not Found - " + images[randomIndex].description} 
							alt={"Page Not Found - " + images[randomIndex].description} 
						/>
					</div>
				</div>
			</>
		);
	} else {
		return (
			<></>
		);
	}
}
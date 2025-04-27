import React, {  } from 'react';
import { Carousel } from '../components/carousel/pixelated.carousel';
import '../components/carousel/pixelated.carousel.css';
import '../css/pixelated.global.css';

export default {
	title: 'Carousel',
	component: Carousel
};

function Hero() {
	return (
		<div id="page-hero" style={{ width: '100%', height: '100px',}} >
			<Carousel type='hero' />
		</div>
	);
};

export function PixelatedHero() {
	return <Hero />;
};
PixelatedHero.args = {
	args: {
		flickr: {
			urlProps: {
				tags: 'pixelatedviewsgallery',
				// tags: 'workportfolio',
				photoSize: 'Large'
			}
		},
		type: 'hero'
	}
};

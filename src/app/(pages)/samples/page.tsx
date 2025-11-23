"use client";

import React, { /* useState, */ useEffect, Suspense } from "react";
import { Tiles } from "@brianwhaley/pixelated-components";
import { MicroInteractions } from "@brianwhaley/pixelated-components";
import { loadAllImagesFromCloudinary } from "@brianwhaley/pixelated-components/server";
import { deferAllCSS } from "@brianwhaley/pixelated-components";
import { preloadImages } from "@brianwhaley/pixelated-components";
import Header from "@/app/elements/header";
import HeaderNav from "@/app/elements/headernav";
import Nav from "@/app/elements/nav";
import Search from '@/app/elements/search';
import Footer from '@/app/elements/footer';

import "@brianwhaley/pixelated-components/css/pixelated.global.css";
import "@/app/globals.css";

const sampleTiles = [
	{
		index: 0, cardIndex: 0, cardLength: 3,
		link: "/samples/page1",
		image: "https://s3media.angieslist.com/s3fs-public/exterior-house-landscaped-garden.jpeg",
		imageAlt: "Sample # 1: Tom's Landscape Services",
	},
	{
		index: 1, cardIndex: 1, cardLength: 3,
		link: "/samples/page2",
		image: "https://www.bostonmagazine.com/wp-content/uploads/sites/2/2019/08/wedding-photographers-instagram.jpg",
		imageAlt: "Sample # 2: Momento Studios Photography",
	},
	{
		index: 2, cardIndex: 2, cardLength: 3,
		link: "/samples/page3",
		image: "https://media.istockphoto.com/id/1198045184/photo/fine-dining-at-lunch.jpg?s=612x612&w=0&k=20&c=LS4QPJuFjbj1IveVKyV0NWC-BlabgyxFTy-dCCoJ35w=",
		imageAlt: "Sample # 3: The Linen Table, Modern European Cuisine",
	}, 
];




export default function Samples() {
	
	useEffect(() => {
		document.addEventListener('DOMContentLoaded', deferAllCSS);
		preloadImages();
		deferAllCSS();
		loadAllImagesFromCloudinary({ 
			origin: window.location.origin,
			product_env: "dlbon7tpq"
		});
	}, []);

	useEffect(() => {
		MicroInteractions({ 
			buttonring: true,
			formglow: true,
			imgtwist: true,
			scrollfadeElements: '.callout , .calloutSmall , .carouselContainer, .timelineContainer, .tile',
		});
	}, []);

	return (
		<html lang="en">
			<head>
				<title>Pixelated Technologies - Sample Designs</title>
			</head>
			<body>
				<header>
					<div id="page-header" className="fixed-header"><Header /></div>
					<div id="page-header-nav" className="fixed-header-nav">
						<div className="section-container">
							<HeaderNav />
						</div>
					</div>
					<div id="fixed-header-spacer"></div>
					<div id="fixed-header-nav-spacer"></div>
					<div id="page-search" className="noMobile"><Search id="009500278966481927899:bcssp73qony" /></div>
				</header>
				<nav>
					<Suspense fallback={<></>}>
						<Nav />
					</Suspense>
				</nav>
				<main>
					<section id="landscape-tiles-section">
						<div className="section-container">
							<Tiles cards={sampleTiles} rowCount={3}/>
						</div>
					</section>
				</main>
				<footer><Footer /></footer>
			</body>
		</html>
	);
}
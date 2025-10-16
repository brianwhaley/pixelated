"use client"; 

import React, { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
import { getRouteByKey } from "@/app/components/metadata/pixelated.metadata";
// import { getRouteByKey } from "@brianwhaley/pixelated-components";
// import { getMetadata } from "@brianwhaley/pixelated-components";
import { MicroInteractions } from "@brianwhaley/pixelated-components";
import Header from "@/app/elements/header";
import Nav from "@/app/elements/nav";
import Search from '@/app/elements/search';
import Footer from '@/app/elements/footer';
import "@/app/css/pixelated.global.css";
import "@/app/css/pixelated.grid.scss";
import myRoutes from "@/app/data/routes.json";
/* import "../globals.css"; */

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
	const pathname = usePathname();
	const metadata = getRouteByKey(myRoutes.routes, "path", pathname);
	
	const [ origin, setOrigin ] = useState<string | null>(null);
	// const [ host, setHost ] = useState<string | null>(null);
	useEffect(() => {
		setOrigin(window.location.origin || null);
		// setHost(window.location.host || null);
	}, []);

	useEffect(() => {
		MicroInteractions({ 
			buttonring: true,
			formglow: true,
			imgtwist: true,
			scrollfadeElements: '.callout , .calloutSmall , .carouselContainer, .timelineContainer',
		});
	}, []);

	return (
		<html lang="en">
			<head>
				<title>{metadata?.title}</title>
				<meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
				<meta name="description" content={metadata?.description} />
				<meta name="keywords" content={metadata?.keywords} />
				<meta name="google-site-verification" content="t2yy9wL1bXPiPQjBqDee2BTgpiGQjwVldlfa4X5CQkU" />
				<meta name="google-site-verification" content="l7D0Y_JsgtACBKNCeFAXPe-UWqo13fPTUCWhkmHStZ4" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />

				<meta property="og:site_name" content="Pixelated" />
				<meta property="og:title" content={metadata?.title} />
				<meta property="og:url" content={origin ?? undefined} />
				<meta property="og:type" content="website" />
				<meta property="og:description" content={metadata?.description} />
				<meta property="og:image" content="/images/pix/pix-bg-512.gif" />
				<meta property="og:image:width" content="512" />
				<meta property="og:image:height" content="512" />
				<meta itemProp="name" content="Pixelated" />
				<meta itemProp="url" content={origin ?? undefined} />
				<meta itemProp="description" content={metadata?.description} />
				<meta itemProp="thumbnailUrl" content="/images/pix-bg-512.gif" />

				<link rel="alternate" href={origin ?? undefined} hrefLang="en-us" />
				<link rel="canonical" href={origin ?? undefined} />
				<link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
				<link rel="shortcut icon" type="image/x-icon" href="/images/favicon.ico" />
				<link rel="manifest" href="/manifest.webmanifest" />
			</head>
			<body>
				<header>
					<div id="page-header" className="fixed-header"><Header /></div>
					<div id="fixed-header-spacer"></div>
					<div id="page-search" className="noMobile"><Search id="009500278966481927899:bcssp73qony" /></div>
				</header>
				<nav><Nav /></nav>
				<main>{children}</main>
				<footer><Footer /></footer>
			</body>
		</html>
	);
}

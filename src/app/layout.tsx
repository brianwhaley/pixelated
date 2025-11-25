"use client"; 

import React, { useState, useLayoutEffect, /* useEffect, */ Suspense } from "react";
import { usePathname } from 'next/navigation';
import { getRouteByKey } from "@brianwhaley/pixelated-components/server";
import { MicroInteractions } from "@brianwhaley/pixelated-components";
// import { loadAllImagesFromCloudinary } from "@brianwhaley/pixelated-components";
// import { deferAllCSS } from "@brianwhaley/pixelated-components";
import { preloadAllCSS } from "@brianwhaley/pixelated-components";
import { preloadImages } from "@brianwhaley/pixelated-components";
import Header from "@/app/elements/header";
import HeaderNav from "@/app/elements/headernav";
import Nav from "@/app/elements/nav";
import Search from '@/app/elements/search';
import Footer from '@/app/elements/footer';
import myRoutes from "@/app/data/routes.json";
import "@brianwhaley/pixelated-components/css/pixelated.global.css";
import "@brianwhaley/pixelated-components/css/pixelated.grid.scss";
// LOAD THIS AS LAST CSS FILE
import "@/app/globals.css";


export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
	const pathname = usePathname();
	
	// Minimal layout for /samples routes - no CSS, no header/nav/footer
	if (pathname.startsWith('/samples')) {
		return (
			<html lang="en">
				<head></head>
				<body>{children}</body>
			</html>
		);
	}

	// Full layout for all other routes
	const metadata = getRouteByKey(myRoutes.routes, "path", pathname);

	const [ url, setURL ] = useState<string>();
	useLayoutEffect(() => {
		if (typeof window !== "undefined" ) setURL(window.location.href);
		/* loadAllImagesFromCloudinary({ 
			origin: window.location.origin,
			product_env: "dlbon7tpq"
		}); */
		preloadAllCSS();
		preloadImages();
		MicroInteractions({ 
			buttonring: true,
			formglow: true,
			imgtwist: true,
			scrollfadeElements: '.pageSectionHeader, .callout , .calloutSmall , .carouselContainer, .timelineContainer, .tileContainer, .tile',
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

				<meta property="og:site_name" content="Pixelated Technologies" />
				<meta property="og:title" content={metadata?.title} />
				<meta property="og:url" content={url} />
				<meta property="og:type" content="website" />
				<meta property="og:description" content={metadata?.description} />
				<meta property="og:image" content="/images/pix/pix-bg-512.gif" />
				<meta property="og:image:width" content="512" />
				<meta property="og:image:height" content="512" />

				<meta itemProp="name" content="Pixelated Technologies" />
				<meta itemProp="url" content={url} />
				<meta itemProp="description" content={metadata?.description} />
				<meta itemProp="thumbnailUrl" content="/images/pix-bg-512.gif" />

				<meta property="twitter:domain" content="pixelated.tech" />
				<meta property="twitter:url" content={url} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:description" content={metadata?.description} />
				<meta name="twitter:image" content="/images/pix/pix-bg-512.gif" />
				<meta name="twitter:title" content={metadata?.title} />

				<link rel="canonical" href={url} />
				{ /* <link rel="alternate" href={url} hrefLang="en-us" /> */ }
				<link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
				<link rel="shortcut icon" type="image/x-icon" href="/images/favicon.ico" />
				<link rel="manifest" href="/manifest.webmanifest" />
				<link rel="preconnect" href="https://res.cloudinary.com/" />
				<link rel="preconnect" href="https://farm2.static.flickr.com" />
				<link rel="preconnect" href="https://farm6.static.flickr.com" />
				<link rel="preconnect" href="https://farm8.static.flickr.com" />
				<link rel="preconnect" href="https://farm66.static.flickr.com" />
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
					<div id="page-search" className="noMobile">
						<Search id="009500278966481927899:bcssp73qony" />
					</div>
				</header>
				<nav>
					<Suspense fallback={<></>}>
						<Nav />
					</Suspense>
				</nav>
				<main>{children}</main>
				<footer><Footer /></footer>
			</body>
		</html>
	);
}

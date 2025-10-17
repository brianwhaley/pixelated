"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
import { getRouteByKey } from "@/app/components/pixelated.metadata";
import { MicroInteractions } from "@brianwhaley/pixelated-components"
import "@brianwhaley/pixelated-components/dist/css/pixelated.global.css";
import "@brianwhaley/pixelated-components/dist/css/pixelated.grid.scss";
import Header from "@/app/elements/header";
import Footer from "@/app/elements/footer";
import myRoutes from "@/app/data/routes.json";
import "@/app/globals.css";

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
	const pathname = usePathname();
	const metadata = getRouteByKey(myRoutes.routes, "path", pathname);
	const [ origin, setOrigin ] = useState<string | null>(null);
	// const [ host, setHost ] = useState<string | null>(null);
	useEffect(() => {
		setOrigin(window.location.origin);
		// setHost(window.location.host || null);
	}, []);
	useEffect(() => {
		MicroInteractions({ 
			buttonring: true,
			formglow: true,
			imgtwist: true,
			scrollfadeElements: '.callout , .calloutSmall , .carouselContainer',
		});
	}, []);

	return (
		<html lang="en">
			<head>
				<title>{metadata?.title}</title>
				<meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
				<meta name="description" content={metadata?.description} />
				<meta name="keywords" content={metadata?.keywords} />
				<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
				<meta property="og:site_name" content="Palmetto Epoxy" />
				<meta property="og:title" content={metadata?.title} />
				<meta property="og:url" content={origin ?? undefined} />
				<meta property="og:type" content="website" />
				<meta property="og:description" content={metadata?.description} />
				<meta property="og:image" content="/images/palmetto-epoxy-logo.jpg" />
				<meta property="og:image:width" content="1375" />
				<meta property="og:image:height" content="851" />
				<meta itemProp="name" content="Palmetto Epoxy" />
				<meta itemProp="url" content={origin ?? undefined} />
				<meta itemProp="description" content={metadata?.description} />
				<meta itemProp="thumbnailUrl" content="/images/palmetto-epoxy-logo.jpg" />
				<link rel="alternate" href={origin ?? undefined} hrefLang="en-us" />
				<link rel="canonical" href={origin ?? undefined} />
				<link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
				<link rel="preload" fetchPriority="high" as="image" href="https://www.palmetto-epoxy.com/images/palmetto-epoxy-logo.jpg" type="image/webp"></link>
				<link rel="shortcut icon" type="image/x-icon" href="/images/favicon.ico" />
				<link rel="manifest" href="/manifest.webmanifest" />
			</head>
			<body>
				<header><Header /></header>
				<main>{children}</main>
				<footer><Footer /></footer>
			</body>
		</html>
	);
}

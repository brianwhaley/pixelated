"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
import { getRouteByKey } from "@/app/components/pixelated.metadata";
import Header from "@/app/elements/header";
import Footer from "@/app/elements/footer";
import "@/app/css/pixelated.global.css";
import "@/app/css/pixelated.grid.scss";
import myRoutes from "@/app/data/routes.json";

import "@/app/css/globals.css";

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
	const pathname = usePathname();
	const metadata = getRouteByKey(myRoutes.routes, "path", pathname);

	const [ origin, setOrigin ] = useState<string | null>(null);
	const [ host, setHost ] = useState<string | null>(null);
	useEffect(() => {
		setOrigin(window.location.origin || null);
		setHost(window.location.host || null);
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
				<meta property="og:image" content="http://static1.squarespace.com/static/63f19158f84f2b1e64ff6df7/t/667729a5d1494f54b5044af8/1719085481930/Palmetto%2BEpoxy%2Blogo%2B2.1_cropped.jpg?format=1500w" />
				<meta property="og:image:width" content="1375" />
				<meta property="og:image:height" content="851" />
				<meta itemProp="name" content="Palmetto Epoxy" />
				<meta itemProp="url" content={origin ?? undefined} />
				<meta itemProp="description" content={metadata?.description} />
				<meta itemProp="thumbnailUrl" content="http://static1.squarespace.com/static/63f19158f84f2b1e64ff6df7/t/667729a5d1494f54b5044af8/1719085481930/Palmetto%2BEpoxy%2Blogo%2B2.1_cropped.jpg?format=1500w" />

				<link rel="alternate" href={host} hrefLang="en-us" />
				<link rel="canonical" href={origin} />
				<link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
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

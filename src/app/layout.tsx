"use client"; 

import React from "react";
import { usePathname } from 'next/navigation';
import { getMetadata } from "@brianwhaley/pixelated-components";
import HomeLayout from "@/app/layouts/home-layout";
import PageLayout from "@/app/layouts/page-layout";
import "@/app/css/pixelated.global.css";
import "@/app/css/pixelated.grid.scss";
import myRoutes from "@/app/data/routes.json";
/* import "../globals.css"; */

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
	const pathname = usePathname();
	const metadata = getMetadata({routes: myRoutes.routes, key:"path", value: pathname}) as { title: string; description: string; keywords: string };
	let layout;
	if (pathname === '/') {
		layout = <HomeLayout>{children}</HomeLayout> ;
	} else {
		layout = <PageLayout>{children}</PageLayout> ;
	}

	return (
		<html lang="en">
			<head>
				<title>{metadata.title}</title>
				<meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
				<meta name="description" content={metadata.description} />
				<meta name="keywords" content={metadata.keywords} />
				<meta name="google-site-verification" content="t2yy9wL1bXPiPQjBqDee2BTgpiGQjwVldlfa4X5CQkU" />
				<meta name="google-site-verification" content="l7D0Y_JsgtACBKNCeFAXPe-UWqo13fPTUCWhkmHStZ4" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
				<link rel="shortcut icon" type="image/x-icon" href="/images/favicon.ico" />
				<link rel="alternate" href="www.pixelated.tech" hrefLang="en-us" />
				<link rel="manifest" href="/manifest.webmanifest" />
			</head>
			<body>{layout}</body>
		</html>
	);
}

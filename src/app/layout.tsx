"use client"; 

import { usePathname } from 'next/navigation';
import React from "react";
import { getMetadata } from "@/app/elements/metadata";
import HomeLayout from "@/app/layouts/home-layout";
import PageLayout from "@/app/layouts/page-layout";
import "@/app/js/pixelated";
import "@/app/css/pixelated.global.css";
import "@/app/css/pixelated.grid.scss";

/* import "../globals.css"; */

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
	const pathname = usePathname();
	const metadata = getMetadata({key:"path", value: pathname});
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
				<meta name="keywords" content="" />
				<meta name="google-site-verification" content="t2yy9wL1bXPiPQjBqDee2BTgpiGQjwVldlfa4X5CQkU" />
				<meta name="google-site-verification" content="l7D0Y_JsgtACBKNCeFAXPe-UWqo13fPTUCWhkmHStZ4" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
				<link rel="shortcut icon" type="image/x-icon" href="/images/favicon.ico" />
				<link rel="alternate" href="www.pixelated.tech" hrefLang="en-us" />
				{ /* <script defer={true} src="/js/pixelated.js" type="text/javascript"></script> */ }
				{ /* <script defer={true} src="//platform.twitter.com/widgets.js" type="text/javascript"></script> */ }
				{ /* <link type="text/css" rel="stylesheet/less" href="/css/pixelated.less" /> */ }
				{ /* <link type="text/css" rel="stylesheet/less" href="/css/pixelated.grid.less" /> */ }
				{ /* <script defer={true} src="//cdnjs.cloudflare.com/ajax/libs/less.js/3.9.0/less.min.js"></script> */ }
				<link rel="manifest" href="/manifest.json" />
			</head>
			<body>{layout}</body>
		</html>
	);
}

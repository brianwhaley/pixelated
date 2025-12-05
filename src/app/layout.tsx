/* eslint-disable @next/next/no-page-custom-font */

import { headers } from "next/headers";
import { getRouteByKey } from "@pixelated-tech/components/server";
import { PixelatedServerConfigProvider } from "@pixelated-tech/components/server";
import myRoutes from "@/app/data/routes.json";

import Header from "@/app/elements/header";
import HeaderNav from "@/app/elements/headernav";
import Nav from "@/app/elements/nav";
import Search from '@/app/elements/search';
import Footer from '@/app/elements/footer';
import { LayoutClient } from "@/app/elements/layoutclient";

import "@pixelated-tech/components/css/pixelated.global.css";
import "@pixelated-tech/components/css/pixelated.font.scss";
import "@pixelated-tech/components/css/pixelated.grid.scss";
// LOAD THIS AS LAST CSS FILE
import "@/app/globals.css";


export default async function RootLayout({children}: Readonly<{children: React.ReactNode}>) {

	const reqHeaders: Headers = await (headers() as Promise<Headers>);
	const path = reqHeaders.get("x-path") ?? "/";
	const origin = reqHeaders.get("x-origin");
	const url = reqHeaders.get("x-url") ?? `${origin}${path}`;
	const pathname = path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path;
	const metadata = getRouteByKey(myRoutes.routes, "path", pathname);

	// Minimal layout for /samples routes - no CSS, no header/nav/footer
	// if (pathname.startsWith('/samples/')) {
	const regexPattern = /^\/samples\/.+$/;
	if (regexPattern.test(pathname)) {
		return (
			<>
				<LayoutClient />
				<html lang="en" className="pixelated">
					<head></head>
					<body>
						<PixelatedServerConfigProvider>
							{children}
						</PixelatedServerConfigProvider>
					</body>
				</html>
			</>
		);
	}


	return (

		<>
			<LayoutClient />
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
					{/* <link rel="alternate" href={url} hrefLang="en-us" /> */}
					<link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
					<link rel="shortcut icon" type="image/x-icon" href="/images/favicon.ico" />
					<link rel="manifest" href="/manifest.webmanifest" />
					<link rel="preconnect" href="https://res.cloudinary.com/" />
					<link rel="preconnect" href="https://farm2.static.flickr.com" />
					<link rel="preconnect" href="https://farm6.static.flickr.com" />
					<link rel="preconnect" href="https://farm8.static.flickr.com" />
					<link rel="preconnect" href="https://farm66.static.flickr.com" />

					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
					<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" />
					<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" />
				</head>
				<body>
					<PixelatedServerConfigProvider>
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
							<Nav />
						</nav>
						<main>{children}</main>
						<footer>
							<Footer />
						</footer>
					</PixelatedServerConfigProvider>
				</body>
			</html></>
	);
}
/* eslint-disable @next/next/no-page-custom-font */

import { headers } from "next/headers";
import { getRouteByKey } from "@pixelated-tech/components/server";
import { generateMetaTags } from "@pixelated-tech/components/server";
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
					{ generateMetaTags({
						title: metadata?.title ?? "",
						description: metadata?.description ?? "",
						keywords: metadata?.keywords ?? "",
						site_name: "Pixelated Technologies",
						email: "info@pixelated.tech",
						origin: origin ?? "",
						url: url ?? "",
						image: "/images/pix/pix-bg-512.gif",
						image_height: "512",
						image_width: "512",
						favicon: "/images/favicon.ico"
					}) }
					<meta name="google-site-verification" content="t2yy9wL1bXPiPQjBqDee2BTgpiGQjwVldlfa4X5CQkU" />
					<meta name="google-site-verification" content="l7D0Y_JsgtACBKNCeFAXPe-UWqo13fPTUCWhkmHStZ4" />
					
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
							<div id="page-search" className="no-mobile">
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
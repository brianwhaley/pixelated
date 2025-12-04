import { headers } from "next/headers";
import { getRouteByKey } from "@brianwhaley/pixelated-components/server";
import { PixelatedServerConfigProvider } from "@brianwhaley/pixelated-components/server";
import { LayoutClient } from "./elements/layoutclient";
import Header from "@/app/elements/header";
import Footer from "@/app/elements/footer";
import myRoutes from "@/app/data/routes.json";
import "@brianwhaley/pixelated-components/css/pixelated.global.css";
import "@brianwhaley/pixelated-components/css/pixelated.grid.scss";
import "@brianwhaley/pixelated-components/css/pixelated.font.scss";
import "@/app/globals.css";

export default async function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
	
	const reqHeaders: Headers = await (headers() as Promise<Headers>);
	const path = reqHeaders.get("x-path") ?? "/";
	const origin = reqHeaders.get("x-origin");
	const url = reqHeaders.get("x-url") ?? `${origin}${path}`;
	const pathname = path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path;
	const metadata = getRouteByKey(myRoutes.routes, "path", pathname);

	return (
		<>
		<LayoutClient />
		<html lang="en">
			<head>
				<title>{metadata?.title}</title>
				<meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
				<meta name="description" content={metadata?.description} />
				<meta name="keywords" content={metadata?.keywords} />
				<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
				<meta property="og:site_name" content="Palmetto Epoxy" />
				<meta property="og:title" content={metadata?.title} />
				<meta property="og:url" content={url} />
				<meta property="og:type" content="website" />
				<meta property="og:description" content={metadata?.description} />
				<meta property="og:image" content="/images/palmetto-epoxy-logo.jpg" />
				<meta property="og:image:width" content="1375" />
				<meta property="og:image:height" content="851" />
				<meta itemProp="name" content="Palmetto Epoxy" />
				<meta itemProp="url" content={url} />
				<meta itemProp="description" content={metadata?.description} />
				<meta itemProp="thumbnailUrl" content="/images/palmetto-epoxy-logo.jpg" />
				<link rel="canonical" href={url} />
				{ /* <link rel="alternate" href={url} hrefLang="en-us" /> */ }
				<link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
				<link rel="preload" fetchPriority="high" as="image" href="https://www.palmetto-epoxy.com/images/palmetto-epoxy-logo.jpg" type="image/webp"></link>
				<link rel="shortcut icon" type="image/x-icon" href="/images/favicon.ico" />
				<link rel="manifest" href="/manifest.webmanifest" />
				<link rel="preconnect" href="https://images.ctfassets.net/" />
				<link rel="preconnect" href="https://res.cloudinary.com/" />
			</head>
			<body>
				<PixelatedServerConfigProvider>
				<header><Header /></header>
				<main>{children}</main>
				<footer><Footer /></footer>
				</PixelatedServerConfigProvider>
			</body>
		</html>
		</>
	);
}

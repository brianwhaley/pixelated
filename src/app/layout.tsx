
import { headers } from "next/headers";
import { getRouteByKey } from "@pixelated-tech/components/server";
import { generateMetaTags, PixelatedServerConfigProvider } from "@pixelated-tech/components/server";
import { LocalBusinessSchema, WebsiteSchema, ServicesSchema, SchemaBlogPosting, mapWordPressToBlogPosting, getWordPressItems } from "@pixelated-tech/components/server";
import { VisualDesignStyles } from "@pixelated-tech/components/server";
import type { BlogPostType, SiteInfo } from "@pixelated-tech/components";
import { LayoutClient } from "@/app/elements/layoutclient";
import Header from "@/app/elements/header";
import HeaderNav from "@/app/elements/headernav";
import Nav from "@/app/elements/nav";
import Search from '@/app/elements/search';
import Footer from '@/app/elements/footer';
import { BlogPostsProvider } from "@/app/providers/blog-posts-provider";
import myRoutes from "@/app/data/routes.json";
import "@pixelated-tech/components/css/pixelated.global.css";
import "@pixelated-tech/components/css/pixelated.grid.scss";
import "./globals.css";

const BLOG_SCHEMA_FETCH_COUNT: number | undefined = undefined;
const WORDPRESS_SITE = "blog.pixelated.tech";

export default async function RootLayout({children}: Readonly<{children: React.ReactNode}>) {

	const reqHeaders: Headers = await (headers() as Promise<Headers>);
	const path = reqHeaders.get("x-path") ?? "/";
	const origin = reqHeaders.get("x-origin");
	const url = reqHeaders.get("x-url") ?? `${origin}${path}`;
	const pathname = path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path;
	const metadata = getRouteByKey(myRoutes.routes, "path", pathname);

	// Extract siteinfo from routes.json for schema components
	const siteInfo = myRoutes.siteInfo;

	// Fetch blog posts once for both schemas and page display
	// If BLOG_SCHEMA_FETCH_COUNT is undefined, fetches ALL available posts (with auto-pagination)
	let blogPosts: BlogPostType[] = [];
	let blogSchemas: any[] = [];
	if (pathname === "/blog") {
		try {
			blogPosts = (await getWordPressItems({ site: WORDPRESS_SITE, count: BLOG_SCHEMA_FETCH_COUNT })) ?? [];
			blogSchemas = blogPosts.map(post => mapWordPressToBlogPosting(post, false));
		} catch (error) {
			console.error("Error fetching blog posts:", error);
		}
	}

	// Minimal layout for /samples routes - no CSS, no header/nav/footer
	const regexPattern = /^\/samples\/.+$/;
	const samplesBody = children;
	const pixelatedBody = (
		<>
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
					<Search />
				</div>
			</header>
			<nav>
				<Nav />
			</nav>
			<main>{children}</main>
			<footer>
				<Footer />
			</footer>
		</>
	) ;

	const layoutBody = (regexPattern.test(pathname)) ? samplesBody : pixelatedBody;

	return (

		<>
			<LayoutClient />
			<html lang="en">
				<head>

					{ generateMetaTags({
						title: metadata?.title ?? "",
						description: metadata?.description ?? "",
						keywords: metadata?.keywords ?? "",
						origin: origin ?? "",
						url: url ?? "",
						siteInfo: siteInfo
					}) }
					<WebsiteSchema siteInfo={siteInfo as SiteInfo} />
					<LocalBusinessSchema siteInfo={myRoutes.siteInfo} />
					<ServicesSchema siteInfo={siteInfo} />
					<VisualDesignStyles visualdesign={myRoutes.visualdesign} />
					<LocalBusinessSchema
						siteInfo={siteInfo}
						streetAddress="4 Raymond Court"
						addressLocality="Bluffton"
						addressRegion="SC"
						postalCode="29909"
						addressCountry="US"
						telephone="+1-843-699-6611"
					/>
					{ blogSchemas.map((schema, index) => (
						<SchemaBlogPosting key={index} post={schema} />
					)) }
					<meta name="google-site-verification" content="t2yy9wL1bXPiPQjBqDee2BTgpiGQjwVldlfa4X5CQkU" />
					<meta name="google-site-verification" content="l7D0Y_JsgtACBKNCeFAXPe-UWqo13fPTUCWhkmHStZ4" />
				</head>
				<body>
					<PixelatedServerConfigProvider>
						<BlogPostsProvider posts={blogPosts}>
							{ layoutBody }
						</BlogPostsProvider>
					</PixelatedServerConfigProvider>
				</body>
			</html></>
	);
}


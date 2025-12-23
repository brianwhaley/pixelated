
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
						origin: origin ?? "",
						url: url ?? "",
						siteInfo: myRoutes.siteInfo
					}) }
					<LocalBusinessSchema siteInfo={myRoutes.siteInfo} />
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
					<WebsiteSchema
						siteInfo={siteInfo}
						potentialAction={{
							'@type': 'SearchAction',
							target: {
								'@type': 'EntryPoint',
								urlTemplate: 'https://pixelated.tech/search?q={search_term}'
							}
						}}
					/>
					<ServicesSchema
						provider={{
							name: "Pixelated",
							url: "https://pixelated.tech",
							logo: "https://pixelated.tech/images/pix/pix-bg-512.gif",
							telephone: "+1-973-710-8008",
							email: "info@pixelated.tech"
						}}
						services={[
							{
								name: "Web Development",
								description: "Pixelated Technologies can be your Virtual Technology Department, providing custom web development solutions tailored to your business needs. We specialize in creating responsive, user-friendly websites and web applications that help small businesses succeed online.",
								url: "https://pixelated.tech",
								areaServed: ["New Jersey", "South Carolina"]
							},
							{
								name: "Social Media Marketing",
								description: "Let Pixelated Technologies help you develop a comprehensive social media strategy that aligns with your business goals. We can help you create and manage your social media accounts, produce engaging content, and analyze performance metrics to optimize your social media presence.",
								url: "https://pixelated.tech",
								areaServed: ["New Jersey", "South Carolina"]
							},
							{
								name: "Search Engine Optimization (SEO)",
								description: "Pixelated Technologies can help you improve your websites visibility and ranking on popular search engines. We can conduct a thorough SEO audit of your website, identify areas for improvement, and implement on-page and off-page SEO strategies to boost your search engine performance.",
								url: "https://pixelated.tech",
								areaServed: ["United States"]
							},
							{
								name: "Content Management",
								description: "Pixelated Technologies can help you implement a content management system (CMS) that allows you to easily update and manage your website content. We can help you choose the right CMS at the right cost for your business needs, set it up, and provide training and support to ensure you can manage your website effectively.",
								url: "https://pixelated.tech",
								areaServed: ["United States"]
							},
							{
								name: "E-Commerce Solutions",
								description: "Pixelated Technologies can help you set up and manage an eCommerce platform that meets your business needs. We can help you choose the right eCommerce solution, set it up, and provide ongoing support to ensure your online store runs smoothly.",
								url: "https://pixelated.tech",
								areaServed: ["United States"]
							},
							{
								name: "Small Business Modernization",
								description: "Pixelated Technologies can help you develop custom business solutions that streamline your operations and improve your efficiency. We can work with you to understand your business processes, identify areas for improvement, and develop custom software solutions that meet your specific needs.",
								url: "https://pixelated.tech",
								areaServed: ["United States"]
							},
						]}
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
						</BlogPostsProvider>
					</PixelatedServerConfigProvider>
				</body>
			</html></>
	);
}
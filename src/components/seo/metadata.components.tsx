
import React from "react";
import PropTypes, { InferProps } from "prop-types";



// https://gist.github.com/whitingx/3840905
generateMetaTags.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	keywords: PropTypes.string.isRequired,
	site_name: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	origin: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	image_height: PropTypes.string.isRequired,
	image_width: PropTypes.string.isRequired,
	favicon: PropTypes.string.isRequired,
};
export type generateMetaTagsProps = InferProps<typeof generateMetaTags.propTypes>;
export function generateMetaTags(props: generateMetaTagsProps) {
	const { title, description, keywords, site_name, email, origin, url, image, image_height, image_width, favicon } = props;
	return (
		<>
			<title>{title}</title>

			<meta charSet="UTF-8" />
			<meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
			<meta httpEquiv='Expires' content='0' />
			<meta httpEquiv='Pragma' content='no-cache' />
			<meta httpEquiv='Cache-Control' content='no-cache' />

			<meta name="application-name" content={site_name} />
			<meta name="author" content={site_name + ", " + email} />
			<meta name='copyright' content={site_name} />
			<meta name="creator" content={site_name} />
			<meta name="description" content={description} />
			<meta name="keywords" content={keywords} />
			<meta name='language' content='EN' />
			<meta name='owner' content={site_name} />
			<meta name="publisher" content={site_name} />
			<meta name='rating' content='General' />
			<meta name='reply-to' content={email} />
			<meta name="robots" content="index, follow" />
			<meta name='url' content={url} />
			<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />

			<meta property="og:description" content={description} />
			<meta property='og:email' content={email} />
			<meta property="og:image" content={image} />
			<meta property="og:image:height" content={image_height} />
			<meta property="og:image:width" content={image_width} />
			<meta property="og:locale" content="en_US" />
			<meta property="og:site_name" content={site_name} />
			<meta property="og:title" content={title} />
			<meta property="og:type" content="website" />
			<meta property="og:url" content={url} />

			<meta itemProp="name" content={site_name} />
			<meta itemProp="url" content={url} />
			<meta itemProp="description" content={description} />
			<meta itemProp="thumbnailUrl" content={image} />

			<meta property="twitter:domain" content={new URL(origin).hostname} />
			<meta property="twitter:url" content={url} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:creator" content={site_name} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={image} />
			<meta name="twitter:image:height" content={image_height} />
			<meta name="twitter:image:width" content={image_width} />
			<meta name="twitter:title" content={title} />

			{/* <link rel="alternate" href={url} hrefLang="en-us" /> */}
			<link rel="author" href={origin} />
			<link rel="canonical" href={url} />
			<link rel="icon" type="image/x-icon" href={favicon} />
			<link rel="shortcut icon" type="image/x-icon" href={favicon} />
			<link rel="manifest" href="/manifest.webmanifest" />

			<link rel="preconnect" href="https://images.ctfassets.net/" />
			<link rel="preconnect" href="https://res.cloudinary.com/" />
			<link rel="preconnect" href="https://farm2.static.flickr.com" />
			<link rel="preconnect" href="https://farm6.static.flickr.com" />
			<link rel="preconnect" href="https://farm8.static.flickr.com" />
			<link rel="preconnect" href="https://farm66.static.flickr.com" />

		</>	
	);
}




setClientMetadata.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	keywords: PropTypes.string.isRequired,
};
export type SetClientMetadataProps = InferProps<typeof setClientMetadata.propTypes>;
export function setClientMetadata(props: SetClientMetadataProps) {
	const { title, description, keywords } = props;
	document.title = title;
	(document.querySelector("meta[property='og:title']"))?.setAttribute('content', title);
	(document.querySelector("meta[name='description']"))?.setAttribute('content', description);
	(document.querySelector("meta[property='og:description']"))?.setAttribute('content', description);
	(document.querySelector("meta[itemprop='description']"))?.setAttribute('content', description);
	(document.querySelector("meta[name='keywords']"))?.setAttribute('content', keywords);
};


import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import Image from 'next/image';

const CLOUDINARY_DOMAIN = 'https://res.cloudinary.com/';
// let smartImageInstanceCount = 0;

SmartImage.propTypes = {
	// Custom props
	cloudinaryEnv: PropTypes.string,
	cloudinaryDomain: PropTypes.string,	
	cloudinaryTransforms: PropTypes.string,
	// Required HTML img attributes
	src: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
	// Optional HTML img attributes
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	aboveFold: PropTypes.bool,
	loading: PropTypes.oneOf(['lazy', 'eager'] as const),
	preload: PropTypes.bool,
	decoding: PropTypes.oneOf(['async', 'auto', 'sync'] as const),
	fetchPriority: PropTypes.oneOf(['high', 'low', 'auto'] as const),
	crossOrigin: PropTypes.oneOf(['anonymous', 'use-credentials', ''] as const),
	referrerPolicy: PropTypes.oneOf([
		'no-referrer',
		'no-referrer-when-downgrade',
		'origin',
		'origin-when-cross-origin',
		'same-origin',
		'strict-origin',
		'strict-origin-when-cross-origin',
		'unsafe-url'
	] as const),
	sizes: PropTypes.string,
	srcSet: PropTypes.string,
	useMap: PropTypes.string,
	isMap: PropTypes.bool,
	// Styling
	className: PropTypes.string,
	style: PropTypes.object,
	// Event handlers
	onLoad: PropTypes.func,
	onError: PropTypes.func,
	onClick: PropTypes.func,
	onMouseEnter: PropTypes.func,
	onMouseLeave: PropTypes.func,
	onMouseOver: PropTypes.func,
	onMouseOut: PropTypes.func,
	// Accessibility
	role: PropTypes.string,
	tabIndex: PropTypes.number,
	title: PropTypes.string,
	// Data attributes (common ones)
	id: PropTypes.string,
	name: PropTypes.string,
	// Next.js specific (when useNextImage is true)
	quality: PropTypes.number,
	placeholder: PropTypes.oneOf(['blur', 'empty'] as const),
	blurDataURL: PropTypes.string,
	// fill: PropTypes.bool,
};

export type SmartImageProps = InferProps<typeof SmartImage.propTypes> & 
	React.ImgHTMLAttributes<HTMLImageElement>;

export function SmartImage({
	src,
	alt,
	cloudinaryEnv,
	cloudinaryDomain = CLOUDINARY_DOMAIN,
	cloudinaryTransforms,
	quality = 75,
	width = 500,
	height = 500,
	aboveFold = false,
	fetchPriority = 'auto',
	loading = 'lazy',
	decoding = 'async',
	preload = false,
	...imgProps
}: SmartImageProps) {
	/* set LCP values for first image on the page
	smartImageInstanceCount++;
	fetchPriority = aboveFold || smartImageInstanceCount < 5 ? 'high' : 'auto';
	loading = aboveFold || smartImageInstanceCount < 5 ? 'eager' : 'lazy';
	decoding = aboveFold || smartImageInstanceCount < 5 ? 'sync' : 'async';
	preload = aboveFold || smartImageInstanceCount < 5 ? true : false; */

	fetchPriority = aboveFold ? 'high' : 'auto';
	loading = aboveFold ? 'eager' : 'lazy';
	decoding = aboveFold ? 'sync' : 'async';
	preload = aboveFold ? true : false;

	/* console.log('SmartImage props:', {
		src: src,
		// count: smartImageInstanceCount,
		aboveFold: aboveFold,
		fetchPriority: fetchPriority,
		loading: loading,
		preload: preload
	}); */

	// Use ref for potential future optimization
	const imgRef = React.useRef<HTMLImageElement>(null);
	// Calculate base width for Cloudinary
	let baseWidth: number | undefined;
	if (typeof width === 'number') {
		baseWidth = width;
	} else if (typeof width === 'string') {
		const parsedWidth = parseInt(width, 10);
		if (parsedWidth > 0) {
			baseWidth = parsedWidth;
		}
	}
	// Build Cloudinary URL if env provided
	const finalSrc = cloudinaryEnv 
		? buildCloudinaryUrl({
			src,
			productEnv: cloudinaryEnv,
			cloudinaryDomain: cloudinaryDomain || undefined,
			quality: quality ?? 75,
			transforms: cloudinaryTransforms || undefined,
			width: baseWidth,
		})
		: src;
	// Generate responsive srcset for Cloudinary images
	let responsiveSrcSet: string | undefined;
	let responsiveSizes: string | undefined;
	if (cloudinaryEnv) {
		if (baseWidth) {
			// If width provided, generate srcset based on that width
			const widths = [
				Math.ceil(baseWidth * 0.5),  // 0.5x
				baseWidth,                     // 1x
				Math.ceil(baseWidth * 1.5),  // 1.5x
				Math.ceil(baseWidth * 2),    // 2x
			];
			responsiveSrcSet = widths.map(w => {
				const url = buildCloudinaryUrl({
					src,
					productEnv: cloudinaryEnv,
					cloudinaryDomain: cloudinaryDomain || undefined,
					quality: quality ?? 75,
					transforms: cloudinaryTransforms || undefined,
					width: w,
				});
				return `${url} ${w}w`;
			}).join(', ');
			responsiveSizes = `${baseWidth}px`;
		} else {
			// No width provided - generate common responsive breakpoints
			const breakpoints = [320, 640, 768, 1024, 1280, 1536];
			responsiveSrcSet = breakpoints.map(w => {
				const url = buildCloudinaryUrl({
					src,
					productEnv: cloudinaryEnv,
					cloudinaryDomain: cloudinaryDomain || undefined,
					quality: quality ?? 75,
					transforms: cloudinaryTransforms || undefined,
					width: w,
				});
				return `${url} ${w}w`;
			}).join(', ');
			// Default sizes: full width on mobile, constrained on larger screens
			responsiveSizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
		}
	}
	
	// Ensure semantic HTML attributes with fallback chain
	const sanitizeForId = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
	// Extract filename from src as fallback
	const getImageName = () => {
		const filename = src.split('/').pop()?.split('?')[0] || '';
		return filename.replace(/\.[^.]+$/, ''); // Remove extension
	};
	const imageName = getImageName();
	const semanticId = imgProps.id || imgProps.name || (imgProps.title && sanitizeForId(imgProps.title)) || (alt && sanitizeForId(alt)) || (imageName && sanitizeForId(imageName)) || undefined;
	const semanticName = imgProps.name || imgProps.id || (imgProps.title && sanitizeForId(imgProps.title)) || (alt && sanitizeForId(alt)) || (imageName && sanitizeForId(imageName)) || undefined;
	const semanticTitle = imgProps.title || alt || undefined;
	// Handle decorative images (empty alt text)
	const isDecorative = alt === '';
	const decorativeProps = isDecorative ? {
		'aria-hidden': 'true' as const,
		role: 'presentation' as const,
	} : {};
	// Build semantic props object, only including defined values
	const semanticProps = {
		...(semanticId && { id: semanticId }),
		...(semanticName && { name: semanticName }),
		...(semanticTitle && { title: semanticTitle }),
	};
	
	// Try to use Next.js Image if requested
	
	try {
		return (
			<Image
				src={finalSrc}
				alt={alt}
				width={typeof width === 'string' ? parseInt(width, 10) : width}
				height={typeof height === 'string' ? parseInt(height, 10) : height}
				// fill={true}
				// loader={customLoader} --- IGNORE ---
				sizes={imgProps.sizes || responsiveSizes}
				quality={quality ?? 75}
				{...semanticProps}
				{...decorativeProps}
				fetchPriority={fetchPriority}
				loading={loading}
				decoding={decoding}
				preload={preload}
				className={imgProps.className}
				style={imgProps.style}
				onClick={imgProps.onClick}
				// onLoadingComplete	onLoadingComplete={img => done())}	Function	Deprecated
				// onLoad	onLoad={event => done())}	Function	-
				// onError	onError(event => fail()}	Function	
				// placeholder	placeholder="blur"	String	-
				// blurDataURL	blurDataURL="data:image/jpeg..."	String	-
				// unoptimized	unoptimized={true}	Boolean	-
				// overrideSrc	overrideSrc="/seo.png"	String	-
				// ===== NOT SUPPORTED BY NEXT IMAGE =====
				// crossOrigin={imgProps.crossOrigin}
				// referrerPolicy={imgProps.referrerPolicy}
				// useMap={imgProps.useMap}
				// isMap={imgProps.isMap}
				// srcSet={imgProps.srcSet}
				// onLoad={imgProps.onLoad}
				// onError={imgProps.onError}
				// onMouseEnter={imgProps.onMouseEnter}
				// onMouseLeave={imgProps.onMouseLeave}
				// onMouseOver={imgProps.onMouseOver}
				// onMouseOut={imgProps.onMouseOut}
				// decoding={imgProps.decoding}
				// {...imgProps}
			/>

		);
	} catch (error) {
		if (typeof console !== 'undefined') {
			console.warn('next/image not available, falling back to img tag', error);
		}
		// Fall through to regular img
	}

	
	// Default: regular img tag
	return (
		<img 
			ref={imgRef}
			src={finalSrc} 
			srcSet={responsiveSrcSet || imgProps.srcSet}
			sizes={imgProps.sizes || responsiveSizes}
			alt={alt} 
			width={width ?? undefined}
			height={height ?? undefined}
			fetchPriority={fetchPriority}
			loading={loading}
			decoding={decoding}
			{...semanticProps}
			{...decorativeProps}
			{...imgProps} 
		/>
	);
}


interface BuildCloudinaryLoaderUrlParams {
	src: string;
	productEnv: string;
	cloudinaryDomain?: string;
	transforms: string;
}

function buildCloudinaryLoaderUrl({ src, productEnv, cloudinaryDomain = CLOUDINARY_DOMAIN, transforms }: BuildCloudinaryLoaderUrlParams): string {
	// Handle different src types
	let fullUrl: string;

	if (src.startsWith('http://') || src.startsWith('https://')) {
		// Absolute URL - use as is
		fullUrl = src;
	} else {
		// Relative URL - need origin to build full URL
		if (typeof window !== 'undefined') {
			// Client-side: use window.location.origin
			const origin = window.location.origin;
			fullUrl = src.startsWith('/') ? `${origin}${src}` : `${origin}/${src}`;
		} else {
			// SSR: can't build full URL without origin, return original src
			// This will be updated on client-side hydration
			return src;
		}
	}

	// Check if we're on localhost - Cloudinary fetch can't access local URLs
	if (fullUrl.includes('localhost') || fullUrl.includes('127.0.0.1')) {
		return src; // Return original src for local development
	}

	// Build base Cloudinary URL
	const cloudinaryBase = `${cloudinaryDomain}${productEnv}/image/fetch/${transforms}/`;
	return cloudinaryBase + fullUrl;
}

/**
 * Builds a Cloudinary URL from a given source URL (for non-loader use)
 */
interface BuildCloudinaryUrlParams {
	src: string;
	productEnv: string;
	cloudinaryDomain?: string;
	quality?: number;
	width?: number;
	transforms?: string;
}

function buildCloudinaryUrl({ src, productEnv, cloudinaryDomain = CLOUDINARY_DOMAIN, quality = 75, width, transforms }: BuildCloudinaryUrlParams): string {
	// Build transforms array
	const transformParts = [
		'f_auto',
		'c_limit',
		`q_${quality}`,
		'dpr_auto',
	];
	
	if (width) {
		transformParts.push(`w_${width}`);
	}
	
	if (transforms) {
		transformParts.push(transforms);
	}
	
	const allTransforms = transformParts.join(',');

	return buildCloudinaryLoaderUrl({ src, productEnv, cloudinaryDomain, transforms: allTransforms });
}

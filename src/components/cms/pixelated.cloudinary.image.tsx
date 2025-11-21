/**
 * SmartImage - Adaptive image component with optional Cloudinary and Next.js support
 * 
 * Features:
 * - Optional Cloudinary CDN routing
 * - Optional Next.js Image optimization
 * - Graceful fallback to standard img tag
 * - Full HTML img attribute support
 * 
 * TODO: Consider adding console warning if width/height both missing (CLS risk)
 * Would help developers catch layout shift issues during development
 */

'use client';

import React from 'react';
import PropTypes, { InferProps } from 'prop-types';

const CLOUDINARY_DOMAIN = 'https://res.cloudinary.com/';

/**
 * SmartImageProps - Props for SmartImage component
 */
SmartImage.propTypes = {
	// Custom props
	useNextImage: PropTypes.bool,
	cloudinaryEnv: PropTypes.string,
	cloudinaryDomain: PropTypes.string,
	cloudinaryTransforms: PropTypes.string,
	
	// Required HTML img attributes
	src: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
	
	// Optional HTML img attributes
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	loading: PropTypes.oneOf(['lazy', 'eager'] as const),
	decoding: PropTypes.oneOf(['async', 'auto', 'sync'] as const),
	fetchpriority: PropTypes.oneOf(['high', 'low', 'auto'] as const),
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
	priority: PropTypes.bool,
	placeholder: PropTypes.oneOf(['blur', 'empty'] as const),
	blurDataURL: PropTypes.string,
	fill: PropTypes.bool,
};

export type SmartImageProps = InferProps<typeof SmartImage.propTypes> & 
	React.ImgHTMLAttributes<HTMLImageElement>;

/**
 * SmartImage component - Adaptive image with optional Cloudinary and Next.js support
 * 
 * @param src - Image source URL (can be relative or absolute)
 * @param alt - Alt text for accessibility (required)
 * @param useNextImage - If true, attempts to use Next.js Image component (default: false)
 * @param cloudinaryEnv - Cloudinary product environment (e.g., 'dlbon7tpq'). If provided, routes through Cloudinary
 * @param cloudinaryDomain - Cloudinary domain (default: 'https://res.cloudinary.com/')
 * @param cloudinaryTransforms - Optional custom Cloudinary transformations (e.g., 'c_fill,g_auto')
 * @param quality - Image quality for Cloudinary (1-100, default: 75)
 * @param ...rest - All other HTML img attributes
 * 
 * @example
 * ```tsx
 * // Standard img tag
 * <SmartImage src="/photo.jpg" alt="Photo" width={800} height={600} />
 * 
 * // With Cloudinary
 * <SmartImage 
 *   src="/photo.jpg" 
 *   alt="Photo" 
 *   cloudinaryEnv="dlbon7tpq"
 *   cloudinaryTransforms="c_fill,g_auto"
 *   width={800} 
 *   height={600} 
 * />
 * 
 * // With Next.js Image + Cloudinary
 * <SmartImage 
 *   src="/photo.jpg" 
 *   alt="Photo" 
 *   useNextImage={true}
 *   cloudinaryEnv="dlbon7tpq"
 *   width={800} 
 *   height={600} 
 * />
 * ```
 */
export function SmartImage({
	src,
	alt,
	useNextImage = false,
	cloudinaryEnv,
	cloudinaryDomain = CLOUDINARY_DOMAIN,
	cloudinaryTransforms,
	quality = 75,
	width,
	height,
	...imgProps
}: SmartImageProps) {
	// Use ref to update src imperceptibly without re-render flash
	const imgRef = React.useRef<HTMLImageElement>(null);
	const [initialSrc] = React.useState(src);
	
	// Update src to Cloudinary URL after mount, before paint
	React.useLayoutEffect(() => {
		if (cloudinaryEnv && imgRef.current) {
			// Measure actual rendered dimensions if width not provided
			let measuredWidth: number;
			if (typeof width === 'number') {
				measuredWidth = width;
			} else if (typeof width === 'string') {
				measuredWidth = parseInt(width, 10) || imgRef.current.offsetWidth;
			} else {
				measuredWidth = imgRef.current.offsetWidth;
			}
			
			// Only use measured width if it's meaningful (> 0) and account for DPR
			const effectiveWidth = measuredWidth > 0 
				? Math.ceil(measuredWidth * (typeof window !== 'undefined' ? window.devicePixelRatio : 1))
				: undefined;
			
			const cloudinarySrc = buildCloudinaryUrl({
				src,
				productEnv: cloudinaryEnv,
				cloudinaryDomain: cloudinaryDomain || undefined,
				quality: quality ?? 75,
				transforms: cloudinaryTransforms || undefined,
				width: effectiveWidth,
			});
			// Only update if different and not localhost
			if (cloudinarySrc !== src && !cloudinarySrc.includes('localhost') && !cloudinarySrc.includes('127.0.0.1')) {
				imgRef.current.src = cloudinarySrc;
			}
		}
	}, [src, cloudinaryEnv, cloudinaryDomain, cloudinaryTransforms, quality, width]);
	
	// Use original src for SSR and initial render
	const finalSrc = initialSrc;
	
	// Ensure semantic HTML attributes with fallback chain
	const sanitizeForId = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
	
	const semanticId = imgProps.id || imgProps.name || (imgProps.title ? sanitizeForId(imgProps.title) : sanitizeForId(alt));
	const semanticName = imgProps.name || imgProps.id || (imgProps.title ? sanitizeForId(imgProps.title) : sanitizeForId(alt));
	const semanticTitle = imgProps.title || alt;
	
	// Handle decorative images (empty alt text)
	const isDecorative = alt === '';
	const decorativeProps = isDecorative ? {
		'aria-hidden': 'true' as const,
		role: 'presentation' as const,
	} : {};
	
	// Try to use Next.js Image if requested
	if (useNextImage) {
		try {
			// Use eval to prevent bundler from trying to resolve at build time
			const NextImage = eval("require('next/image')").default;
			return (
				<NextImage 
					src={finalSrc} 
					alt={alt} 
					width={width}
					height={height}
					id={semanticId}
					name={semanticName}
					title={semanticTitle}
					{...decorativeProps}
					{...imgProps} 
				/>
			);
		} catch (error) {
			if (typeof console !== 'undefined') {
				console.warn('next/image not available, falling back to img tag', error);
			}
			// Fall through to regular img
		}
	}
	
	// Default: regular img tag
	return (
		<img 
			ref={imgRef}
			src={finalSrc} 
			alt={alt} 
			width={width ?? undefined}
			height={height ?? undefined}
			loading="lazy"
			decoding="async"
			id={semanticId}
			name={semanticName}
			title={semanticTitle}
			{...decorativeProps}
			{...imgProps} 
		/>
	);
}

/**
 * Builds a Cloudinary URL for the Next.js Image loader
 */
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

/**
 * Hook to build Cloudinary URL for Next.js Image loader (useful for non-Image use cases)
 */
export function useCloudinaryUrl(
	src: string,
	productEnv: string,
	quality?: number,
	transforms?: string
): string {
	return React.useMemo(
		() => buildCloudinaryUrl({ src, productEnv, transforms }),
		[src, productEnv, transforms]
	);
}

/**
 * Utility function to get Cloudinary URL (non-React)
 */
export function getCloudinaryImageUrl(
	src: string,
	productEnv: string,
	quality?: number,
	transforms?: string
): string {
	return buildCloudinaryUrl({ src, productEnv, transforms });
}

// Default export
export default SmartImage;

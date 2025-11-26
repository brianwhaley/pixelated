import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import Image from 'next/image';
import { buildCloudinaryUrl } from './cloudinary';
import { useOptionalPixelatedConfig } from '../config/config.client';

const CLOUDINARY_DOMAIN = 'https://res.cloudinary.com/';
const CLOUDINARY_TRANSFORMS = 'f_auto,c_limit,q_auto,dpr_auto/';


function parseNumber(v?: string | number): number | undefined {
	if (typeof v === 'number') return v > 0 ? v : undefined;
	if (typeof v === 'string') {
		const n = parseInt(v, 10);
		return Number.isFinite(n) && n > 0 ? n : undefined;
	}
	return undefined;
}


function generateSrcSet(src: string, productEnv: string | null | undefined, widths: number[], opts: { quality?: number | null; transforms?: string | null; cloudinaryDomain?: string }) {
	if (!productEnv) return '';
	return widths.map(w => `${buildCloudinaryUrl({ src, productEnv, width: w, quality: opts.quality ?? 75, transforms: opts.transforms ?? undefined, cloudinaryDomain: opts.cloudinaryDomain })} ${w}w`).join(', ');
}


const SMARTIMAGE_PROP_TYPES = {
	cloudinaryEnv: PropTypes.string,
	cloudinaryDomain: PropTypes.string,
	cloudinaryTransforms: PropTypes.string,
	src: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	aboveFold: PropTypes.bool,
	loading: PropTypes.oneOf(['lazy', 'eager']),
	preload: PropTypes.bool,
	decoding: PropTypes.oneOf(['async', 'auto', 'sync']),
	fetchPriority: PropTypes.oneOf(['high', 'low', 'auto']),
	sizes: PropTypes.string,
	srcSet: PropTypes.string,
	className: PropTypes.string,
	style: PropTypes.object,
	id: PropTypes.string,
	name: PropTypes.string,
	title: PropTypes.string,
	quality: PropTypes.number,
	placeholder: PropTypes.oneOf(['blur', 'empty']),
	blurDataURL: PropTypes.string,
};
SmartImage.propTypes = SMARTIMAGE_PROP_TYPES;
export type SmartImageProps = InferProps<typeof SMARTIMAGE_PROP_TYPES> & React.ImgHTMLAttributes<HTMLImageElement>;
export function SmartImage(props: SmartImageProps) {
	const {
		src,
		alt,
		cloudinaryEnv,
		cloudinaryDomain = CLOUDINARY_DOMAIN,
		cloudinaryTransforms = CLOUDINARY_TRANSFORMS,
		quality = 75,
		width = 500,
		height = 500,
		aboveFold = false,
		fetchPriority = 'auto',
		loading = 'lazy',
		decoding = 'async',
		preload = false,
		...imgProps
	} = props as SmartImageProps;

	// If the consumer app provided a global config via PixelatedClientConfigProvider or PixelatedServerConfigProvider, prefer that
	// unless an explicit prop is passed.
	const cfg = useOptionalPixelatedConfig();
	const cloudCfg = cfg?.cloudinary;

	// merge cloudinary config and cloudinary props
	const effectiveCloudinaryEnv = cloudinaryEnv ?? cloudCfg?.product_env;
	const effectiveCloudinaryDomain = cloudCfg?.baseUrl ?? cloudinaryDomain;
	const effectiveCloudinaryTransforms = cloudinaryTransforms ?? cloudCfg?.transforms;

	// mutable copies
	let fp = fetchPriority;
	let ld = loading;
	let dc = decoding;
	let pl = preload;

	fp = aboveFold ? 'high' : fp;
	ld = aboveFold ? 'eager' : ld;
	dc = aboveFold ? 'sync' : dc;
	pl = aboveFold ? true : pl;

	const imgRef = React.useRef<HTMLImageElement | null>(null);
	const baseWidth = parseNumber(width);

	const finalSrc = effectiveCloudinaryEnv
		? buildCloudinaryUrl({ src: String(src), productEnv: String(effectiveCloudinaryEnv), cloudinaryDomain: effectiveCloudinaryDomain ?? CLOUDINARY_DOMAIN, quality, width: baseWidth ?? undefined, transforms: effectiveCloudinaryTransforms ?? undefined })
		: String(src);

	let responsiveSrcSet: string | undefined;
	let responsiveSizes: string | undefined;
	if (effectiveCloudinaryEnv) {
		if (baseWidth) {
			const widths = [Math.ceil(baseWidth * 0.5), baseWidth, Math.ceil(baseWidth * 1.5), Math.ceil(baseWidth * 2)];
			responsiveSrcSet = generateSrcSet(String(src), String(effectiveCloudinaryEnv), widths, { quality, transforms: effectiveCloudinaryTransforms ?? undefined, cloudinaryDomain: effectiveCloudinaryDomain ?? CLOUDINARY_DOMAIN });
			responsiveSizes = `${baseWidth}px`;
		} else {
			const breakpoints = [320, 640, 768, 1024, 1280, 1536];
			responsiveSrcSet = generateSrcSet(String(src), String(effectiveCloudinaryEnv), breakpoints, { quality, transforms: effectiveCloudinaryTransforms ?? undefined, cloudinaryDomain: effectiveCloudinaryDomain ?? CLOUDINARY_DOMAIN });
			responsiveSizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
		}
	}

	const sanitize = (s?: string) => s ? s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : undefined;
	const filename = (src as string).split('/').pop()?.split('?')[0] || '';
	const imageName = filename.replace(/\.[^.]+$/, '');
	const semanticId = imgProps.id || imgProps.name || sanitize(imgProps.title) || sanitize(alt) || sanitize(imageName);
	const semanticName = imgProps.name || imgProps.id || sanitize(imgProps.title) || sanitize(alt) || sanitize(imageName);
	const semanticTitle = imgProps.title || alt;

	const isDecorative = alt === '';

	const semanticProps: Record<string, any> = {};
	if (semanticId) semanticProps.id = semanticId;
	if (semanticName) semanticProps.name = semanticName;
	if (semanticTitle) semanticProps.title = semanticTitle;

	const decorativeProps = isDecorative ? ({ 'aria-hidden': true, role: 'presentation' } as any) : {};

	try {
		return (
			<Image
				{...semanticProps}
				{...decorativeProps}
				{...imgProps}
				src={finalSrc}
				alt={alt}
				width={typeof width === 'string' ? parseInt(width, 10) : (width as number)}
				height={typeof height === 'string' ? parseInt(height, 10) : (height as number)}
				sizes={imgProps.sizes || responsiveSizes}
				quality={quality}
				fetchPriority={fp}
				loading={ld}
				decoding={dc}
				preload={pl}
			/>
		);
	} catch (e) {
		if (typeof console !== 'undefined') console.warn('next/image unavailable, falling back to <img>', e);
	}

	return (
		<img
			{...semanticProps}
			{...decorativeProps}
			{...imgProps}
			ref={imgRef}
			src={finalSrc}
			alt={alt}
			width={typeof width === 'string' ? parseInt(width, 10) : width}
			height={typeof height === 'string' ? parseInt(height, 10) : height}
			srcSet={responsiveSrcSet || imgProps.srcSet}
			sizes={imgProps.sizes || responsiveSizes}
			fetchPriority={fp}
			loading={ld}
			decoding={dc}
		/>
	);
}


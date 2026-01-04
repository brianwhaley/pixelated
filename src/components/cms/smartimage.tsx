'use client';

import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import Image from 'next/image';
import { buildCloudinaryUrl } from './cloudinary';
import { usePixelatedConfig } from '../config/config.client';

const CLOUDINARY_DOMAIN = 'https://res.cloudinary.com/';
const CLOUDINARY_TRANSFORMS = 'f_auto,c_limit,q_auto,dpr_auto';


function parseNumber(v?: string | number): number | undefined {
	if (typeof v === 'number') return v > 0 ? v : undefined;
	if (typeof v === 'string') {
		const n = parseInt(v, 10);
		return Number.isFinite(n) && n > 0 ? n : undefined;
	}
	return undefined;
}

function safeString(str: any) {
	return (str === undefined || str === null) 
		? undefined 
		: String(str);
}

function sanitizeString(str: any) {
	return (str === undefined || str === null) 
		? undefined 
		: String(str).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function generateSrcSet(
	src: string, 
	productEnv: string | null | undefined, 
	widths: number[], 
	opts: { 
		quality?: number | null; 
		transforms?: string | null; 
		cloudinaryDomain?: string 
	}) {
	if (!productEnv) return '';
	return widths.map(w => `${buildCloudinaryUrl({ 
		src, productEnv, 
		width: w, 
		quality: opts.quality ?? 75, 
		transforms: opts.transforms ?? undefined, 
		cloudinaryDomain: opts.cloudinaryDomain })} ${w}w`).join(', ');
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
	variant: PropTypes.oneOf(['cloudinary', 'nextjs', 'img']),
};
SmartImage.propTypes = SMARTIMAGE_PROP_TYPES;
export type SmartImageType = InferProps<typeof SmartImage.propTypes> & React.ImgHTMLAttributes<HTMLImageElement>;
export function SmartImage(props: SmartImageType) {
	const {
		src,
		alt,
		id, name, title,
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
		variant = 'cloudinary',
		...imgProps
	} = props;

	const newProps = { ...props };
	const config = usePixelatedConfig();
	const cloudCfg = config?.cloudinary;
	newProps.cloudinaryEnv = safeString(cloudinaryEnv ?? cloudCfg?.product_env);
	newProps.cloudinaryDomain = safeString(cloudCfg?.baseUrl ?? cloudinaryDomain);
	newProps.cloudinaryTransforms = safeString(cloudinaryTransforms ?? cloudCfg?.transforms);
	newProps.fetchPriority = aboveFold ? 'high' : (fetchPriority as any);
	newProps.loading = aboveFold ? 'eager' : (loading as any);
	newProps.decoding = aboveFold ? 'sync' : (decoding as any);
	newProps.preload = aboveFold ? true : preload;
	newProps.src = safeString(src) ?? (src as any) ?? undefined;
	newProps.id = safeString(id);
	newProps.name = safeString(name);
	newProps.title = safeString(title);
	newProps.alt = safeString(alt) ?? '';
	newProps.width = parseNumber(width ?? undefined) ?? 500;
	newProps.height = parseNumber(height ?? undefined) ?? 500;

	const filename = (newProps.src).split('/').pop()?.split('?')[0] || '';
	const imageName = filename.replace(/\.[^.]+$/, '');
	newProps.id = newProps.id || newProps.name || sanitizeString(newProps.title) || sanitizeString(newProps.alt) || sanitizeString(imageName);
	newProps.name = newProps.name || newProps.id || sanitizeString(newProps.title) || sanitizeString(newProps.alt) || sanitizeString(imageName);
	newProps.title = newProps.title || newProps.alt || sanitizeString(imageName);

	let finalSrc = String(newProps.src);

	/* ===== CLOUDINARY VARIANT ===== */

	let responsiveSrcSet: string | undefined;
	let responsiveSizes: string | undefined;
	if (variant === 'cloudinary' && newProps.cloudinaryEnv) {

		finalSrc = buildCloudinaryUrl({ 
			src: newProps.src, 
			productEnv: newProps.cloudinaryEnv, 
			cloudinaryDomain: newProps.cloudinaryDomain, 
			quality, 
			width: newProps.width ?? undefined, 
			transforms: newProps.cloudinaryTransforms ?? undefined });

		if (newProps.width) {
			const widths = [Math.ceil(newProps.width * 0.5), newProps.width, Math.ceil(newProps.width * 1.5), Math.ceil(newProps.width * 2)];
			responsiveSrcSet = generateSrcSet(
				String(newProps.src), 
				newProps.cloudinaryEnv, 
				widths, { 
					quality, 
					transforms: newProps.cloudinaryTransforms ?? undefined, 
					cloudinaryDomain: newProps.cloudinaryDomain 
				});
			responsiveSizes = `${newProps.width}px`;
		} else {
			const breakpoints = [320, 640, 768, 1024, 1280, 1536];
			responsiveSrcSet = generateSrcSet(
				String(newProps.src), 
				newProps.cloudinaryEnv, 
				breakpoints, { 
					quality, 
					transforms: newProps.cloudinaryTransforms ?? undefined, 
					cloudinaryDomain: newProps.cloudinaryDomain 
				});
			responsiveSizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
		}
	} 

	/* ===== NEXTJS VARIANT ===== */
	/* variant is not cloudinary and not img (ie nextjs)
	or variant is cloudinary and no cloudinaryEnv */

	const isDecorative = newProps.alt === '';
	const decorativeProps = isDecorative ? ({ 'aria-hidden': true, role: 'presentation' } as any) : {};

	if (variant !== 'img') {
		try {
			return (
				<Image
					{...imgProps}
					{...decorativeProps}
					src={finalSrc}
					alt={newProps.alt}
					id={newProps.id}
					name={newProps.name}
					title={newProps.title}
					width={newProps.width}
					height={newProps.height}
					sizes={imgProps.sizes || responsiveSizes}
					quality={quality}
					fetchPriority={newProps.fetchPriority}
					loading={newProps.loading}
					decoding={newProps.decoding}
					preload={newProps.preload}
				/>
			);
		} catch (e) {
			if (typeof console !== 'undefined') console.warn('next/image unavailable, falling back to <img>', e);
		}
	}

	/* ===== IMG VARIANT ===== */
	const imgRef = React.useRef<HTMLImageElement | null>(null);
	return (
		<img
			{...imgProps}
			{...decorativeProps}
			ref={imgRef}
			src={finalSrc}
			alt={newProps.alt}
			id={newProps.id}
			name={newProps.name}
			title={newProps.title}
			width={newProps.width}
			height={newProps.height}
			srcSet={responsiveSrcSet || imgProps.srcSet}
			sizes={imgProps.sizes || responsiveSizes}
			fetchPriority={newProps.fetchPriority}
			loading={newProps.loading}
			decoding={newProps.decoding}
		/>
	);

}

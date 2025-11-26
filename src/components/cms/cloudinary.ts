import PropTypes, { InferProps } from 'prop-types';

/* 
https://cloudinary.com/blog/transparent_webp_format_cdn_delivery_based_on_visitors_browsers
https://cloudinary.com/blog/delivering_all_your_websites_images_through_a_cdn
*/

const cloudinary_domain = "https://res.cloudinary.com";
// const cloudinary_product_env = "dlbon7tpq";
const cloudinary_props = "/image/fetch/f_auto,c_limit,q_auto,dpr_auto/";


function joinWithSlash(a: string, b: string) {
	return `${a.replace(/\/+$/,'')}/${b.replace(/^\/+/, '')}`;
}

export function buildCloudinaryUrl(params: { src: string; productEnv: string | null | undefined; cloudinaryDomain?: string; quality?: number | null; width?: number | null; transforms?: string | null; }) {
	const { src, productEnv, cloudinaryDomain = cloudinary_domain, quality = 75, width, transforms } = params;
	if (!productEnv) return src;
	// Resolve non-absolute src to absolute URL in client runtime. Leave alone during SSR.
	let url = src;
	if (!/^https?:\/\//i.test(src)) {
		if (typeof window === 'undefined') return src; // SSR - leave as-is
		const origin = window.location.origin;
		url = src.startsWith('/') ? `${origin}${src}` : `${origin}/${src}`;
	}
	// Don't fetch from cloudinary during local dev pointing at localhost
	if (url.includes('localhost') || url.includes('127.0.0.1')) return src;
	const q = typeof quality === 'number' ? quality : 75;
	const parts: string[] = ['f_auto', 'c_limit', `q_${q}`, 'dpr_auto'];
	if (typeof width === 'number' && Number.isFinite(width)) parts.push(`w_${width}`);
	if (transforms) parts.push(transforms);
	const t = parts.length ? parts.join(',') : '';
	const domainAndCloud = productEnv ? joinWithSlash(cloudinaryDomain, productEnv) : cloudinaryDomain;
	return `${domainAndCloud}/image/fetch/${t}/${url}`;
}



getCloudinaryRemoteFetchURL.propTypes = {
	url: PropTypes.string.isRequired,
	product_env: PropTypes.string.isRequired
};
export type getCloudinaryRemoteFetchURLType = InferProps<typeof getCloudinaryRemoteFetchURL.propTypes>;
export function getCloudinaryRemoteFetchURL(props: getCloudinaryRemoteFetchURLType) {
 	const domainAndCloud = joinWithSlash(cloudinary_domain, props.product_env);
 	const cloudinary_prefix = domainAndCloud + cloudinary_props;
 	return cloudinary_prefix + props.url ;
}


export function userIsMobile() {
	let match = false;
	if (typeof window !== 'undefined') {
		const mediaQuery = window.matchMedia('(max-width: 768px)'); // Example breakpoint
		match = mediaQuery.matches;
	}
	return match;
}


loadAllImagesFromCloudinary.propTypes = {
	origin: PropTypes.string,
	product_env: PropTypes.string.isRequired
};
export type loadAllImagesFromCloudinaryType = InferProps<typeof loadAllImagesFromCloudinary.propTypes>;
export function loadAllImagesFromCloudinary(props: loadAllImagesFromCloudinaryType){
	const origin = document.location.origin;
	if(origin && origin.includes("localhost")) { return; } // do nothing in local dev 
	const images = document.querySelectorAll('img');
	images.forEach(img => {
		const currentSrc = img.getAttribute('src') || '';
		if (!currentSrc) return;

		// Use the shared builder so all Cloudinary URLs are consistent.
		const built = buildCloudinaryUrl({
			src: currentSrc,
			productEnv: props.product_env,
			cloudinaryDomain: cloudinary_domain,
			// keep other options default (quality/width/transforms) for now
		});

		// If builder returned a new URL, update the image src.
		if (built && built !== currentSrc) {
			img.setAttribute('src', built);
		}
	});
}

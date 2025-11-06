import PropTypes, { InferProps } from 'prop-types';

/* 
https://cloudinary.com/blog/transparent_webp_format_cdn_delivery_based_on_visitors_browsers
https://cloudinary.com/blog/delivering_all_your_websites_images_through_a_cdn
*/

const cloudinary_domain = "https://res.cloudinary.com/";
// const cloudinary_product_env = "dlbon7tpq";
const cloudinary_props = "/image/fetch/f_auto,q_auto,dpr_auto/";



getCloudinaryRemoteFetchURL.propTypes = {
	url: PropTypes.string.isRequired,
	product_env: PropTypes.string.isRequired
};
export type getCloudinaryRemoteFetchURLType = InferProps<typeof getCloudinaryRemoteFetchURL.propTypes>;
export function getCloudinaryRemoteFetchURL(props: getCloudinaryRemoteFetchURLType) {
	const cloudinary_prefix = cloudinary_domain + props.product_env + cloudinary_props;
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
	const cloudinary_prefix = cloudinary_domain + props.product_env + cloudinary_props;
	const images = document.querySelectorAll('img');
	images.forEach(img => {
		const currentSrc = img.getAttribute('src');
		if (currentSrc && !currentSrc.startsWith(cloudinary_domain) && !currentSrc.startsWith('http')) {
			// Assuming relative paths, prepend the CDN base URL
			if(currentSrc.startsWith('/')){
				img.setAttribute('src', cloudinary_prefix + origin + currentSrc);
			} else {
				img.setAttribute('src', cloudinary_prefix + origin + '/' + currentSrc);
			}
		} else if (currentSrc && currentSrc.startsWith('http') && origin && currentSrc.includes(origin)) {
			// The image is already using an absolute URL from your original domain,
			// replace the domain with the CDN domain.
			img.setAttribute('src', cloudinary_prefix + currentSrc);
		}
	});
}

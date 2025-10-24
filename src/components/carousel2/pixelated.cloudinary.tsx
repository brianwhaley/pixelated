import PropTypes, { InferProps } from 'prop-types';

/* 
https://cloudinary.com/blog/transparent_webp_format_cdn_delivery_based_on_visitors_browsers
https://cloudinary.com/blog/delivering_all_your_websites_images_through_a_cdn
*/

getCloudinaryRemoteFetchURL.propTypes = {
	url: PropTypes.string.isRequired,
	product_env: PropTypes.string.isRequired
};
export type getCloudinaryRemoteFetchURLType = InferProps<typeof getCloudinaryRemoteFetchURL.propTypes>;
export function getCloudinaryRemoteFetchURL(props: getCloudinaryRemoteFetchURLType) {
	const cloudinary_prefix = "https://res.cloudinary.com/" + props.product_env + "/image/fetch/f_auto,q_auto/";
	return cloudinary_prefix + props.url ;
}

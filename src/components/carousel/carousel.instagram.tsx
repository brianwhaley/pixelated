import { useEffect } from 'react';
import PropTypes, { InferProps } from 'prop-types';


/* 
https://developers.facebook.com/apps/
https://business.facebook.com/latest/settings/business_users/?business_id=1201193775137426
https://developers.facebook.com/tools/explorer
*/


Instagram.propTypes = {
	access_token: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired
};
export type InstagramType = InferProps<typeof Instagram.propTypes>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Instagram(props: InstagramType) {
	const access_token = "1364139411507782|7wSJ9h_RPv_eEcOBmXCYvooNRws";
	const url = "https://graph.instagram.com/v22.0/me?fields=id,media_type,media_url,caption,timestamp&access_token=" + access_token ;

	async function fetchInstas() {
		console.log("Fetching Instagram Images");
		try {
			const instaPromise = await fetch(url, {
				method: 'GET'
			});
			const response = await instaPromise.json();
			console.log(response);
			// setData(await response.body);
		} catch (err) {
			console.log("Error : ", err);
		}
	}
	useEffect(() => {
		fetchInstas();
	}, []);
}

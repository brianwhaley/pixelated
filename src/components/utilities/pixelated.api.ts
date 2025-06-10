import PropTypes from 'prop-types';

export function getXHRData (apiURL: string, apiMethod: string, myCallback: any) {
	const xhr = new XMLHttpRequest();
	xhr.open(apiMethod, apiURL, true);
	// xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	// xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	// xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
	xhr.onreadystatechange = () => {
		// if (xhr.readyState === 4) {
		if (xhr.readyState === 4 && xhr.status === 200) {
			let response;
			 
			response = JSON.parse(xhr.responseText);
			myCallback(response);
		}
	};
	xhr.send();
}
getXHRData.propTypes = {
	apiURL: PropTypes.string.isRequired,
	apiMethod: PropTypes.string.isRequired
};


export function generateURL (baseURL: string, props: any) {
	let url = baseURL;
	let allProps = '';
	for (const prop in props) {
		if (props) {
			allProps += (allProps.length === 0) ? prop + '=' + props[prop] : '&' + prop + '=' + props[prop];
		}
	}
	url += allProps;
	return url;
}
generateURL.propTypes = {
	baseURL: PropTypes.string.isRequired,
	props: PropTypes.object
};

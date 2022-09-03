
import PropTypes from "prop-types";

export function getXHRData (apiURL, apiMethod, myCallback) {
	getXHRData.propTypes = {
		apiURL: PropTypes.string.isRequired,
		apiMethod: PropTypes.string.isRequired
	};
	var xhr = new XMLHttpRequest();
	xhr.open(apiMethod, apiURL, true);
	// xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	// xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
	xhr.onreadystatechange = () => {
		// if (xhr.readyState === 4) {
		if (xhr.readyState === 4 && xhr.status === 200) {
			var response;
			response = JSON.parse(xhr.responseText);
			myCallback(response);
		}
	};
	xhr.send();
}

export function generateURL (baseURL, props) {
	generateURL.propTypes = {
		baseURL: PropTypes.string.isRequired,
		props: PropTypes.object
	};
	var url = baseURL;
	for (var prop in props) {
		if (props) {
			url += "&" + prop + "=" + props[prop];
		}
	}
	return url;
}

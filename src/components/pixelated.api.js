
import PropTypes from "prop-types";

export function getXHRData (apiURL, myCallback) {
	getXHRData.propTypes = {
		apiURL: PropTypes.string.isRequired
	};
	var xhr = new XMLHttpRequest();
	xhr.open("GET", apiURL, true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			var response = JSON.parse(xhr.responseText);
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

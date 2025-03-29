import PropTypes from 'prop-types'

export function getXHRData (apiURL, apiMethod, myCallback) {
	getXHRData.propTypes = {
		apiURL: PropTypes.string.isRequired,
		apiMethod: PropTypes.string.isRequired
	}
	 
	const xhr = new XMLHttpRequest()
	xhr.open(apiMethod, apiURL, true)
	// xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	// xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	// xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
	xhr.onreadystatechange = () => {
		// if (xhr.readyState === 4) {
		if (xhr.readyState === 4 && xhr.status === 200) {
			let response
			 
			response = JSON.parse(xhr.responseText)
			myCallback(response)
		}
	}
	xhr.send()
}

export function generateURL (baseURL, props) {
	generateURL.propTypes = {
		baseURL: PropTypes.string.isRequired,
		props: PropTypes.object
	}
	let url = baseURL
	let allProps = ''
	for (const prop in props) {
		if (props) {
			(allProps.length === 0) ? allProps = prop + '=' + props[prop] : allProps += '&' + prop + '=' + props[prop]
		}
	}
	url += allProps
	return url
}

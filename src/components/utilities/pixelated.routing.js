import React from 'react';
import PropTypes from 'prop-types';

export function getAllRoutes(json, key) {
	const result = [];
	function traverse(obj) {
	  	if (typeof obj !== 'object' || obj === null) {
			return;
	  	}
	  	if (Array.isArray(obj)) {
			obj.forEach(item => traverse(item));
	  	} else {
			for (const k in obj) {
		  		if (k === key) {
					result.push(...obj[k]);
		  		}
				if (typeof obj[k] === 'object') {
					traverse(obj[k]);
		  		}
			}
	  	}
	}
	traverse(json);
	return result;
}

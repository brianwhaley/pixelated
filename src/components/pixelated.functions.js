
export function html2dom (str) {
	if (window.DOMParser) {
		var parser = new DOMParser();
		var doc = parser.parseFromString(str, "text/html");
		return doc.body.firstChild;
	}
	var dom = document.createElement("div");
	dom.innerHTML = str;
	return dom;
}

export function mergeDeep () {
	var extended = {};
	for (var i = 0; i < arguments.length; i++) {
		var thisObj = arguments[i];
		for (var prop in thisObj) {
			if (Object.prototype.hasOwnProperty.call(thisObj, prop)) {
				if (Object.prototype.toString.call(thisObj[prop]) === "[object Object]") {
					extended[prop] = mergeDeep(true, extended[prop], thisObj[prop]);
				} else {
					extended[prop] = thisObj[prop];
				}
			}
		}
	}
	return extended;
}

export function pushNewValueToStateArray (that, oldState, newValue) {
	var myNewArray = that.state[oldState];
	myNewArray.push(newValue);
	that.setState({ [oldState]: myNewArray });
}

export function randomBetween (min, max) {
	/* ===== RANDOM NUM BETWEEN MIN AND MAX ===== */
	if (min < 0) {
		return min + Math.random() * (Math.abs(min) + max);
	} else {
		return min + Math.random() * (max - min);
	}
}


export function html2dom (str) {
  if (window.DOMParser) {
    // eslint-disable-next-line no-undef
    const parser = new DOMParser()
    const doc = parser.parseFromString(str, 'text/html')
    return doc.body.firstChild
  }
  const dom = document.createElement('div')
  dom.innerHTML = str
  return dom
}

export function mergeDeep () {
  const extended = {}
  for (let i = 0; i < arguments.length; i++) {
    const thisObj = arguments[i]
    for (const prop in thisObj) {
      if (Object.prototype.hasOwnProperty.call(thisObj, prop)) {
        if (Object.prototype.toString.call(thisObj[prop]) === '[object Object]') {
          extended[prop] = mergeDeep(true, extended[prop], thisObj[prop])
        } else {
          extended[prop] = thisObj[prop]
        }
      }
    }
  }
  return extended
}

export function pushNewValueToStateArray (that, oldState, newValue) {
  const myNewArray = that.state[oldState]
  myNewArray.push(newValue)
  that.setState({ [oldState]: myNewArray })
}

export function randomBetween (min, max) {
  /* ===== RANDOM NUM BETWEEN MIN AND MAX ===== */
  if (min < 0) {
    return min + Math.random() * (Math.abs(min) + max)
  } else {
    return min + Math.random() * (max - min)
  }
}

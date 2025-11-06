export function deferAllCSS() {

	// console.log("Deferring all CSS loading...");

	// Select all link tags with rel="stylesheet"
	const stylesheets = document.querySelectorAll('link[rel="stylesheet"]') as NodeListOf<HTMLLinkElement>;

	stylesheets.forEach(function(link) {
		// Change rel to "preload" and as to "style" to asynchronously load the stylesheet
		link.rel = 'preload';
		link.as = 'style';
        
		// Add an onload handler to apply the stylesheet once loaded
		link.onload = function() {
			link.rel = 'stylesheet'; // Apply the stylesheet
			link.onload = null;      // Remove the onload handler to prevent re-execution
		};
	});

	// Provide a noscript fallback for browsers that don't execute JavaScript
	const noscript = document.createElement('noscript');
	stylesheets.forEach(function(link) {
		const fallbackLink = document.createElement('link');
		fallbackLink.rel = 'stylesheet';
		fallbackLink.href = link.href;
		noscript.appendChild(fallbackLink);
	});
	document.head.appendChild(noscript);
}

// Call the function when the DOM is ready
// document.addEventListener('DOMContentLoaded', deferAllCSS);
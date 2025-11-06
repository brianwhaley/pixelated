
/* export function lazyLoadImages() {
	const lazyImages = document.querySelectorAll("img[data-src]");
	const options = {
		rootMargin: "0px 0px 100px 0px", // Preload images when they are 100px from entering the viewport
		threshold: 0, // Trigger when any part of the element intersects
	};
	const imageObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const image = entry.target as HTMLImageElement;
				image.src = image.dataset.src!; // Set the actual image source
				image.removeAttribute("data-src"); // Remove data-src to prevent re-observing
				// Optional: Add a class for styling or animation
				image.classList.add("loaded"); 
				observer.unobserve(image); // Stop observing once loaded
			}
		});
	}, options);
	lazyImages.forEach((image) => {
		imageObserver.observe(image);
	});
} */



export function preloadImages(){
	const images = document.querySelectorAll("img");
	images.forEach(function(image) {
		const link = document.createElement('link');
		link.rel = 'preload';
		link.as = 'image';
		link.href = image.src;
		document.head.appendChild(link);
		preloadImage(image.src);
	});
}



function preloadImage(url: string) {
	const img = new Image();
	img.src = url;
}

// <link rel="preload" as="image" href="hero.jpeg">


 
import React from "react";
import "./pixelated.loading.scss";


/* 
https://signalvnoise.com/posts/2577-loading-spinner-animation-using-css-and-webkit
https://www.andreaverlicchi.eu/blog/css-3-only-spinning-loading-animation/
*/

/* ========== MARKDOWN ========== */
export function Loading() {	
	return (
		<>
			<div id="loadingSpinner" className="loading">
				<div className="spinner">
					<div className="bar1"></div>
					<div className="bar2"></div>
					<div className="bar3"></div>
					<div className="bar4"></div>
					<div className="bar5"></div>
					<div className="bar6"></div>
					<div className="bar7"></div>
					<div className="bar8"></div>
					<div className="bar9"></div>
					<div className="bar10"></div>
					<div className="bar11"></div>
					<div className="bar12"></div>
				</div>
			</div>
		</>
	);
}

export function ToggleLoading(props: {show?: boolean}) {
	if ( typeof window !== "undefined" && typeof document !== "undefined") {
		 
		const loadingElem = document.getElementById("loadingSpinner") as HTMLDivElement;
		if(!loadingElem) return;
		if(props.show && props.show === true) { loadingElem!.style.display = "inline-block"; return; } // Show content
		if(props.show && props.show === false) { loadingElem!.style.display = "none"; return; } // Hide content
		if (loadingElem && loadingElem.style.display === "none") {
			loadingElem.style.display = "inline-block"; // Show content
		} else {
			if (loadingElem) loadingElem.style.display = "none"; // Hide content
		}
	}
}

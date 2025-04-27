
/* ========================================
=====       GOOGLE ANALYTICS          =====
======================================== */

if(typeof window !== 'undefined'){
	window.dataLayer = window.dataLayer || [];
	function gtag () { window.dataLayer.push(arguments); }
	gtag("js", new Date());
	// gtag("config", "UA-2370059-2");
	gtag("config", 'G-1J1W90VBE1');

	var ga = document.createElement("script");
	ga.type = "text/javascript";
	ga.async = true;
	// ga.src = "//www.googletagmanager.com/gtag/js?id=UA-2370059-2";
	ga.src = "//www.googletagmanager.com/gtag/js?id=G-1J1W90VBE1";
	var scr = document.getElementsByTagName("script")[0];
	scr.parentNode.insertBefore(ga, scr);
}


/* ========================================
=====         GOOGLE SEARCH           =====
======================================== */

if(typeof document !== 'undefined'){
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	var gsearch = (function () {
		var cx = "009500278966481927899:bcssp73qony";
		var gcse = document.createElement("script");
		gcse.type = "text/javascript";
		gcse.async = true;
		gcse.src = (document.location.protocol === "https:" ? "https:" : "http:") + "//cse.google.com/cse.js?cx=" + cx;
		var s = document.getElementsByTagName("script")[0];
		s.parentNode.insertBefore(gcse, s);
	})();
}


/* ========================================
=====           READY GO !            =====
======================================== */

if(typeof window !== 'undefined'){
	var url = window.location.pathname;
	var filename = url.substring(url.lastIndexOf("/") + 1);
	var pagename = filename.substring(0, filename.lastIndexOf("."));
	if (pagename === "") { pagename = "index"; } // HOME PAGE FIX
	console.log("pagename = " + pagename);
}

/* ========================================
=====          LESS CSS               =====
======================================== */

/* eslint-disable-next-line no-unused-vars */
var less = {
	env: 'development', // or "production"
	async: false, // load imports async
	dumpLineNumbers: 'all' // or "mediaQuery" or "all"
};

/* ========================================
=====        ADD THIS WIDGET          =====
======================================== */

var addthis_pub = 'ra-56c1fbf032086dfc';

/* ========================================
=====       GOOGLE ANALYTICS          =====
======================================== */

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-2370059-2']);
_gaq.push(['_trackPageview']);
_gaq.push(['_trackPageLoadTime']);

/* eslint-disable-next-line no-unused-vars */
var ganalytics = (function () {
	var ga = document.createElement('script');
	ga.type = 'text/javascript';
	ga.async = true;
	ga.src = (document.location.protocol === 'https:' ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(ga, s);
})();

/* ========================================
=====         GOOGLE SEARCH           =====
======================================== */

/* eslint-disable-next-line no-unused-vars */
var gsearch = (function () {
	var cx = '009500278966481927899:bcssp73qony';
	var gcse = document.createElement('script');
	gcse.type = 'text/javascript';
	gcse.async = true;
	gcse.src = (document.location.protocol === 'https:' ? 'https:' : 'http:') + '//cse.google.com/cse.js?cx=' + cx;
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(gcse, s);
})();

/* ========================================
=====           READY GO !            =====
======================================== */

var url = window.location.pathname;
var filename = url.substring(url.lastIndexOf('/') + 1);
var pagename = filename.substring(0, filename.lastIndexOf('.'));
if (pagename === '') { pagename = 'index'; } // HOME PAGE FIX
console.log('pagename = ' + pagename);

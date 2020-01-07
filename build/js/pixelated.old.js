/* ========================================
=====      GLOBAL VARIABLES           =====
======================================== */




/* ========================================
=====      GENERAL FUNCTIONS          =====
======================================== */


$.fn.exists = function(){
	return this.length > 0;
};

$.fn.hasBinding = function() {
	/* ===== DOES ELEMENT HAVE AN EVENT BINDING ===== */
	var data = $._data(this[0], 'events');
    if (data === undefined || data.length === 0) {
        return false;
    }
    return true;
};

$.fn.isBound = function(type) {
	/* ===== DOES ELEMENT HAVE A SPECIFIC EVENT BINDING TYPE ===== */
	var data = $._data(this[0], 'events')[type];
    if (data === undefined || data.length === 0) {
        return false;
    }
    return true;
};

$.fn.center = function() {
    // this.css("position","absolute");
    this.css('top', Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + 'px');
    this.css('left', Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + 'px');
    return this;
};




/* ========================================
=====        OTHER FUNCTIONS          =====
======================================== */


Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}



/* ========================================
=====          LESS CSS               =====
======================================== */

less = {
	env: 'development', // or "production"
	async: false,       // load imports async
	dumpLineNumbers: 'all', // or "mediaQuery" or "all"
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

var ganalytics = (function() {
   var ga = document.createElement('script');
   ga.type = 'text/javascript';
   ga.async = true;
   ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
   var s = document.getElementsByTagName('script')[0];
   s.parentNode.insertBefore(ga, s);
 })();




/* ========================================
=====         GOOGLE SEARCH           =====
======================================== */

var gsearch = (function() {
	var cx = '009500278966481927899:bcssp73qony';
	var gcse = document.createElement('script');
	gcse.type = 'text/javascript';
	gcse.async = true;
	gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//cse.google.com/cse.js?cx=' + cx;
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(gcse, s);
})();





/* ========================================
=====            MEGA MENU            =====
======================================== */

/* http://megadrop.shanejeffers.com/ */

$.fn.megamenu = function(options){
	options = $.extend ({
		parents: ' > ul > li',
		children: ' > ul',
		timeout: 250
	}, options);

	var over = function() {
	},
	out = function() {
    };

	var $myMegaMenu = this;
	var myTimer = 0;

	$(document).on('click', function() {
		$myMegaMenu.find(options.parents + options.children).stop().slideUp('fast');
	});
	$myMegaMenu.find(options.parents).each( function(){
		/* $(this).on("click focusin focusout mouseenter mouseleave MSPointerDown MSPointerUp", function(e){
			console.log("event = " + e.type);
		}); */
		$(this).on({
			click: function(e){
				var $myElem = $(this);
				if ($myElem.find(options.children + ':first').is(':hidden')) {
					$myElem.mouseenter();
				} else {
					$myElem.mouseleave();
				}
				// return false; /* .preventDefault() and .stopPropagation() */
			},
			mouseenter: function(e){
				e.stopPropagation();
				var $myElem = $(this);
				clearTimeout(myTimer);
				myTimer = setTimeout(function(){
					$myElem.find(options.children + ':first').slideDown('fast');
				}, options.timeout );
				// return false; /* .preventDefault() and .stopPropagation() */
			},
			mouseleave: function(e){
				e.stopPropagation();
				var $myElem = $(this);
				clearTimeout(myTimer);
				// myTimer = setTimeout(function(){
					$myElem.find(options.children).slideUp('fast');
				// }, options.timeout );
				// return false; /* .preventDefault() and .stopPropagation() */
			},
			// focusin: $(this).mouseenter(),
			// focusout: $(this).mouseleave()
			// MSPointerDown: function(e) {
				// return false; /* .preventDefault() and .stopPropagation() */
			// },
			// MSPointerUp: function(e) {
				// return false; /* .preventDefault() and .stopPropagation() */
			// }
		});
	});
};



/* ========================================
=====   MOBILE SLIDING PANEL MENU     =====
======================================== */

function slideMobilePanel(){
	/* $("#panel-menu").height($(document).outerHeight(true) + 200); */
	/* $("#panel-menu").width($(window).outerHeight(true)); */
	$('.panel-menu-button').click(function(){
		var myOffset = $('#panel-menu').offset().left;
		if(myOffset < 0 ) {
			$('#panel-menu').animate({ left: 0 }, 'slow', 'swing', function() {
				// $('#button').html('Close');
			});
		} else {
			$('#panel-menu').animate({ left: -350 }, 'slow', 'swing', function() {
				// $('#button').html('Menu');
			});
		}
	});
}



// Copyright (c) 2011 Peter Chapman - www.topverses.com
// Freely distributable for commercial or non-commercial use
function accordionMenu() {
	$('.accordion-menu ul ul').hide();
	$('.accordion-menu ul li a').click(
		function() {
			var openMe = $(this).next();
			var mySiblings = $(this).parent().siblings().find('ul');
			if (openMe.is(':visible')) {
				openMe.slideUp('normal');
			} else {
				mySiblings.slideUp('normal');
				openMe.slideDown('normal');
			}
		}
	);
}





/* ========================================
=====         SYNTAX HIGHLIGHT        =====
======================================== */
function syntaxhighlight(){
	$('[data-role=\'syntaxhighlight\']').each(function(key, value) {
		var myNewID = $(this).attr('id') + '-syntaxhighlight';
		var myEscapedHTML = this.innerHTML.replace(/&/g,'&amp;')
			.replace(/</g,'&lt;')
			.replace(/>/g,'&gt;')
			.replace(/\t/g, '   ');
		var myNewHTML = '<pre><code id=' + myNewID + '>' + myEscapedHTML + '</code></pre>';
		$(myNewHTML).insertAfter(this);
	});
}





/* ========================================
=====           READY GO !            =====
======================================== */

var url = window.location.pathname;
var filename = url.substring(url.lastIndexOf('/')+1);
var pagename  = filename.substring(0,filename.lastIndexOf('.'));
if (pagename == '') { pagename = 'index'; } // HOME PAGE FIX
console.log('pagename = ' + pagename);


/* ========== ALLPAGES ========== */
$(document).ready(function() {
	// ===== MENUS =====
	// $( ".accordion-menu" ).load( "_page_nav.html", function() {
		// ===== SLIDING PANEL AND ACCORDION =====
		slideMobilePanel();
		accordionMenu();
	// });
});

$(document).ready(function() {
	// ===== SYNTAX HIGHLIGHT =====
	syntaxhighlight();
});




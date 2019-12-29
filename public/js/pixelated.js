/* ========================================
=====      GLOBAL VARIABLES           =====
======================================== */




/* ========================================
=====      GENERAL FUNCTIONS          =====
======================================== */

$.fn.equalHeight = function() {
    $this = $(this);
    $this2 = $(this);
    var maxHeight = 0;
    $this.css('height','');
    $this.each(function () {
		$this = $(this);
    	if ($this.height() > maxHeight) {
        	maxHeight = $this.height();
    	}
    });
    $this2.each(function () {
		$this = $(this);
        if($this.height() < maxHeight) {
        	// $this.css("height","");
        	$this.height(maxHeight);
        };
    });
};


$.fn.exists = function(){
	return this.length > 0;
};


$.fn.maxZIndex = function(){
	var highest = -999;
	$('*').each(function() {
		var current = parseInt($(this).css('z-index'), 10);
		if(current && highest < current) highest = current;
	});
	return highest;
};


$.fn.consoleClear = function() {
	if (typeof console._commandLineAPI !== 'undefined') {
		console._commandLineAPI.clear();
	} else if (typeof console._inspectorCommandLineAPI !== 'undefined') {
		console._inspectorCommandLineAPI.clear();
	} else if (typeof console.clear !== 'undefined') {
		console.clear();
	}
};


function randomBetween(min, max) {
	/* ===== RANDOM NUM BETWEEN MIN AND MAX ===== */
    if (min < 0) {
        return min + Math.random() * (Math.abs(min) + max);
    } else {
        return min + Math.random() * (max - min)
    }
}


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

function GetQueryStringParams(sParam) {
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++) {
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam) {
			return sParameterName[1];
		}
	}
}

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
=====         JQUERY MOBILE           =====
======================================== */

$(document).bind('mobileinit', function(){
	// $.mobile.autoInitializePage = false;
	$.mobile.ajaxEnabled = false;
	// $.mobile.ignoreContentEnabled = true;
	// $.mobile.page.prototype.options.keepNative = "select, input, textarea";
});

$(document).on('pagebeforeshow', function(){
	$('.ui-overlay-c').removeClass('ui-overlay-c');
	$('.ui-body-c').removeClass('ui-body-c');
	$('a').removeClass('ui-link');
	// $( "input, textarea, select", ).attr( "data-role", "none" );
});




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
=====    RESIZE HOME PAGE CALLOUTS    =====
======================================== */

var calloutsEventListener = false;

function global_function() {
    $.calloutsEqualHeight();
}

$.calloutsEqualHeight = function(){
	/* http://modernweb.com/2014/03/24/using-media-queries-in-javascript/ */
	/* http://www.javascriptkit.com/javatutors/matchmediamultiple.shtml */
	cards = [
		'#pixelated-section .row .callout-body .cardBody' ,
		'#twitter-section .row .callout-body .cardBody'
	];
	var mqls = [ // list of window.matchMedia() queries
		window.matchMedia('only screen and (max-width: 480px)'),
		window.matchMedia('only screen and (max-width: 1024px)'),
		window.matchMedia('only screen and (max-height: 1280px)')
	];
	if (calloutsEventListener == false) {
		if (matchMedia) {
			for (var i=0; i<mqls.length; i++){ // loop through queries
				mqls[i].addListener(function(){
					$.calloutsEqualHeight();
				});
			}
			calloutsEventListener = true;
			$.calloutsEqualHeight();
		}
	}
	if (mqls[0].matches) {
		/* ===== mobile device - clear height ===== */
		$.each(cards, function(index,value) {
			$(value).css('height','');
		});
	} else {
		/* ===== equal height for callouts ===== */
		$.each(cards, function(index,value) {
			$(value).equalHeight();
		});
	}
};





/* ========================================
=====        GALLERIA GALLERY         =====
======================================== */
/*
$.fn.loadGallery = function(options){
	options = $.extend ({
		tag: 'pixelatedviewsgallery'
	}, options);
	// var tag = 'pixelatedviewsgallery';
	if (GetQueryStringParams('tag')) {
		options.tag = GetQueryStringParams('tag');
	}
	Galleria.loadTheme('galleria/galleria.pixelated.js');
	var flickr = new Galleria.Flickr();
	flickr.setOptions({
		imageSize: 'big',
		max: 100,
		sort: 'date-taken-desc'
	}).tags(options.tag, function(data) {
		Galleria.run('#galleria', {
			dataSource: data
		});
	});
};
*/




/* ========================================
=====         RECIPE TOC              =====
======================================== */
// http://www.johnstoncountyarts.org/Gallery_testingmenu.html
function createTOC() {
	var myTOC;
	var $recipeMain = $('#recipes');
	var $recipeGroups = $($recipeMain).children('h2');
	myTOC = '<ul class="grid12">\n' ;
	$($recipeGroups).each( function(i,$recipeGroup) {
		$($recipeGroup).before('<a name=\'grp' + i + '\'></a>');
		myTOC += '<li><a href="#">' + $($recipeGroup).text().toUpperCase() + '</a>\n';
		var $recipes = $($recipeGroup ).nextUntil('h2').filter('article');
		if ( $($recipes).exists()) {
			myTOC += '<ul>\n';
			$recipes.each( function(k, $recipe) {
				var $myDivID = 'grp' + i + 'r' + k ;
				$($recipe).before('<a name=\'' + $myDivID + '\'></a>');
				$($recipe).attr('id', $myDivID);
				myTOC += '<li><a href="#' + $myDivID + '" onclick="hideAllShowOne(\'' + $myDivID + '\')">' + $($recipe).find('h3').text() + '</a></li>\n';
			});
			myTOC += '</ul>\n';
		}
	});
	myTOC += '</ul>\n' ;
	$('#recipe-toc').html(myTOC);
}

function fillPicklist(myFieldID) {
	var $myField = $('select[name=' + myFieldID + ']')
	var $recipeMain = $('#recipes');
	var $recipeGroups = $($recipeMain).children('h2');
	$($recipeGroups).each( function(i,$recipeGroup) {
		// $($myField).append( $('<option>', { value: '', text: '=== ' + $($recipeGroup).text() + ' ===' }));
		$($myField).append( new Option('=== ' + $($recipeGroup).text().toUpperCase() + ' ===', '') );
		// $($myField).append( $('<option value="">=== ' + $($recipeGroup).text() + ' ===</option>'));
		var $recipes = $($recipeGroup ).nextUntil('h2').filter('article');
		if ( $($recipes).exists()) {
			$recipes.each( function(k, $recipe) {
				var $myDivID = 'grp' + i + 'r' + k ;
				// $($myField).append( $('<option>', { value: $myDivID, text: $($recipe).find('h3').text() }));
				// $($myField).append( $('<option value="' + $myDivID + '">' + $($recipe).find('h3').text() + '</option>'));
				$($myField).append( new Option( $($recipe).find('h3').text(), $myDivID) );
			});
		}
	});
	$($myField).on('change', function() {
		if(this.value.length > 0){
			hideAllShowOne(this.value);
		} else {
			showAllRecipes();
		}
	})
}

function showAllRecipes(){
	$('h2').show();
	$('.h-recipe').show();
}

function hideAllShowOne(divToShow) {
	$('h2').hide();
	$('.h-recipe').hide();
	$('#' + divToShow).show();
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



/* ========== HOME PAGE ========== */
if ( pagename == 'index'){
	$(document).ready(function() {
		$.getFlickrData({
			userId: '15473210@N04',
			apiKey: '882cab5548d53c9e6b5fb24d59cc321d',
			tags: 'pixelatedviewsgallery'
		})
		.done(function(data){
			$.rotateFlickrHero({flickrData: data, targetID: '#flickrHero'});
		});
	});

}



/* ========== RECIPE PAGE ========== */
if ( pagename == 'recipes'){
	$(document).ready(function() {
		/* ===== RECIPES - BACK TO TOP BUTTON ===== */
		$('a[href=\'#top\']').click(function() {
			$('html, body').animate({ scrollTop: 0 }, 1000);
			return false;
		});
		/* ===== RECIPES - TABLE OF CONTENTS ===== */
		createTOC();
		fillPicklist('recipe-list');
		$('#recipe-toc.megamenu').megamenu({parents:' > ul > li', children:' > ul'});
	});
}




/* ========== URLs PAGE ========== */
if ( pagename == 'urls' ){
	$(document).ready(function() {
		$( '#urlPortfolio a' ).click(function(event) {
			event.preventDefault();
			var url = './redirect.html?url=' + $(this).attr('href');

			/*
			var container = $('#urlPreview');
			$.getJSON("https://query.yahooapis.com/v1/public/yql?"+
                "q=select%20*%20from%20html%20where%20url%3D%22"+
                encodeURIComponent(url)+
                "%22&format=xml'&callback=?",
				function(data){
					if(data.results[0]){
						container.html(data.results[0]);
					} else {
						var errormsg = "<p>Error: can't load the page.</p>";
						container.html(errormsg);
					}
				}
			);
			*/
			// $('#urlPreviewFrame').attr('src', url)
			$('#urlPreviewFrame').attr('src', $(this).attr('href'))	;
		});
	});
}




/* ========== CAROUSEL PAGE ========== */
if ( pagename == 'carousel'){
	$(document).ready(function(){
		$('#slick-flickr').slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			centerMode: true,
			centerPadding: '60px',
			autoplay: true,
			autoplaySpeed: 2000,
			arrows: true,
			focusOnSelect: true,
			infinite: true,
			lazyLoad: 'ondemand',
			variableWidth: true
		});

		$.getFlickrData({
			userId: '15473210@N04',
			apiKey: '882cab5548d53c9e6b5fb24d59cc321d',
			tags: 'pixelatedviewsgallery'
		})
		.done(function(data){
			$.loadSlickFromFlickr({flickrData: data, targetID: '#slick-flickr'});
		});

	});
}

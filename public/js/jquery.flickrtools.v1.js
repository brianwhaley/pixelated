/*!
 * FlickrTools v. 1.0
 * http://www.pixelatedviews.com/socialcards.html
 *
 * Copyright (c) 2016, Brian Whaley <brian.whaley@gmail.com>
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 *
 * Date: 2016-06-08T12:58Z
 *
 */
 
 
/* ========================================
=====      GLOBAL VARIABLES           =====
======================================== */





/* ========================================
=====      FLICKRTOOLS PLUGIN         =====
======================================== */

(function( $ ) {
 
    $.flickrtools = function(options) {


		/* ========================================
		=====            FLICKR API           =====
		======================================== */

		/* ===== FLICKR IMAGE SIZES =====
		Square			75 x 75 	_s
		Large Square	150 x 150 	_q
		Thumbnail		100 x 75	_t
		Small			240 x 180	_m
		Small			320 x 240	_n
		Medium			500 x 375	''
		Medium			640 x 480	_z
		Medium			800 x 600	_c
		Large			1024 x 768	_b
		Original		2400 x 1800	_o 
		*/


		var getFlickrData = function(options, callbackarray){
			var options = $.extend ({
				url: 'https://api.flickr.com/services/rest/?jsoncallback=?',
				method: 'flickr.photos.search',
				format: 'json',
				userId: '15473210@N04',
				apiKey: '882cab5548d53c9e6b5fb24d59cc321d',
				tags: 'pixelatedviewsgallery',
				perPage: 500,
				photoSize: "",
				startPos: 0, 
				timeout: 5000,
			}, options);
			$.getJSON( options.url, {
				method: options.method,
				api_key: options.apiKey,
				user_id: options.userId,
				tags: options.tags,
				per_page: options.perPage,
				format: options.format
				// jsoncallback: "?"
				// nojsoncallback: "1"
			})
			.done(function(data){
				console.log("Flickr API Call Completed.");
				$.each( callbackarray, function( obj, callback ) {
					if (typeof callback == 'function'){
						/* obj sets context */
						callback.call($(obj), {targetID: obj, flickrdata: data});
					}
				});
			})
			.fail(function() {
				console.log("Flickr API Call failed.");
			})
			.always(function() {
			});	
		};



		/* ========================================
		=====       SLICK AND FLICKR          =====
		======================================== */
		
		/*  ===== GET FLICKR DATA
		THEN CALL THIS FUNCTION AS A CALLBACK ===== */
		
		var loadSlickFromFlickr = function(options){

			var options = $.extend ({
				targetID: '#slick-flickr',
				flickrdata: null
			}, options);
			
			$this = $(options.targetID); //$(this);
			
			$.each(options.flickrdata.photos.photo, function(index) {
				var myImg = options.flickrdata.photos.photo[index];
				var myImgBase = "https://farm" + myImg.farm + ".static.flickr.com/" + myImg.server + "/" + myImg.id + "_" + myImg.secret + ".jpg";
				var myImgTag = '<img src="' + myImgBase + '" alt="' + myImg.title + '" title="' + myImg.title + '">'
				/* $myDiv.append(myImgTag); */
				$this.slick('slickAdd', myImgTag );
			});
		};



		/* ========================================
		=====    ROTATE IMG WITH FLICKR       =====
		======================================== */

		var rotateFlickrHero = function(options){
		
			options = $.extend ({
				targetID: '#flickrHero',
				preloadId: '#flickrHeroPreload',
				countId: '#flickrHeroCount',
				flickrdata: null,
				startPos: 0, 
				timeout: 10000,
				eventSet: false
			}, options);

			var $myDiv = $(options.targetID); //$(this);
			var $myPreloadId = $(options.preloadId);
			var $myCountId = $(options.countId);
	
			if (options.startPos == 0) {
				options.startPos = parseInt(randomBetween(1, options.flickrdata.photos.total - 1))
			}
			$myCountId.text((options.startPos - 1) + " / " + options.flickrdata.photos.total);
						
			var myPhoto = options.flickrdata.photos.photo[options.startPos - 1];
			var myPhotoBase = "https://farm" + myPhoto.farm + ".static.flickr.com/" + myPhoto.server + "/" + myPhoto.id + "_" + myPhoto.secret;
			var myPreload = options.flickrdata.photos.photo[options.startPos];
			var myPreloadBase = "https://farm" + myPreload.farm + ".static.flickr.com/" + myPreload.server + "/" + myPreload.id + "_" + myPreload.secret;
		
			/* ===== UPDATE PRELOAD IMAGE DIV WITH NEW SRC ===== */
			$($myPreloadId).attr('src', myPreloadBase + ".jpg");
		
			$($myDiv).fadeOut('slow', function() {
				/* ===== UPDATE FLICKR DIV WITH NEW IMG ===== */
				$($myDiv).attr('src', myPhotoBase + ".jpg");
				/* ===== FADE IN NEW IMAGE ===== */
				/* $($myDiv).fadeIn('slow', function() { */
				$($myDiv).fadeIn({queue: false, duration: 'slow'});
				/* ===== SLIDE UP OR DOWN ===== */
				/* $($myDiv).animate({top: '+=200px'}, 9000); */
				var myRandomNum = 1 + Math.floor(Math.random() * 100);
				if (myRandomNum % 2 === 0) { 
					$($myDiv).animate({top: '-=25%'}, 9000);
				} else { 
					$($myDiv).animate({top: '+=25%'}, 9000);
				}
				/* ===== INCREMENT POSITION ===== */
				if (options.startPos == (options.flickrdata.photos.total - 1)) {
					options.startPos = 1;
				} else {
					options.startPos += 1;
				}
				/* ===== RESET SLIDE POSITION ===== */
				$($myDiv).css('top', '0px');
				/* }); */
			});

			/* LOOP */
			if (options.timeout > 0 ) {
				setTimeout ( function() {
					$.flickrtools().rotateFlickrHero(options);
				}, options.timeout);
			}
			options.timeoutSet = true;

			/* EVENT TO SET IMG PROPERTIES DYNAMICALLY */
			if (options.eventSet == false){
				$($myDiv).on("load resize", function() {
					imgHt = $($myDiv).height();
					divHt = $($myDiv).closest('div').height();
					crop = (divHt - imgHt) / 2; 
					$($myDiv).css('margin-top', crop);
				});
				options.eventSet = true;
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



		return {
			getFlickrData: getFlickrData ,
			loadSlickFromFlickr: loadSlickFromFlickr,
			rotateFlickrHero: rotateFlickrHero
		};
 
    };
 
}( jQuery ));
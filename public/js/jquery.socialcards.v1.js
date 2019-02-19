/*!
 * SocialCards v. 1.0
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
var mySocialCards = [];
mySocialCards.cards = [];

function socialCards() {
    $.socialCards();
}


/* ========================================
=====      SOCIALCARDS PLUGIN         =====
======================================== */

(function( $ ) {
 
    /* $.fn.socialCards = function(options) { */
    $.socialCards = function(options) {

		/* ========== ========== ========== */
		var options = $.extend({
			targetID: "#social", 
			blank: {
				url: '',
				entryCount: 0,
				iconSrc: '',
				iconSrcAlt: ''
			},
			blog: {
				url: 'https://blog.pixelatedviews.com/feed/',
				entryCount: 5,
				iconSrc: 'images/blog-logo.png',
				iconSrcAlt: 'Pixelated Views Blog Post'
			},
			etsy: {
				url: 'https://www.etsy.com/people/bwhaley73/favorites/items.rss',
				entryCount: 5,
				iconSrc: 'images/etsy-logo.png',
				iconSrcAlt: 'Etsy Favorite'
			},
			/* facebook: {
				iconSrc: 'images/facebook-logo.png',
				iconSrcAlt: 'Facebook Wall Post'
			}, */
			flickr: {
				userID: '15473210@N04',
				apiKey: '882cab5548d53c9e6b5fb24d59cc321d',
				tags: 'pixelatedviewsgallery',
				entryCount: 5,
				iconSrc: 'images/flickr-logo.png',
				iconSrcAlt: 'Flickr Photo'
			},
			foursquare: {
				url: 'https://feeds.foursquare.com/history/LZSXBIJMSBHI5EQXV1GTQOVQW5XRJ0FP.rss',
				entryCount: 5,
				iconSrc: 'images/foursquare-logo.png',
				iconSrcAlt: 'FourSquare Checkin'
			},
			goodreads:{
				url: 'https://www.goodreads.com/review/list?id=49377228&v=2&key=mRDzpwnLeoPPAQf7CAIpPQ&shelf=currently-reading',
				iconSrc: 'images/goodreads-logo.png',
				iconSrcAlt: 'GoodReads Currently Reading'
			},
			/* google: {
				iconSrc: 'images/google-plus-logo.png',
				iconSrcAlt: 'Google Plus Post'
			}, */
			/* instagram: {
				iconSrc: 'images/instagram-logo.png',
				iconSrcAlt: 'Instagram Photo'
			}, */
			pinterest: {
				url: 'https://www.pinterest.com/brianwhaley/feed.rss',
				entryCount: 5,
				iconSrc: 'images/pinterest-logo.png',
				iconSrcAlt: 'Pinterest Pin'
			},
			tumblr: {
				url: 'http://pixelatedviews.tumblr.com/rss',
				entryCount: 5,
				iconSrc: 'images/tumblr-logo.png',
				iconSrcAlt: 'Tumblr Post'
			},
			twitter: {
				screenName: '@brianwhaley',
				entryCount: 5,
				env: 'store://www.pixelatedviews.com/brian-whaley',
				iconSrc: 'images/twitter-logo.png',
				iconSrcAlt: 'Twitter Tweet'
			}
			/* youtube: {
				iconSrc: 'images/youtube-logo.png',
				iconSrcAlt: 'Youtube Favorite Video'
			} */
		}, options );
		
		
		

		/* ========== ========== ========== */
    	// Private function for debugging.
		function debug( obj ) {
			if ( window.console && window.console.log ) {
				window.console.log( "hilight selection count: " + obj.length );
			}
		};
		
		
		
		
		/* ========================================
		=====        FEEDS API                =====
		======================================== */

		/* ========== ========== ========== */
		// function getFeedEntries(myURL, entryCount, callback) {
		function getFeedEntries(myURL, entryCount) {
		
			// console.log(myURL);

			if (document.location.protocol != "https:") {
				var myProtocol = "http:";
			} else {
				var myProtocol = "https:";
			}
			
			// console.log(myURL);

			/* $.ajax({
				url: myProtocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=' + entryCount + '&callback=?&q=' + encodeURIComponent(myURL),
				dataType: 'json',
				success: function(data) {
					feedToCards(data);
					// if (typeof callback == 'function'){
					// 	callback("#social", mySocialCards);
					// }
				},
				error: function() {
					console.log("Failed to fetch the feed " + myURL);
				}
			}); */
			
			$.get("https://query.yahooapis.com/v1/public/yql",
				{
					q: "select * from xml where url in (\"" + myURL + "\") limit " + entryCount + " offset 0 ",
					format: "json"
				},
				function(data){
					/* feedToCards(data); */
					for (i = 0; i< entryCount; i++) {
						feedItemToCard(data.query.results.rss.channel.item[i], myURL);
					}
				}
			);

		}


		/* ========== ========== ========== */
		/* function feedToCards(data){
			$.each(data.responseData.feed.entries, function(entryIndex, entry){
				var myNewEntry = [];
				myNewEntry = data.responseData.feed.entries[entryIndex];
				myNewEntry.source = data.responseData.feed.link;
				// mySocialCards.cards[Object.size(mySocialCards.cards) + 1] = myNewEntry;
				mySocialCards.cards.push(myNewEntry);
				mySocialCards.cards.sort(sortCardsByPubDate);
			});	
			renderSocialCards(options.targetID, mySocialCards);
		}; */
		
		/* function feedToCards(data){
			console.log(data);
			console.log(data.query.results);
			var thisSource = $(data).find('channel').find('link').first().text();
			console.log(thisSource);
			$(data).find('item').each (function(entryIndex, entry){
				var myCard = {};
				myCard = {
					author: "",
					categories: [],
					content: $(this).find('description').text(),
					contentSnippet: "",
					link: $(this).find('book').find('link').first().text() ,
					publishedDate: $(this).find('date_added').text() ,
					source: thisSource,
					title: $(this).find('title').text() 
				};
				mySocialCards.cards.push(myCard);
				mySocialCards.cards.sort(sortCardsByPubDate);
			});	
			renderSocialCards(options.targetID, mySocialCards);
		}; */
		
		function feedToCards(data){
			// console.log(data);
			$.each(data.query.results.rss.channel.item, function(itemIndex, thisItem){
				var myNewEntry = [];
				myNewEntry = data.query.results.rss.channel.item[itemIndex];
				myNewEntry.content = thisItem.description;
				if ( $(thisItem).hasOwnProperty("source") ) {
				} else {
					if($.isArray(data.query.results.rss.channel.link)) {
						if($.isPlainObject(data.query.results.rss.channel.link[0])){
							myNewEntry.source = data.query.results.rss.channel.link[0].href;
						} else {
							myNewEntry.source = data.query.results.rss.channel.link[0];
						}
					} else {
						myNewEntry.source = data.query.results.rss.channel.link;
					}
				}
				// mySocialCards.cards[Object.size(mySocialCards.cards) + 1] = myNewEntry;
				// console.log(myNewEntry);
				mySocialCards.cards.push(myNewEntry);
				mySocialCards.cards.sort(sortCardsByPubDate);
			});	
			renderSocialCards(options.targetID, mySocialCards);
		};
		
		function feedItemToCard(thisItem, thisURL){
			// console.log(data);
			var myNewEntry = [];
			myNewEntry = thisItem;
			myNewEntry.content = thisItem.description;
			if ( $(thisItem).hasOwnProperty("source") ) {
			} else {
				myNewEntry.source = thisURL;
			}
			mySocialCards.cards.push(myNewEntry);
			mySocialCards.cards.sort(sortCardsByPubDate);
			renderSocialCards(options.targetID, mySocialCards);
		};
		




		/* ========================================
		=====        FLICKR API               =====
		======================================== */

		/* ========== ========== ========== */
		function getFlickrEntries(userID, apiKey, tags, entryCount){
			$.getJSON( "https://api.flickr.com/services/rest/?jsoncallback=?", {
				method: "flickr.photos.search",
				api_key: apiKey,
				user_id: userID,
				tags: tags,
				per_page: entryCount, // 500
				page: 1,
				format: "json",
				extras: "description, date_upload, date_taken, owner_name, tags"
				// jsoncallback: "?"
				// nojsoncallback: "1"
			})
			.done(function(data){
				flickrToCards(data);
			})
			.fail(function() {
				console.log("Flickr API Call failed.");
			})
			.always(function() {
			});		
	
		};	


		/* ========== ========== ========== */
		function flickrToCards(data){
			$.each(data.photos.photo, function(index) {
				var myImg = data.photos.photo[index];
				var myImgBase = "https://farm" + myImg.farm + ".static.flickr.com/" + myImg.server + "/" + myImg.id + "_" + myImg.secret + ".jpg";
				var myImgTag = '<img src="' + myImgBase + '" alt="' + myImg.title + '" title="' + myImg.title + '">';
				var myCard = {};
				myCard = {
					author: myImg.ownername,
					categories: [],
					content: '<p>' + myImgTag + myImg.description._content + '</p>',
					contentSnippet: "",
					link: myImgBase ,
					publishedDate: myImg.datetaken ,
					source: "www.flickr.com",
					title: myImg.title
				};
				mySocialCards.cards.push(myCard);
				mySocialCards.cards.sort(sortCardsByPubDate);
			});
			renderSocialCards(options.targetID, mySocialCards);
		}





		/* ========================================
		=====        GOODREADS API            =====
		======================================== */

		/* ========== ========== ========== */
		function getGoodreadsEntries(myURL){
			$.get("https://query.yahooapis.com/v1/public/yql",
				{
					q: "select * from xml where url=\"" + myURL + "\"",
					format: "xml"
				},
				function(xml){
					goodreadsToCards(xml);
				}
			);
		};


		/* ========== ========== ========== */
		function goodreadsToCards(xml){
			$(xml).find('review').each (function() {
				var myCard = {};
				myCard = {
					author: "",
					categories: [],
					content: '<p><img src="' + $(this).find('book').find('image_url').first().text() + '" alt="GoodReads Currently Reading" class="textAlignLeft outline" />' + $(this).find('description').text() + '</p>',
					contentSnippet: "",
					link: $(this).find('book').find('link').first().text() ,
					publishedDate: $(this).find('date_added').text() ,
					source: "www.goodreads.com",
					title: $(this).find('title').text() 
				};
				mySocialCards.cards.push(myCard);
				mySocialCards.cards.sort(sortCardsByPubDate);
			});
			renderSocialCards(options.targetID, mySocialCards);
		}




		/* ========================================
		=====        TWITTER API            =====
		======================================== */

		/* ========== ========== ========== */
		function getTwitterEntries(screenName, entryCount, env){
			/* http://stevezeidner.com/twitter-api-v1-1-front-end-access-with-yql/ */
			// var query = 'select * FROM twitter.user.timeline where screen_name="' + screenName + '" and count="' + entryCount + '" ' ;
			var query = 'select * FROM twitter.statuses.timeline.user where id="' + screenName + '" and count="' + entryCount + '" ' ;
			var dataString = {
				q: query,
				diagnostics: true,
				format: 'json',
				env: env
			};
			$.ajax({
				url: 'https://query.yahooapis.com/v1/public/yql',
				data: dataString,
				success: function(data) {
					console.log("twitter data > ");
					console.log(data);
					// $('#returnData').html(JSON.stringify(data, undefined, 2));
					// twitterToCards(data);
				}
			});
		};


		/* ========== ========== ========== */
		function twitterToCards(data){
			$(data).find('review').each (function() {
				var myCard = {};
				myCard = {
					author: "",
					categories: [],
					content: '<p><img src="' + $(this).find('book').find('image_url').first().text() + '" alt="GoodReads Currently Reading" class="textAlignLeft outline" />' + $(this).find('description').text() + '</p>',
					contentSnippet: "",
					link: $(this).find('book').find('link').first().text() ,
					publishedDate: $(this).find('date_added').text() ,
					source: "www.goodreads.com",
					title: $(this).find('title').text() 
				};
				socialCards.cards.push(myCard);
				socialCards.cards.sort(sortCardsByPubDate);
			});
			renderSocialCards(options.targetID, mySocialCards);
		}

		/* ========== ========== ========== */
		function fetchTweets() {
			var yql  = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22";
			var base = "https://twitter.com/i/search/timeline?f=realtime&src=typd&include_entities=0&q=";
			// Test the URL in YQL console to make sure it works
			var url  = yql + base + encodeURIComponent('@brianwhaley') + "%22&format=json";
			// Make synchronous AJAX request to yql
			console.log(url);
			var tweets = jQuery.ajax({
				type: "GET", 
				url: url, 
				dataType: 'json', 
				async: false, 
				success: function(data) {
					console.log(data);
				} 
			}).responseText;
			// Parse the JSON response
			var data = JSON.parse(tweets);
			// Return the HTML search results
			// return data.query.results.json.items_html;
			console.log( data.query.results.json.items_html );
		}



		/* ========================================
		=====        CARD GENERATION          =====
		======================================== */

		/* ========== ========== ========== */
		function sortCardsByPubDate(a, b) {
			var property = "publishedDate";
			var dateA = new Date(a[property]);
			var dateB = new Date(b[property]);
			if (dateA < dateB) {
				return 1;
			} else if (dateA > dateB) {
				return -1;
			} else {
				return 0;
			}
		}


		/* ========== ========== ========== */
		function renderSocialCards(myDivId, data){
			$(myDivId).empty();
			$.each(data.cards, function(entryIndex, entry){
				var myFeedIcon = "";
				switch (true) {
					case (entry.source.indexOf("blog") > -1): myOptions = options.blog; break;
					case (entry.source.indexOf("etsy.com") > -1): myOptions = options.etsy; break;
					case (entry.source.indexOf("foursquare.com") > -1): myOptions = options.foursquare; break;
					case (entry.source.indexOf("flickr.com") > -1): myOptions = options.flickr; break;
					case (entry.source.indexOf("goodreads.com") > -1): myOptions = options.goodreads; break;
					case (entry.source.indexOf("pinterest.com") > -1): myOptions = options.pinterest; break;
					case (entry.source.indexOf("tumblr.com") > -1): myOptions = options.tumblr; break;
					case (entry.source.indexOf("twitter.com") > -1): myOptions = options.twitter; break;
					default: myOptions = options.blank; break;
				}
				myFeedIcon = '<img class="cardIcon" src="' + myOptions.iconSrc + '" alt="' + myOptions.iconSrcAlt + '" />';
				var myHTML = '<div class="masonry-item">';
				myHTML += '<div class="card">';
				myHTML += '<div class="cardTitle"><a href="' + entry.link + '" target="_blank">' + myFeedIcon + entry.title + '</a></div>';
				if (entry.content.length > 500) {
					var $entryContent = $($.parseHTML(entry.content));
					$entryContent = $entryContent.filter('p:first').html();
					myHTML += '<div class="cardBody">' + $entryContent + '</div>'; 
				} else {
					myHTML += '<div class="cardBody">' + entry.content + '</div>'; 
				}
				myHTML += '<div class="cardDate">' + entry.publishedDate + '</div>'
				myHTML += '</div>';
				myHTML += '</div>';
				$(myDivId).append(myHTML);
			});
		}
		
		
		/* ========== ========== ========== */
		this.gatherData = function() {
			if(options.blog.url){ getFeedEntries(options.blog.url, options.blog.entryCount); }
			if(options.etsy.url){ getFeedEntries(options.etsy.url, options.etsy.entryCount); }
			if(options.flickr.userID){ getFlickrEntries(options.flickr.userID, options.flickr.apiKey, options.flickr.tags, options.flickr.entryCount); }
			if(options.foursquare.url){ getFeedEntries(options.foursquare.url, options.foursquare.entryCount); }
			if(options.goodreads.url){ getGoodreadsEntries(options.goodreads.url); }
			if(options.pinterest.url){ getFeedEntries(options.pinterest.url, options.pinterest.entryCount); }
			if(options.tumblr.url){ getFeedEntries(options.tumblr.url, options.tumblr.entryCount); }
			if(options.twitter.screenName){ getTwitterEntries(options.twitter.screenName, options.twitter.entryCount, options.twitter.env); }
			
			renderSocialCards(options.targetID, mySocialCards);
			
			/*var myTwitterURL = 'https://twitrss.me/twitter_user_to_rss/?user=brianwhaley';
			var myTwitterId = '#twitter';
			var myTwitterData = getFeedEntries(myTwitterURL, myTwitterId, 8, renderFeedEntries); */	
			
			return this;
		};
		

 
        return this;
 
    };
 
}( jQuery ));
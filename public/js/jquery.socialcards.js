/*!
 * SocialCards v. 2.0
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

function socialCards() {
    $.socialCards();
}


/* ========================================
=====      SOCIALCARDS PLUGIN         =====
======================================== */


(function($) {
 
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
				url: '',
				entryCount: 0,
				iconSrc: 'images/blog-logo.png',
				iconSrcAlt: 'Blog Post'
			},
			etsy: {
				url: '',
				entryCount: 0,
				iconSrc: 'images/etsy-logo.png',
				iconSrcAlt: 'Etsy Favorite'
			},
			/* facebook: {
				iconSrc: 'images/facebook-logo.png',
				iconSrcAlt: 'Facebook Wall Post'
			}, */
			flickr: {
				userID: '',
				apiKey: '',
				tags: '',
				entryCount: 0,
				iconSrc: 'images/flickr-logo.png',
				iconSrcAlt: 'Flickr Photo'
			},
			foursquare: {
				url: '',
				entryCount: 0,
				iconSrc: 'images/foursquare-logo.png',
				iconSrcAlt: 'FourSquare Checkin'
			},
			goodreads:{
				url: '',
				entryCount: 0,
				iconSrc: 'images/goodreads-logo.png',
				iconSrcAlt: 'GoodReads Currently Reading'
			},
			/* google: {
				iconSrc: 'images/google-plus-logo.png',
				iconSrcAlt: 'Google Plus Post'
			}, */
			instagram: {
				url: '',
				entryCount: 0,
				iconSrc: 'images/instagram-logo.jpg',
				iconSrcAlt: 'Instagram Photo'
			},
			pinterest: {
				url: '',
				entryCount: 0,
				iconSrc: 'images/pinterest-logo.png',
				iconSrcAlt: 'Pinterest Pin'
			},
			tumblr: {
				url: '',
				entryCount: 0,
				iconSrc: 'images/tumblr-logo.png',
				iconSrcAlt: 'Tumblr Post'
			},
			twitter: {
				url: '',
				entryCount: 0,
				iconSrc: 'images/twitter-logo.png',
				iconSrcAlt: 'Twitter Tweet'
			},
			youtube: {
				url: '',
				entryCount: 0,
				iconSrc: 'images/youtube-logo.png',
				iconSrcAlt: 'Youtube Favorite Video'
			}
		}, options );
		
		var mySocialCards = [];
		mySocialCards.cards = [];
		
		this.myCards = function() { return mySocialCards.cards ; }

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

		function getFeedEntries(myURL, entryCount) {
			$.get("https://query.yahooapis.com/v1/public/yql",
				{
					q: "select * from xml where url in (\"" + myURL + "\") limit " + entryCount + " offset 0 ",
					format: "json"
				},				
				function(data){
					/* feedToCards(data); */
					/* LIMIT DOESNT WORK - LOOP THROUGH RESULTS */
					for (i = 0; i< entryCount; i++) {
						if (myURL.indexOf("goodreads") > -1) {
							goodreadsItemToCard(data.query.results.GoodreadsResponse.reviews.review[i]);
						} else if (myURL.indexOf("fetchrss") > -1) {
							fetchRSSItemToCard(data.query.results.rss.channel.item[i]);
						} else if (myURL.indexOf("youtube") > -1) {
							youTubeItemToCard(data.query.results.feed.entry[i]);
						} else {
							feedItemToCard(data.query.results.rss.channel.item[i]);
						}
					}
				}
			);
		}

		function feedToCards(data){
			$.each(data.query.results.rss.channel.item, function(itemIndex, thisItem){
				var myNewCard = [];
				myNewCard = data.query.results.rss.channel.item[itemIndex];
				myNewCard.content = thisItem.description;
				if ( $(thisItem).hasOwnProperty("source") ) {
				} else {
					if($.isArray(data.query.results.rss.channel.link)) {
						if($.isPlainObject(data.query.results.rss.channel.link[0])){
							myNewCard.source = data.query.results.rss.channel.link[0].href;
						} else {
							myNewCard.source = data.query.results.rss.channel.link[0];
						}
					} else {
						myNewCard.source = data.query.results.rss.channel.link;
					}
				}
				mySocialCards.cards.push(myNewCard);
				mySocialCards.cards.sort(sortCardsByPubDate);
			});	
			renderSocialCards(options.targetID, mySocialCards);
		};
		
		function feedItemToCard(thisItem, thisURL){
			var myNewCard = [];
			// myNewCard = thisItem;
			myNewCard.title = thisItem.title;
			myNewCard.content = thisItem.description;
			myNewCard.pubDate = thisItem.pubDate;
			myNewCard.link = thisItem.link;
			if ( $(thisItem).hasOwnProperty("source") ) {
			} else {
				myNewCard.source = myNewCard.link;
			}
			mySocialCards.cards.push(myNewCard);
			mySocialCards.cards.sort(sortCardsByPubDate);
			renderSocialCards(options.targetID, mySocialCards);
		};

		function fetchRSSItemToCard(thisItem){
			var myNewCard = [];
			// myNewCard = thisItem;
			myNewCard.content = thisItem.description;
			myNewCard.pubDate = thisItem.pubDate;
			myNewCard.link = thisItem.link;
			myNewCard.source = myNewCard.link;
			myNewCard.title = thisItem.title;
			mySocialCards.cards.push(myNewCard);
			mySocialCards.cards.sort(sortCardsByPubDate);
			renderSocialCards(options.targetID, mySocialCards);
		};

		function youTubeItemToCard(thisItem){
			var myNewCard = [];
			// myNewCard = thisItem;
			myNewCard.content = thisItem.link.href + "<br><img src='" + thisItem.group.thumbnail.url + "'>";
			myNewCard.pubDate = thisItem.published;
			myNewCard.link = thisItem.link.href;
			myNewCard.source = myNewCard.link;
			myNewCard.title = thisItem.title;
			mySocialCards.cards.push(myNewCard);
			mySocialCards.cards.sort(sortCardsByPubDate);
			renderSocialCards(options.targetID, mySocialCards);
		};

		function goodreadsItemToCard(thisItem){
			if (thisItem) {
				var myNewCard = [];
				myNewCard = {
					content: '<p><img src="' + thisItem.book.image_url + '" alt="GoodReads Currently Reading" class="textAlignLeft outline" />' + thisItem.book.description + '</p>',
					link: thisItem.book.link ,
					pubDate: thisItem.date_added ,
					source: "www.goodreads.com",
					title: thisItem.book.title 
				};
				mySocialCards.cards.push(myNewCard);
				mySocialCards.cards.sort(sortCardsByPubDate);
				renderSocialCards(options.targetID, mySocialCards);
			}
		}


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
					pubDate: myImg.datetaken ,
					source: "www.flickr.com",
					title: myImg.title
				};
				mySocialCards.cards.push(myCard);
				mySocialCards.cards.sort(sortCardsByPubDate);
			});
			renderSocialCards(options.targetID, mySocialCards);
		}
		

		/* ========================================
		=====        CARD GENERATION          =====
		======================================== */

		/* ========== ========== ========== */
		function sortCardsByPubDate(a, b) {
			var property = "pubDate";
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
					case (entry.source.indexOf("instagram") > -1): myOptions = options.instagram; break;
					case (entry.source.indexOf("pinterest.com") > -1): myOptions = options.pinterest; break;
					case (entry.source.indexOf("tumblr.com") > -1): myOptions = options.tumblr; break;
					case (entry.source.indexOf("twitter") > -1): myOptions = options.twitter; break;
					case (entry.source.indexOf("youtube") > -1): myOptions = options.youtube; break;
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
				myHTML += '<div class="cardDate">' + entry.pubDate + '</div>'
				myHTML += '</div>';
				myHTML += '</div>';
				$(myDivId).append(myHTML);
			});
		}
		
		
		/* ========== ========== ========== */
		function gatherData() {
			if(options.blog.url){ getFeedEntries(options.blog.url, options.blog.entryCount); }
			if(options.etsy.url){ getFeedEntries(options.etsy.url, options.etsy.entryCount); }
			if(options.flickr.userID){ getFlickrEntries(options.flickr.userID, options.flickr.apiKey, options.flickr.tags, options.flickr.entryCount); }
			if(options.foursquare.url){ getFeedEntries(options.foursquare.url, options.foursquare.entryCount); }
			if(options.goodreads.url){ getFeedEntries(options.goodreads.url, options.goodreads.entryCount); }
			if(options.instagram.url){ getFeedEntries(options.instagram.url, options.instagram.entryCount); };
			if(options.pinterest.url){ getFeedEntries(options.pinterest.url, options.pinterest.entryCount); }
			if(options.tumblr.url){ getFeedEntries(options.tumblr.url, options.tumblr.entryCount); }
			if(options.twitter.url){ getFeedEntries(options.twitter.url, options.twitter.entryCount); }
			if(options.youtube.url){ getFeedEntries(options.youtube.url, options.youtube.entryCount); }
		};
		
		
		/* ========== ========== ========== */
		this.init = function(){
			gatherData();
			renderSocialCards(options.targetID, mySocialCards);
			return this;
		}

        return this.init();
 
    };
 
}( jQuery ));
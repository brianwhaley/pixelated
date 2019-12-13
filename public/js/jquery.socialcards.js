/*!
 * SocialCards v. 3.0
 * http://www.pixelatedviews.com/socialcards.html
 *
 * Copyright (c) 2016, Brian Whaley <brian.whaley@gmail.com>
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 *
 * Date: 2019-12-01T12:58Z
 *
 * ADDED: Shutterfly
 * ADDED 500px (NOTE must use 'SOOpx' for properties - numerics not allowed)
 * FIXED: Instagram feed
 * FIXED: Remove use of QUERY.YAHOOAPIS.COM YQL
 * FIXED: YouTube card content
 * FIXED: Use of entryCount
 * FIXED: Remove Google Plus
 * TODO: Goodreads Cards
 * TODO: Foursquare Feed
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

		this.defaults = {
			targetID: "#social", 
			blank: {
				url: '',
				entryCount: 5,
				iconSrc: '',
				iconSrcAlt: ''
			},
			SOOpx: {
				url: '',
				entryCount: 5,
				iconSrc: 'images/500px-logo.png',
				iconSrcAlt: '500px Post'
			},
			blog: {
				url: '',
				entryCount: 5,
				iconSrc: 'images/blog-logo.png',
				iconSrcAlt: 'Blog Post'
			},
			etsy: {
				url: '',
				entryCount: 5,
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
				entryCount: 5,
				iconSrc: 'images/flickr-logo.png',
				iconSrcAlt: 'Flickr Photo'
			},
			foursquare: {
				url: '',
				entryCount: 5,
				iconSrc: 'images/foursquare-logo.png',
				iconSrcAlt: 'FourSquare Checkin'
			},
			goodreads:{
				url: '',
				entryCount: 5,
				iconSrc: 'images/goodreads-logo.png',
				iconSrcAlt: 'GoodReads Currently Reading'
			},
			instagram: {
				userID: '',
				entryCount: 5,
				iconSrc: 'images/instagram-logo.jpg',
				iconSrcAlt: 'Instagram Photo'
			},
			pinterest: {
				url: '',
				entryCount: 5,
				iconSrc: 'images/pinterest-logo.png',
				iconSrcAlt: 'Pinterest Pin'
			},
			shutterfly: {
				url: '',
				entryCount: 5,
				iconSrc: 'images/shutterfly-logo.jpg',
				iconSrcAlt: 'Shutterfly Items'
			},
			tumblr: {
				url: '',
				entryCount: 5,
				iconSrc: 'images/tumblr-logo.png',
				iconSrcAlt: 'Tumblr Post'
			},
			twitter: {
				url: '',
				entryCount: 5,
				iconSrc: 'images/twitter-logo.png',
				iconSrcAlt: 'Twitter Tweet'
			},
			youtube: {
				url: '',
				entryCount: 5,
				iconSrc: 'images/youtube-logo.png',
				iconSrcAlt: 'Youtube Favorite Video'
			},
			other: {
				url: '',
				entryCount: 5,
				iconSrc: 'images/blog-logo.png',
				iconSrcAlt: 'Post'
			}
		};

		/* first param true = recursive */
		var options = $.extend( true, this.defaults, options );

		var mySocialCards = [];
		mySocialCards.cards = [];
		
		this.myCards = function() { return mySocialCards.cards ; }

		/* ========================================
		=====        FEEDS API                =====
		======================================== */

		function getFeedEntries(myURL, entryCount) {
			$.ajax({
				url: 'https://api.rss2json.com/v1/api.json',
				method: 'GET',
				dataType: 'json',
				data: {
					rss_url: myURL,
					api_key: 'c3wsmqh4h1iydxxip3sgkr1jtk3brllbp61jc6yd', 
					count: entryCount
				}
			}).done( function(data) {
				$.each(data.items, function(itemIndex, thisItem){
					var myNewCard = [];
					myNewCard = data.items[itemIndex];
					/* ===== FIX FOR DESCRIPTION ===== */
					myNewCard.content = thisItem.description;
					if ( thisItem.description ) {
					} else {
						var myImgBase = thisItem.thumbnail ;
						var myImgTag = '<img src="' + myImgBase + '" alt="' + thisItem.title + '" title="' + thisItem.title + '">';
						myNewCard.content = '<p>' + myImgTag + thisItem.title + '</p>' ;
						myNewCard.description = myNewCard.content; 
					}
 					/* ===== FIX FOR SOURCE ===== */
					if ( $(thisItem).hasOwnProperty("source") ) {
					} else {
						if($.isArray(thisItem.link)) {
							if($.isPlainObject(thisItem.link[0])){
								myNewCard.source = thisItem.link[0].href;
							} else {
								myNewCard.source = thisItem.link[0];
							}
						} else {
							myNewCard.source = thisItem.link;
						}
					}
					mySocialCards.cards.push(myNewCard);
					mySocialCards.cards.sort(sortCardsByPubDate);
					if (itemIndex >= entryCount) { return false; }
				});	
				renderSocialCards(options.targetID, mySocialCards);
			})
			.fail(function() {
				console.log("RSS2JSON API Call failed.");
			})
			.always(function() {
			});	
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
				flickrToCards(data, entryCount);
			})
			.fail(function() {
				console.log("Flickr API Call failed.");
			})
			.always(function() {
			});		
		};	


		/* ========== ========== ========== */
		function flickrToCards(data, entryCount){
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
				if (index >= entryCount) { return false; }
			});
			renderSocialCards(options.targetID, mySocialCards);
		}


		/* ========================================
		=====       GOODREADS API             =====
		======================================== */

		/* ========== ========== ========== */
		function getGoodreadsEntries(myURL, entryCount){
			$.get( myURL, {
			})
			.done(function(data){
				console.log(data);
			})
			.fail(function() {
				console.log("Goodreads Call failed.");
			})
			.always(function() {
			});		
		};


		/* ========================================
		=====       INSTAGRAM API             =====
		======================================== */

		/* ========== ========== ========== */
		function getInstagramEntries(userID, entryCount){
			$.getJSON("https://www.instagram.com/" + userID + "/?__a=1",{
			})
			.done(function(data){
				instagramToCards(data, entryCount);
			})
			.fail(function() {
				console.log("Instagram Call failed.");
			})
			.always(function() {
			});		
		};


		/* ========== ========== ========== */
		function instagramToCards(data, entryCount){
			$.each(data.graphql.user.edge_owner_to_timeline_media.edges, function(index) {
				var myGram = data.graphql.user.edge_owner_to_timeline_media.edges[index].node;
				var myGramBase = myGram.thumbnail_src;
				var myGramName = myGram.owner.username;
				if (myGram.location) { myGramName = myGram.location.name; }
				var myGramTag = '<img src="' + myGramBase + '" alt="' + myGramName + '" title="' + myGramName + '">';
				var myCard = {};
				myCard = {
					author: myGram.owner.username,
					categories: [],
					content: '<p>' + myGramTag + myGramName + '</p>',
					contentSnippet: "",
					link: myGramBase ,
					pubDate: new Date(myGram.taken_at_timestamp * 1000) ,
					source: "www.instagram.com",
					title: myGramName
				};
				mySocialCards.cards.push(myCard);
				mySocialCards.cards.sort(sortCardsByPubDate);
				if (index >= entryCount) { return false; }
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
					case (entry.source.indexOf("500px.com") > -1): myOptions = options.SOOpx; break;
					case (entry.source.indexOf("blog") > -1): myOptions = options.blog; break;
					case (entry.source.indexOf("etsy.com") > -1): myOptions = options.etsy; break;
					case (entry.source.indexOf("foursquare.com") > -1): myOptions = options.foursquare; break;
					case (entry.source.indexOf("flickr.com") > -1): myOptions = options.flickr; break;
					case (entry.source.indexOf("goodreads.com") > -1): myOptions = options.goodreads; break;
					case (entry.source.indexOf("instagram") > -1): myOptions = options.instagram; break;
					case (entry.source.indexOf("pinterest.com") > -1): myOptions = options.pinterest; break;
					case (entry.source.indexOf("shutterfly.com") > -1): myOptions = options.shutterfly; break;
					case (entry.source.indexOf("tumblr.com") > -1): myOptions = options.tumblr; break;
					case (entry.source.indexOf("twitter") > -1): myOptions = options.twitter; break;
					case (entry.source.indexOf("youtube") > -1): myOptions = options.youtube; break;
					case (entry.source.indexOf("other") > -1): myOptions = options.other; break;
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
			for(var prop in options) {
				var option = options[prop] ;
				if (option.hasOwnProperty("url")) {
					if (option.url){
						getFeedEntries(option.url, option.entryCount);
					}
				}
			}
			if(options.flickr.userID){ getFlickrEntries(options.flickr.userID, options.flickr.apiKey, options.flickr.tags, options.flickr.entryCount); }
			if(options.goodreads.url){ getGoodreadsEntries(options.goodreads.url, options.goodreads.entryCount); }
			if(options.instagram.userID){ getInstagramEntries(options.instagram.userID, options.instagram.entryCount); }
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
"use strict";

var FlickrHero = React.createClass({
	displayName: "FlickrHero",

	getInitialState: function getInitialState() {
		return {
			flickrData: null,
			url: 'https://api.flickr.com/services/rest/?jsoncallback=?',
			method: 'flickr.photos.search',
			format: 'json',
			userId: '15473210@N04',
			apiKey: '882cab5548d53c9e6b5fb24d59cc321d',
			tags: 'pixelatedviewsgallery',
			perPage: 500,
			photoSize: "",
			
			targetID: '#flickrHero',
			preloadId: '#flickrHeroPreload',
			countId: '#flickrHeroCount',
			startPos: 0, 
			rotateInterval: 10000,
			eventSet: false
		};
	},

	rotateFlickrHero: function rotateFlickrHero(){
		console.log("Flickr Hero Rotating...");
		
		var $myDiv = $(this.state.targetID); //$(this);
		var $myPreloadId = $(this.state.preloadId);
		var $myCountId = $(this.state.countId);

		$myCountId.text((this.state.startPos - 1) + " / " + this.state.flickrData.photos.total);
					
		var myPhoto = this.state.flickrData.photos.photo[this.state.startPos - 1];
		var myPhotoBase = "https://farm" + myPhoto.farm + ".static.flickr.com/" + myPhoto.server + "/" + myPhoto.id + "_" + myPhoto.secret;
		var myPreload = this.state.flickrData.photos.photo[this.state.startPos];
		var myPreloadBase = "https://farm" + myPreload.farm + ".static.flickr.com/" + myPreload.server + "/" + myPreload.id + "_" + myPreload.secret;
	
		/* ===== UPDATE PRELOAD IMAGE DIV WITH NEW SRC ===== */
		$($myPreloadId).attr('src', myPreloadBase + ".jpg");
	
		$($myDiv).fadeOut('slow', function() {
			/* ===== UPDATE FLICKR DIV WITH NEW IMG ===== */
			$($myDiv).attr('src', myPhotoBase + ".jpg");
			/* ===== FADE IN NEW IMAGE ===== */
			$($myDiv).fadeIn({queue: false, duration: 'slow'});
			/* ===== SLIDE UP OR DOWN ===== */
			var myRandomNum = 1 + Math.floor(Math.random() * 100);
			if (myRandomNum % 2 === 0) { 
				$($myDiv).animate({top: '-=25%'}, 9000);
			} else { 
				$($myDiv).animate({top: '+=25%'}, 9000);
			}
			/* ===== INCREMENT POSITION ===== */
			if (this.state.flickrData){
				if (this.state.startPos == (this.state.flickrData.photos.total - 1)) {
					this.setState({ startPos: 1 });
				} else {
					this.setState({ startPos: this.state.startPos + 1 });
				}
			}
			/* ===== RESET SLIDE POSITION ===== */
			$($myDiv).css('top', '0px');
			/* }); */
		}.bind(this));

		/* EVENT TO SET IMG PROPERTIES DYNAMICALLY */
		if (this.state.eventSet == false){
			$($myDiv).on("load resize", function() {
				var imgHt = $($myDiv).height();
				var divHt = $($myDiv).closest('div').height();
				var crop = (divHt - imgHt) / 2; 
				$($myDiv).css('margin-top', crop);
			});
			this.setState({ eventSet: true });
		}
	},

	
	randomBetween: function randomBetween(min, max) {
		/* ===== RANDOM NUM BETWEEN MIN AND MAX ===== */
		if (min < 0) {
			return min + Math.random() * (Math.abs(min) + max);
		} else {
			return min + Math.random() * (max - min)
		}
	},
	
	componentDidMount: function componentDidMount() {
		$.getJSON( this.state.url, {
			method: this.state.method,
			api_key: this.state.apiKey,
			user_id: this.state.userId,
			tags: this.state.tags,
			per_page: this.state.perPage,
			format: this.state.format
			// jsoncallback: "?"
			// nojsoncallback: "1"
		})
		.done(function(data){
			console.log("Flickr API Call Completed.");
			var myPos = parseInt(randomBetween(1, data.photos.total - 1));
			if(this.isMounted()){
        		this.setState({ 
					flickrData: data,
					startPos: myPos 
				});
				this.rotateFlickrHero();
				this.interval = setInterval(this.rotateFlickrHero, this.state.rotateInterval);
			}
		}.bind(this))
		.fail(function() {
			console.log("Flickr API Call failed.");
		})
		.always(function() {
		});	
	},
	
	componentWillUnmount: function componentWillUnmount() {
		clearInterval(this.interval);
	},
  
	render: function render() {
		return (
			<div className="flickrHero"></div>
		);
	}
});

ReactDOM.render(
  React.createElement(FlickrHero, null),
  document.getElementById('flickrHero')
);




/* ======================================== */




var FlickrSlick = React.createClass({
	displayName: "FlickrSlick",

	getInitialState: function getInitialState() {
		return {

			url: 'https://api.flickr.com/services/rest/?jsoncallback=?',
			method: 'flickr.photos.search',
			format: 'json',
			userId: '15473210@N04',
			apiKey: '882cab5548d53c9e6b5fb24d59cc321d',
			tags: 'pixelatedviewsgallery',
			perPage: 500,
			
			targetID: '#slick-flickr'
		};
	},
	
	componentDidMount: function componentDidMount() {
		$.getJSON( this.state.url, {
			method: this.state.method,
			api_key: this.state.apiKey,
			user_id: this.state.userId,
			tags: this.state.tags,
			per_page: this.state.perPage,
			format: this.state.format
			// jsoncallback: "?"
			// nojsoncallback: "1"
		})
		.done(function(data){
			console.log("Flickr API Call Completed.");
			if(this.isMounted()){
        		this.setState({ 
					flickrData: data
				});
				this.addFlickrToSlick();
			}
		}.bind(this))
		.fail(function() {
			console.log("Flickr API Call failed.");
		})
		.always(function() {
		});	
	},
	
	addFlickrToSlick: function addFlickrToSlick() {
		//$myTargetID = $(this.state.targetID); //$(this);
		$.each(this.state.flickrSata.photos.photo, function(index) {
			var myImg = this.state.flickrData.photos.photo[index];
			var myImgBase = "https://farm" + myImg.farm + ".static.flickr.com/" + myImg.server + "/" + myImg.id + "_" + myImg.secret + ".jpg";
			var myImgTag = '<img src="' + myImgBase + '" alt="' + myImg.title + '" title="' + myImg.title + '">'
			$(this.state.targetID).slick('slickAdd', myImgTag );
		});
	}.bind(this),
	
	componentWillUnmount: function componentWillUnmount() {
	},
  
	render: function render() {
		return (
			<div className="FlickrSlick"></div>
		);
	}
});

ReactDOM.render(
  React.createElement(FlickrSlick, null),
  document.getElementById('slick-flickr')
);

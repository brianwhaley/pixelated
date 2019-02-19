require.config({
	baseUrl: "js/",
	paths : {
		'jquery' : 'fallback/jquery-latest.min',
		'socialcards' : 'jquery.socialcards',
		'flickrtools' : 'jquery.flickrtools',
		
		/*'react-dom-server' : 'https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom-server.min', */
		'react-dom' : 'fallback/react-dom.production.min',
		/*'react-addons' : 'https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-with-addons.min', */
		'react' : 'fallback/react.production.min',

		'pixelated' : 'pixelated',
		/* 'jquerymobile' : '//code.jquery.com/mobile/latest/jquery.mobile.min', */
		/* 'jqueryui' : '//code.jquery.com/ui/1.11.4/jquery-ui.min', */
		/* 'jquerymodal' : 'jquery.modal', */
		/* 'less' : '//cdnjs.cloudflare.com/ajax/libs/less.js/2.5.3/less.min', */
		'addthis' : 'fallback/addthis_widget',
		'twitter' : 'fallback/widgets',
		'slick' : 'fallback/slick.min',
		'galleria' : 'fallback/galleria.min',
		'galleriaflickr' : 'fallback/galleria.flickr.min'
    },
	shim : {
		'slick' : { 'deps' : ['jquery'] },
		'galleria' : { 'deps' : ['jquery'] },
		'galleriaflickr' : { 'deps' : ['jquery','galleria'] },
		/* 'jquerymobile' : { 'deps' : ['jquery'] }, 
		'jqueryui' : { 'deps' : ['jquery'] }, */
		'socialcards' : { 'deps' : ['jquery'] },
		'flickrtools' : { 'deps' : ['jquery'] },
		'pixelated' : { 'deps' : ['jquery','socialcards','slick'] },
		'addthis' : { 'deps' : ['pixelated'] }
	}
});


require(['jquery']);
require(['jquery','slick']);
/* require(['less']); */
require(['twitter']);
require(['jquery','galleria']);
require(['jquery','galleriaflickr']);
require(['jquery','socialcards']);
require(['jquery','flickrtools']);
require(['jquery','slick','socialcards','flickrtools','pixelated']);
/* require(['jquery','jquerymobile']); */
/* require(['jquery','jqueryui']); */
require(['react']);
require(['react','react-dom']);
require(['addthis']);

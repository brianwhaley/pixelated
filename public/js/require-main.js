require.config({
	baseUrl: "js/",
	paths : {
		'jquery' : '//code.jquery.com/jquery-latest.min',
		'socialcards' : 'jquery.socialcards',
		'flickrtools' : 'jquery.flickrtools',
		
		/*'react-dom-server' : 'https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom-server.min', */
		'react-dom' : 'https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.min',
		/*'react-addons' : 'https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-with-addons.min', */
		'react' : 'https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react.min',

		'pixelated' : 'pixelated',
		/* 'jquerymobile' : '//code.jquery.com/mobile/latest/jquery.mobile.min', */
		/* 'jqueryui' : '//code.jquery.com/ui/1.11.4/jquery-ui.min', */
		/* 'jquerymodal' : 'jquery.modal', */
		/* 'less' : '//cdnjs.cloudflare.com/ajax/libs/less.js/2.5.3/less.min', */
		'addthis' : '//s7.addthis.com/js/300/addthis_widget',
		'twitter' : '//platform.twitter.com/widgets',
		'slick' : '//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.5.9/slick.min',
		'galleria' : '//cdnjs.cloudflare.com/ajax/libs/galleria/1.4.2/galleria.min',
		'galleriaflickr' : '//cdnjs.cloudflare.com/ajax/libs/galleria/1.4.2/plugins/flickr/galleria.flickr.min'
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

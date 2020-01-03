require.config({
	baseUrl: 'js/',
	paths : {
		'jquery' : '//code.jquery.com/jquery-latest.min',
		/* 'flickrtools' : 'jquery.flickrtools', */

		/*'react-dom-server' : 'https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom-server.min', */
		/* 'react-dom' : 'https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.min', */
		/*'react-addons' : 'https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-with-addons.min', */
		/* 'react' : 'https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react.min', */

		'pixelated' : 'pixelated',
		/* 'less' : '//cdnjs.cloudflare.com/ajax/libs/less.js/2.5.3/less.min', */
		'addthis' : '//s7.addthis.com/js/300/addthis_widget',
		'twitter' : '//platform.twitter.com/widgets'
		/* 'slick' : '//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.5.9/slick.min' */
    },
	shim : {
		/* 'slick' : { 'deps' : ['jquery'] }, */
		/* 'flickrtools' : { 'deps' : ['jquery'] }, */
		/* 'pixelated' : { 'deps' : ['jquery','slick'] }, */
		'addthis' : { 'deps' : ['pixelated'] }
	}
});


require(['jquery']);
/* require(['jquery','slick']);
require(['less']); */
require(['twitter']);
/* require(['jquery','flickrtools']);
require(['jquery','slick','flickrtools','pixelated']);
require(['react']);
require(['react','react-dom']); */
require(['addthis']);

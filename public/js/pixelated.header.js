var prodCssFiles = {
	/* jquerymobile : {
		rel : "stylesheet",
		href : "//code.jquery.com/mobile/latest/jquery.mobile.min.css"
	}, */
	/* jquerymodal : {
		rel : "stylesheet,
		href : "css/jquery.modal.css"
	}, */
	slick : {
		rel : "stylesheet",
		href : "css/fallback/slick.min.css"
	},
	slicktheme : {
		rel : "stylesheet",
		href : "css/fallback/slick-theme.min.css"
	},
	pixelated : {
		rel : "stylesheet/less",
		href : "css/pixelated.css"
	}
};

var localCssFiles = {
	/* jquerymobile : {
		rel : "stylesheet",
		href : "//code.jquery.com/mobile/latest/jquery.mobile.min.css"
	}, */
	/* jquerymodal : {
		rel : "stylesheet,
		href : "css/jquery.modal.css"
	}, */
	slick : {
		rel : "stylesheet",
		href : "css/fallback/slick.min.css"
	},
	slicktheme : {
		rel : "stylesheet",
		href : "css/fallback/slick-theme.min.css"
	},
	pixelated : {
		rel : "stylesheet/less",
		href : "css/pixelated.css"
	}
};


var prodScriptFiles = {
	less : {
		src : "//cdnjs.cloudflare.com/ajax/libs/less.js/2.5.3/less.min.js",
		datamain : ""
	},
	require : {
		// src : "//cdnjs.cloudflare.com/ajax/libs/require.js/2.1.22/require.min.js",
		src : "https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.5/require.min.js",
		datamain : "js/require-main.js"
	}
};

var localScriptFiles = {
	less : {
		src : "js/fallback/less.min.js",
		datamain : ""
	},
	require : {
		src : "js/fallback/require.min.js",
		datamain : "js/fallback/require-main.js"
	}
};



function loadCss(cssFile) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = cssFile.rel;
    link.href = cssFile.href;
    document.getElementsByTagName("head")[0].appendChild(link);
}

function loadScript(myScript){
	var js = document.createElement('script');
	js.setAttribute('src', myScript.src);
	if (myScript.datamain.length != ""){ js.setAttribute('data-main', myScript.datamain ) }
	var first = document.getElementsByTagName('script')[0];
	first.parentNode.insertBefore(js, first);
}



var cssFiles;
var scriptFiles;
if(window.location.protocol == "file:"){
	cssFiles = localCssFiles;
	scriptFiles = localScriptFiles;
} else {
	cssFiles = prodCssFiles;
	scriptFiles = prodScriptFiles;
}
for (var cssFile in cssFiles){
	loadCss(cssFiles[cssFile]);
}
for (var scriptFile in scriptFiles){
	// loadScript(scriptFiles[scriptFile]);
}


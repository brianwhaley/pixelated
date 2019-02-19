var cssFiles = {
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

function loadCss(cssFile) {
    var link = document.createElement("link");
    link.type = "text/css";
    /* link.rel = "stylesheet/less";
    link.href = url; */
    link.rel = cssFile.rel;
    link.href = cssFile.href;
    document.getElementsByTagName("head")[0].appendChild(link);
}

for (var cssFile in cssFiles){
	/* console.log(cssFile);
	console.log(cssFiles[cssFile]); */
	loadCss(cssFiles[cssFile]);
}
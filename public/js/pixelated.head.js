var prodCssFiles = {
	pixelated: {
		rel: "stylesheet/less",
		href: "/css/pixelated.less"
	}
};

/* var localCssFiles = {
}; */

var prodScriptFiles = {
	addthis: {
		src: "//s7.addthis.com/js/300/addthis_widget.js"
	},
	twitter: {
		src: "//platform.twitter.com/widgets.js"
	},
	pixelated: {
		src: "/js/pixelated.js"
	}
};

/* var localScriptFiles = {
}; */

function loadCss (cssFile) {
	var link = document.createElement("link");
	link.type = "text/css";
	link.rel = cssFile.rel;
	link.href = cssFile.href;
	document.getElementsByTagName("head")[0].appendChild(link);
}

function loadScript (scriptFile) {
	var js = document.createElement("script");
	js.src = scriptFile.src;
	js.type = "text/javascript";
	if (scriptFile.datamain) { js.setAttribute("data-main", scriptFile.datamain); }
	var first = document.getElementsByTagName("script")[0];
	first.parentNode.insertBefore(js, first);
}

var cssFiles;
var scriptFiles;

cssFiles = prodCssFiles;
scriptFiles = prodScriptFiles;

for (var cssFile in cssFiles) {
	loadCss(cssFiles[cssFile]);
}
for (var scriptFile in scriptFiles) {
	loadScript(scriptFiles[scriptFile]);
}

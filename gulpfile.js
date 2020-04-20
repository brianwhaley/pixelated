// generated on 2019-12-14 using generator-webapp 4.0.0-7
const { src, dest, watch, series, parallel, lastRun } = require("gulp");
const gulpLoadPlugins = require("gulp-load-plugins");
const browserSync = require("browser-sync");
const del = require("del");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const { argv } = require("yargs");

const $ = gulpLoadPlugins();
const server = browserSync.create();

const port = argv.port || 9000;

const isProd = process.env.NODE_ENV === "production";
const isTest = process.env.NODE_ENV === "test";
const isDev = !isProd && !isTest;

function styles() {
	return src("public/css/*.css")
		.pipe($.if(!isProd, $.sourcemaps.init()))
		.pipe($.postcss([
			autoprefixer()
		]))
		.pipe($.if(!isProd, $.sourcemaps.write()))
		.pipe(dest(".tmp/css"))
		.pipe(server.reload({stream: true}));
}

function scripts() {
	return src("public/js/**/*.js")
		.pipe($.plumber())
		.pipe($.if(!isProd, $.sourcemaps.init()))
		.pipe($.babel())
		.pipe($.if(!isProd, $.sourcemaps.write(".")))
		.pipe(dest(".tmp/js"))
		.pipe(server.reload({stream: true}));
}


const lintBase = files => {
	return src(files)
		.pipe($.eslint({ fix: true }))
		.pipe(server.reload({stream: true, once: true}))
		.pipe($.eslint.format())
		.pipe($.if(!server.active, $.eslint.failAfterError()));
};
function lint() {
	return lintBase("public/js/**/*.js")
		.pipe(dest("public/js"));
}
function lintTest() {
	return lintBase("test/spec/**/*.js")
		.pipe(dest("test/spec"));
}

function html() {
	return src("public/*.html")
		.pipe($.useref({searchPath: [".tmp", "public", "."]}))
		.pipe($.if(/\.js$/, $.uglify({compress: {drop_console: true}})))
		.pipe($.if(/\.css$/, $.postcss([cssnano({safe: true, autoprefixer: false})])))
		.pipe($.if(/\.html$/, $.htmlmin({
			collapseWhitespace: true,
			minifyCSS: true,
			minifyJS: {compress: {drop_console: true}},
			processConditionalComments: true,
			removeComments: true,
			removeEmptyAttributes: true,
			removeScriptTypeAttributes: true,
			removeStyleLinkTypeAttributes: true
		})))
		.pipe(dest("dist"));
}

function images() {
	return src("public/images/**/*", { since: lastRun(images) })
		.pipe($.imagemin())
		.pipe(dest("dist/images"));
}

function fonts() {
	return src("public/fonts/**/*.{eot,svg,ttf,woff,woff2}")
		.pipe($.if(!isProd, dest(".tmp/fonts"), dest("dist/fonts")));
}

function extras() {
	return src([
		"public/*",
		"!public/*.html"
	], {
		dot: true
	}).pipe(dest("dist"));
}

function clean() {
	return del([".tmp", "dist"]);
}

function measureSize() {
	return src("dist/**/*")
		.pipe($.size({title: "build", gzip: true}));
}

const build = series(
	clean,
	parallel(
		lint,
		series(parallel(styles, scripts), html),
		images,
		fonts,
		extras
	),
	measureSize
);

function startAppServer() {
	server.init({
		notify: false,
		port,
		server: {
			baseDir: [".tmp", "public"],
			routes: {
				"/node_modules": "node_modules"
			}
		}
	});

	watch([
		"public/*.html",
		"public/images/**/*",
		".tmp/fonts/**/*"
	]).on("change", server.reload);

	watch("public/css/**/*.css", styles);
	watch("public/js/**/*.js", scripts);
	watch("public/fonts/**/*", fonts);
}

function startTestServer() {
	server.init({
		notify: false,
		port,
		ui: false,
		server: {
			baseDir: "test",
			routes: {
				"/js": ".tmp/js",
				"/node_modules": "node_modules"
			}
		}
	});

	watch("public/js/**/*.js", scripts);
	watch(["test/spec/**/*.js", "test/index.html"]).on("change", server.reload);
	watch("test/spec/**/*.js", lintTest);
}

function startDistServer() {
	server.init({
		notify: false,
		port,
		server: {
			baseDir: "dist",
			routes: {
				"/node_modules": "node_modules"
			}
		}
	});
}

let serve;
if (isDev) {
	serve = series(clean, parallel(styles, scripts, fonts), startAppServer);
} else if (isTest) {
	serve = series(clean, scripts, startTestServer);
} else if (isProd) {
	serve = series(build, startDistServer);
}

exports.serve = serve;
exports.build = build;
exports.default = build;

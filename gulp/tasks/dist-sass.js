var gulp = require("gulp");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var minifyCss = require("gulp-minify-css");
var sourcemaps = require("gulp-sourcemaps");

var config = require("../config").dist.sass;

gulp.task("dist-sass", [], function() {
	return gulp
		.src(config.src)
		.pipe(sourcemaps.init())
		.pipe(concat("app.scss"))
		.pipe(sass({errLogToConsole: true}))
		.pipe(minifyCss({keepSpecialComments: 0}))
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest(config.dest));
});

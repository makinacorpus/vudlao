var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps");

var config = require("../config").dist.js;

gulp.task("dist-js", [], function() {
	return gulp
		.src(config.src)
		.pipe(sourcemaps.init())
		.pipe(concat("app.js"))
		.pipe(uglify())
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest(config.dest));
});

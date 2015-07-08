var gulp = require("gulp");
var minifyHTML = require('gulp-minify-html');

var config = require("../config").dist.html;

gulp.task("dist-html", [], function() {
	return gulp
		.src(config.src)
		.pipe(minifyHTML({conditionals: true,spare:true}))
		.pipe(gulp.dest(config.dest));
});

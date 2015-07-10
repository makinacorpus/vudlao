var gulp = require("gulp");
var config = require("../config").vendors;

gulp.task('watch-vendors', [], function () {
	config.copy.forEach(function(file) {
		gulp.watch(file.src, ['vendors-copy']);
	});
	gulp.watch(config.js.src, ['vendors-js']);
	gulp.watch(config.sass.src, ['vendors-sass']);
});

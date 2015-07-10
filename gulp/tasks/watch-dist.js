var gulp = require("gulp");
var config = require("../config").dist;

gulp.task('watch-dist', [], function () {
	config.copy.forEach(function(file) {
		gulp.watch(file.src, ['dist-copy']);
	});
	gulp.watch(config.html.src, ['dist-html']);
	gulp.watch(config.js.src, ['dist-js']);
	gulp.watch(config.sass.src, ['dist-sass']);
});

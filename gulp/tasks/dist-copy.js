var gulp = require("gulp");
var config = require("../config").dist.copy;

gulp.task("dist-copy", [], function(done) {
	config.forEach(function(file) {
		gulp.src(file.src)
			.pipe(gulp.dest(file.dest));
	});
	done();
});

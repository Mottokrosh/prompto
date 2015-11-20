var gulp = require('gulp');

var paths = {
	toCopy: [
		'bower_components/angular/angular.js',
		'bower_components/angular-resource/angular-resource.js',
		'bower_components/angular-route/angular-route.js'
	]
};

gulp.task('copy', function () {
	return gulp.src(paths.toCopy)
		.pipe(gulp.dest('www/js'));
});

gulp.task('default', ['copy']);

var gulp = require('gulp'),
	mocha = require('gulp-mocha');

var paths = {
	tests: './test/**/*.spec.js',
	app: './app/**/*.js'
}

gulp.task('test', function(){
	return gulp.src(paths.tests)
		.pipe(mocha());
});

gulp.task('watch', function(){
	gulp.watch([paths.tests, paths.app], ['test']);
});

gulp.task('default', ['watch', 'test']);
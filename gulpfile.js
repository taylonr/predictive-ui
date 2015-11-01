var gulp = require('gulp'),
	mocha = require('gulp-mocha'),
	eslint = require('gulp-eslint');

var paths = {
	tests: './test/**/*.spec.js',
	app: './app/**/*.js'
}

gulp.task('test', function(){
	return gulp.src(paths.tests)
		.pipe(mocha());
});

gulp.task('lint', function(){
	return gulp.src([paths.app, paths.tests])
		.pipe(eslint())
		.pipe(eslint.format());
})

gulp.task('watch', function(){
	gulp.watch([paths.tests, paths.app], ['lint', 'test']);
});

gulp.task('default', ['watch', 'test', 'lint']);
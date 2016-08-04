var gulp = require('gulp'),
	jslint = require('gulp-jslint'),
	jshint = require('gulp-jshint'),
	cssnano = require('gulp-cssnano'),
	imagemin = require('gulp-imagemin');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('jslint', function () {
	return gulp.src('./js/src/*.js')
		.pipe(jslint())
		.pipe(jslint.reporter('default'));
});

gulp.task('jshint', function() {
  	return gulp.src('./js/src/*.js')
    	.pipe(jshint())
    	.pipe(jshint.reporter('default'));
});

gulp.task('cssnano', function() {
    return gulp.src('./styles/css/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest('./styles/dist'));
});

gulp.task('imagemin', function() {
	return gulp.src('./images/src/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./images/dist'));
});
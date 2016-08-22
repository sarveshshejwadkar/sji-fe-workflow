var gulp = require('gulp'),
	jslint = require('gulp-jslint'),
	jshint = require('gulp-jshint'),
	cssnano = require('gulp-cssnano'),
	imagemin = require('gulp-imagemin'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass');

gulp.task('js', function () {
	return gulp.src('./js/src/*.js')
		// .pipe(jslint())
		// .pipe(jslint.reporter('default'))
		.pipe(jshint())
    	.pipe(jshint.reporter('default'))
		.pipe(uglify())
      	.pipe(gulp.dest('./js/dist'));
});

gulp.task('sass', function () {
  return gulp.src('./sass/src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./sass/dist'));
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

gulp.task('default', ['js', 'cssnano', 'sass', 'imagemin']);


// gulp.task('jshint', function() {
//   	return gulp.src('./js/src/*.js')
//     	.pipe(jshint())
//     	.pipe(jshint.reporter('default'));
// });

// gulp.task('minify', function () {
//    gulp.src('./js/src/*.js')
//       .pipe(uglify())
//       .pipe(gulp.dest('./js/dist'))
// });

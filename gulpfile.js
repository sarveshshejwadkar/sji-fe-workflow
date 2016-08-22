var gulp = require('gulp'),
	jslint = require('gulp-jslint'),
	jshint = require('gulp-jshint'),
	cssnano = require('gulp-cssnano'),
	imagemin = require('gulp-imagemin'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync').create(),
	reload      = browserSync.reload;

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
    return gulp.src('./styles/src/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest('./styles/dist'));
});

gulp.task('imagemin', function() {
	return gulp.src('./images/src/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./images/dist'));
});

gulp.task('js-watch', ['js'], function (done) {
	browserSync.reload();
	done();
});

gulp.task('css-watch', ['cssnano'], function (done) {
	browserSync.reload();
	done();
});

gulp.task('serve', ['js', 'cssnano', 'sass', 'imagemin'], function () {
    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("js/src/*.js", ['js-watch']);
    gulp.watch("styles/src/*.css", ['css-watch']);
    gulp.watch("*.html").on("change", reload);
});

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

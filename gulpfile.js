const { src, dest, watch, series, parallel }      = require('gulp');

const eslint      = require('gulp-eslint'),
    cssnano     = require('gulp-cssnano'),
    imagemin    = require('gulp-imagemin'),
    uglify      = require('gulp-uglify'),
    sass        = require('gulp-sass'),
    sassLint    = require('gulp-sass-lint'),
    browserSync = require('browser-sync').create(),
    reload      = browserSync.reload,
    babel       = require('gulp-babel'),
    concat      = require('gulp-concat');

sass.compiler = require('node-sass')

function js_build() {
    return src('./src/js/**/*.js')
        .pipe( eslint({ 'fix': true }) )
        .pipe( eslint.format() )
        .pipe( eslint.failAfterError() )
        .pipe( babel({
            presets: ['@babel/env']
        }) )
        .pipe( uglify() )
        .pipe( concat('all.js') )
        .pipe( dest('./dist/js') )
}

function sass_build() {
    return src('./src/sass/**/*.s+(a|c)ss')
        .pipe( sassLint({configFile: './.sass-lint.yml'}) )
        .pipe( sassLint.format() )
        .pipe( sassLint.failOnError() )
        .pipe( sass().on('error', sass.logError) )
        .pipe( cssnano() )
        .pipe( dest('./dist/css') );
}

function imagemin_build() {
    return src('./src/images/**/*')
        .pipe( imagemin() )
        .pipe( dest('./dist/images') );
}

function serve_site(done) {
    // serve from current directory
    browserSync.init({
        server: {
            baseDir: "./",
        }
    });
    //serve from domain
    // browserSync.init({
    //     proxy: "localhost/wordpress/" /* replace with your vhost domain name like sitename.sj*/
    // });
    done()
}

function browser_reload(done) {
    browserSync.reload();
    done();
}

function js_watcher() {
    watch( ['src/js/**/*.js'], series(js_build, browser_reload) )
}

function sass_watcher() {
    watch( ['src/sass/**/*.scss'], series(sass_build, browser_reload) )
}

function image_watcher() {
    watch( ['src/images/**/*'], series(imagemin_build, browser_reload) )
}

function html_watcher() {
    watch(['**/*.html'], browser_reload)
}

exports.serve = series(
    parallel(
        js_build, 
        sass_build, 
        imagemin_build
     ), 
     serve_site, 
     parallel(
        js_watcher, 
        sass_watcher, 
        image_watcher, 
        html_watcher
    )
)

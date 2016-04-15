'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    prefixer = require('gulp-autoprefixer'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps');
    // livereload = require('gulp-livereload');
    // rigger = require('gulp-rigger'),
    // imagemin = require('gulp-imagemin'),
    // pngquant = require('imagemin-pngquant'),
    // rimraf = require('rimraf'),

/*gulp.task('less', function () {
    return gulp.src('./less/style.less')
        .pipe(less())
        .pipe(gulp.dest('./css/'))
        .pipe(livereload());
});*/

gulp.task('css', function () {
    // return gulp.src('./css/*.css')
    return gulp.src('./less/style.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(cleanCSS({compatibility: 'ie10'}))
        .pipe(prefixer({
            browsers: ['last 2 version', 'ie10']
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css/min/'));
        // .pipe(livereload());
});

gulp.task('watch', function () {
    // livereload.listen();
    // gulp.watch('./less/components/*.less', ['less']);
    gulp.watch('./less/components/*.less', ['css']);
});

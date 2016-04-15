'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    prefixer = require('gulp-autoprefixer'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create();
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
    return gulp.src('./less/style.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(prefixer())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css/min/'));
});

// gulp.task('watch', function () {
//     // gulp.watch('./less/components/*.less', ['less']);
//     gulp.watch('./less/components/*.less', ['css']);
// });
gulp.task('watch', function () {
    gulp.watch('./less/components/*.less', gulp.series('css'));
});

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./",
            index: "index.html"
        }
    });
    browserSync.watch('/**/*.*').on('change', browserSync.reload);
});

gulp.task( 'dev',
    gulp.series('css', gulp.parallel('watch', 'serve'))
);
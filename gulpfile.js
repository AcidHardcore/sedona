'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleancss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    gulpIf = require('gulp-if'),
    debug = require('gulp-debug'),
    mqpacker = require('css-mqpacker'),
    postcss = require('gulp-postcss'),
    csscomb = require('gulp-csscomb');
// rigger = require('gulp-rigger'),
// imagemin = require('gulp-imagemin'),
// pngquant = require('imagemin-pngquant'),
// rimraf = require('rimraf'),

// Запуск `NODE_ENV=production npm start [задача]` приведет к сборке без sourcemaps
const isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'dev';

// Компиляция LESS
gulp.task('css', function () {
    return gulp.src('./less/style.less')
        .pipe(gulpIf(isDev, sourcemaps.init()))
        .pipe(debug({title: "LESS:"}))
        .pipe(less())
        .on('error', notify.onError(function (err) {
            return {
                title: 'Styles compilation error',
                message: err.message
            }
        }))
        .pipe(autoprefixer({browsers: ['last 2 version']}))
        .pipe(csscomb())
        .pipe(gulpIf(!isDev, cleancss()))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulpIf(isDev, sourcemaps.write()))
        .pipe(gulp.dest('./css/'));
});

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
    browserSync.watch('css/*.*').on('change', browserSync.reload);
});

gulp.task('dev',
    gulp.series('css', gulp.parallel('watch', 'serve'))
);
'use strict';

var gulp = require('gulp'),
// sass = require('gulp-sass'),
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
    postcss = require('gulp-postcss'),
    csscomb = require('gulp-csscomb'),
// rigger = require('gulp-rigger'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    newer = require('gulp-newer'),
    del = require('del'),
    gcmq = require('gulp-group-css-media-queries'),
    svgstore = require('gulp-svgstore'),
    svgmin = require('gulp-svgmin'),
    cheerio = require('gulp-cheerio'),
    svgfallback = require('gulp-svgfallback');

// Запуск `NODE_ENV=production npm start [задача]` приведет к сборке без sourcemaps
const isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'dev';

//Less comb
gulp.task('comb', function () {
    console.log('---------- LESS combing');
    return gulp.src('./source/less/blocks/*.less', {since: gulp.lastRun('comb')}) // only  files were change
        .pipe(csscomb())
        .pipe(debug({title: "cssComb:"}))
        .pipe(gulp.dest('./source/less/'))
        .pipe(debug({title: "less combed:"}));
});
//  LESS compilation
gulp.task('css', function () {
    console.log('---------- LESS compile');
    return gulp.src('./source/less/style.less')
        .pipe(gulpIf(isDev, sourcemaps.init()))
        .pipe(debug({title: "LESS:"}))
        .pipe(less())
        .on('error', notify.onError(function (err) {
            return {
                title: 'Styles compilation error',
                message: err.message
            }
        }))
        .pipe(gcmq())
        .pipe(debug({title: "group media queries:"}))
        .pipe(autoprefixer({browsers: ['last 2 version']}))
        .pipe(debug({title: "autoPrefixer:"}))
         .pipe(csscomb())
         .pipe(debug({title: "cssComb:"}))
        .pipe(gulpIf(!isDev, cleancss()))
        .pipe(gulpIf(!isDev, debug({title: "cleenCss:"})))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulpIf(isDev, sourcemaps.write()))
        .pipe(gulp.dest('./build/css/'))
        .pipe(debug({title: "css:"}));
});

// coping and optimisation images
gulp.task('img', function () {
    // console.log('---------- Copy and optimisation images');
    return gulp.src('./source/img/*.{jpg,jpeg,gif,png,svg}', {since: gulp.lastRun('img')}) // only new files are change
        .pipe(newer('./build/img/'))  // keep only new files
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./build/img'))
        .pipe(debug({title: "img:"}));
});

//  SVG-sprite compilation
gulp.task('svgstore', function () {
    console.log('---------- SVG-sprite compilation');
    return gulp.src('./source/img/*.svg')
        .pipe(svgmin(function (file) {
            return {
                plugins: [{
                    cleanupIDs: {
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore({inlineSvg: true}))
        .pipe(cheerio(function ($) {
            $('svg').attr('style', 'display:none');
        }))
        .pipe(rename('sprite-svg--ls.svg'))
        .pipe(gulp.dest('./build/img/'))
        .pipe(debug({title: "SVG-sprite:"}));
});

// Compile SVG fall back sprite
gulp.task('svgfallback', function () {
    console.log('---------- Compile SVG fall back sprite');
    return gulp
        .src('./source/img/*.svg')
        .pipe(svgfallback())
        .pipe(gulp.dest('./build/test/'))
        .pipe(debug({title: "SVG fall back sprite:"}));
});

//Coping html files
gulp.task('html', function () {
    console.log('---------- Coping html files');
    return gulp.src('./source/*.html', {since: gulp.lastRun('html')})
        .pipe(gulp.dest('./build/'))
        .pipe(debug({title: "html:"}));
});

//tracking for changes
gulp.task('watch', function () {
    gulp.watch('./source/less/**/*.less', gulp.series('css'));
    gulp.watch('./source/*.html', gulp.series('html'));
    gulp.watch('./source/img/*.{jpg,jpeg,gif,png,svg}', gulp.series('img'));
});

//browser synchronisation
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./build/"
            // index: "./build/index.html"   it's need where index.html in the root folder
        }
    });
    browserSync.watch('./build/css/*.css').on('change', browserSync.reload);
    browserSync.watch('./build/img/*.*').on('change', browserSync.reload);
    browserSync.watch('./build/*.html').on('change', browserSync.reload);
});

// cleaning of build folder
gulp.task('clean', function () {
    console.log('---------- cleaning of build folder');
    return del([
        './build/**/*.*',
        '!' + './build/readme.md'
    ]);
});

//default task - auto running on WebStorm start
gulp.task('default',
    gulp.series('comb', /*gulp.parallel('css', 'img', 'html'),*/ gulp.parallel('watch', 'serve'))
);
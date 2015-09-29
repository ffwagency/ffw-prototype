'use strict';

var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync'),
  filter = require('gulp-filter'),
  twig = require('gulp-twig'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  prettify = require('gulp-html-prettify'),
  //data = require('gulp-data'),
  path = require('path'),
  reload = browserSync.reload,
  src = {
    scss: '../scss/**/*.scss',
    css: '../css',
    html_blocks: '../templates/blocks/*.twig',
    html_layouts: '../templates/layouts/*.twig',
    html_pages: '../templates/pages/*.twig',
    //dataJson: '../data/*.json',
    javascript: '../js/*.js',
  };

/**
 * Start the BrowserSync Static Server + Watch files
 */
gulp.task('serve', ['sass', 'templates'], function () {

  browserSync({
    server: "../",
    files: ["../css/styles.css", src.html]
  });

  gulp.watch(src.scss, ['sass']);
  gulp.watch([src.html_blocks, src.html_layouts, src.html_pages], ['templates']);
  gulp.watch(src.javascript, reload);
  //gulp.watch(src.dataJson, reload);
});

/**
 * Compile sass, write sourcemaps, autoprefix, filter the results, inject CSS into all browsers.
 */
gulp.task('sass', function () {
  gulp.src('../scss/{,*/}*.{scss,sass}')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true
    }))
    .on('error', function (err) {
       console.error('Error!', err.message);
     })
    .pipe(autoprefixer({browsers: ['last 2 versions']}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(src.css))
    .pipe(filter("**/*.css"))
    .pipe(reload({
      stream: true
    }));
});

/**
 * Generate templates.
 */
gulp.task('templates', function () {
  return gulp.src(src.html_pages)
    //.pipe(data(function (file) {
      //return require('../data/global.json');
      //return require('../data/' + path.basename(file.path, '.twig') + '.json');
    //}))
    .pipe(twig())
    .pipe(prettify({indent_char: ' ', indent_size: 2}))
    .pipe(gulp.dest('../'))
    .on("end", reload);
});


// CIBOX.
if (process.env.APP_ENV === 'dev') {
  gulp.task('default', ['sass', 'templates']);
} else {
  gulp.task('default', ['serve']);
}
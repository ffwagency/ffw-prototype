/*jslint indent: 2 */
'use strict';

var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync'),
  filter = require('gulp-filter'),
  twig = require('gulp-twig'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  prettify = require('gulp-html-prettify'),
  data = require('gulp-data'),
  path = require('path'),
  reload = browserSync.reload,
  scsslint = require('gulp-scss-lint'),
  jshint = require('gulp-jshint'),
  src = {
    scss: '../scss/**/*.scss',
    css: '../css',
    html_blocks: '../templates/blocks/*.twig',
    html_layouts: '../templates/layouts/*.twig',
    html_pages: '../templates/pages/*.twig',
    dataJson: '../data/*.json',
    javascript: '../js/*.js'
  };

// Task for local, static development.
gulp.task('local-development', ['sass-dev', 'templates'], function () {
  browserSync({
    server: "../",
    files: ["../css/styles.css", src.html]
  });

  gulp.watch(src.scss, ['sass-dev']);
  gulp.watch([src.html_blocks, src.html_layouts, src.html_pages], ['templates']);
  gulp.watch(src.javascript, reload);
  gulp.watch(src.dataJson, ['templates', reload]);
});


// Task for compiling sass in development mode with all features enabled.
gulp.task('sass-dev', function () {
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

// Task for compiling sass in production mode. No sourcemaps.
gulp.task('sass-prod', function () {
  gulp.src('../scss/{,*/}*.{scss,sass}')
    .pipe(sass({
      errLogToConsole: true
    }))
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(autoprefixer({browsers: ['last 2 versions']}))
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
    .pipe(data(function (file) {
      return require('../data/global.json');
      //return require('../data/' + path.basename(file.path, '.twig') + '.json');
    }))
    .pipe(twig())
    .pipe(prettify({indent_char: ' ', indent_size: 2}))
    .pipe(gulp.dest('../'))
    .on("end", reload);
});

// SCSS Lint
gulp.task('scss-lint', function () {
  return gulp.src(src.scss)
    .pipe(
      scsslint({
        'config': 'scss-lint.yml',
      })
    );
});

// Javascript Lint
gulp.task('js-lint', function () {
  return gulp.src(src.javascript)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


// Gulp Task for development mode.
// SASS compile, template generation, SCSS/JS linter
gulp.task('dev', ['sass-dev', 'templates', 'scss-lint', 'js-lint'], function () {
  browserSync({
    server: "../",
    files: ["../css/styles.css", src.html],
  });

  gulp.watch(src.scss, ['sass-dev', 'scss-lint']);
  gulp.watch([src.html_blocks, src.html_layouts, src.html_pages], ['templates']);
  gulp.watch(src.javascript, ['js-lint', reload]);
  gulp.watch(src.dataJson, ['templates', reload]);
});

// CIBOX.
gulp.task('default', ['local-development']);

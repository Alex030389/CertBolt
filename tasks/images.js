'use strict';

const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function (options) {
  return function () {
    return gulp.src(options.src, {base: options.srcFolder})
      .pipe(plugins.if(!isDevelopment, plugins.imagemin([
        plugins.imagemin.gifsicle({
          interlaced: true,
          optimizationLevel: 3
        }),
        plugins.imagemin.mozjpeg({quality: 75, progressive: true}),
        plugins.imagemin.optipng({optimizationLevel: 5}),
        plugins.imagemin.svgo()
      ],{
        verbose: false
      })))
      .pipe(gulp.dest(plugins.if(!isDevelopment, options.build, options.dev)));
  };
};

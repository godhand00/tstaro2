var gulp = require('gulp');
var webpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config.js');

gulp.task('cleanBuild', function (cb) {
    var rimraf = require('rimraf');
    rimraf('./public/javascripts/', cb);
});

gulp.task('build', function (cb) {
    return gulp.src('')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(''));
});
'use strict';

const gulp = require('gulp');
const jshint = require('gulp-jshint');
const jscs = require('gulp-jscs');

const config = require('./gulp.config')();

gulp.task('lint', function () {
    return gulp
        .src(config.alljs)
        .pipe(jscs())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {verbose: true}));
});

gulp.task('watch', function () {
    gulp.watch(config.alljs, ['lint']);
});

gulp.task('default', ['watch']);
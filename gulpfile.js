var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    csso = require('gulp-csso');

var appPaths = [
    './src/**/*.js'
];

var sassPaths = [
    './sandbox/stylesheets/*.sass'
];

var templatePaths = [
    './sandbox/templates/*.jade'
];

gulp.task('connect', function() {
    connect.server({
        root: '',
        port: 9000,
        livereload: true
    });
});

gulp.task('scripts.app', function() {
    gulp.src(appPaths)
        .pipe(gulp.dest('dist'));
});

gulp.task('scripts.templates', function() {
    gulp.src(templatePaths)
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('polygon/html'));
});

gulp.task('scripts.stylesheets', function() {
    gulp.src(sassPaths)
        .pipe(
          sass( {
            includePaths: sassPaths,
            errLogToConsole: true
          } ) )
        .pipe( csso() )
        .pipe( gulp.dest('polygon/css/') );
});

gulp.task('build', [
    'scripts.app', 'scripts.templates', 'scripts.stylesheets', 'test'
], function(){
  connect.reload();
});

gulp.task('test', function() {

});

gulp.task('watch', function() {
    gulp.watch(appPaths, ['scripts.app']);
    gulp.watch(sassPaths, ['scripts.stylesheets']);
    gulp.watch(templatePaths, ['scripts.templates']);
    connect.reload();
});

gulp.task('default', ['build', 'watch', 'connect']);

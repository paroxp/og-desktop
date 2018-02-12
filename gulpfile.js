'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const minify = require("gulp-babel-minify");
const nunjucks = require('gulp-nunjucks');
const njk = require('nunjucks');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('app', () => {
  return gulp
    .src('src/app/app.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('app:watch', () => gulp.watch('src/app/**/*.js', ['app']));

gulp.task('build', ['fonts', 'images', 'html', 'app', 'scripts', 'styles']);

gulp.task('default', ['build', 'watch']);

gulp.task('fonts', () => {
  return gulp
    .src('src/fonts/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('fonts:watch', () => gulp.watch('src/fonts/**/*', ['fonts']));

gulp.task('html', () => {
  return gulp
    .src(['src/template/page/**/*.html'])
    .pipe(nunjucks.compile(null, {
      env: new njk.Environment(new njk.FileSystemLoader('src/template'))
    }))
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('html:watch', () => gulp.watch('src/**/*.html', ['html']));

gulp.task('images', () => {
  return gulp
    .src('src/img/*')
    .pipe(gulp.dest('dist/img'));
});

gulp.task('images:watch', () => gulp.watch('src/img/**/*', ['images']));

gulp.task('scripts', () => {
  return gulp
    .src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(minify({
      mangle: {
        keepClassName: true
      }
    }))
    .pipe(concat('application.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('scripts:watch', () => gulp.watch('src/js/**/*.js', ['scripts']));

gulp.task('styles', () => {
  return gulp
    .src('src/scss/**/*.scss')
    .pipe(sass({
      includePaths: [
        'node_modules/normalize.css'
      ],
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('styles:watch', () => gulp.watch('src/scss/**/*.scss', ['styles']));

gulp.task('watch', ['fonts:watch', 'images:watch', 'html:watch', 'app:watch', 'scripts:watch', 'styles:watch']);

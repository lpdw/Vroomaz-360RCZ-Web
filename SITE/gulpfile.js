// Dependencies
var gulp = require('gulp'),
livereload = require('gulp-livereload'),
plumber = require('gulp-plumber'),
sassGlob = require('gulp-sass-glob'),
concat = require('gulp-concat'),
notify = require('gulp-notify'),
sass = require('gulp-sass'),
gcmq = require('gulp-group-css-media-queries');

//Paths
var paths = {
  styles: {
    src: 'src/sass/**/*.sass',
    dest: 'public/stylesheets'
  },
  scripts: {
    src: 'src/javascripts/*.js',
    dest: 'public/javascripts'
  },
};

// Notify
var notifyInfo = {
  title: 'Gulp'
};

//Plumber
var plumberErrorHandler = { errorHandler: notify.onError({
  title: notifyInfo.title,
  icon: notifyInfo.icon,
  message: "Error: <%= error.message %>"
})
};

// Scripts
gulp.task('scripts', function () {

  return gulp.src(paths.scripts.src)
  .pipe(plumber(plumberErrorHandler))
  .pipe(concat('main.js'))
  .pipe(gulp.dest(paths.scripts.dest))
  .pipe(livereload());

});

// Styles
gulp.task('styles', function () {

  return gulp.src(paths.styles.src)
  .pipe(plumber(plumberErrorHandler))
  .pipe(sassGlob())
  .pipe(sass({ outputStyle : 'expanded' }))
  .pipe(concat( 'index.css' ))
  .pipe(gcmq())
  .pipe(gulp.dest(paths.styles.dest))
  .pipe(livereload());

});

// Watch
gulp.task('watch', function () {

  livereload.listen();

  // Watch .scss files
  gulp.watch(paths.styles.src, ['styles']);

  // Watch .js files
  gulp.watch(paths.scripts.src, ['scripts']);

});

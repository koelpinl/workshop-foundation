var gulp      = require('gulp');
var sass      = require('gulp-sass');
var jade      = require('gulp-jade');
var uglify    = require('gulp-uglify');
var inlineCss = require('gulp-inline-css');
var clean     = require('gulp-clean');

var PATH_DEST      = "dist/";
var PATH_CSS       = "css/";
var PATH_SCSS      = "scss/";
var PATH_JADE_SRC  = "jade/";

gulp.task('clean', function() {
  return gulp.src('./'+PATH_DEST, {read: false})
  .pipe(clean());
});

gulp.task('sass', function() {
  return gulp.src(PATH_SCSS+'*.scss')
  .pipe(sass())
  .pipe(gulp.dest("./"+PATH_DEST+PATH_CSS));
});

gulp.task('compile-jade', function() {
  return gulp.src(PATH_JADE_SRC+'*.jade')
  .pipe(jade({
    pretty: false
  }))
  .pipe(gulp.dest('./'+PATH_DEST))
});

gulp.task('bundle', ['sass', 'compile-jade'], function() {
  gulp.src('./'+PATH_DEST+'*.html')
  .pipe(inlineCss())
  .pipe(gulp.dest(PATH_DEST));
});

gulp.task('watch', function() {
  gulp.watch('./'+PATH_JADE_SRC+'*.jade', ['bundle']);
});


gulp.task('default', ['bundle'], function() {});
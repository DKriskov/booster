var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var nunjucksRender = require('gulp-nunjucks-render');

gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(autoprefixer({
			browsers: ['safari 9','ie 9', 'firefox 43'],
			cascade: false
		}))
    .pipe(gulp.dest('app/css'))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
})

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

// gulp.task('nunjucks', function() {
//   nunjucksRender.nunjucks.configure(['app/templates/'], {watch:false});
//
//   return gulp.src('app/pages/**/*.+(html|nunjucks)')
//   // Renders template with nunjucks
//   .pipe(nunjucksRender())
//   // output files in app folder
//   .pipe(gulp.dest('app'))
// });

gulp.task('nunjucks', function() {
  return gulp.src('app/pages/*.nunjucks')
  .pipe(nunjucksRender({
  path: ['app/pages/', 'app/templates/'] // String or Array
  }))
  .pipe(gulp.dest('app'));
});

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');


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

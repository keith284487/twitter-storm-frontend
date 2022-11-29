var gulp = require('gulp');
var minify = require('gulp-minify');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var replace = require('gulp-string-replace');


gulp.task('concat', function() {
    return gulp.src('./src/*.js')
      .pipe(concat('scripts.js'))
      .pipe(gulp.dest('./dist/'));
  });
  gulp.task('watch', function(){
    gulp.watch('./src/*.js', gulp.series('concat'))
  return
});

gulp.task('scripts', function() {
  return gulp.src('./lib/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('min-js', function() {
    return gulp.src(['./dist/scripts.js'])
        .pipe(minify({
            ext: {
                min: '.min.js'
            },
            ignoreFiles: ['-min.js'],
            compress: {
                drop_console: true
           },
            noSource: true
        }))
        .pipe(gulp.dest('../twitter-storm-frontend-prod/dist'))
});

gulp.task('min-json', function() {
  return gulp.src(['data.json'])
      .pipe(minify({
          ext: {
              min: '.json'
          },
          ignoreFiles: ['-.json'],
          noSource: true
      }))
      .pipe(gulp.dest('../frontend-final'))
});

gulp.task('minify-css', () => {
  return gulp.src('styles.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('../twitter-storm-frontend-prod/'));
});

gulp.task('minify-html', () => {
  return gulp.src('index.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(replace(new RegExp('src="./dist/scripts.js"', 'g'), 'src="./dist/scripts.min.js"')) //Replacing src
    .pipe(gulp.dest('../twitter-storm-frontend-prod/'));
});

gulp.task('develop', gulp.series('min-js', 'minify-css', 'minify-html'))

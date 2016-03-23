// Start with Gulp initialization
var gulp       = require('gulp');
var tidyup     = require('rimraf');

// JavaScript Modules
var webpack    = require('gulp-webpack');
var sourcemaps = require('gulp-sourcemaps');
var babel      = require('gulp-babel');
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
var rename     = require('gulp-rename');

// CSS Modules
var postcss       = require('gulp-postcss');
var precss        = require('precss');
var autoprefixer  = require('autoprefixer');
var lost          = require('lost');
var rucksack      = require('gulp-rucksack');


// HTML & Templating Modules
var njRender    = require('gulp-nunjucks-render');
var nj          = njRender.nunjucks;

// Live Reload
var browserSync   = require('browser-sync');
var reload        = browserSync.reload;


/////////////////////////
/////   Task Definitions
/////////////////////////



gulp.task('clean', function(cb) {
  tidyup('build', cb);
});


gulp.task('scripts', function() {
  return gulp.src('src/scripts/app.js')
    .pipe(webpack())
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(rename('app.js'))
    .pipe(gulp.dest('build/assets/javascript/'))
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/assets/javascript/'))
    .pipe(reload({stream:true}));
});

gulp.task('styles', function() {
  var processors = [
    precss(),
    lost,
    autoprefixer({browsers: ['last 2 versions']})
  ];
  return gulp.src('src/styles/styles.css')
    .pipe(postcss(processors))
    .pipe(rucksack())
    .pipe(gulp.dest('build/assets/stylesheets/'))
});

gulp.task('markup', function() {
  nj.configure(['src/templates'], {watch: false});
  return gulp.src('src/html/**/*.+(html|nj|nunjucks)')
    .pipe(njRender())
    .pipe(gulp.dest('build'));
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*.+(gif|jpg|png|svg)')
    .pipe(gulp.dest('build/images'));
});

gulp.task('watch', function() {
  gulp.watch('src/templates/**/*.+(html|nj|nunjucks)', ['markup', reload]);
  gulp.watch('src/html/**/*.+(html|nj|nunjucks)', ['markup', reload]);
  gulp.watch('src/styles/**/*.css', ['styles', reload]);
  gulp.watch(['src/scripts/**/*.js'], ['scripts', reload]);
  gulp.watch(['src/images/**/*.+(gif|jpg|png|svg)'], ['images', reload]);
  gulp.watch("*.html", reload);
});

gulp.task('sync', function() {
  browserSync({
    server: {
      baseDir: "./build/"
    }
  });
});


/////////////////////////
/////  Task Names and Calls
/////////////////////////

gulp.task('build', ['clean'], function () {
  gulp.start(['markup', 'styles', 'images', 'scripts']);
});

gulp.task('default', ['markup', 'styles', 'images', 'sync', 'scripts', 'watch']);


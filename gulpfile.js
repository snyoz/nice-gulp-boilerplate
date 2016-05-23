// Start with Gulp initialization & Basic Modules
const gulp          = require('gulp');
const clean       = require('gulp-clean');
const zip           = require('gulp-zip');

// JavaScript Modules
const webpack       = require('webpack-stream');
const sourcemaps    = require('gulp-sourcemaps');
const babel         = require('gulp-babel');
const concat        = require('gulp-concat');
const uglify        = require('gulp-uglify');
const rename        = require('gulp-rename');

// CSS Modules
const postcss       = require('gulp-postcss');
const precss        = require('precss');
const autoprefixer  = require('autoprefixer');
const lost          = require('lost');
const rucksack      = require('gulp-rucksack');
const cleanCSS      = require('gulp-clean-css');

// Images
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');


// HTML & Templating Modules
const njRender      = require('gulp-nunjucks-render');
const nj            = njRender.nunjucks;

// Deployment
const gutil         = require('gulp-util');
const ftp           = require('gulp-ftp');

// Live Reload
const browserSync   = require('browser-sync');
const reload        = browserSync.reload;


/////////////////////////
/////   Task Definitions
/////////////////////////



gulp.task('clean', function() {
  return gulp.src('build/', {read: false})
    .pipe(clean());
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
    .pipe(cleanCSS())
    .pipe(gulp.dest('build/assets/stylesheets/'))
});

gulp.task('markup', function() {
  nj.configure(['src/templates'], {watch: false});
  return gulp.src('src/html/**/*.+(html|nj|nunjucks)')
    .pipe(njRender())
    .pipe(gulp.dest('build'));
});


gulp.task('imagemin', function () {
  return gulp.src('src/images/**/*.+(gif|jpg|png|svg)')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('build/assets/images/'));
});


gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*.+(eot|svg|ttf|woff|woff2)')
    .pipe(gulp.dest('build/assets/fonts'));
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
    port: 4444,
    server: {
      baseDir: "./build/"
    }
  });
});

gulp.task('zip', () => {
  return gulp.src('build/*/**')
    .pipe(zip('archive.zip'))
    .pipe(gulp.dest('build'));
});


gulp.task('deploy', function () {
  return gulp.src('build/*')
    .pipe(ftp({
      host: 'website.com',
      user: 'johndoe',
      pass: '1234'
    }))
    // you need to have some kind of stream after gulp-ftp to make sure it's flushed
    // this can be a gulp plugin, gulp.dest, or any kind of stream
    // here we use a passthrough stream
    .pipe(gutil.noop());
});


/////////////////////////
/////  Task Names and Calls
/////////////////////////

gulp.task('build', ['clean'], function () {
  gulp.start(['markup', 'styles', 'fonts', 'imagemin', 'scripts']);
});

gulp.task('default', ['markup', 'styles', 'sync', 'scripts', 'watch']);


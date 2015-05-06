var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var minifycss = require('gulp-minify-css');
var ngHtml2Js = require('gulp-ng-html2js');
var ngmin = require('gulp-ngmin');
var htmlmin = require('gulp-htmlmin');
var bower = require('gulp-bower');
var nodemon = require('gulp-nodemon');
var server = require('gulp-express');
var browserSync = require('browser-sync').create();
var inject = require('gulp-inject');

var del = require('del');
var es = require('event-stream');
var bowerFiles = require('main-bower-files');
var reload      = browserSync.reload;

var paths = {
  scripts: ['client/assets/js/**/*.js','client/src/**/*.js'],
  sass: [ 'client/assets/sass/*.scss'],
  css: [ 'client/assets/css/*.css'],
  html:['client/src/**/*.html','client/assets/**/*.html'],
  fonts: ['client/assets/fonts/**'],
  templates: ['client/assets/partials/**/*.html'],
  images: 'client/img/**/*',
  index:'client/index.html',
  buildDir: 'build/tmp'
};

var config={
    script: 'server/server.js'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  }

gulp.task('default',['build'], function() {
  // place code for your default task here
   return gulp.src('src/app.js')
        .pipe(ngmin({dynamic: true}))
        .pipe(gulp.dest('build'));

});

gulp.task('scripts', ['clean'], function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'));
});

// Copy all static images
gulp.task('images', ['clean'], function() {
  return gulp.src(paths.images)
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('build/img'));
});

gulp.task('sass',['clean'],  function(){
  var destination = paths.buildDir + '/css';
  return gulp.src(paths.sass)
    .pipe(concat('main.scss'))
    .pipe(sass())
    .pipe(gulp.dest(destination));
});

gulp.task('minify-css', ['clean'], function() {
  var destination = paths.buildDir + '/css';
  return gulp.src(paths.css)
    .pipe(sourcemaps.init())
    .pipe(minifycss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(destination))
    .pipe(reload({stream: true}));;
});

gulp.task('minify-html',['clean'], function() {
  var destination = paths.buildDir + '/html';
  return gulp.src(paths.html)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(destination))
});

gulp.task('partials',['clean'], function() {
  var destination = paths.buildDir + '/partials';
  return gulp.src(paths.templates)
    .pipe(ngHtml2Js({
        moduleName: "Partials",
        prefix: "/partials"
    }))
    .pipe(concat("partials.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest(destination));
});


gulp.task('nodemon', function (cb) {
  return nodemon({
    script: 'server/app.js'
  }).on('restart', function () {
      cb();
  });
});


gulp.task('inject', function () {
  var destination = paths.buildDir + '/src';
  var target = gulp.src(paths.html);
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src(['./src/**/*.js', './src/**/*.css'], {read: false},{relative: true});
  return target.pipe(inject(sources))
    .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
    .pipe(gulp.dest(paths.buildDir));
});

gulp.task('build', ['scripts','images','sass','minify-css','minify-html','partials','inject'], function(cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`
   return startServer(false);
});

function startServer() {
    return nodemon({
        script: 'server/app.js'
      }).on('start', function () {
          browserSync.init({
              server: "client"
          });
      });
}

gulp.task('clean', function(cb) {
  del(['build'], cb);
});
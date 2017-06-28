var gulp = require('gulp');
var sass = require("gulp-sass");
var nodemon = require("gulp-nodemon");
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
// var sourcemaps = require("gulp-sourcemaps");
// var autoprefixer = require("gulp-autoprefixer");
// var imagemin = require("gulp-imagemin");
// var plumber = require("gulp-plumber");

var SOURCES = {
  sass: "public/assets/styles/scss/**/*.scss",
  html: "public/app/views/**/*.html",   
  img: "public/assets/img/**/*"
};


// gulp.task('sass', function () {
//   return gulp.src(SOURCES.sass)
//     .pipe(sass().on('error', sass.logError))
//     .pipe(gulp.dest('./public/assets/styles'));
// });
//
// gulp.task('nodemon', function () {
//   nodemon({
//     script: 'server.js',
//     ext: 'js scss html'
//   })
//   .on('start', ['watch'])
//   .on('change', ['watch'])
//   .on('restart', function () {
//     console.log('Restarted');
//   });
// });
//
// // gulp.task('sass:watch', function () {
// //   gulp.watch(SOURCES.sass, ['sass']);
// // });
//
// gulp.task('default', ['nodemon', 'sass'], function () {
//   gulp.watch(SOURCES.sass, ['sass']);
// });

gulp.task('sass', function () {
  return gulp.src(SOURCES.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/assets/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('browser-sync', ['nodemon'], function () {
  browserSync.init({
    proxy: "http://localhost:8888/",
    port: 8889,
    notify: true,
  });
});

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    script: 'server.js',
    ext: 'js',
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ]
  })
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function () {
    setTimeout(function () {
      reload({ stream: false });
    }, 1000);
    console.log('Restarted!');
  });
});

gulp.task('default', ['sass', 'browser-sync'], function () {
  gulp.watch([SOURCES.sass], ['sass']);
  gulp.watch([SOURCES.html], reload);
});

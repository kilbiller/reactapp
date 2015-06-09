var gulp = require("gulp");
var browserify = require("browserify");
var browserSync = require("browser-sync");
var reload = browserSync.reload;
var del = require("del");
var babelify = require("babelify");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer-core");
var nodemon = require("gulp-nodemon");
var uglify = require("gulp-uglify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var gutil = require("gulp-util");
var sourcemaps = require("gulp-sourcemaps");

gulp.task("javascript", function() {
  browserify({
      entries: "./src/main.js",
      debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(source("app.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(uglify())
    .on("error", gutil.log)
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./build/"))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task("css", function() {
  gulp.src("scss/app.scss")
    .pipe(sass())
    .pipe(postcss([autoprefixer({
      browsers: ["last 2 version"]
    })]))
    .pipe(gulp.dest("./build"))
    .pipe(reload({
      stream: true
    }));
});

gulp.task("browser-sync", ["nodemon"], function() {
  browserSync.init({
    port: 3000,
    proxy: "http://localhost:8000"
  });
});

gulp.task("nodemon", function(cb) {
  var called = false;
  return nodemon({
    script: "server.js"
  }).on("start", function() {
    if(!called) {
      called = true;
      cb();
    }
  });
});

// clean build directory
gulp.task("clean", function(cb) {
  del(["build"], cb);
});

gulp.task("default", ["javascript", "css", "browser-sync"], function() {
  gulp.watch(["src/**/*.js", "server.js", "routes.js", "index.jade"], ["javascript"]);
  gulp.watch("scss/*.scss", ["css"]);
});

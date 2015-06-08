var gulp = require("gulp");
var browserify = require("browserify");
var browserSync = require("browser-sync");
var reload = browserSync.reload;
var del = require("del");
var babelify = require("babelify");
var fs = require("fs");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer-core");
var nodemon = require("gulp-nodemon");

gulp.task("javascript", function() {
  var file = fs.createWriteStream("./build/app.js");
  file.on("finish", function() {
    browserSync.reload();
  });

  browserify({
      debug: true
    })
    .transform(babelify)
    .require("./src/main.js", {
      entry: true
    })
    .bundle()
    .on("error", function(err) {
      console.log("Error: " + err.message);
    })
    .pipe(file);
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
  if(!fs.existsSync("./build")) {
    fs.mkdirSync("./build");
  }

  gulp.watch(["src/**/*.js", "server.js", "routes.js", "index.jade"], ["javascript"]);
  gulp.watch("scss/*.scss", ["css"]);
});

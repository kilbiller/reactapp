var gulp = require("gulp");
var browserify = require("browserify");
var browserSync = require("browser-sync");
var reload = browserSync.reload;
var historyApiFallback = require("connect-history-api-fallback");
var del = require("del");
var babelify = require("babelify");
var fs = require("fs");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer-core");

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

gulp.task("browser-sync", ["javascript", "css"], function() {
  browserSync.init({
    server: {
      baseDir: "./",
      middleware: historyApiFallback()
    }
  });
});

// clean build directory
gulp.task("clean", function(cb) {
  del(["build"], cb);
  if(!fs.existsSync("./build")) {
    fs.mkdirSync("./build");
  }
});

gulp.task("default", ["browser-sync"], function() {
  gulp.watch(["src/**/*.js"], ["javascript"]);
  gulp.watch("scss/*.scss", ["css"]);
});

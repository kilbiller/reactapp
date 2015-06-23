import gulp from "gulp";
import browserify from "browserify";
import browserSync from "browser-sync";
import del from "del";
import babelify from "babelify";
import sass from "gulp-sass";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer-core";
import uglify from "gulp-uglify";
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";
import gutil from "gulp-util";
import sourcemaps from "gulp-sourcemaps";
import watchify from "watchify";
import {
  spawn
}
from "child_process";
var node;

var b = watchify(browserify({
  entries: "./client/main.js",
  debug: true,
  cache: {},
  packageCache: {}
}));
b.transform(babelify);

gulp.task("javascript", () => {
  function rebundle() {
    return b.bundle()
      .pipe(source("app.js"))
      .pipe(buffer())
      /*.pipe(sourcemaps.init({
        loadMaps: true
      }))
      .pipe(uglify())
      .pipe(sourcemaps.write("./"))*/
      .on("error", gutil.log)
      .pipe(gulp.dest("./build/"))
      .pipe(browserSync.reload({
        stream: true,
        once: true
      }));
  }

  b.on("update", rebundle);

  return rebundle();
});

gulp.task("css", () => {
  gulp.src("scss/app.scss")
    .pipe(sass())
    .pipe(postcss([autoprefixer({
      browsers: ["last 2 version"]
    })]))
    .pipe(gulp.dest("./build"))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task("browser-sync", () => {
  browserSync.init({
    port: 3000,
    proxy: "http://localhost:8000"
  });
});

gulp.task("server", function() {
  if(node) {
    node.kill();
  }
  node = spawn("node", ["index.js"], {
    stdio: "inherit"
  });
  node.on("close", function(code) {
    if(code === 8) {
      gulp.log("Error detected, waiting for changes...");
    }
  });
});

// clean build directory
gulp.task("clean", (cb) => {
  del(["build"], cb);
});

gulp.task("default", ["javascript", "css", "server", "browser-sync"], () => {
  gulp.watch(["index.js", "server.js", "index.jade", "routes/**/*.js", "models/**/*.js"], ["server", browserSync.reload]);
  gulp.watch("scss/*.scss", ["css"]);
});

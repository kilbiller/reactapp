import gulp from "gulp";
import browserify from "browserify";
import browserSync, {
  reload
}
from "browser-sync";
import del from "del";
import babelify from "babelify";
import sass from "gulp-sass";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer-core";
import nodemon from "gulp-nodemon";
import uglify from "gulp-uglify";
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";
import gutil from "gulp-util";
import sourcemaps from "gulp-sourcemaps";

gulp.task("javascript", () => {
  var b = browserify({
      entries: "./src/main.js",
      debug: true,
      transform: [babelify]
    });

    return b.bundle()
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

gulp.task("css", () => {
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

gulp.task("browser-sync", ["nodemon"], () => {
  browserSync.init({
    port: 3000,
    proxy: "http://localhost:8000"
  });
});

gulp.task("nodemon", (cb) => {
  var called = false;
  return nodemon({
    script: "server.js"
  }).on("start", () => {
    if(!called) {
      called = true;
      cb();
    }
  });
});

// clean build directory
gulp.task("clean", (cb) => {
  del(["build"], cb);
});

gulp.task("default", ["javascript", "css", "browser-sync"], () => {
  gulp.watch(["src/**/*.js", "server.js", "routes.js", "index.jade"], ["javascript"]);
  gulp.watch("scss/*.scss", ["css"]);
});

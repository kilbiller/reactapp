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

var js = {
  entryFile: "./client/main.js",
  destDir: "./build/",
  destFile: "app.js"
};

var css = {
  entryFile: "scss/app.scss",
  destDir: "./build"
};

gulp.task("javascript", () => {
  var b = browserify({
    entries: js.entryFile,
    debug: true,
    transform: [babelify]
  });

  return b.bundle()
    .pipe(source(js.destFile))
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(uglify())
    .on("error", gutil.log)
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(js.destDir));
});

gulp.task("javascript-reload", ["javascript"], browserSync.reload);

gulp.task("css", () => {
  gulp.src(css.entryFile)
    .pipe(sass())
    .pipe(postcss([autoprefixer({
      browsers: ["last 2 version"]
    })]))
    .pipe(gulp.dest(css.destDir))
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
    script: "index.js"
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
  gulp.watch(["client/**/*.js", "server/**/*.js", "index.jade"], ["javascript-reload"]);
  gulp.watch("scss/*.scss", ["css"]);
});

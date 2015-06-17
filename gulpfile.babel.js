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
//import nodemon from "gulp-nodemon";
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

var js = {
  entryFile: "./client/main.js",
  destDir: "./build/",
  destFile: "app.js"
};

var css = {
  entryFile: "scss/app.scss",
  destDir: "./build"
};

var b = watchify(browserify({
  entries: js.entryFile,
  debug: true,
  cache: {},
  packageCache: {}
}));
b.transform(babelify);

gulp.task("javascript", () => {
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

gulp.task("browser-sync", ["server"], () => {
  browserSync.init({
    port: 3000,
    proxy: "http://localhost:8000"
  });
});

/*gulp.task("nodemon", (cb) => {
  var called = false;
  return nodemon({
    script: "index.js"
  }).on("start", () => {
    if(!called) {
      called = true;
      cb();
    }
  });
});*/

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

gulp.task("default", ["javascript", "css"], () => {
  gulp.run("browser-sync");
  gulp.watch(["client/**/*.js"], ["javascript-reload"]);
  gulp.watch(["index.js", "server.js", "index.jade", "routes/**/*.js", "models/**/*.js"], ["server"]);
  gulp.watch("scss/*.scss", ["css"]);
});

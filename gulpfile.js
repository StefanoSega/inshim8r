var gulp = require("gulp");
var uglify = require("gulp-uglify");
var pump = require("pump");
 
gulp.task("build-dist", function (cb) {
  pump([
        gulp.src("lib/*.js"),
        uglify(),
        gulp.dest("dist")
    ], cb);
});

gulp.task("default", ["build-dist"], function (cb) {
  
});
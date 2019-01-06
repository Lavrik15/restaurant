const gulp         = require("gulp");
const del          = require("del");
const tap          = require("gulp-tap");
const posthtml     = require("gulp-posthtml");
const sass         = require("gulp-sass");
const sourcemaps   = require("gulp-sourcemaps");
const csso         = require("gulp-csso");
const imagemin     = require("gulp-imagemin");
const concat       = require("gulp-concat");
const browserSync  = require("browser-sync").create();
const htmlhint     = require("gulp-htmlhint");
const postcss      = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const svgstore     = require("gulp-svgstore");
const svgmin       = require("gulp-svgmin");
const path         = require("path");

gulp.task("clean", function(){
    return del("./build");
});

gulp.task("html", function(){
    let path = "./src";
    const plugins = [require("posthtml-include")({ root: `${path}` })]
    return gulp.src("./src/*.html")
        .pipe(tap((file) => path = file.path))
        .pipe(posthtml(plugins))
        .pipe(gulp.dest("./build"))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task("style", function () {
    return gulp.src("./src/scss/main.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(csso())
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./build/css"))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task("images", function(){
    return gulp.src(["./src/images/**/*.{jpeg,jpg,png,svg,gif}", "!./src/iamges/sprite"], {since: gulp.lastRun("images")})
        .pipe(imagemin())
        .pipe(gulp.dest("./build/images"))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task("js", function() {
    return gulp.src("./src/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(concat("main.min.js"))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("build/js"))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task("watch", function() {
    gulp.watch("./src/**/*.html", gulp.series("html", browserSync.reload));
    gulp.watch("./src/images/**/*.*",  gulp.series("images"));
    gulp.watch("./src/**/*.scss",  gulp.series("style"));
    gulp.watch("./src/**/*.js",  gulp.series("js"));
});

gulp.task("serve", function () {
    browserSync.init({
        server: {
            baseDir: "./build"
        },
    });

    gulp.watch("./src/**/*.html", gulp.series("html"));
    gulp.watch("./src/images/**/*.*", gulp.series("images", "svg"));
    gulp.watch("./src/**/*.scss", gulp.series("style"));
    gulp.watch("./src/**/*.js", gulp.series("js"));
    gulp.watch("./src/iamges/sprite/*.svg", gulp.series("svg"));
})

gulp.task("html:validator", function(){
    return gulp.src("./src/*.html")
        .pipe(htmlhint())
        .pipe(htmlhint.failOnError())
});

gulp.task("svg", function () {
    return gulp
        .src("./src/images/sprite/*.svg")
        .pipe(svgstore())
        .pipe(gulp.dest("./build/images/sprite/"))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task("dev", gulp.series("clean", "html", "images", "svg", "style", "js", "serve"));

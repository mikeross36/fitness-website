const { src, dest, watch, series, parallel } = require("gulp")

const sass = require("gulp-sass")(require("sass"))
const autoprefixer = require("autoprefixer")
const cssnano = require("cssnano")
const postcss = require("gulp-postcss")
const terser = require("gulp-terser")
const concat = require("gulp-concat")
const imagemin = require("gulp-imagemin")
const fileinclude = require("gulp-file-include")
const embedsvg = require("gulp-embed-svg")
const sourcemaps = require("gulp-sourcemaps")

files = {
    scssPath: "app/scss/**/*.scss",
    jsPath: "app/js/**/*.js",
    imgPath: "app/images/**/*"
}

function scssTask() {
    return src(files.scssPath)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write())
    .pipe(dest("dist/css/"))
}

function jsTask() {
    return src(files.jsPath)
    .pipe(sourcemaps.init())
    .pipe(concat("all.js"))
    .pipe(terser())
    .pipe(sourcemaps.write())
    .pipe(dest("dist/js/"))
}

function imageminTask() {
    return src(files.imgPath)
    .pipe(imagemin())
    .pipe(dest("dist/images"))
}

function htmlTask() {
    return src("*.html")
    .pipe(fileinclude({
        prefix: "@@",
        basepath: "@file"
    })).pipe(dest("dist"))
}

function embedSvgTask() {
    return src("*/.html")
    .pipe(embedsvg())
    .pipe(dest("dist"))
}

function watchTask() {
    watch([files.scssPath, files.jsPath], parallel(scssTask, jsTask))
    watch(files.imgPath, imageminTask)
    watch("*/.html", htmlTask)
    watch("*/.html", embedSvgTask)
}

exports.default = series(
    parallel(scssTask, jsTask),
    imageminTask,
    htmlTask,
    embedSvgTask,
    watchTask
)

exports.build = series(
    parallel(scssTask, jsTask),
    imageminTask,
    htmlTask,
    embedSvgTask,
)
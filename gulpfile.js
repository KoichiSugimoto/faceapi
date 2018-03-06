var gulp = require('gulp'),
	plumber = require("gulp-plumber"),
	sass = require('gulp-sass'),
	cleancss = require('gulp-clean-css'),
	autoprefixer = require('gulp-autoprefixer'),
	uglify = require("gulp-uglify"),
	rename = require('gulp-rename'),
	notify = require('gulp-notify'),
    gutil = require('gulp-util');

var paths = {
	"url":"localhost:8000",
	"css": "./kanagawabiz-con/assets/css/",
	"cssf": "./kanagawabiz-con/assets/css/**/*.css",
	"js": "./kanagawabiz-con/assets/js/",
	"jsf": "./kanagawabiz-con/assets/js/**/*.js",
	"scss": "./kanagawabiz-con/assets/scss/**/*.scss",
	"sass": "./kanagawabiz-con/assets/assets/scss",
}
//sass
gulp.task('sass',function(){
    return gulp.src(paths.scss)
    .pipe(plumber())
    .pipe(sass({outputStyle: 'expanded'}))
	.pipe(cleancss({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
    }))
	.pipe(autoprefixer({
		browsers: ["last 2 versions", "ie >= 9", "Android >= 4","ios_saf >= 8"],
		cascade: false
	}))
    .pipe(gulp.dest(paths.css))
	.pipe(notify("Sass Compile Success!"));
});



gulp.task('js_minify', function(cb) {
  return gulp.src([paths.jsf, "!" + paths.js + "**/*.min.js" ,"!" + paths.js +"lib/*.js" ])
    .pipe( uglify().on('error', function(err) {
        gutil.log(gutil.colors.red('[Error]'), err.toString());
        this.emit('end');
    }) )
    .pipe( rename({ suffix: '.min' }) )
    .pipe( gulp.dest( paths.js ) );
});



gulp.task('default', ['sass','js_minify'], function () {
	gulp.watch(paths.scss, ['sass']);
	gulp.watch(paths.jsf, ['js_minify']);
});

var gulp = require('gulp'),
	bs = require('browser-sync').create(),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	minifyCss = require('gulp-minify-css'),
	minifyHtml = require('gulp-minify-html'),
	stylus = require('gulp-stylus'),
	jshint=require('gulp-jshint'),
	reload = bs.reload;

// 静态服务器 + 监听 scss/html 文件
gulp.task('serve',['stylus'], function() {

	bs.init({
		server: "./"
		// ,port:8080
	});
	gulp.watch("./src/js/*.js").on('change',reload);
	gulp.watch("./src/stylus/*.styl", ['stylus']);
	gulp.watch("*.html").on('change', reload);
});

gulp.task('stylus',function(){
	return gulp.src("./src/stylus/*.styl")
		.pipe(stylus())
		.pipe(gulp.dest("./src/css"))
		.pipe(reload({stream:true}));
});

gulp.task('jshint',function(){
	gulp.src('./src/js/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter());
});

gulp.task('default', ['serve']);
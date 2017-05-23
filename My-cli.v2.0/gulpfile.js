var gulp = require('gulp'),
	bs = require('browser-sync').create(),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	minifyCss = require('gulp-minify-css'),
	minifyHtml = require('gulp-minify-html'),
	stylus = require('gulp-stylus'),
	concat = require('gulp-concat'),
	imagemin = require('gulp-imagemin'),
	reload = bs.reload;

// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['stylus'], function() {

	bs.init({
		server: "./"
			// ,port:8080
	});
	gulp.watch("./src/js/*.js").on('change', reload);
	gulp.watch("./src/stylus/*.styl", ['stylus']);
	gulp.watch("./src/css/*.css").on('change', reload);
	gulp.watch("*.html").on('change', reload);
});
// 压缩并且合并JS
gulp.task('concat', function() {
	gulp.src('./src/js/*.js')
		.pipe(concat('all.js'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/src/js'));
});

/*
	I don't know why ,but minifyImage has some error like I can't minify png
*/
// gulp.task('minifyImage',function(){
// 	gulp.src('./src/image/*')
// 	.pipe(imagemin())
// 	.pipe(gulp.dest('dist/src/image'));
// });


gulp.task('minifyCss', function() {
	gulp.src('./src/css/*.css')
		// .pipe(rename({suffix:'.min'}))
		.pipe(minifyCss())
		.pipe(gulp.dest('dist/src/css'));
});
gulp.task('saveStylus', function() {
	gulp.src('./src/stylus/*.styl')
		.pipe(gulp.dest('dist/src/stylus'));
});
gulp.task('stylus', function() {
	return gulp.src("./src/stylus/*.styl")
		.pipe(stylus())
		.pipe(gulp.dest("./src/css"))
		.pipe(reload({
			stream: true
		}));
});
gulp.task('minifyHtml', function() {
	var options = {
		removeComments: true, //清除html注释
		collapseWhitespace: true, //压缩html
		collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
		removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
		removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
		removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
		minifyJS: true, //压缩页面JS
		minifyCSS: true //压缩页面CSS
	};
	gulp.src('./*.html')
		.pipe(minifyHtml(options))
		.pipe(gulp.dest('dist'));
});

gulp.task('default', ['serve']);
gulp.task('build', ['minifyHtml', 'minifyCss', 'concat'], function() {
	console.log("OK,please look in dist");
});

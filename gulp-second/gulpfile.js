var gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	livereload = require('gulp-livereload'),
	jshint = require('gulp-jshint'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	concat=require('gulp-concat');

gulp.task('concat',function(){
	gulp.src('src/js/*.js')
	.pipe(concat('all.js'))
	.pipe(gulp.dest('dist/js'));
});
gulp.task('rename', function() {
	gulp.src('src/lib/jquery.js')
		.pipe(uglify())
		.pipe(rename('jquery.min.js'))
		.pipe(gulp.dest('dist/lib'));
});
gulp.task('jshint', function() {
	gulp.src('src/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter())
		.pipe(livereload());
});
gulp.task('stylus', function() {
	gulp.src('src/stylus/*.styl')
		.pipe(stylus())
		.pipe(gulp.dest('src/css'))
		.pipe(livereload());
});

gulp.task('watch', function() {
	livereload.listen({
		start:true
	}); //要在这里调用listen()方法
	gulp.watch('src/stylus/*.styl', ['stylus']);
	gulp.watch('src/js/*.js', ['jshint']);
	gulp.watch('src/**/**',function(file){
		livereload.changed(file.path);
	});
});
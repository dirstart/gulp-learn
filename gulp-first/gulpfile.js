var gulp = require('gulp'),
	uglify = require("gulp-uglify");

gulp.task('default', function() {
	console.log("hello gulp");
});
gulp.task('minify-js', function() {
	gulp.src('js/*.js') //要压缩的js路径和文件
		.pipe(uglify())
		.pipe(gulp.dest('dist/js')); //压缩后的路径
});
gulp.task('jsmin', function() {
	gulp.src(['js/xx.js','js/yy.js'])
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});
// gulp.task('task1',function(){
// 	console.log("1 finish");
// });
// gulp.task('task2',function(){
// 	console.log("task2 finish");
// });

// gulp.task('end',['task1','task2'],function(){
// 	console.log("all finsih");
// })


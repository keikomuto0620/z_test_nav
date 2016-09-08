// autoprefixer, compass, reload
var gulp = require('gulp');
var compass = require('gulp-compass')
var browser = require("browser-sync");
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var reload = browser.reload;
//server
gulp.task('server', function() {
	browser({
		server: {
			baseDir: "./"
		},
		port: 9900
	});
});
// compass
gulp.task('compass', function() {
	gulp.src('scss/**/*.scss')
	.pipe(plumber())
	.pipe(compass({
		config_file: 'config.rb',
		css: 'styles/',
		sass: 'scss/'
	}));
});
//autoprefixer
gulp.task('autoprefixer', function() {
	return gulp.src('styles/style.css')
		.pipe(autoprefixer({
			// ☆IEは9以上、Androidは4以上、iOS Safariは8以上
			// その他は最新2バージョンで必要なベンダープレフィックスを付与する設定
			browsers: ["last 2 versions", "ie >= 9", "Android >= 4","ios_saf >= 8"],
			cascade: false
		}))
		.pipe(gulp.dest('styles'));
});
//task
gulp.task("default", ['server'], function() {
	gulp.watch('**/scss/**/*.scss', ['compass']);
	gulp.watch('**/styles/style.css', ['autoprefixer']);
	gulp.watch([
		'**/*.html',
		'**/*.jpg',
		'**/*.png',
		'**/*.gif',
		'**/*.js',
		'**/*.css'
	], reload);
});
var gulp = require('gulp'),
	debug = require('gulp-debug'),
	del = require('del'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	cssnano = require('gulp-cssnano'),
	rename = require('gulp-rename'),
	webpack = require('webpack-stream'),
	plumber = require('gulp-plumber'),
	notify = require('gulp-notify'),
	watch = false;

const env = {
	path_dist: 'public_html/dist'
};

gulp.task('scripts:dev', ['clean:js', 'copy:lib'], () => {
	var webpack_conf;

	process.env.NODE_ENV = 'development';

	webpack_conf = require('./webpack.config.js');
	webpack_conf.watch = watch;

	return gulp.src('src/js/*.js')
		.pipe(plumber())
		.pipe(webpack(
			webpack_conf,
			require('webpack')
		))
		.pipe(gulp.dest(env.path_dist + '/js'))
		.pipe(notify('Webpack build complete'));
});

gulp.task('scripts:prod', ['clean:js', 'copy:lib'], () => {
	var webpack_conf;

	process.env.NODE_ENV = 'production';

	webpack_conf = require('./webpack.config.js');
	webpack_conf.watch = false;

	return gulp.src('src/js/*.js')
		.pipe(debug())
		.pipe(plumber())
		.pipe(webpack(
			webpack_conf,
			require('webpack')
		))
		.pipe(gulp.dest(env.path_dist + '/js'))
		.pipe(notify('Webpack build complete'));
});

gulp.task('styles', ['clean:styles'], () => {
	return gulp.src('src/styles/*.scss')
		.pipe(plumber())
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', sass.logError))
		.pipe(autoprefixer(['last 2 versions', 'Firefox >= 38']))
		.pipe(gulp.dest(env.path_dist + '/css'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(cssnano())
		.pipe(gulp.dest(env.path_dist + '/css'))
		.pipe(notify('Sass build complete'));
});

gulp.task('copy:lib', ['clean:lib'], () => {
	return gulp.src('src/js/lib/*')
		.pipe(gulp.dest(env.path_dist + '/js/lib'))
});

gulp.task('copy:img', ['clean:img'], () => {
	return gulp.src('src/img/**/*')
		.pipe(gulp.dest(env.path_dist + '/img'))
});

gulp.task('copy:fonts', () => {
	return gulp.src('src/fonts/*')
		.pipe(gulp.dest(env.path_dist + '/fonts'))
});

gulp.task('clean:js', () => {
	if (!watch) {
		return del([
			env.path_dist + '/js/*.js'
		]);
	} else {
		return true;
	}
});

gulp.task('clean:lib', () => {
	if (!watch) {
		return del([
			env.path_dist + '/js/lib/*'
		]);
	} else {
		return true;
	}
});

gulp.task('clean:styles', () => {
	if (!watch) {
		return del([
			env.path_dist + '/css'
		]);
	} else {
		return true;
	}
});

gulp.task('clean:img', () => {
	if (!watch) {
		return del([
			env.path_dist + '/img'
		]);
	} else {
		return true;
	}
});

gulp.task('watch', () => {
	watch = true;
	gulp.watch('src/js/**/*.js*', ['scripts:dev', 'copy:lib']);
	gulp.watch('src/styles/**/*.scss', ['styles']);
	gulp.watch('src/img/**/*', ['copy:img']);
});

gulp.task('default', ['scripts:prod', 'copy:lib', 'copy:img', 'copy:fonts', 'styles']);
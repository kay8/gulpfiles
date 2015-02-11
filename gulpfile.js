'use strict';

var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	critical = require('critical'),
	$ = require('gulp-load-plugins')({
			pattern: ['gulp-*', 'gulp.*'],
			replaceString: /\bgulp[\-.]/,
			rename: {
				'gulp-pleeease': 'please',
				'gulp-minify-css': 'minifyCSS'
			}

	});

/**
 * Settings
 */

// directory
var dir = {
	current: 'htdocs',
	css: 'htdocs/css',
	sass: 'htdocs/sass',
	js: 'htdocs/js',
	min: 'htdocs/min',
	partials: 'htdocs/sass/partials'
};


// error notification settings for plumber
var plumberErrorHandler = { errorHandler: $.notify.onError({
		title: 'Gulp',
		message: "Error: <%= error.message %>"
	})
};


/**
 * Tasks
 */


// set up localhost and synchronize browser
gulp.task('browser-sync', function () {
    browserSync({
        port: 8100,
        browser: "google chrome",
        server: {
			baseDir: dir.current
        }
    });
});

// reload browser when js / html file changes
gulp.task('bs-reload', function () {
    browserSync.reload();
});

// compile sass
gulp.task('sass', function() {
	gulp.src(dir.sass + '/*.scss')
	.pipe($.plumber(plumberErrorHandler))
	.pipe($.sass())
	.pipe($.please({
		autoprefixer: {"browsers": ["last 4 versions"]},
		minifier: false
	}))
	.pipe($.csscomb())
	.pipe(gulp.dest(dir.css))
	.pipe(browserSync.reload({stream: true}));
});

// minify css
gulp.task('minifyCSS', function() {
    return gulp.src([dir.css + '/*.css'])
		.pipe($.plumber(plumberErrorHandler))
        .pipe($.minifyCSS())
        .pipe(gulp.dest(dir.min))
        .pipe(browserSync.reload({stream: true}));
});


// minify js
gulp.task('uglify', function() {
    return gulp.src([dir.js + '/*.js'])
		.pipe($.plumber(plumberErrorHandler))
        .pipe($.uglify())
        .pipe(gulp.dest(dir.min))
        .pipe(browserSync.reload({stream: true}));
});

// Concatenates files
gulp.task('concat', function() {
});


/// watch
gulp.task('watch', function() {
	gulp.watch(dir.js + '/*.js',['bs-reload']);
	gulp.watch(dir.sass + '/*.scss',['sass']);
	gulp.watch(dir.partials + '/*.scss', ['sass']);
	gulp.watch(dir.current + '/*.html',['bs-reload']);
});



// default
gulp.task('default', ['browser-sync', 'watch']);


// release
gulp.task('release', ['browser-sync', 'watch', 'minifyCSS', 'uglify']);

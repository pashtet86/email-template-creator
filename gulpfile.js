var gulp            = require('gulp'),
    inlineCss       = require('gulp-inline-css'),
    browserSync     = require('browser-sync').create(),
    sass            = require('gulp-sass'),
    htmlInjector    = require("bs-html-injector"),
    replace         = require('gulp-replace');
    sendmail        = require('gulp-mailgun');

var remote_imgs_basepath = '' //use it if for replace local src to remote

gulp.task('inline', function() {
    return gulp.src('./public/*.html')
        .pipe(inlineCss({
                applyStyleTags: true,
                applyLinkTags: true,
                removeStyleTags: true,
                removeLinkTags: true
        }))
        // .pipe(replace(/src="img\//g, 'src="' + remote_imgs_basepath))
        .pipe(gulp.dest('./mails/'));
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
    browserSync.use(htmlInjector, {
        files: "public/**/*.html"
    });

    browserSync.init({
        server: {
          baseDir: './public/',
          directory: true
        }
    });

    gulp.watch("assets/scss/*.scss", ['sass']);
    gulp.watch(["assets/scss/*.scss","public/**/*.html"], ['inline']);
});


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("assets/scss/main.scss")
        .pipe(sass())
        .pipe(gulp.dest("public/css"))
        .pipe(browserSync.stream());
});


gulp.task("watch", ["serve", "inline"], function () {
    gulp.watch("public/*.html", htmlInjector);
});

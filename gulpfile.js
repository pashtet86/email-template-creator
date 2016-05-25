var gulp        = require('gulp'),
    inlineCss   = require('gulp-inline-css'),
    browserSync = require('browser-sync').create(),
    sass        = require('gulp-sass'),
    htmlInjector = require("bs-html-injector");
 
gulp.task('inline', function() {
    return gulp.src('public/*.html')
        .pipe(inlineCss({
                applyStyleTags: true,
                applyLinkTags: true,
                removeStyleTags: true,
                removeLinkTags: true
        }))
        .pipe(gulp.dest('inline-code/'));
});



// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
    browserSync.use(htmlInjector, {
        files: "public/*.html"
    });

    browserSync.init({
        server: {
          baseDir: 'public',
          directory: true
        }
    });

    gulp.watch("assets/scss/*.scss", ['sass']);
    // gulp.watch("public/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("assets/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("public/css"))
        .pipe(browserSync.stream());
});



// Default Task

gulp.task("watch", ["serve"], function () {
    gulp.watch("test/fixtures/*.html", htmlInjector);
});
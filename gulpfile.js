var gulp = require('gulp'),
    inlineCss = require('gulp-inline-css');
 
gulp.task('inline', function() {
    return gulp.src('in/*.html')
        .pipe(inlineCss({
                applyStyleTags: true,
                applyLinkTags: true,
                removeStyleTags: true,
                removeLinkTags: true
        }))
        .pipe(gulp.dest('build/'));
});




// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['watch']);
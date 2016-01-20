var gulp = require("gulp"),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync');


gulp.task('server', function () {
    browserSync ({
        port: 9000,
       server: {
            baseDir: 'app'
        }
    });
});

gulp.task('watch', function () {
    gulp.watch ([
        'app/*.html',
        'app/js/**/*.js',
        'app/css/**/*.css'
    ]).on('change', browserSync.reload);
});

gulp.task('default', ['server', 'watch']);
// Imports
const gulp = require('gulp');
const ts = require('gulp-typescript');

// pull in project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

gulp.task('transpile', () => {
    const tsResults = tsProject.src()
    .pipe(tsProject());
    return tsResults.js.pipe(gulp.dest('dist'));
});

gulp.task('watch', [ 'transpile' ], () => {
    gulp.watch('src/**/*.ts', [ 'transpile' ]);
});

gulp.task('default', [ 'watch' ]);
// Imports
const gulp = require( 'gulp' );
const ts = require( 'gulp-typescript' );
const tslint = require( 'gulp-tslint' );

var exec = require( 'child_process' ).exec;
var spawn = require( 'child_process' ).spawn,
    node;
    

// pull in project TypeScript config
const tsProject = ts.createProject( 'tsconfig.json' );

gulp.task('server', [ 'transpile', 'apidoc' ], () => {
  if (node) node.kill()
  node = spawn('node', ['dist/index.js'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
})

gulp.task( 'tslint', () => {
    gulp.src( 'src/**/*.ts' )
    .pipe( tslint( {
        formatter: "verbose"
    } ) )
    .pipe( tslint.report() );
} );

gulp.task( 'transpile', [ 'tslint' ], () => {
    const tsResults = tsProject.src()
    .pipe( tsProject() );
    return tsResults.js.pipe(gulp.dest('dist'));
} );

gulp.task( 'apidoc', ( cb ) => {
    exec( 'npm run apidoc' , (err, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    } );
} );

gulp.task( 'watch', [ 'server' ], () => {
    gulp.watch('src/**/*.ts', [ 'server' ]);
} );

gulp.task( 'default', [ 'watch' ] );
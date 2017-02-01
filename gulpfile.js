// Imports
const gulp = require( 'gulp' );
const gulpTS = require( 'gulp-typescript' );
const mocha = require( 'gulp-mocha' );
const tslint = require( 'gulp-tslint' );

const ts = require( 'ts-node/register' );

var exec = require( 'child_process' ).exec;
var spawn = require( 'child_process' ).spawn,
    node;
    

// pull in project TypeScript config
const tsProject = gulpTS.createProject( 'tsconfig.json' );

gulp.task( 'server', [ 'transpile', 'apidoc' ], () => {

  if ( node ) node.kill()

  node = spawn( 'node', [ 'dist/index.js' ], { stdio: 'inherit' } );

  node.on( 'close', function ( code ) {
    if ( code === 8 ) {
      gulp.log('Error detected, waiting for changes...');
    }
  } );

} );

// linting task
gulp.task( 'tslint', () => {

    gulp.src( 'src/**/*.ts' )
    .pipe( tslint( {
        formatter: "verbose"
    } ) )
    .pipe( tslint.report() );

} );

// ts transpile task
gulp.task( 'transpile', () => {

    const tsResults = tsProject.src()
    .pipe( tsProject() );

    return tsResults.js.pipe( gulp.dest( 'dist' ) );
} );

gulp.task( 'test', () => {

    return gulp.src( 'src/**/*.spec.ts', { read: false } )
    .pipe( mocha( {
        reporter: 'mocha-jenkins-reporter',
        compilers: {
            ts:ts-node
        }
     } ) );

} );

gulp.task( 'apidoc', ( cb ) => {

    exec( 'npm run apidoc' , (err, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    } );

} );

gulp.task( 'build', [ 'apidoc', 'transpile' ] );

gulp.task( 'watch', [ 'server' ], () => {
    gulp.watch('src/**/*.ts', [ 'server' ]);
} );

gulp.task( 'default', [ 'tslint', 'test', 'server' ] );
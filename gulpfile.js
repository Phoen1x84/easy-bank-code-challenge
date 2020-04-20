const del = require('del');
const { series, watch, src, dest, parallel } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const connect = require('gulp-connect');

function server(){
  connect.server({
    livereload: true    
  });
} 

function clean() {
    console.log('\x1b[33m%s\x1b[0m', 'Deleting dist directory');
    return del([`./dist/`]);
}

function styles() {
    console.log('\x1b[33m%s\x1b[0m', 'Compiling SCSS files');
    return (
        src('./src/app.scss')
            .pipe(
                sass({
                    includePaths: require('node-normalize-scss').includePaths,
                }).on('error', sass.logError)
            )
            // .pipe(cssnano())
            .pipe(
                autoprefixer({
                    cascade: false,
                })
            )
            .pipe(dest('./dist'))
            .pipe(connect.reload())
    );
}

function watchFiles() {
    watch(['src/*.scss', 'src/_*.scss'], series(styles));    
}

// default to use when developing
exports.default = parallel(server, watchFiles);

// production build assets
exports.build = series(clean, styles);

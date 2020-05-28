const del = require('del');
const { series, watch, src, dest, parallel } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const connect = require('gulp-connect');

function server(){
  connect.server({
    root: 'dist',
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

function scripts() {
    return (
        src('./src/index.js')
        .pipe(dest('./dist'))
        .pipe(connect.reload())
    )
}

function html() {
    console.log('\x1b[33m%s\x1b[0m', 'compiling index.html');
    return (
        src('./public/index.html')
        .pipe(dest('./dist'))
    );
}

function images() {
    console.log('\x1b[33m%s\x1b[0m', 'copying images');
    return (
        src('./public/images/**')
        .pipe(dest('./dist/images'))
    );
}

function watchFiles() {
    watch('./public/*.html', series(html));
    watch('./public/images/**', series(images));
    watch(['src/*.scss', 'src/**/_*.scss'], series(styles));    
    watch('src/*.js', series(scripts));
}

// default to use when developing
exports.default = parallel(server, watchFiles);

// production build assets
exports.build = series(clean, styles, scripts, html, images);

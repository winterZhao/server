'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');   //压缩css;
var uglify = require('gulp-uglify');       //压缩js;
var pump = require('pump');
var notify = require('gulp-notify');         //压缩js;

//针对css的压缩
gulp.task('compressCss',function(){
    gulp.src([
        'css/main-min.css',
        'css/common.css',
        'css/markdown.css'
    ])
        .pipe(minify())            //压缩css
        .pipe(gulp.dest('build/css'))
        .pipe(notify('css压缩成功'))

});

gulp.task('compressJsList',function(){
    gulp.src([
        'js/list.js',
        'js/pagination.js'
    ])
        .pipe(concat('list.js'))
        .pipe(gulp.dest('build/js'))   //输出到的目录下    build/src/js/main.js
        .pipe(notify('compressJsList压缩成功'));
});

gulp.task('compressJsArticle',function(){
    gulp.src([
        'js/article.js',
        'js/pagination.js'
    ])
        .pipe(concat('article.js'))
        .pipe(gulp.dest('build/js'))   //输出到的目录下    build/src/js/main.js
        .pipe(notify('compressJsArticle压缩成功'));
});

gulp.task('moveAdminJs',function(){
    gulp.src([
        'js/increase.js',
        'js/edit.js'
    ])
        .pipe(gulp.dest('build/js'))   //输出到的目录下    build/src/js/main.js
        .pipe(notify('moveAdmin压缩成功'));
});

gulp.task('moveFonts',function(){
    gulp.src('fonts/*')
        .pipe(gulp.dest('build/fonts'))
        .pipe(notify('moveAdmin压缩成功'));
});

gulp.task('moveImage',function(){
    gulp.src('images/*')
        .pipe(gulp.dest('build/images'))
        .pipe(notify('moveAdmin压缩成功'));
});

gulp.task('default',[
    'compressCss',
    'compressJsList',
    'compressJsArticle',
    'moveAdminJs',
    'moveFonts',
    'moveImage'
]);
'use strict';

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rigger = require('gulp-rigger'),
    less = require('gulp-less'),
    watch = require('gulp-watch'),
    cssmin = require('gulp-minify-css');

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: { //Пути откуда брать исходники
        html: 'src/**/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/js/script.js',//В стилях и скриптах нам понадобятся только main файлы
        style: 'src/css/style.less',
        img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'src/fonts/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.less',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        //.pipe(uglify()) //Сожмем наш js
        .pipe(gulp.dest(path.build.js)) //Выплюнем их в папку build
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(less())
        .pipe(cssmin())
        .pipe(gulp.dest(path.build.css)) //И в build
});

gulp.task('build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build

    gulp.src(path.src.js) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        //.pipe(uglify()) //Сожмем наш js
        .pipe(gulp.dest(path.build.js)) //Выплюнем их в папку build

    gulp.src(path.src.style)
        .pipe(less())
        .pipe(cssmin())
        .pipe(gulp.dest(path.build.css)) //И в build
});

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
});
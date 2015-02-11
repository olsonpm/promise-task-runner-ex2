'use strict';

//---------//
// Imports //
//---------//

var ptr = require('promise-task-runner')
    , PromiseTask = ptr.PromiseTask
    , PromiseTaskContainer = ptr.PromiseTaskContainer
    , gulp = require('gulp')
    , bPromise = require('bluebird')
    , bFs = require('fs-bluebird')
    , bRimraf = bPromise.promisify(require('rimraf'));


//------//
// Init //
//------//

var ptc = new PromiseTaskContainer();


//-------//
// Tasks //
//-------//

var cleanDev = new PromiseTask()
    .id('cleanDev')
    .task(function() {
        return bRimraf('dev')
            .then(function() {
                return bFs.mkdir('dev');
            });
    });
var copyHtml = new PromiseTask()
    .id('copyHtml')
    .dependencies(cleanDev)
    .task(function() {
        gulp.src('src/**/*.html')
            .pipe(gulp.dest('dev'));
    });

ptc.addTasks(cleanDev, copyHtml);


//---------//
// Exports //
//---------//

module.exports = ptc;

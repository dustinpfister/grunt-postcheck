/*

Gruntfile for grunt-postcheck

 */

module.exports = function (grunt) {

    var fs = require('fs'),

    // the find helper
    find = function (done) {

        var files,

        // the list of markdown files to update
        toUpdate = [];

        grunt.util.spawn({

            cmd : 'git',
            //args : ['ls-files', '-m', '-o','--exclude-standard']
            args : ['ls-files', '-m', '-o', '--exclude-standard', 'source/_posts']

        }, function (err, result, code) {

            if (result) {

                // all files in the result
                files = result.stdout.split('\n');

                // run over all of them
                files.forEach(function (fileName) {

                    // is it in posts?
                    if (fileName.match(/^source\/_posts/)) {

                        if (fileName.match(/.md$/)) {

                            toUpdate.push(fileName);

                        }

                    }

                });

            }

            done(toUpdate);

        });

    },

    // read files
    readFiles = function (files, callback, done) {

        var index = 0,
        len = files.length,

        onDone = function () {

            index += 1;

            if (index >= len) {

                console.log('done');
                console.log(index);

                // call the done given method
                done();

            } else {

                // keep reading
                read();

            }

        },

        // read next file
        read = function () {

            console.log('reading file:');
            console.log(files[index]);

            fs.readFile(files[index], 'utf8', function (err, data) {

                var startIndex = data.indexOf('---'),
                endIndex = data.indexOf('---', startIndex + 3),
                header = data.substr(startIndex, endIndex - startIndex + 3);

                console.log(header);

                callback();

                onDone();

            });

            console.log('');

        };

        read();

    };

    // Project configuration.
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json')
    });

    // Default task(s).
    grunt.registerTask('default', function () {

        console.log('must give a task name.');

    });

    // the find task
    grunt.registerTask('find', function () {

        var done = this.async();

        // just call find
        find(function (result) {

            console.log('find: ');
            console.log(result);

            done();

        });

    });

    // the read task
    grunt.registerTask('read', function () {

        var done = this.async();

        find(function (files) {

            console.log('read');

            console.log(files);

            if (typeof files === 'object') {

                if (files.length > 0) {

                    readFiles(files, function () {}, done);

                } else {

                    console.log('no files to update');

                }

            } else {

                console.log('files is not an object');

            }

        });

    });

};

/*

Gruntfile for grunt-postcheck

 */

module.exports = function (grunt) {

    var find = function (done) {

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

        read = function () {

            console.log(files[index]);

            callback();

            onDone();

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

            readFiles(files, function () {}, done);

        });

    });

};

/*

Gruntfile for grunt-postcheck

 */

module.exports = function (grunt) {

    var find = function (done) {

        grunt.util.spawn({

            cmd : 'git',
            //args : ['ls-files', '-m', '-o','--exclude-standard']
            args : ['ls-files', '-m', '-o', '--exclude-standard', 'source/_posts']

        }, function (err, result, code) {

            // the list of markdown files to update
            var toUpdate = [];

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

    };

    console.log('I am the grunt');

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

        var done = this.async(),
        files;

        find(function (result) {

            console.log('find: ');
            console.log(result);

            done();

        });

    });

    // the read task
    grunt.registerTask('read', function () {

        find(function (result) {

            done();

        });

    });

};

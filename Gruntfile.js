/*

Gruntfile for grunt-postcheck

 */

module.exports = function (grunt) {

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

        grunt.util.spawn({

            cmd : 'git',
            //args : ['ls-files', '-m', '-o','--exclude-standard']
            args : ['ls-files', '-m', '-o', '--exclude-standard', 'source/_posts']

        }, function (err, result, code) {

            if (result) {

                files = result.stdout.split('\n');

                console.log(files);

                files.forEach(function (fileName) {

                    // is it in posts?
                    if (fileName.match(/^source\/_posts/)) {

                        console.log(fileName);

                    }

                });

            }

            done();

        });

    });

};

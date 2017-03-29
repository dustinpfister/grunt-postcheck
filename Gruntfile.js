/*

what I want for it to do is

 * do a $git status
 * check the source/_posts folder of my hexo site source for changed, or new posts
 * inject a version number of 1.0 into the header of the markdown file if it is a new post
 * bump patch version number of a post if it is a old post that was edited.
 * set the update date to the current data
 * create a commit message like "pn1:1.0;pu0:1.1", that means (post new id 1 version, post update id 0 version)
 * bump main package.json version patch number
 * add all post files to be changed with git add
 * push the commit with the message.


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

    // the update task
    grunt.registerTask('update', function () {

        var done = this.async(),
        files;

        grunt.util.spawn({

            cmd : 'git',
            args : ['ls-files', '--others', '--exclude-standard']

        }, function (err, result, code) {

            if (result) {

                files = result.stdout.split('\n');

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

# grunt-postcheck

This is my first grunt task that I have written

what I want for it to do is this:

## step 1: find new, and updated posts

```
$ grunt find
```

* do a $git ls-files -m -o --exclude-standard to get a list of untracked, and modified files in the git folder
* build an array of fileNames that are untracked markdown files in the source/_posts folder
* return that array

 * check the source/_posts folder of my hexo site source for changed, or new posts
 * inject a version number of 1.0 into the header of the markdown file if it is a new post
 * bump patch version number of a post if it is a old post that was edited.
 * set the update date to the current data
 * create a commit message like "pn1:1.0;pu0:1.1", that means (post new id 1 version, post update id 0 version)
 * bump main package.json version patch number
 * add all post files to be changed with git add
 * push the commit with the message.
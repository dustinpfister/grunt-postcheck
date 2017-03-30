# grunt-postcheck

grunt-postcheck is the first grunt task I have written to help automate a process with the development of my personal website. What I wanted is a source control or sorts, but for each blog post within a collection. I was thinking that maybe I can get into submodules, and maybe that would be a good way to handle it. Still I made this with the idea of just doing everything within a single git folder, with no submodules.

## So the header of each markdown file has:

* an id
* a version number
* a date created
* a date updated

A post also has additional properties, but these are what is of main interest to grunt-postcheck.

## So basic idea of the task is this:

* check my source/_posts dir for new or modified markdown files.
* for each file found 
    * set, or update the id, version number, date created, and date updated of the file.
    * do a git add filename
    * do a git commit -m [pc;up#1;v1.7]

I was thinking about adding tags, but then I thought that I would end up with allot of tags, and I don't care to use tags in that faction. As such the commit message can be used as a kind of tag, I just want all of the messages to follow a certain pattern.

## task find:

```
$ grunt find
```

* do a $git ls-files -m -o --exclude-standard to get a list of untracked, and modified files in the git folder
* build an array of fileNames that are untracked markdown files in the source/_posts folder
* return that array

## task update:

* go over an array of fileNames from a find task
* open the file, and get the markdown table that should be it's meta data.

## What is Git?
>The purpose of Git is to manage a project, or a set of files, as they change over time.  It also coordinates work on those files among multiple people.

You store a project's code in a *repository*.  A *repository* (repo for short) is where git stores the information on your project versions.  You can think of it like a local server that stores your code.

Git is a [distributed system](http://stackoverflow.com/questions/7212740/why-git-is-called-a-distributed-source-control-system).  This means that you can have the same repo stored in multiple locations.  You typically have a repo on your local computer and one on a remote server such as github.  You can also have what's called a bare repository on your production server for deployment.  If there are other people working on your project they will have a local copy of the repo on their machine as well.   

The benefits of a distributed system is that you can save your code locally regardless of internet connection, for example if you were flying on a plane.  You cannot do this with older VCS such as Subversion and CVS that have to connect to a remote server to save data.  Another useful feature is that if one copy of your repo is lost for example your machine dies, as long as there is a copy of the repo else where you should be able to get back most of your work.

## What is Github?
>GitHub is a development platform inspired by the way you work. Host code, manage projects, and build software alongside millions of other developers.

Github can be thought of as a remote server to store your code.  It allows you to share code and work on projects with other developers.  

@todo more github hype

## Why should I use Git?
> Oh noes! The dog ate my codes!

> I want to easily work on my awesome project with a friend!

> I need to share my awesome project with the world to create peace!

Git is the solution!

## History
Linus Torvalds creator of Linux made Git after a dispute with Bitkeeper who withdrew free use of their source control system.  Why he called it Git, who knows?  

## How do I get started with Git?
First install git by entering the following command or follow these [instructions](https://www.atlassian.com/git/tutorials/install-git) if you're not using Linux.
```
sudo apt-get install git
```
Next register for a [github account](https://github.com/).
## How to save an existing project to Github
To save an existing project to git and to github follow these instructions:
```
cd [your project path]
git init
git add .
git commit -am 'Initial Commmit'
```
Then create a repo on your github account and follow the instructions to push your changes.

## How to download a project's code from Github
So you've seen an awesome project on github repository and you want to download a working copy and take a closer look. This is called 'cloning the repo'. Go to the repo github page click the 'clone or download' green button and copy the link. Then enter the following command:
```
git clone [repo link]
```
This will download the code to a new project directory, you can add a custom directory name as an additional parameter if you need to.

## How to contribute to another project on Github
To get started working on another project you first need to fork the project on it's github page.  Then follow this presentation:

[How to make a pull request](https://docs.google.com/presentation/d/12XPsgBkarJLA6I1UJd7HK1izUpQfX2Lt2gQq91z9XNQ/edit#slide=id.p)

## How to save code changes
Saving your code is known as *commiting*.  To do so takes two steps:
1. Add to staging area
2. Commit changes with a message

Check to see which files have been changed:
```
git status -s
```

To add specific files to the staging area:
```
git add [files]
```
To add all files to the staging area:
```
git add .
```
Note make sure you add any new files this way otherwise changes will not be commited as the files will be untracked.

To add and commit all changed files with a message:
```
git commit [files] -am 'Add new awesome feature'
```
Note that the command above add and commits at the sametime using the '-am' parameters.


Check your commit by viewing the log
```
git log
```


## Branching
A branch is basically a fork of your own code.  It's useful for creating a new feature or doing a bug fix.  The main project branch is called main.
To list your branches:
```
git branch
```
To switch to a branch:
```
git checkout [branch-name]
```
To list your branches:
```
git branch
```
To list remote branches:
```
git branch -r
```
## How to update your project
To update your github project with the lastest commits made by you:
```
git push origin [branch name]
```
If you are contributing to another project you can update your local project with their latest changes by:
```
git pull upstream [branch name]
```
## Remotes
If you are contributing to a project you need to add it as a remote (eg upstream in previous example) so that you can pull changes.

Github is named origin by default.
```
git remote add [remote name eg upstream] [repo clone url]
```
## Config
The git config file is useful for checking your remotes
```
cat .git/config
```
## Pull Requests

[How to make pull requests](https://docs.google.com/presentation/d/12XPsgBkarJLA6I1UJd7HK1izUpQfX2Lt2gQq91z9XNQ/edit?usp=sharing)

## Conflicts
Sometimes you might get conflicts where you and another person has made changes to the same peice of code.  You can either manually resolve the conflict or use a merge tool.  @todo...

## How to Write a Git Commit Message

[How to Write a Git Commit Message](http://chris.beams.io/posts/git-commit/)

## Open Source Contributions
Git is a great way to contribute to open source projects.  You can view a projects issues on Github and make a fix as a pull request or start your own project.

[Read more](http://www.developer.com/open/how-to-start-contributing-to-open-source.html)

## Private Repositories
If your project is top secret you can store it privately for free on
[bitbucket](https://bitbucket.org/) or [gitlab](https://about.gitlab.com/). Github also has a private option however it is limited to a year for free.

## Read Git Book Pro

Read [Git Book Pro](https://git-scm.com/book/en/v2), it's free and awesome.

## Workshop
A good practical Introduction is the [node school](https://nodeschool.io/) workshop which can be installed and run with the following commands:

```
npm install -g git-it
git-it
```

## Github Help
[Help on github](https://help.github.com/)

## Useful commands
| Command | Definition |
| ------ | ------ |
|git log | show log |
|git status -s | show working directory status |
|git checkout [branch] | check out a branch |
|git checkout -b [branch] | make a new branch based on current branch |
|git add . | add all files |
|git add -u | add deleted files |
|git commit -am "[commit message]" | add and commit with message |
|git push [remote] [branch] | push changes to remote (typicall called origin) and branch name (main branch is called master) |
|git merge branch | merge branch into current one |
|git diff [commit ref 1] [commit ref 2] | show difference between commits |
|git rebase | Rewrite time!  (becareful!) |

## Glossary
| Term | Definition |
| ------ | ------ |
|Repository | where git stores your project versioning information |
|Fork | copy a repository to your github |
|Clone | copy a repository to your machine |
|Checkout| open a branch in your working directory |
|Branch | project fork / feature / version |
|Add | add files to staging area |
|Staging | the area you add files before a commit |
|Commit | save |
|Remote | name of remote server (default is origin) |
|Push | send your changes a remote server |
|Pull |get updates from a remote server |
@todo more...

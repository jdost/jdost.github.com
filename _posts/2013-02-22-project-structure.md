---
layout: post
title: Project Structure
tldr: The structure of a project is very important, both for you and others
tags: development programming
comments: true
---
I write a lot of projects on the side.  It is almost an addiction, I spin up a local
git repo and try something out, if I like it, I continue working on it.  As it grows
and becomes more of a viable project for others, it is important for it to be
accessible for others and not just the chaos that is my thought process.  An effort
I have been making in all projects I work on now is to treat them as if they will
be open sourced in the future.  I try to write the functions and variables with
proper names, I leave comments on chunks of code that could be confusing, I try to
add external docs to cover various concepts that others probably don't want to read
through the source to understand.  But the most important part of all of this is 
that the project needs to be structured sanely.

When I checkout a project and I am looking for a particular piece of information,
like the source of the [`Generator`][1] class for Jekyll when I am working on a
plugin (tip: the [docs][2] for writing plugins is really weak).  When looking for
the file, I open up the repo and should be able to understand where the source
**should** be (it exists in `/lib/jekyll/generator.rb`).  If it were located under
a folder called `stuff` in a file called `plugin_classes.rb`, it would not exactly
be obvious where it is, and hunting through the source to figure that out would not
be intuitive.  Whereas it being in `lib/jekyll` makes sense.  It is a reference 
class (meaning it can be shared between major execution and other dependencies).
It's scope falls under the `jekyll` codebase (it has no meaning as a generator for
any other projects).  It exists in a file named `generator.rb` so it is not a
mystery as to which file it may live in.

[1]: https://github.com/mojombo/jekyll/lib/jekyll/generator.rb
[2]: https://github.com/mojombo/jekyll/wiki/Plugins

A by product of a good structure for a project means that others who want to add on
to the project or when you return and want to add features, there should be a
natural place and way to add something to the project.  When I want to add a new
module of actions to my flask project, I go into the project folder and add a `.py`
file named for whatever I want to call the module (sane naming desired).  Then I
go into the root descript of the project (in python this is often `__init__.py` and
add the module to the `__modules__` list).  It is also possible to skip the second
step and use a discovery system in the project.  But the goal is for me or anyone
else to easily be able to add functionality to the project without requiring them to
learn how everything was written (and the though process behind it).  If they want
to add additional test coverage, they see the `tests` folder in the project root and
check it out.  There are example test suites to reference in how they are
structured.  The project has a `Makefile` included to help perform common tasks and
there is a `requirements.txt` file to install all of the dependencies.

The goal of a good project structure is to allow others to quickly get done whatever
goal they may have with the project's codebase and for you to be able to intuitively
add things to the application at any point in the future.  Docs can cover up bad
design, but it requires a non zero amount of time to figure out what is going on.

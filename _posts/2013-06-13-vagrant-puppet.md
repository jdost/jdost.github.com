---
layout: post
title: "Vagrant+Puppet: Virtual Environments on Steroids"
tldr: >
   Switch to using vagrant and puppet to create a dev environment identical to your
   production
tags: software virtualization development tools
comments: false
---
This past week I have spent working on getting the [workhammer][] project in a state
where it could easily be run by other people on other environments (i.e. not 
requiring virtualenv and a Unix file system).  The best solution for this is to
use [vagrant][] and one of the [provisioners][] to automate the creation of a 
headless virtual machine with the correct services installed and set up, much like
the production environment that will be used.

[workhammer]: http://github.com/jdost/workhammer
[vagrant]: http://www.vagrantup.com/docs/v2/
[provisioners]: http://www.vagrantup.com/docs/v2/provisioning/index.html

The great part of vagrant is that it utilizes various types of virtual environments,
I am currently focussing on [VirtualBox][] as it is free and regularly used by most
developers I have worked with.  But most of this can be switched to using VMWare,
AWS, or any other type of provider.  Vagrant should also be able to be dropped and
you could just use the provisioning scripts to initialize a real machine for your
environment.  All of this means that once I finished these scripts, anyone can have
a "bug free" (famous last words) environment up in running by just running the
`vagrant up` command (as long as they have vagrant installed).  That single command
will download a base box, initialize a copy in the project folder, then begin 
running the provisioning scripts that will symlink (vagrant specific) the project
directory into `/opt/`, install [mongodb][], install [nginx][], install 
[supervisord][], then set up a conf file to host the application via nginx and auto 
start it via supervisord.  Then, after running all of that, you just need to hit
a specific port (:8080) and the site is hosted.  The code no longer needs to worry
about someone trying to run it on Windows or remind the user to install mongo.  You
don't have to figure out weird bugs with having nginx start doing the static hosting
when you move into prod or teach everyone how to setup nginx and write a virtual
host config.  All of the headache is gone.

[VirtualBox]:
[mongodb]:
[nginx]:
[supervisord]:

For the provisioning, I am using [puppet][], which is a very powerful tool for
uniformly setting up machines for a specific environment.  With puppet, I have it
installing and setting up nginx plus a [class][] that handles creating virtualhost
files and setup nginx to begin serving these immediately.  I wrote a [module][] for
nginx that encapsulates this (and allows for me to `cp` the folder to new projects
to quickly add nginx to the box).  The same was done for mongo and supervisor, so
the [only custom puppet script][1] just sets up the basic environment specific to
the project.  This includes the 3 modules I wrote, then installs the python stuff
for the environment.  If the script is run via vagrant (the `$vagrant` variable is
set in the [Vagrantfile][]) it will symlink the project folder (which is mounted by
default in `/vagrant/` to a folder in `/opt/`.  After this, the dependencies that
are defined in the `requirements.txt` file are installed via pip.  I use good 
practices and created a user that is used for running the application.  Finally the
application is added to the supervisord and nginx services so that they now handle
starting it up as a daemon and hosting it via a proper web server.

[puppet]:
[class]:
[module]:
[1]:
[Vagrantfile]:

With all of this work, I can easily spin up a new development environment with the
`vagrant up` command (I did yesterday when creating a box to demo the code) and if
I have messed it up, I can destroy the box and spin up a new one that will go back
to the vanilla setup.  Other developers that want to work on this codebase can also
just pull the code and run the command and get a copy of the same environment I am
running the application out of.  I feel like I will be using this pair of tools for
all of my future projects (and hopefully professionally as well).  It removes all of
the headaches of dealing with different environments for every developer and trying
to keep the code from polluting the global environment on another machine.

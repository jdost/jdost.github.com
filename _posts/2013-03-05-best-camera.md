---
layout: post
title: the best camera
tldr: The best feature of the application you are developing is that it ships.
tags: software
comments: true
---
I heard (or read) somewhere the idea that "the best camera is the one you have."
The idea behind this quote is that however fancy a camera you own or are getting or
whatever perfect lens you use is only perfect when you have it for the picture you
want to take.  I own a decent [Nikon D3000][] but when I witness something downtown
that I want a picture of, the best camera for that is my phone.  I regards to 
software this usually means that the perfect software for a person is the one that
is out and usable.  I could be working on the greatest DB of all time, but for 
anyone (myself included) the best one at the moment is the one that I can use.  To
me, this has always meant that shipping is one of the most important features of a
project.

[Nikon D3000]: http:///

For a project, getting it to the point of MVP, or **M**inimum **V**iable 
**P**roduct, should be the number 1 goal.  For my side projects, I go through the
ideas that I have about it, classify the ones that are paramount for the result to
be the minimum of what it needs to be to be usable.  Once I reach this, I begin to
prepare the code to "ship" (in regards to an open source project, it doesn't really
change much, since the code has been and will continue to be available this entire
time).  For me, to ship means to have it in a state that is easy for others to set
up, configure, and use (because ultimately the reason for writing the code is that
someone will use it).  This usually means consolidating anything that is hardcoded
for dev to be configurable, documenting the setup process, possibly scripting
various behaviors (such as authing with an OAuth system and storing the token and
configuring how the token is stored), and noting/supporting the limits in other
systems.

A **lot** of developers get very attached to the dreaming state of a project, lets
be honest, thinking of all the cool things you can do with this idea really is a
lot of fun.  But sitting around and coming up with ideas and implementing them will
not get the code out into the open and people using it.  It will remain in some sad
state between a dream and reality.  In a side project I did for work, I presented
the state I had it in a few weeks ago, I regarded the backend to be in the MVP state
and was just trying to iron out the frontend.  When people started hearing about it,
they wanted to start adding all sorts of features or additional behaviors but I had
to step up and keep them on task and get something out to be used.  To me, the most
important feature of this side project is getting it shipped, used, and discover
what really doesn't work for the overall user.  Those are the features that are 
most needed.  Once you get it to a state where most users are fine with it, **then**
you can start adding in new features.

So the steps in writing a new application:

1. Figure out the criteria for the **MVP**
1. Start writing code
1. When the application fits the criteria, begin to prepare to ship
1. Ship, tag the repo, and begin on the new stuff

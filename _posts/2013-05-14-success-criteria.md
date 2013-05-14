---
layout: post
title: success criteria
tldr: Establish the success criteria for a project and it will help motivate
tags: development team
comments: true
---
In all of my side projects and as often as I can with professional work, I try to
establish early on a success criteria.  It helps motivate me and set a finish line
to aim for (and know when you are reaching it).  It also sets a concrete target
(as opposed to a moving target).  This has its own drawbacks (the moving target is
a result of a project taking long and the goal of the project adapting to the
changes in the target audience) but if done correctly and chosen carefully, a good
success criteria establishes a finish line and allows for everyone involved to
sprint towards it.

Using test driven development (TDD) is a form of success criteria.  A developer 
first writes the tests, outline the implementation interface and establishing how
the feature should respond to various scenarios.  Once written, the tests now act
as a goal for the developer to work towards.  When the work passes the tests, the
feature is considered successfully implemented (as long as the other tests were not
broken in the process).  This is helpful in that it establishes a target interface
and behavior ahead of the actual coding and allows for the developer to just focus
on meeting the target with full effort.

On a software team, there are a number of efforts ongoing with any project.  There
is usually a list of bugs discovered in the code, a series of features in various
points of discussion, and a list of improvements to the working project code.  With
these three (or more) areas of focus, it is difficult to maintain the progress of
all of them without establishing some criteria in which the efforts will have met
the successful goal.  

**Bugs:** the criteria could be keeping the count below some number (this number 
can drop each iteration as the load gets contained).  

**Features:** establishing a minimum or 1.0 version of the feature is a good 
approach, then the feature can be improved in newer versions as shortcomings
or issues become apparent (sitting around and trying to figure all of these ahead
of team is an endless task).  The important part of this attitude is to keep the
original version as simple as possible, boil the desired feature down to just the
basics and get that up and working (or maintain a mocked up prototype and use this
to establish the basics and see where it falls short).  

**Improvements:** the best option is to set some baseline that the action should 
achieve.  If it is to migrate a bunch of cowboy coded sections into a shared 
framework, set the conversion to get *n*% of the sections and keep raising that 
value each iteration.  If it is a performance improvement, say the action should 
take no longer than *n* ms to perform.  Once that value is achieved, the 
development should be considered successful for the timespan it was established 
for (this is all assuming the team works in a set cycle length and the target 
numbers will grow with each successful cycle).

With these guidelines and an established criteria for classifying a task as 
"successful" a team will be given a goal to work together to try and achieve.  This
sort of established goal removes the feeling of endless work with no end in sight.
Instead everyone can see how much longer they have until they reach the goal of
their work.  Open ended development is an incredibly unmotivating state to be in.

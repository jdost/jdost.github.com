---
layout: post
title: the security hat
tldr: Find your security hat, dust it off, wear it often, wear it proudly
tags: development security
comments: false
---
I have a security hat, I wear it on occasion, but I wear it proudly.  There is
nothing (for me) that is more embarrassing than someone finding a big vulnerability
in something I wrote.  Something that has been underrated in all of the work I do
has been security testing and understanding.  After looking through the core project
at each job, I have noticed a number of places where anyone with malicious intent
(and some understanding of software) could cause some real harm.  It also scares me
that when I bring it up, it is treated as a sort of accepted fact and not a glaring
error.  There is more pressure to keep churning out more insecure code.  It feels
like a ticking time bomb of bad PR and legal issues that they are just leaving 
there.

So, go out and find your security hat.  Go poke around in your application or side
project.  Find some areas that can be abused or attacked.  Go out and find some new
techniques of abusing an application.  You know about [XSS][]?  Then go read about
[CSRF][].  Already know about that, look into [credential farming][].  I keep 
learning about new ways to abuse a system and how to prevent it.  I dread the 
possible day where someone figures out a hole in my application and causes some real
damage.

[XSS]: http://en.wikipedia.org/wiki/Cross-site_scripting
[CSRF]: http://en.wikipedia.org/wiki/Cross-site_request_forgery
[credential farming]: http://it.toolbox.com/wiki/index.php/Account_Harvesting

Recently, I have been getting ready to reformat my VPS server, as I have left the
previous iteration unmaintained for over half a year and it felt like time to just
start from scratch.  In doing this reformat, I have been trying to update the 
security practices on the hardware as well.  Using [two factor][] authentication
will allow for better security in being able to cause damage on the system.  Using
some [monitoring][] [services][] will aid in catching anything that gets through the
cracks.  I hope to set up better automatic update/maintenance jobs on the system.
But it also allowed for me to realize the whole new area of security I need to be
aware of.  I may write software that is hard to mess with, but all they need to do
is find some hole I left to get onto the system that is running the application and
go read through the source.  I could use public/private encryption on some sensitive
data, but the keys probably don't have a passphrase and must exist somewhere.

[two factor]: http://en.wikipedia.org/wiki/Two_factor
[monitoring]: http://en.wikipedia.org/wiki/Fail2ban
[services]: https://wiki.archlinux.org/index.php/Logwatch

We shouldn't, as developers, require someone else to tell us and find for us the
glaring holes in things we wrote.  We also shouldn't have to find out about them
from third parties who don't have our best interests (or any) at heart.  As 
developers, we have taken the majority of the work from a QA team into our hands
with automated tests.  We can take the work from a security team and do it 
ourselves.  Just maybe, we can write software that is safer and more secure.

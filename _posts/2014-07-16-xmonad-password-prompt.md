---
layout: post
title: "An XMonad Prompt for password-store"
tldr: >
   Created a prompt for the XMonad WM that copies password store passwords to the 
   clipboard
tags: xmonad linux tools
comments: false
---
For the past few months, I have been enjoyably using the [pass][] password manager.
It is a simple commandline tool that bundles together a variety of unix utilities 
into a nice password manager.  The passwords are stored in GPG encrypted files, 
organized using the filesystem.  They can be synced using remote git repos.  It is
all quite elegant and easy to customize using the underlying tools (I use a USB
thumb drive as the remote repository).

[pass]: http://www.passwordstore.org/

The part that it lacked, though, was the ease of retrieving a password ala something
like 1Password or LastPass.  Having to tab over to a shell to run the command and
then tab back to the window that required the password was a bit tiring (yeah I know,
first world problems :P).  So I decided to try and build the functionality into 
XMonad, my window manager of choice.  XMonad comes with a really handy utility 
library called `Prompt` which I already use for a fast process launcher.  The 
challenge was to use the underlying stuff to make a custom prompt.

{% highlight haskell linenos linespans=files %}
getFiles :: String -> IO [String]
getFiles dir = do
  names <- getDirectoryContents dir
  let properNames = filter (`notElem` [ ".", "..", ".git" ]) names
  paths <- forM properNames $ \name -> do
    let path = dir </> name
    isDirectory <- doesDirectoryExist path
    if isDirectory
      then getFiles path
      else return [path]
  return (concat paths)

getPasswords :: IO [String]
getPasswords = do
  dir <- getEnv "PASSWORD_STORE_DIR"
  let password_dir = dir </> ""
  files <- getFiles password_dir
  return $ map ((makeRelative password_dir) . dropExtension) files
{% endhighlight %}

I started off referencing an [existing implementation][1] that uses a third party
library.  I dislike using third party libraries if I can, as it adds complexity
(especially with haskell, as `cabal` is kind of stinky to use).  It also seems a bit
ridiculous to think that directory traversing is so difficult in the language to 
require a library.  So I found a [tutorial][] that gives an example of how to 
generate a list of the files in a directory, which works great.  The only thing I
changed was to [add `.git` as an exempt path](#files-4) (no need to complete the git 
meta data).  Then I wrapped the function with [another](#files-14:18) that handles 
the password store specific logic, like finding the directory and stripping off the 
file structure extras, and outputs the clean password list.

[1]: http://blog.tarn-vedra.de/2014/05/xmonad-loves-password-store.html
[tutorial]: http://book.realworldhaskell.org/read/io-case-study-a-library-for-searching-the-filesystem.html

{% highlight haskell linenos linespans=prompt %}
data Pass = Pass

instance XPrompt Pass where
  showXPrompt       Pass = "Pass: "
  commandToComplete  _ c = c
  nextCompletion       _ = getNextCompletion

selectPassword :: String -> X ()
selectPassword ps = spawn $ "pass -c " ++ ps

passwordPrompt :: XPConfig -> X ()
passwordPrompt config = do
  li <- io getPasswords
  mkXPrompt Pass config (mkComplFunFromList li) selectPassword
{% endhighlight %}

Then all that was left was using some of the utility functions to turn this list
into a [completion function](#prompt-14) and seed the custom prompt with it.

---
layout: post
title: PasswordPrompt improvements
tags: xmonad
comments: true
---
So a few days ago, I wrote about adding `pass` support into an XMonad prompt.  Today,
I spent some time (read: most of my afternoon) trying to improve it.  So here are
some of the improvements:

{% highlight haskell linenos linespans=default %}
passwordStoreEnvVar :: String
passwordStoreEnvVar = "PASSWORD_STORE_DIR"

getPasswordDir :: IO FilePath
getPasswordDir = do
   envDir <- lookupEnv passwordStoreEnvVar
   home <- getEnv "HOME"
   return $ fromMaybe (home </> ".password_store") envDir
{% endhighlight %}

The first is the resolution of the location of the directory structure.  The original
expected that it would be defined in the `PASSWORD_STORE_DIR` environment variable
(which is the most significant definition, but not de facto), which I do use, but if
this is not defined, the application will default to `$HOME/.password_store/`.  I
also cleaned up the environment variable to be a [global constant](#default-1:2).
The new function [`getPasswordDir`](#default-4) performs the same logic, first using
`lookupEnv` to find the primary value, `lookupEnv` returns `Nothing` if the 
environment variable is not defined (`getEnv` would throw an exception).  If it is
`Nothing`, it will build the default `$HOME/.password_store` path).

{% highlight haskell linenos linespans=fuzzy %}
passwordPrompt :: XPConfig -> X ()
passwordPrompt config = do
   li <- io getPasswords
   let compl = \s -> filter (\x -> s `isInfixOf` x) li
   mkXPrompt Pass config (return . compl) (selectPassword li)
{% endhighlight %}

The second improvement I made was making the completion function more "fuzzy".  This
meaning that if I want the password for "amazon" it would match `amazon`, 
`web/amazon`, or something like `amazon/aws`.  Before it was only testing the prefix
which wasn't as easy.  I fixed this by replacing the use of `mkComplFunFromList` with
my own function (which I just took what it would give from the source and modified
it) which uses [`isInfixOf` as the comparison](#fuzzy-4).  Having seen this in 
action, I am tempted to override other prompts to be as helpful.

{% highlight haskell linenos linespans=create %}
passwordLength :: Int
passwordLength = 24

selectPassword :: [String] -> String -> X ()
selectPassword passwords ps = spawn $ "pass " ++ args
   where
      args | ps `elem` passwords = "show -c " ++ ps
           | otherwise = "generate -c " ++ ps ++ " " ++ (show passwordLength)
{% endhighlight %}

The final improvement is how it handles undefined entries.  Originally, nothing would
happen, but it seems useful to be able to generate new passwords as well.  So I 
expanded the `selectPassword` function to detect this.  Now the arguments to `pass`
are generated with a where clause.  The condition is if the password is [an element 
of the generated password list](#create-7), then it will perform as before, copying
the password to the clipboard.  If this fails, it will have `pass` [generate a 
password](#create-8) instead, copying it to the clipboard.  The length of this 
password is defined in the [`passwordLength`](#create-1:2) definition.

After having played with this enough, I am tempted to try some other utility prompts,
the one that caught my eye is the [`XMonad.Prompt.Window`][1] stuff to act as a sort
of super "Alt-Tab" where it would take you to the window you search for.  The current
behavior only uses the window name, so searching for "firefox" doesn't find anything
due to how it seeds the completion list.  I am trying to populate the list with a 
more verbose description of the windows and using either the infix filter or one of
the more advanced distance comparisons.

[1]: http://xmonad.org/xmonad-docs/xmonad-contrib/XMonad-Prompt-Window.html

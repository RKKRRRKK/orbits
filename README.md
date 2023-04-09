# orbits
A simplified model of and a visualization of circular orbits of active satellites around Earth.
The code reads a JSON file of (simplified/modeled) orbital information through a loop, for each iteration of the loop I create a mesh at a specified height, give it the specified "speed", and create an object at 0,0,0 for it to rotate around, additionally each satellite is given a randomly generated initial y rotation "angle" so that
they are spread out at the beginning of the animation.  

Warning: this is my first time playing around with GIT, also my first project in JS, I used a boilerplate to get ThreeJS running.
I always get the ERR_OSSL_EVP_UNSUPPORTED error when trying to run it, running: $env:NODE_OPTIONS="--openssl-legacy-provider", fixes it.
If anything is extremely dumb, or unclear, I apologize, I generally work with data in Python and SQL and never needed to collaborate on code. So I have no clue about
best practices and the like. 

I put this on GitHUb to try to get help, as I am unable to properly rotate the satellites:

  1. You'll see after running this that the satellites, despite being animated to rotate ont he Y axis, also somehow rotate on the X axis. 
  2. If you comment out the animation bit (which you'll need to do to see the issue), you'll also see that the satellites are not spaced out uniformly around the globe        as you'd expect,  but are instead grouped together in some sort of double helix shape. 
     

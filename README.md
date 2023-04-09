# orbits
a simplified model of and a visualization of circular orbits of active satellites around Earth 

First time playing around with GIT, also my first project in JS, I used a boilerplate to get ThreeJS running.
I always get the ERR_OSSL_EVP_UNSUPPORTED  error, to which I reply with $env:NODE_OPTIONS="--openssl-legacy-provider".
If anything is extremely dumb, or unclear, I apologize, I am data guy working with Python and SQL and never needed to collaborate on code. So I have no clue about
best practices and the like. 

I put this on GitHUb to try to get help, as I am unable to properly rotate the satellites:

  1. You'll see after running this that the satellites, despite being animated to rotate ont he Y axis, also somehow rotate on the X axis. 
  2. If you comment out the animation bit, you'll also see that the satellites are not spaced out uniformly around the globe as you'd expect,
     but are instead grouped together in some sort of double helix shape. 

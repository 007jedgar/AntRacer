# Ant Racer

How to run Ants Racing App: 

1. `git clone git@github.com:007jedgar/AntRacer.git`
2. `cd AntRacer`
3. `npm install`
5. open xcode and verify siging app
7. `react-native run-ios --simulator="[iPhone of Choice]"` or  `npm run iphone8` 

### Must have
- [x] Users must be able to begin running calculations on all ants simultaneously.
- [ ] UI must reflect the state of each ant's win likelihood calculation (not yet run, in progress, calculated, etc.)
- [x] UI must display the state of all tests together (not yet run, in progress, all calculated).
- [x] As the results come in, ants must be ordered by their calculated likelihood of winning.
- [x] Include a login/logout feature: open-ended on how to implement, and can be local-storage only. Being logged in enables the ability to query the GraphQL endpoint to display the requirements.
- [x] When logged in, there should be images of three (3) ants moving horizontally from left to right across the bottom-most part of the screen; once an ant is out of the right side of the screen, it comes back on the left side of it, like in a carousel
- [ ] Show n number of ants and tie the animation of each to its associated calculation via a method of your choosing


### The current state of the project
I had a lot of fun with this project. I learned a lot. I got to do a deep dive on animation and native threads. I learned a new navigation framework. I finally learned the difference bwtween `parseInt` and `parseFloat`. And I had some fun with brutalism design. It felt like quite the vacation from my regularly scheduled programing.

Unfortunately I won't be able to finish and debug the ant calculator function this week.

#### Things I had problems with
- Maybe I have a misunderstanding of loops or setState? I couldn't get my `generateAntWinLikelihoodCalculator`  callback to consistently update all the ants. My current understanding is that the order of the array/object is changing and allowing certain ants to get written over twice, but I couldn't figure out where it was happening. I'm sure if I rewrote it from scratch one more time I could figure it out.
- Design. I wanted it all to fit on on screen, but that's a difficult task when it all has to be easy to read and use. I tried solving this problem using font's to direct your eyes to what I thought was most important.
- Early on I realized that everything couldn't be executed on the js thread, so it was just a matter of how to get access to the native thread. Reading through the documentation on this and debugging animation errors felt like minutes to me, but in actuality it was a whole day gone by.
- It took me forever to realize that `parseFloat` and `toFixed()` was not going to work. I'm still not sure what was actually happening as there were so many things that could have gone wrong between the two functions. I ended up going with `Math.round()`

#### Things I could improve
- The Animations for sure. I could spend hours making animations now.
- The ant display cards. My version doesn't really represent the full state of the calculations. I thought about making the cards shake as they were calculating. 
- I tried a new file format because the project was so small. I'm not sure if I would do it again. The only reason it worked for me was because of my config in VS code. It would have been a pain with my experience with vim or atom.
- I'd like to switch to hooks.
- More comments. There was a lot of strange logic in my app.

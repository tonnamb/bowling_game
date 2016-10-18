## Problem Statement

Imagine you’re tasked with writing the software for a bowling alley that shows the bowling game scoreboard.
Design entities and interfaces to model a scoreboard controller for bowling, keeping in mind the nature of the input from the physical machinery in the bowling lane, which generally reflects pin state.
The input to the scoreboard controller is the lane control hardware that reflects the pin state (i.e. how many pins are up/down).

## Task

Using your design, implement (in the programming language of your choosing) the scoring / game state display service that would compute needed data that one typically expects to see on the lane monitor during a game.
Rules of bowling scoring are 'http://bowling.about.com/od/rulesofthegame/a/bowlingscoring.htm'.
If you need additional information, there is also more scoring here ('http://slocums.homestead.com/gamescore.html'), but this gets into more complicated areas like fouls, splits, etc.

## Requirements

Write class "BowlingGame" with methods:

* roll(pinsObj)
  * called each time the player rolls a ball.
  * pinsObj is a hash table storing the status of each pin, labeled bottom-up as 'http://www.clker.com/cliparts/O/6/o/5/Z/5/bowling-pins-diagram-hi.png', reflects the lane control hardware.
  * returns a hash table:


    { boolFrameEnd [=] true for end of frame, 
        boolGameEnd [=] true for end of game, 
        strFrameScore [=] either '1-9', '/', 'X' or '-',
        score [=] self.score }

* score()
  * returns current score

## Design of "BowlingGame" class

* One game
* A game has 10 frames
* A frame has one or two rolls
* The tenth frame has two or three rolls
* The score for a spare or a strike depends on the frames successor

## Technologies

* Mocha, Chai (behavior-driven development)
* Karma (test runner for multiple browsers)
* webpack (modules bundler, babel-loader)
* babel (transpile ES6 into ES5)
* static `express` server

## Running the server

    $ npm start

Once the server is running, view project at 'https://bowling-game-tonnamb.c9users.io/'.

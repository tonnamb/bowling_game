## Problem Statement

Imagine you’re tasked with writing the software for a bowling alley that shows the bowling game scoreboard.
Design entities and interfaces to model a scoreboard controller for bowling, keeping in mind the nature of the input from the physical machinery in the bowling lane, which generally reflects pin state.
The input to the scoreboard controller is the lane control hardware that reflects the pin state (i.e. how many pins are up/down).

## Task

Using your design, implement (in the programming language of your choosing) the scoring / game state display service that would compute needed data that one typically expects to see on the lane monitor during a game.
Rules of bowling scoring are 'http://bowling.about.com/od/rulesofthegame/a/bowlingscoring.htm'.
If you need additional information, there is also more scoring here ('http://slocums.homestead.com/gamescore.html'), but this gets into more complicated areas like fouls, splits, etc.

## Requirements

![Scoreboard](https://camo.githubusercontent.com/ad2710d5e239994189d3f15d2d927225cf9a2b0a/687474703a2f2f7777772e7770636c69706172742e636f6d2f72656372656174696f6e2f73706f7274732f626f776c696e672f626f776c696e675f73636f726573686565745f6578616d706c652e706e67)

![Pins](http://www.clker.com/cliparts/O/6/o/5/Z/5/bowling-pins-diagram.svg)

Write class "BowlingGame" with public methods:

* roll(pins)
  * called each time the player rolls a ball.
  * pins [=] { 1: true, 2: false, ... }, labeled bottom-up, reflects the lane control hardware.
  * update these variables:
    * this.pinsBefore [=] this.pinsAfter || { 1: true, 2: true, ... }
    * this.pinsAfter [=] pins
    * this.currentRoll [=] according to roll logic
    * this.currentFrame [=] according to frame logic
    * this.score = this._calcScore() [=] handles spare and strike bonuses

* writeScoreBoard()
  * format for rendering to scoreboard in the front-end
  * returns { frameIndex: {1: '1-9 or -', 2: '1-9 or - or / or X', frameScore: '#'}, ... }
  

## Design of "BowlingGame" class

* One game
* A game has 10 frames
* A frame has one or two rolls
* The tenth frame has two or three rolls
* The score for a spare or a strike depends on the frames successor

## Technologies

* Mocha, Chai (test-driven development, behavior-driven syntax)
* Karma (test runner for multiple browsers)
* webpack (modules bundler, babel-loader)
* babel (transpile ES6 into ES5)
* static `express` server

## Setup

    $ git clone https://github.com/tonnamb/bowling_game.git
    $ cd bowling_game
    $ npm install

## Running tests

    $ npm test

## Running the server

    $ npm start

Once the server is running, view project at 'https://bowling-game-tonnamb.c9users.io/'.

## Problem Statement

Imagine you’re tasked with writing the software for a bowling alley that shows the bowling game scoreboard.
Design entities and interfaces to model a scoreboard controller for bowling, keeping in mind the nature of the input from the physical machinery in the bowling lane, which generally reflects pin state.
The input to the scoreboard controller is the lane control hardware that reflects the pin state (i.e. how many pins are up/down).

## Task

Using your design, implement (in the programming language of your choosing) the scoring / game state display service that would compute needed data that one typically expects to see on the lane monitor during a game.
Rules of bowling scoring are 'http://bowling.about.com/od/rulesofthegame/a/bowlingscoring.htm'.
If you need additional information, there is also more scoring here ('http://slocums.homestead.com/gamescore.html'), but this gets into more complicated areas like fouls, splits, etc.

## Requirements

Write class "BowlingGame" with public methods:

### constructor(player)

* set player to this.playerName
* if player is not passed, set this.playerName = 'John' by default
* initialize game entity

### this.roll(pins)

Figure 1: Pins bottom-up labelling convention

![Pins](http://www.clker.com/cliparts/O/6/o/5/Z/5/bowling-pins-diagram-md.png)

* called each time the player rolls a ball.
* pins: { 1: true, 2: false, ... }
  * labeled bottom-up as Figure 1
  * true = standing up, false = knocked down
  * reflects the lane control hardware
* update these variables:
  * this.pinsBefore and this.pinsAfter: used to calculate score of roll with this._comparePins()
  * this.currentFrame: keep track of the current frame, i.e. player is going to roll in this frame next
  * this.currentRoll: keep track of the current roll within the current frame, i.e. player is going to roll this roll next
  * this.score: keep track of score, update using this._calcScore()
  * this.pinsData: keep track of pins data for each roll, will be useful for future implementation of modifyScore method

### this.writeScoreBoard()

Figure 2: Bowling scoreboard example

![Scoreboard](https://camo.githubusercontent.com/ad2710d5e239994189d3f15d2d927225cf9a2b0a/687474703a2f2f7777772e7770636c69706172742e636f6d2f72656372656174696f6e2f73706f7274732f626f776c696e672f626f776c696e675f73636f726573686565745f6578616d706c652e706e67)

* returns scoreboard format, as shown in Figure 2, for rendering in the front-end
* does not return empty frames where the game has not reached those frames yet
* { frameIndex: {1: '1-9 or -', 2: '1-9 or - or / or X', frameScore: '#'}, ... }
* e.g. {1: {1: '', 2: 'X', cumScore: '20'}, 2: {1: '7', 2: '/', cumScore: '37'}, 3: {1: '7', 2: '-', cumScore: '44'}}

## Design of "BowlingGame" class

* One game entity per player
* A game has 10 frames
* A frame has one or two rolls
* The tenth frame has two or three rolls
* The score for a spare or a strike depends on the frames successor

## Technologies

* JavaScript ES6
* Mocha, Chai (test-driven development, behavior-driven syntax)
* webpack (modules bundler, babel-loader)
* babel (transpile ES6 into ES5)
* static `express` server

## Setup

This repository has been written in Cloud9 development environment.
It can be cloned at 'https://c9.io/tonnamb/bowling_game'.

If cloning through GitHub is preferred, please execute these commands:

    $ git clone https://github.com/tonnamb/bowling_game.git
    $ cd bowling_game
    $ npm install

## Running tests

    $ npm test

## Running the server

    $ npm start

If running from Cloud9, view project at 'https://bowling-game-tonnamb.c9users.io/'. (Replace 'tonnamb' with your username)
Otherwise, the public files are served at 'http://localhost:8080/'

## To-do

* check if split occurred
* alert front-end if spare, strike or split have occurred, such that front-end can play the spare, strike or split videos
* interface for indication of fouls and scores re-calculation accordingly
* interface for modifying scores, in the case that the physical pin state sensor fails and the player can correct their score

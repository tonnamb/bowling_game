# Bowling Game Scoreboard Controller

## Problem Statement

Imagine you’re tasked with writing the software for a bowling alley that shows the bowling game scoreboard.
Design entities and interfaces to model a scoreboard controller for bowling, keeping in mind the nature of the input from the physical machinery in the bowling lane, which generally reflects pin state.
The input to the scoreboard controller is the lane control hardware that reflects the pin state (i.e. how many pins are up/down).

## Task

Using your design, implement (in the programming language of your choosing) the scoring / game state display service that would compute needed data that one typically expects to see on the lane monitor during a game.
Rules of bowling scoring are 'http://bowling.about.com/od/rulesofthegame/a/bowlingscoring.htm'.
If you need additional information, there is also more scoring here ('http://slocums.homestead.com/gamescore.html'), but this gets into more complicated areas like fouls, splits, etc.

## Setup

This repository has been written in Cloud9 development environment.
It can be cloned at 'https://c9.io/tonnamb/bowling_game'.

If cloning through GitHub is preferred, please execute these commands:

    $ git clone https://github.com/tonnamb/bowling_game.git
    $ cd bowling_game
    $ npm install

## Technologies

* JavaScript ES6
* Mocha, Chai (test-driven development, behavior-driven syntax)
* webpack (modules bundler, babel-loader)
* babel (transpile ES6 into ES5)
* static `express` server

## Design of "BowlingGame" class

* One game entity per player
* A game has 10 frames
* A frame has one or two rolls
* The tenth frame has two or three rolls
* The score for a spare or a strike depends on the frames successor

## Requirements & Implementation Details

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
  * throw error if pins object is not passed
* does nothing if end of game
  * checked using this._isEndOfGame() method
* update these object properties:
  * this.pinsBefore and this.pinsAfter
    * used to calculate score of the roll with this._comparePins()
    * this._comparePins() throw error if a pin stands back up after being knocked down
  * this.score
    * { frameIndex: { rollIndex: rollScore, cumScore: #}, ... }
    * e.g. {1: {1: 10, cumScore: 20}, 2: {1: 7, 2: 3, cumScore: 37}, 3: {1: 7, 2: 0, cumScore: 44}, 4: {cumScore: 44}}
    * update using this._calcScore()
    * takes care of spare and strike bonuses by logic inside this._calcScore(): 
      * enable bonus flags when strike or spare (this._boolStrikeBonus1, this._boolStrikeBonus2, this._boolSpareBonus), which is tested using this._isStrike() and this._isSpare()
      * add score to previous frame's cumScore if bonus flag is enabled
  * this.currentFrame and this.currentRoll
    * current frame = player is going to roll in this frame next
    * current roll = player is going to roll this ball next
    * these information are required for this._calcScore()
    * logic is slightly different for 10th frame, i.e. next frame score and pinsData are not initialized after end of frame
  * this.pinsData
    * stores pins object for each roll
    * useful for future implementation of method for modifying scores

### this.writeScoreBoard()

Figure 2: Bowling scoreboard example

![Scoreboard](https://camo.githubusercontent.com/ad2710d5e239994189d3f15d2d927225cf9a2b0a/687474703a2f2f7777772e7770636c69706172742e636f6d2f72656372656174696f6e2f73706f7274732f626f776c696e672f626f776c696e675f73636f726573686565745f6578616d706c652e706e67)

* for rendering in the front-end
* returns a JavaScript object with a scoreboard format as shown in Figure 2
* { frameIndex: { rollIndex: 'rollScore', cumScore: '#'}, ... }
* e.g. {1: {1: '', 2: 'X', cumScore: '20'}, 2: {1: '7', 2: '/', cumScore: '37'}, 3: {1: '7', 2: '-', cumScore: '44'}}
* strike = 'X' in the second roll box
  * hides cumScore if two next rolls does not yet exist
* spare = '/'
  * hides cumScore if next ball is not rolled yet
* gutter = '-'
  * using this._zeroOrNum(score, frame, roll)
* hides cumScore if not all balls are rolled in the frame
* in the 10th frame, logic is slightly more complex
  * 'X' can appear on all 3 rolls
  * '/' can appear on the 2nd and 3rd roll
* does not return empty frames where the game has not reached those frames yet
  * benefit = requires less data transmission to front-end
  * drawback = handling logic required in the front-end

## Running tests

    $ npm test

## Tests written

### this.roll(pins)

1. rolls the first ball
2. rolls the first frame
3. rolls a strike in the first frame
4. rolls a spare in the first frame
5. throws error when pins appear to stand back up after being knocked down
6. throws error when pins object is not passed
7. assigns player name or 'John' as default to this.playerName
8. rolls the second frame
9. rolls a spare in the first frame and scores after
10. rolls a strike in the first frame and scores after
11. rolls three strike in a row and scores after
12. rolls a combination of spare and strikes
13. gutter game
14. perfect game
15. all 1 game
16. 10th frame: strike then spare
17. 10th frame: strike, strike, then score
18. 10th frame: spare then strike
19. 10th frame: spare then score
20. 10th frame: gutter, spare then score
21. game with a variety of scores, strikes and spares

### this.writeScoreBoard()

1. rolls the first ball, displays as string
2. hides next frame score
3. returns empty object when no roll had been rolled yet
4. strike: show as X and hides unfinished scores
5. strike: shows unfinished scores after sufficient rolls
6. strike: three strikes in a row
7. strike then spare
8. spare: show as / and hides unfinished scores
9. spare: shows unfinished scores after sufficient rolls
10. spare then strike
11. does not mutate this.score
12. displays 0 as '-' for pins rolled but not cumulative score
13. gutter game
14. 10th frame: strike then score
15. 10th frame: strike then spare
16. 10th frame: strike, strike, then score
17. 10th frame: triple strike
18. 10th frame: strike, strike, unfinished game
19. 10th frame: strike, score, unfinished game
20. 10th frame: strike, unfinished game
21. 10th frame: strike then all gutter
22. 10th frame: spare then score
23. 10th frame: spare then strike
24. 10th frame: spare then gutter
25. 10th frame: spare, unfinished game
26. 10th frame: scores open frame
27. 10th frame: scores, unfinished game
28. game with a variety of scores, strikes and spares, tests in between

## Compile public/app.bundle.js

    $ npm run webpack-dev

## Running the server

    $ npm start

If running from Cloud9, view project at 'https://bowling-game-tonnamb.c9users.io/'. (Replace 'tonnamb' with your Cloud9 username)
Otherwise, the public files are served at 'http://localhost:8080/'.

Currently, this is just a blank page with console.log('Loading app.js').

## To-do

* check if split occurred
* alert front-end if spare, strike or split have occurred, such that front-end can play the spare, strike or split videos
* interface for indication of fouls and scores re-calculation accordingly
* interface for modifying scores, in the case that the physical pin state sensor fails and the player can correct their score

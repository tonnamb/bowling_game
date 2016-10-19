/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	console.log('Loading app.js');

	var BowlingGame = function BowlingGame() {
		this.rolls = [];
		this.currentRoll = 0;
	};

	BowlingGame.prototype.roll = function (pins) {
		this.rolls[this.currentRoll++] = pins;
	};

	BowlingGame.prototype.score = function () {
		var score = 0;
		var frameIndex = 0;
		var self = this;

		function sumOfBallsInFrame() {
			return self.rolls[frameIndex] + self.rolls[frameIndex + 1];
		}

		function spareBonus() {
			return self.rolls[frameIndex + 2];
		}

		function strikeBonus() {
			return self.rolls[frameIndex + 1] + self.rolls[frameIndex + 2];
		}

		function isStrike() {
			return self.rolls[frameIndex] === 10;
		}

		function isSpare() {
			return self.rolls[frameIndex] + self.rolls[frameIndex + 1] === 10;
		}

		for (var frame = 0; frame < 10; frame++) {
			if (isStrike()) {
				score += 10 + strikeBonus();
				frameIndex++;
			} else if (isSpare()) {
				score += 10 + spareBonus();
				frameIndex += 2;
			} else {
				score += sumOfBallsInFrame();
				frameIndex += 2;
			}
		}
		return score;
	};

	module.exports = BowlingGame;

/***/ }
/******/ ]);
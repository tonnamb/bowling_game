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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Entry point to application

	var _BowlingGame = __webpack_require__(1);

	var _BowlingGame2 = _interopRequireDefault(_BowlingGame);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	console.log('Loading app.js');

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BowlingGame = function () {
		function BowlingGame(player) {
			_classCallCheck(this, BowlingGame);

			this.playerName = player || 'John'; // Default name is 'John'
			this.pinsBefore = {
				1: true,
				2: true,
				3: true,
				4: true,
				5: true,
				6: true,
				7: true,
				8: true,
				9: true,
				10: true
			};
			this.pinsAfter = null;
			this.currentRoll = 1;
			this.currentFrame = 1;
			this.score = { 1: { cumScore: 0 } };
			this._boolStrikeBonus1 = false;
			this._boolStrikeBonus2 = false;
			this._boolSpareBonus = false;
		}

		_createClass(BowlingGame, [{
			key: 'roll',
			value: function roll(pins) {
				// called each time the player rolls a ball.
				// pins [=] { 1: true, 2: false, ... }, labeled bottom-up, reflects the lane control hardware.

				if (pins === undefined) {
					throw new Error('pins object not passed');
				}

				// Do nothing if end of game
				if (this._isEndOfGame()) {
					return;
				}
				// this.pinsAfter is set to null at the end of every frame, thus all pins are up
				this.pinsBefore = this.pinsAfter || {
					1: true,
					2: true,
					3: true,
					4: true,
					5: true,
					6: true,
					7: true,
					8: true,
					9: true,
					10: true
				};
				this.pinsAfter = pins;

				// get score of current roll
				var toScore = this._comparePins();

				// update this.score
				this.score = this._calcScore(toScore);

				// logic for moving into next roll and frame
				// for frames 1-9
				if (this.currentFrame !== 10) {
					// move to next frame if strike or this is the second roll
					if (this._isStrike() || this.currentRoll === 2) {
						this.pinsAfter = null;
						this.currentFrame += 1;
						// Initialize next frame score object
						this.score[this.currentFrame] = { cumScore: this.score[this.currentFrame - 1].cumScore };
						this.currentRoll = 1;
						// move to next roll if this is the first roll
					} else if (this.currentRoll === 1) {
						this.currentRoll += 1;
					}
					// for frame 10
				} else {
					if (this.currentRoll !== 3) {
						// reset pins if strike or spare
						if (this._isStrike(10, this.currentRoll) || this._isSpare()) {
							this.pinsAfter = null;
							this.currentRoll += 1;
							// move to next roll if this is the first roll
						} else if (this.currentRoll === 1) {
							this.currentRoll += 1;
							// move to next roll if 1st roll = strike, 2nd roll = pins are left
						} else if (this._isStrike(10, 1)) {
							this.currentRoll += 1;
						}
						// does not move to next roll if 1st roll = not strike, 2nd roll = pins are left
					}
				}
			}
		}, {
			key: 'writeScoreBoard',
			value: function writeScoreBoard() {
				// returns scoreboard format for rendering in the front-end

				// cache
				var score = JSON.parse(JSON.stringify(this.score)); // deep-copy is needed because score will be mutated
				var len = this.currentFrame;

				// all frames before current
				for (var i = 1; i < len; i += 1) {
					// strike cases
					if (this._isStrike(i)) {
						score[i][1] = '';
						score[i][2] = 'X'; // put X in second slot which is boxed
						// hides cumScore if two next rolls does not yet exist
						if (score[i + 1][1] !== undefined) {
							// !== undefined is needed otherwise 0 will be converted into false
							if (score[i + 1][2] !== undefined) {
								score[i].cumScore = score[i].cumScore.toString();
								// checks if score[i+2] even exists before calling score[i+2][1]
							} else if (score[i + 2] !== undefined && score[i + 2][1] !== undefined) {
								// &&: if left arg is false, right arg is not called, i.e. short-circuit
								score[i].cumScore = score[i].cumScore.toString();
							} else {
								score[i].cumScore = '';
							}
							// else display cumScore
						} else {
							score[i].cumScore = '';
						}
						// spare cases
					}if (this._isSpare(i)) {
						score[i][1] = this._zeroOrNum(score, i, 1);
						score[i][2] = '/';
						// hides cumScore if next ball is not rolled yet
						score[i].cumScore = score[i + 1][1] !== undefined ? score[i].cumScore.toString() : '';
						// not strike or spare, i.e. open frame	
					} else {
						score[i][1] = this._zeroOrNum(score, i, 1);
						score[i][2] = this._zeroOrNum(score, i, 2);
						// always display cumScore
						score[i].cumScore = score[i].cumScore.toString();
					}
				}
				// current or 10th frame
				if (score[len][1] !== undefined) {
					// if 1st roll is rolled
					if (len === 10) {
						// 10th frame
						// display cumScore only if end of game
						score[len].cumScore = this._isEndOfGame() ? score[len].cumScore.toString() : '';
						// strike cases
						if (this._isStrike(len, 1)) {
							score[len][1] = 'X';
							// if second roll is rolled
							if (score[len][2] !== undefined) {
								if (this._isStrike(len, 2)) {
									score[len][2] = 'X';
								} else {
									score[len][2] = this._zeroOrNum(score, len, 2);
								}
								// second roll is not rolled yet
							} else {
								score[len][2] = '';
							}
							// if third roll is rolled
							if (score[len][3] !== undefined) {
								if (this._isStrike(len, 3)) {
									score[len][3] = 'X';
									// spare can show up only at the third roll if 1st roll is strike
								} else if (this._isSpare(len, 2)) {
									score[len][3] = '/';
								} else {
									score[len][3] = this._zeroOrNum(score, len, 3);
								}
								// third roll is not rolled yet
							} else {
								score[len][3] = '';
							}
							// spare cases
						} else if (this._isSpare(len, 1)) {
							score[len][1] = this._zeroOrNum(score, len, 1);
							score[len][2] = '/';
							// if 3rd roll is rolled
							if (score[len][3] !== undefined) {
								// strike can show up only at the 3rd roll if spare
								if (this._isStrike(len, 3)) {
									score[len][3] = 'X';
								} else {
									score[len][3] = this._zeroOrNum(score, len, 3);
								}
								// 3rd roll is not rolled yet
							} else {
								score[len][3] = '';
							}
							// not strike or spare, i.e. open frame
						} else {
							score[len][1] = this._zeroOrNum(score, len, 1);
							score[len][2] = score[len][2] !== undefined ? this._zeroOrNum(score, len, 2) : '';
							score[len][3] = '';
						}
						// case for current frame is not 10th frame
					} else {
						score[len].cumScore = '';
						score[len][1] = score[len][1] !== undefined ? this._zeroOrNum(score, len, 1) : '';
						score[len][2] = '';
						// after second roll, current frame will become next frame, i.e. it will always be empty
					}
					// hide last frame if first roll is not rolled yet
				} else {
					delete score[len];
				}

				return score;
			}
		}, {
			key: '_comparePins',
			value: function _comparePins() {
				// get score of current roll

				var counter = 0;
				// loop through all pins
				for (var i = 1; i <= 10; i += 1) {
					// add to counter if pin is knocked down
					if (this.pinsBefore[i] === true && this.pinsAfter[i] === false) {
						counter += 1;
					}
					// throw error if pin stands back up after being knocked down
					else if (this.pinsBefore[i] === false && this.pinsAfter[i] === true) {
							throw new Error('Pin ' + i + ' appears to stand back up after being knocked down');
						}
				}
				return counter;
			}
		}, {
			key: '_calcScore',
			value: function _calcScore(toScore) {
				// calculates and format score object

				// cache this.score
				var scoreBefore = this.score;

				// set score of the current roll
				scoreBefore[this.currentFrame][this.currentRoll] = toScore;

				// add to cumulative score (no bonuses yet)
				scoreBefore[this.currentFrame].cumScore += toScore;

				// logic for adding spare and strike bonus
				// add score to previous and current frame if strike bonus 1
				if (this._boolStrikeBonus2) {
					// add to second previous, previous, and current frame if first roll
					if (this.currentRoll === 1) {
						scoreBefore[this.currentFrame - 2].cumScore += toScore;
						scoreBefore[this.currentFrame - 1].cumScore += toScore;
						scoreBefore[this.currentFrame].cumScore += toScore;
						// add to previous and current frame if second roll
					} else {
						scoreBefore[this.currentFrame - 1].cumScore += toScore;
						scoreBefore[this.currentFrame].cumScore += toScore;
					}
					this._boolStrikeBonus2 = false;
				}
				if (this._boolStrikeBonus1) {
					scoreBefore[this.currentFrame - 1].cumScore += toScore;
					scoreBefore[this.currentFrame].cumScore += toScore;
					this._boolStrikeBonus1 = false;
					this._boolStrikeBonus2 = true;
					// add score to second previous, previous and current roll if strike bonus 2
				}
				// add score to previous and current frame if spare bonus
				if (this._boolSpareBonus) {
					scoreBefore[this.currentFrame - 1].cumScore += toScore;
					scoreBefore[this.currentFrame].cumScore += toScore;
					this._boolSpareBonus = false;
				}

				// logic for enabling strike and spare bonus
				if (this.currentFrame !== 10) {
					// enable first strike bonus if strike
					if (this._isStrike()) {
						this._boolStrikeBonus1 = true;
						// enable spare bonus if spare
					} else if (this._isSpare()) {
						this._boolSpareBonus = true;
					}
				}
				// no new bonus enabling at frame 10

				// return modified this.score
				return scoreBefore;
			}
		}, {
			key: '_isStrike',
			value: function _isStrike(frame, roll) {
				// method can be called without passing frame and roll
				var checkFrame = frame || this.currentFrame;
				var checkRoll = roll || 1;
				return this.score[checkFrame][checkRoll] === 10;
			}
		}, {
			key: '_isSpare',
			value: function _isSpare(frame, roll) {
				// method can be called without passing frame and roll
				var checkFrame = frame || this.currentFrame;
				var checkRoll = roll || 1;
				return this.score[checkFrame][checkRoll] + this.score[checkFrame][checkRoll + 1] === 10;
			}
		}, {
			key: '_isEndOfGame',
			value: function _isEndOfGame() {
				return this.currentFrame === 10 && this.score[this.currentFrame][this.currentRoll] !== undefined;
			}
		}, {
			key: '_zeroOrNum',
			value: function _zeroOrNum(score, frame, roll) {
				// return '-' for 0
				// return '1' for 1, vice versa for 1-9
				// logic for strikes should be put in place before calling this method
				return score[frame][roll] === 0 ? '-' : score[frame][roll].toString();
			}
		}]);

		return BowlingGame;
	}();

	exports.default = BowlingGame;

/***/ }
/******/ ]);
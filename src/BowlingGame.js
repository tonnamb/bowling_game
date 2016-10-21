class BowlingGame {
	constructor() {
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
		this.score = {1: {cumScore: 0}};
		this._boolStrikeBonus1 = false;
		this._boolStrikeBonus2 = false;
		this._boolSpareBonus = false;
	}
	roll(pins) {
		// called each time the player rolls a ball.
		// pins [=] { 1: true, 2: false, ... }, labeled bottom-up, reflects the lane control hardware.
		
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
				this.score[this.currentFrame] = {cumScore: this.score[this.currentFrame-1].cumScore};
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
				} else if (this._boolStrikeBonus2) {
					this.currentRoll += 1;
				}
				// does not move to next roll if 1st roll = not strike, 2nd roll = pins are left
			}
		}
	}
	_comparePins() {
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
				throw new Error('Pin ' + i + ' appears to stand back up after being knocked down')
			}
		}
		return counter;
	}
	_calcScore(toScore) {
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
				scoreBefore[this.currentFrame-2].cumScore += toScore;
				scoreBefore[this.currentFrame-1].cumScore += toScore;
				scoreBefore[this.currentFrame].cumScore += toScore;
			// add to previous and current frame if second roll
			} else {
				scoreBefore[this.currentFrame-1].cumScore += toScore
				scoreBefore[this.currentFrame].cumScore += toScore;
			}
			this._boolStrikeBonus2 = false;
		}
		if (this._boolStrikeBonus1) {
			scoreBefore[this.currentFrame-1].cumScore += toScore;
			scoreBefore[this.currentFrame].cumScore += toScore;
			this._boolStrikeBonus1 = false;
			this._boolStrikeBonus2 = true;
		// add score to second previous, previous and current roll if strike bonus 2
		}
		// add score to previous and current frame if spare bonus
		if (this._boolSpareBonus) {
			scoreBefore[this.currentFrame-1].cumScore += toScore;
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
	_isStrike(frame, roll) {
		var checkFrame = frame || this.currentFrame;
		var checkRoll = roll || 1;
		return this.score[checkFrame][checkRoll] === 10;
	}
	_isSpare(frame) {
		var checkFrame = frame || this.currentFrame;
		return this.score[checkFrame][1] + this.score[checkFrame][2] === 10;
	}
	_isEndOfGame() {
		return (this.currentFrame === 10 && this.score[this.currentFrame][this.currentRoll] !== undefined);
	}
}

export default BowlingGame;
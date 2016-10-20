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
		if (this._isEndOfGame()) {
			return;
		}
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
		var toScore = this._comparePins();
		this.score = this._calcScore(toScore);
		
		if (this.currentFrame !== 10) {
			if (this._isStrike() || this.currentRoll === 2) {
				this.pinsAfter = null;
				this.currentFrame += 1;
				this.currentRoll = 1;
			} else if (this.currentRoll === 1) {
				this.currentRoll += 1;
			}
		} else {
			if (this._isStrike() || this._isSpare()) {
				this.pinsAfter = null;
				this.currentRoll += 1;
			} else if (this.currentRoll === 1) {
				this.currentRoll += 1;
			}
		}
	}
	_comparePins() {
		var counter = 0;
		for (var i = 1; i <= 10; i += 1) {
			if (this.pinsBefore[i] === true && this.pinsAfter[i] === false) {
				counter += 1;
			}
			else if (this.pinsBefore[i] === false && this.pinsAfter[i] === true) {
				throw new RollException('Pin ' + i + ' appears to stand back up after being knocked down')
			}
		}
		return counter;
	}
	_calcScore(toScore) {
		var scoreBefore = this.score;
		scoreBefore[this.currentFrame][this.currentRoll] = toScore;
		if (scoreBefore[this.currentFrame].cumScore) {
			scoreBefore[this.currentFrame].cumScore += toScore;
		} else {
			scoreBefore[this.currentFrame].cumScore = toScore;
		}
		
		if (this.currentFrame !== 10) {
			if (this._boolStrikeBonus1) {
				scoreBefore[this.currentFrame-1].cumScore += toScore;
				this._boolStrikeBonus1 = false;
				this._boolStrikeBonus2 = true;
			} else if (this._boolStrikeBonus2) {
				if (this.currentRoll === 1) {
					scoreBefore[this.currentFrame-2].cumScore += toScore;
				} else {
					scoreBefore[this.currentFrame-1].cumScore += toScore
				}
				this._boolStrikeBonus2 = false;
			}
			if (this._boolSpareBonus) {
				scoreBefore[this.currentFrame-1].cumScore += toScore;
				this._boolSpareBonus = false;
			}
		} else {
			if (this._boolStrikeBonus1) {
				if (this.currentRoll === 1) {
					scoreBefore[this.currentFrame-1].cumScore += toScore;
				} else {
					scoreBefore[this.currentFrame].cumScore += toScore;
				}
				this._boolStrikeBonus1 = false;
				this._boolStrikeBonus2 = true;
			} else if (this._boolStrikeBonus2) {
				if (this.currentRoll === 1) {
					scoreBefore[this.currentFrame-2].cumScore += toScore;
				} else if (this.currentRoll === 2) {
					scoreBefore[this.currentFrame-1].cumScore += toScore;
				} else {
					scoreBefore[this.currentFrame].cumScore += toScore;
				}
				this._boolStrikeBonus2 = false;
			}
			if (this._boolSpareBonus) {
				if (this.currentRoll === 1) {
					scoreBefore[this.currentFrame-1].cumScore += toScore;
				} else {
					scoreBefore[this.currentFrame].cumScore += toScore;
				}
				this._boolSpareBonus = false;
			}
		}
		
		if (this._isStrike()) {
			this._boolStrikeBonus1 = true;
		} else if (this._isSpare()) {
			this._boolSpareBonus = true;
		}
		
		return scoreBefore;
	}
	_isStrike(frame) {
		var checkFrame = frame || this.currentFrame;
		return this.score[checkFrame][1] === 10;
	}
	_isSpare(frame) {
		var checkFrame = frame || this.currentFrame;
		return this.score[checkFrame][1] + this.score[checkFrame][2] === 10;
	}
	_isEndOfGame() {
		return (this.currentFrame === 10 && this.score[this.currentFrame][this.currentRoll] !== undefined);
	}
}

function RollException(message) {
	this.message = message;
	this.name = "RollException";
}

export default BowlingGame;
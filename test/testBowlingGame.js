'use strict';

import BowlingGame from '../src/BowlingGame.js';

var chai = require('chai');
var expect = chai.expect;

describe("BowlingGame", function() {
    describe("roll(pins)", function() {
        it("rolls the first ball", function() {
            var game = new BowlingGame();
            var pins = {1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: false, 9: false, 10:false};
            game.roll(pins);
            expect(game.score).to.deep.equal({1: {1: 3, cumScore: 3}});
            expect(game.pinsBefore).to.deep.equal({1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true, 10: true});
            expect(game.pinsAfter).to.deep.equal(pins);
            expect(game.currentFrame).to.equal(1);
            expect(game.currentRoll).to.equal(2);
        });
        it("rolls the first frame", function() {
            var game = new BowlingGame();
            var pins = {1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: false, 9: false, 10:false};
            game.roll(pins);
            var pins2 = {1: true, 2: true, 3: true, 4: true, 5: false, 6: false, 7: false, 8: false, 9: false, 10:false};
            game.roll(pins2);
            expect(game.score).to.deep.equal({1: {1: 3, 2: 3, cumScore: 6}, 2: {cumScore: 6}});
            expect(game.pinsAfter).to.equal(null);
            expect(game.currentFrame).to.equal(2);
            expect(game.currentRoll).to.equal(1);
        });
        it("rolls a strike in the first frame", function() {
            var game = new BowlingGame();
            var pins = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10:false};
            game.roll(pins);
            expect(game.score).to.deep.equal({1: {1: 10, cumScore: 10}, 2: {cumScore: 10}});
            expect(game.pinsAfter).to.equal(null);
            expect(game.currentFrame).to.equal(2);
            expect(game.currentRoll).to.equal(1);
            expect(game._isStrike(1)).to.equal(true);
            expect(game._boolStrikeBonus1).to.equal(true);
            expect(game._boolStrikeBonus2).to.equal(false);
            expect(game._boolSpareBonus).to.equal(false);
        });
        it("rolls a spare in the first frame", function() {
            var game = new BowlingGame();
            var pins = {1: true, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            game.roll(pins);
            var pins2 = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            game.roll(pins2);
            expect(game.score).to.deep.equal({1: {1: 9, 2: 1, cumScore: 10}, 2: {cumScore: 10}});
            expect(game.pinsAfter).to.equal(null);
            expect(game.currentFrame).to.equal(2);
            expect(game.currentRoll).to.equal(1);
            expect(game._isSpare(1)).to.equal(true);
            expect(game._boolSpareBonus).to.equal(true);
            expect(game._boolStrikeBonus1).to.equal(false);
            expect(game._boolStrikeBonus2).to.equal(false);
        });
        it("throws error when pins appear to stand back up after being knocked down", function() {
            var game = new BowlingGame();
            var pins = {1: true, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            game.roll(pins);
            var pins2 = {1: true, 2: true, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            expect(() => game.roll(pins2)).to.throw('Pin ' + 2 + ' appears to stand back up after being knocked down')
        });
        it("rolls the second frame", function() {
            var game = new BowlingGame();
            var pins = {1: true, 2: true, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: true};
            game.roll(pins);
            var pins2 = {1: false, 2: true, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            game.roll(pins2);
            var pins3 = {1: true, 2: true, 3: false, 4: false, 5: false, 6: false, 7: true, 8: true, 9: true, 10: false};
            game.roll(pins3);
            var pins4 = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: true, 9: true, 10: false};
            game.roll(pins4);
            expect(game.score).to.deep.equal({1: {1: 7, 2: 2, cumScore: 9}, 2: {1: 5, 2: 3, cumScore: 17}, 3: {cumScore: 17}});
            expect(game.pinsAfter).to.equal(null);
            expect(game.currentFrame).to.equal(3);
            expect(game.currentRoll).to.equal(1);
        });
        it("rolls a spare in the first frame and scores after", function() {
            var game = new BowlingGame();
            var pins = {1: true, 2: false, 3: false, 4: false, 5: false, 6: true, 7: false, 8: false, 9: true, 10: false};
            game.roll(pins);
            var pins2 = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            game.roll(pins2);
            var pins3 = {1: true, 2: true, 3: false, 4: false, 5: false, 6: false, 7: true, 8: true, 9: true, 10: false};
            game.roll(pins3);
            expect(game.score).to.deep.equal({1: {1: 7, 2: 3, cumScore: 15}, 2: {1: 5, cumScore: 20}});
            expect(game.pinsAfter).to.deep.equal(pins3);
            expect(game.currentFrame).to.equal(2);
            expect(game.currentRoll).to.equal(2);
            expect(game._isSpare(1)).to.equal(true);
            expect(game._boolSpareBonus).to.equal(false);
            var pins4 = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: true, 9: true, 10: false};
            game.roll(pins4);
            expect(game.score).to.deep.equal({1: {1: 7, 2: 3, cumScore: 15}, 2: {1: 5, 2: 3, cumScore: 23}, 3: {cumScore: 23}});
            expect(game.pinsAfter).to.equal(null);
            expect(game.currentFrame).to.equal(3);
            expect(game.currentRoll).to.equal(1);
            expect(game._isSpare(2)).to.equal(false);
            expect(game._boolSpareBonus).to.equal(false);
        });
        it("rolls a strike in the first frame and scores after", function() {
            var game = new BowlingGame();
            var pins = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            game.roll(pins);
            var pins2 = {1: true, 2: false, 3: true, 4: false, 5: true, 6: true, 7: true, 8: true, 9: true, 10: false};
            game.roll(pins2);
            var pins3 = {1: false, 2: false, 3: false, 4: false, 5: true, 6: true, 7: true, 8: true, 9: true, 10: false};
            game.roll(pins3);
            expect(game.score).to.deep.equal({1: {1: 10, cumScore: 15}, 2: {1: 3, 2: 2, cumScore: 20}, 3: {cumScore: 20}});
            expect(game.pinsAfter).to.equal(null);
            expect(game.currentFrame).to.equal(3);
            expect(game.currentRoll).to.equal(1);
            expect(game._isStrike(1)).to.equal(true);
            expect(game._boolStrikeBonus1).to.equal(false);
            expect(game._boolStrikeBonus2).to.equal(false);
            expect(game._boolSpareBonus).to.equal(false);
            var pins4 = {1: true, 2: true, 3: true, 4: true, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            game.roll(pins4);
            expect(game.score).to.deep.equal({1: {1: 10, cumScore: 15}, 2: {1: 3, 2: 2, cumScore: 20}, 3: {1: 6, cumScore: 26}});
            expect(game.pinsAfter).to.deep.equal(pins4);
            expect(game.currentFrame).to.equal(3);
            expect(game.currentRoll).to.equal(2);
            expect(game._isStrike(2)).to.equal(false);
            expect(game._boolStrikeBonus1).to.equal(false);
            expect(game._boolStrikeBonus2).to.equal(false);
            expect(game._boolSpareBonus).to.equal(false);
        });
        it("rolls three strike in a row and scores after", function() {
            var game = new BowlingGame();
            var strike = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            game.roll(strike);
            game.roll(strike);
            game.roll(strike);
            expect(game.score).to.deep.equal({1: {1: 10, cumScore: 30}, 2: {1: 10, cumScore: 50}, 3: {1: 10, cumScore: 60}, 4: {cumScore: 60}});
            expect(game.pinsAfter).to.equal(null);
            expect(game.currentFrame).to.equal(4);
            expect(game.currentRoll).to.equal(1);
            expect(game._isStrike(1)).to.equal(true);
            expect(game._isStrike(2)).to.equal(true);
            expect(game._isStrike(3)).to.equal(true);
            expect(game._boolStrikeBonus1).to.equal(true);
            expect(game._boolStrikeBonus2).to.equal(true);
            expect(game._boolSpareBonus).to.equal(false);
            var pins1 = {1: true, 2: false, 3: false, 4: false, 5: false, 6: false, 7: true, 8: false, 9: false, 10: true};
            game.roll(pins1);
            expect(game.score).to.deep.equal({1: {1: 10, cumScore: 30}, 2: {1: 10, cumScore: 57}, 3: {1: 10, cumScore: 74}, 4: {1: 7, cumScore: 81}});
            expect(game.pinsAfter).to.deep.equal(pins1);
            expect(game.currentFrame).to.equal(4);
            expect(game.currentRoll).to.equal(2);
            expect(game._isStrike(4)).to.equal(false);
            expect(game._boolStrikeBonus1).to.equal(false);
            expect(game._boolStrikeBonus2).to.equal(true);
            expect(game._boolSpareBonus).to.equal(false);
            var pins2 = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: true};
            game.roll(pins2);
            expect(game.score).to.deep.equal({1: {1: 10, cumScore: 30}, 2: {1: 10, cumScore: 57}, 3: {1: 10, cumScore: 76}, 4: {1: 7, 2: 2, cumScore: 85}, 5: {cumScore: 85}});
            expect(game.pinsAfter).to.equal(null);
            expect(game.currentFrame).to.equal(5);
            expect(game.currentRoll).to.equal(1);
            expect(game._isStrike(4)).to.equal(false);
            expect(game._boolStrikeBonus1).to.equal(false);
            expect(game._boolStrikeBonus2).to.equal(false);
            expect(game._boolSpareBonus).to.equal(false);
        });
        it("rolls a combination of spare and strikes", function() {
            var game = new BowlingGame();
            var pins1 = {1: true, 2: false, 3: false, 4: false, 5: false, 6: false, 7: true, 8: false, 9: false, 10: true};
            game.roll(pins1);
            var pins2 = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            game.roll(pins2);
            var strike = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            game.roll(strike);
            game.roll(strike);
            game.roll(pins1);
            game.roll(pins2);
            game.roll(pins1);
            expect(game.score).to.deep.equal({1: {1: 7, 2: 3, cumScore: 20}, 2: {1: 10, cumScore: 47}, 3: {1: 10, cumScore: 67}, 4: {1: 7, 2: 3, cumScore: 84}, 5: {1: 7, cumScore: 91}});
            expect(game.pinsAfter).to.deep.equal(pins1);
            expect(game.currentFrame).to.equal(5);
            expect(game.currentRoll).to.equal(2);
            expect(game._isSpare(1)).to.equal(true);
            expect(game._isStrike(1)).to.equal(false);
            expect(game._isSpare(2)).to.equal(false);
            expect(game._isStrike(2)).to.equal(true);
            expect(game._isSpare(3)).to.equal(false);
            expect(game._isStrike(3)).to.equal(true);
            expect(game._isSpare(4)).to.equal(true);
            expect(game._isStrike(4)).to.equal(false);
            expect(game._isSpare(5)).to.equal(false);
            expect(game._isStrike(5)).to.equal(false);
            expect(game._boolStrikeBonus1).to.equal(false);
            expect(game._boolStrikeBonus2).to.equal(false);
            expect(game._boolSpareBonus).to.equal(false);
        });
        it("gutter game", function() {
            var game = new BowlingGame();
            var gutter = {1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true, 10: true};
            expect(game._isEndOfGame()).to.equal(false);
            for (var i = 0; i < 20; i += 1) {
                game.roll(gutter);
            }
            expect(game.score).to.deep.equal({1: {1: 0, 2: 0, cumScore: 0}, 2: {1: 0, 2: 0, cumScore: 0}, 3: {1: 0, 2: 0, cumScore: 0}, 4: {1: 0, 2: 0, cumScore: 0}, 5: {1: 0, 2: 0, cumScore: 0}, 6: {1: 0, 2: 0, cumScore: 0}, 7: {1: 0, 2: 0, cumScore: 0}, 8: {1: 0, 2: 0, cumScore: 0}, 9: {1: 0, 2: 0, cumScore: 0}, 10: {1: 0, 2: 0, cumScore: 0}});
            expect(game.pinsAfter).to.deep.equal(gutter);
            expect(game.currentFrame).to.equal(10);
            expect(game.currentRoll).to.equal(2);
            expect(game._isEndOfGame()).to.equal(true);
        });
        it("perfect game", function() {
            var game = new BowlingGame();
            var strike = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            for (var i = 0; i < 12; i += 1) {
                game.roll(strike);
            }
            expect(game.pinsAfter).to.deep.equal(strike);
            expect(game.currentFrame).to.equal(10);
            expect(game.currentRoll).to.equal(3);
            expect(game._isEndOfGame()).to.equal(true);
            expect(game.score).to.deep.equal({1: {1: 10, cumScore: 30}, 2: {1: 10, cumScore: 60}, 3: {1: 10, cumScore: 90}, 4: {1: 10, cumScore: 120}, 5: {1: 10, cumScore: 150}, 6: {1: 10, cumScore: 180}, 7: {1: 10, cumScore: 210}, 8: {1: 10, cumScore: 240}, 9: {1: 10, cumScore: 270}, 10: {1: 10, 2: 10, 3: 10, cumScore: 300}});
            expect(game._boolStrikeBonus1).to.equal(false);
            expect(game._boolStrikeBonus2).to.equal(false);
            expect(game._boolSpareBonus).to.equal(false);
        });
    });
});

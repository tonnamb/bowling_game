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
        it("all 1 game", function() {
            var game = new BowlingGame();
            var pins1 = {1: false, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true, 10: true};
            var pins2 = {1: false, 2: false, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true, 10: true};
            for (var i = 0; i < 10; i += 1) {
                game.roll(pins1);
                game.roll(pins2);
            }
            expect(game.pinsAfter).to.deep.equal(pins2);
            expect(game.currentFrame).to.equal(10);
            expect(game.currentRoll).to.equal(2);
            expect(game._isEndOfGame()).to.equal(true);
            expect(game.score).to.deep.equal({1: {1: 1, 2: 1, cumScore: 2}, 2: {1: 1, 2: 1, cumScore: 4}, 3: {1: 1, 2: 1, cumScore: 6}, 4: {1: 1, 2: 1, cumScore: 8}, 5: {1: 1, 2: 1, cumScore: 10}, 6: {1: 1, 2: 1, cumScore: 12}, 7: {1: 1, 2: 1, cumScore: 14}, 8: {1: 1, 2: 1, cumScore: 16}, 9: {1: 1, 2: 1, cumScore: 18}, 10: {1: 1, 2: 1, cumScore: 20}});
            expect(game._boolStrikeBonus1).to.equal(false);
            expect(game._boolStrikeBonus2).to.equal(false);
            expect(game._boolSpareBonus).to.equal(false);
        });
        it("10th frame: strike then spare", function () {
            var game = new BowlingGame();
            var strike = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            for (var i = 0; i < 10; i += 1) {
                game.roll(strike);
            }
            var pins1 = {1: true, 2: false, 3: true, 4: false, 5: true, 6: false, 7: false, 8: false, 9: false, 10: false};
            game.roll(pins1);
            var pins2 = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            game.roll(pins2);
            expect(game.currentFrame).to.equal(10);
            expect(game.currentRoll).to.equal(3);
            expect(game._isEndOfGame()).to.equal(true);
            expect(game.score).to.deep.equal({1: {1: 10, cumScore: 30}, 2: {1: 10, cumScore: 60}, 3: {1: 10, cumScore: 90}, 4: {1: 10, cumScore: 120}, 5: {1: 10, cumScore: 150}, 6: {1: 10, cumScore: 180}, 7: {1: 10, cumScore: 210}, 8: {1: 10, cumScore: 240}, 9: {1: 10, cumScore: 267}, 10: {1: 10, 2: 7, 3: 3, cumScore: 287}});
            expect(game.pinsAfter).to.deep.equal(pins2);
            expect(game._boolStrikeBonus1).to.equal(false);
            expect(game._boolStrikeBonus2).to.equal(false);
            expect(game._boolSpareBonus).to.equal(false);
        });
        it("10th frame: strike, strike, then score", function() {
            var game = new BowlingGame();
            var strike = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            for (var i = 0; i < 11; i += 1) {
                game.roll(strike);
            }
            expect(game._isEndOfGame()).to.equal(false);
            var pins1 = {1: true, 2: false, 3: true, 4: false, 5: true, 6: false, 7: false, 8: false, 9: false, 10: false};
            game.roll(pins1);
            expect(game.currentFrame).to.equal(10);
            expect(game.currentRoll).to.equal(3);
            expect(game._isEndOfGame()).to.equal(true);
            expect(game.score).to.deep.equal({1: {1: 10, cumScore: 30}, 2: {1: 10, cumScore: 60}, 3: {1: 10, cumScore: 90}, 4: {1: 10, cumScore: 120}, 5: {1: 10, cumScore: 150}, 6: {1: 10, cumScore: 180}, 7: {1: 10, cumScore: 210}, 8: {1: 10, cumScore: 240}, 9: {1: 10, cumScore: 270}, 10: {1: 10, 2: 10, 3: 7, cumScore: 297}});
            expect(game.pinsAfter).to.deep.equal(pins1);
            expect(game._boolStrikeBonus1).to.equal(false);
            expect(game._boolStrikeBonus2).to.equal(false);
            expect(game._boolSpareBonus).to.equal(false);
        });
        it("10th frame: spare then strike", function() {
            var game = new BowlingGame();
            var strike = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            for (var i = 0; i < 9; i += 1) {
                game.roll(strike);
            }
            var pins1 = {1: true, 2: false, 3: true, 4: false, 5: true, 6: false, 7: false, 8: false, 9: false, 10: false};
            game.roll(pins1);
            var pins2 = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            game.roll(pins2);
            expect(game._isEndOfGame()).to.equal(false);
            game.roll(strike);
            expect(game.currentFrame).to.equal(10);
            expect(game.currentRoll).to.equal(3);
            expect(game._isEndOfGame()).to.equal(true);
            expect(game.score).to.deep.equal({1: {1: 10, cumScore: 30}, 2: {1: 10, cumScore: 60}, 3: {1: 10, cumScore: 90}, 4: {1: 10, cumScore: 120}, 5: {1: 10, cumScore: 150}, 6: {1: 10, cumScore: 180}, 7: {1: 10, cumScore: 210}, 8: {1: 10, cumScore: 237}, 9: {1: 10, cumScore: 257}, 10: {1: 7, 2: 3, 3: 10, cumScore: 277}});
            expect(game.pinsAfter).to.deep.equal(strike);
            expect(game._boolStrikeBonus1).to.equal(false);
            expect(game._boolStrikeBonus2).to.equal(false);
            expect(game._boolSpareBonus).to.equal(false);
        });
        it("10th frame: spare then score", function() {
            var game = new BowlingGame();
            var strike = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            for (var i = 0; i < 9; i += 1) {
                game.roll(strike);
            }
            var pins1 = {1: true, 2: false, 3: true, 4: false, 5: true, 6: false, 7: false, 8: false, 9: false, 10: false};
            game.roll(pins1);
            var pins2 = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            game.roll(pins2);
            expect(game._isEndOfGame()).to.equal(false);
            var pins3 = {1: true, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            game.roll(pins3);
            expect(game.currentFrame).to.equal(10);
            expect(game.currentRoll).to.equal(3);
            expect(game._isEndOfGame()).to.equal(true);
            expect(game.score).to.deep.equal({1: {1: 10, cumScore: 30}, 2: {1: 10, cumScore: 60}, 3: {1: 10, cumScore: 90}, 4: {1: 10, cumScore: 120}, 5: {1: 10, cumScore: 150}, 6: {1: 10, cumScore: 180}, 7: {1: 10, cumScore: 210}, 8: {1: 10, cumScore: 237}, 9: {1: 10, cumScore: 257}, 10: {1: 7, 2: 3, 3: 9, cumScore: 276}});
            expect(game.pinsAfter).to.deep.equal(pins3);
            expect(game._boolStrikeBonus1).to.equal(false);
            expect(game._boolStrikeBonus2).to.equal(false);
            expect(game._boolSpareBonus).to.equal(false);
        });
        it("game with a variety of scores, strike and spares", function() {
            // sample score at http://bowling.about.com/od/rulesofthegame/a/bowlingscoring.htm
            var game = new BowlingGame();
            var allout = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            // Frame 1
            game.roll(allout); // Strike
            // Frame 2
            var pins7 = {1: true, 2: true, 3: true, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            game.roll(pins7);
            game.roll(allout); // Spare
            // Frame 3
            game.roll(pins7);
            var pins9 = {1: true, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            game.roll(pins9);
            // Frame 4
            game.roll(pins9);
            game.roll(allout); // Spare
            // Frame 5
            game.roll(allout); // Strike
            // Frame 6
            game.roll(allout); // Strike
            // Frame 7
            game.roll(allout); // Strike
            // Frame 8
            var pins2 = {1: false, 2: false, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true, 10: true};
            game.roll(pins2);
            var pins5 = {1: false, 2: false, 3: true, 4: true, 5: true, 6: true, 7: true, 8: false, 9: false, 10: false};
            game.roll(pins5);
            // Frame 9
            var pins6 = {1: false, 2: false, 3: true, 4: true, 5: false, 6: true, 7: true, 8: false, 9: false, 10: false};
            game.roll(pins6);
            game.roll(allout); // Spare
            // Frame 10
            game.roll(pins7);
            game.roll(allout); // Spare
            var pins3 = {1: false, 2: false, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: false, 10: true};
            game.roll(pins3);
            // End of game
            expect(game.currentFrame).to.equal(10);
            expect(game.currentRoll).to.equal(3);
            expect(game._isEndOfGame()).to.equal(true);
            expect(game.score).to.deep.equal({1: {1: 10, cumScore: 20}, 2: {1: 7, 2: 3, cumScore: 37}, 3: {1: 7, 2: 2, cumScore: 46}, 4: {1: 9, 2: 1, cumScore: 66}, 5: {1: 10, cumScore: 96}, 6: {1: 10, cumScore: 118}, 7: {1: 10, cumScore: 133}, 8: {1: 2, 2: 3, cumScore: 138}, 9: {1: 6, 2: 4, cumScore: 155}, 10: {1: 7, 2: 3, 3: 3, cumScore: 168}});
            expect(game.pinsAfter).to.deep.equal(pins3);
            expect(game._boolStrikeBonus1).to.equal(false);
            expect(game._boolStrikeBonus2).to.equal(false);
            expect(game._boolSpareBonus).to.equal(false);
        });
    });
    describe("writeScoreBoard()", function() {
        it("rolls the first ball, displays as string", function() {
            var game = new BowlingGame();
           var pins6 = {1: false, 2: true, 3: true, 4: true, 5: true, 6: false, 7: false, 8: false, 9: false, 10: false};
           game.roll(pins6);
           var scoreBoard = game.writeScoreBoard();
           expect(scoreBoard).to.deep.equal({1: {1: '6', 2: '', cumScore: ''}});
           expect(scoreBoard[1][1]).to.be.a('string');
           expect(scoreBoard[1][2]).to.be.a('string');
           expect(scoreBoard[1].cumScore).to.be.a('string');
        });
        it("hides next frame score", function() {
           var game = new BowlingGame();
           var pins6 = {1: false, 2: true, 3: true, 4: true, 5: true, 6: false, 7: false, 8: false, 9: false, 10: false};
           game.roll(pins6);
           var pins3 = {1: false, 2: false, 3: false, 4: false, 5: true, 6: false, 7: false, 8: false, 9: false, 10: false};
           game.roll(pins3);
           var scoreBoard = game.writeScoreBoard();
           expect(scoreBoard).to.deep.equal({1: {1: '6', 2: '3', cumScore: '9'}});
       });
       it("strike: show as X and hides unfinished scores", function() {
           var game = new BowlingGame();
           var strike = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
           game.roll(strike);
           var scoreBoard = game.writeScoreBoard();
           expect(scoreBoard).to.deep.equal({1: {1: '', 2: 'X', cumScore: ''}});
       });
       it("strike: shows unfinished scores after sufficient rolls", function() {
           var game = new BowlingGame();
           var strike = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
           game.roll(strike);
           var pins6 = {1: false, 2: true, 3: true, 4: true, 5: true, 6: false, 7: false, 8: false, 9: false, 10: false};
           game.roll(pins6);
           var pins3 = {1: false, 2: false, 3: false, 4: false, 5: true, 6: false, 7: false, 8: false, 9: false, 10: false};
           game.roll(pins3);
           var scoreBoard = game.writeScoreBoard();
           expect(scoreBoard).to.deep.equal({1: {1: '', 2: 'X', cumScore: '19'}, 2: {1: '6', 2: '3', cumScore: '28'}});
           
           var game2 = new BowlingGame();
           game2.roll(strike);
           game2.roll(strike);
           game2.roll(strike);
           var scoreBoard2 = game2.writeScoreBoard();
           expect(scoreBoard2).to.deep.equal({1: {1: '', 2: 'X', cumScore: '30'}, 2: {1: '', 2: 'X', cumScore: ''}, 3: {1: '', 2: 'X', cumScore: ''}});
           
           var game3 = new BowlingGame();
           game3.roll(strike);
           game3.roll(pins6);
           game3.roll(strike);
           var scoreBoard3 = game3.writeScoreBoard();
           expect(scoreBoard3).to.deep.equal({1: {1: '', 2: 'X', cumScore: '20'}, 2: {1: '6', 2: '/', cumScore: ''}});
           
       });
       it("spare: show as / and hides unfinished scores", function() {
           var game = new BowlingGame();
           var pins6 = {1: false, 2: true, 3: true, 4: true, 5: true, 6: false, 7: false, 8: false, 9: false, 10: false};
           game.roll(pins6);
           var pins4 = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
           game.roll(pins4);
           var scoreBoard = game.writeScoreBoard();
           expect(scoreBoard).to.deep.equal({1: {1: '6', 2: '/', cumScore: ''}});
       });
       it("spare: shows unfinished scores after sufficient rolls", function() {
           var game = new BowlingGame();
           var pins6 = {1: false, 2: true, 3: true, 4: true, 5: true, 6: false, 7: false, 8: false, 9: false, 10: false};
           game.roll(pins6);
           var pins4 = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
           game.roll(pins4);
           var pins7 = {1: false, 2: false, 3: true, 4: true, 5: true, 6: false, 7: false, 8: false, 9: false, 10: false};
           game.roll(pins7);
           var scoreBoard = game.writeScoreBoard();
           expect(scoreBoard).to.deep.equal({1: {1: '6', 2: '/', cumScore: '17'}, 2: {1: '7', 2: '', cumScore: ''}});
           
           var game2 = new BowlingGame();
           var pins6 = {1: false, 2: true, 3: true, 4: true, 5: true, 6: false, 7: false, 8: false, 9: false, 10: false};
           game2.roll(pins6);
           var pins4 = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
           game2.roll(pins4);
           var strike = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
           game2.roll(strike);
           var scoreBoard2 = game2.writeScoreBoard();
           expect(scoreBoard2).to.deep.equal({1: {1: '6', 2: '/', cumScore: '20'}, 2: {1: '', 2: 'X', cumScore: ''}});
       });
       it("does not mutate this.score", function() {
           var game = new BowlingGame();
           var strike = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
           game.roll(strike);
           var scoreBoard = game.writeScoreBoard();
           expect(scoreBoard).to.deep.equal({1: {1: '', 2: 'X', cumScore: ''}});
           expect(game.score).to.deep.equal({1: {1: 10, cumScore: 10}, 2: {cumScore: 10}});
       });
       it("displays 0 as - for pins rolled but not cumulative score", function() {
           var game = new BowlingGame();
           var gutter = {1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true, 10: true};
           game.roll(gutter);
           game.roll(gutter);
           game.roll(gutter);
           var scoreBoard = game.writeScoreBoard();
           expect(scoreBoard).to.deep.equal({1: {1: '-', 2: '-', cumScore: '0'}, 2: {1: '-', 2: '', cumScore: ''}});
       });
    });
});

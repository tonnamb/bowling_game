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
            expect(game.score).to.deep.equal({1: {1: 7, 2: 3, cumScore: 15}, 2: {1: 5, cumScore: 15}});
            expect(game.pinsAfter).to.deep.equal(pins3);
            expect(game.currentFrame).to.equal(2);
            expect(game.currentRoll).to.equal(2);
            expect(game._isSpare(1)).to.equal(true);
            expect(game._boolSpareBonus).to.equal(false);
            var pins4 = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: true, 9: true, 10: false};
            game.roll(pins4);
            expect(game.score).to.deep.equal({1: {1: 7, 2: 3, cumScore: 15}, 2: {1: 5, 2: 3, cumScore: 18}, 3: {cumScore: 18}});
            expect(game.pinsAfter).to.equal(null);
            expect(game.currentFrame).to.equal(3);
            expect(game.currentRoll).to.equal(1);
            expect(game._isSpare(2)).to.equal(false);
            expect(game._boolSpareBonus).to.equal(false);
        });
    });
});

'use strict';

import BowlingGame from '../../src/BowlingGame.js';

import chai from 'chai';
var expect = chai.expect;

describe("BowlingGame", function() {
    describe("this.modifyScore(frame, roll, newScore)", function() {
        it("modify finished game with small stand-alone change", function() {
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
            game.modifyScore(3, 2, 1);
            expect(game.currentFrame).to.equal(10);
            expect(game.currentRoll).to.equal(3);
            expect(game._isEndOfGame()).to.equal(true);
            expect(game.score).to.deep.equal({1: {1: 10, cumScore: 20}, 2: {1: 7, 2: 3, cumScore: 37}, 3: {1: 7, 2: 1, cumScore: 45}, 4: {1: 9, 2: 1, cumScore: 65}, 5: {1: 10, cumScore: 95}, 6: {1: 10, cumScore: 117}, 7: {1: 10, cumScore: 132}, 8: {1: 2, 2: 3, cumScore: 137}, 9: {1: 6, 2: 4, cumScore: 154}, 10: {1: 7, 2: 3, 3: 3, cumScore: 167}});
            expect(game.pinsAfter).to.deep.equal(pins3);
            expect(game._boolStrikeBonus1).to.equal(false);
            expect(game._boolStrikeBonus2).to.equal(false);
            expect(game._boolSpareBonus).to.equal(false);
        });
        it("modify unfinished game with small stand-alone change", function() {
            var game = new BowlingGame();
            var allout = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            // Frame 1
            game.roll(allout); // Strike
            // Frame 2
            var pins7 = {1: true, 2: true, 3: true, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            game.roll(pins7);
            game.roll(allout); // Spare
            // Frame 3
            game.roll(allout);
            expect(game.currentFrame).to.equal(4);
            expect(game.currentRoll).to.equal(1);
            expect(game._isEndOfGame()).to.equal(false);
            expect(game.score).to.deep.equal({1: {1: 10, cumScore: 20}, 2: {1: 7, 2: 3, cumScore: 40}, 3: {1: 10, cumScore: 50}, 4: {cumScore: 50}});
            expect(game.pinsAfter).to.deep.equal(null);
            expect(game._boolStrikeBonus1).to.equal(true);
            expect(game._boolStrikeBonus2).to.equal(false);
            expect(game._boolSpareBonus).to.equal(false);
            
            game.modifyScore(2, 1, 5);
            
            expect(game.currentFrame).to.equal(4);
            expect(game.currentRoll).to.equal(1);
            expect(game._isEndOfGame()).to.equal(false);
            expect(game.score).to.deep.equal({1: {1: 10, cumScore: 18}, 2: {1: 5, 2: 3, cumScore: 26}, 3: {1: 10, cumScore: 36}, 4: {cumScore: 36}});
            expect(game.pinsAfter).to.deep.equal(null);
            expect(game._boolStrikeBonus1).to.equal(true);
            expect(game._boolStrikeBonus2).to.equal(false);
            expect(game._boolSpareBonus).to.equal(false);
        });
    });
});
'use strict';

import BowlingGame from '../../src/BowlingGame.js';

var chai = require('chai');
var expect = chai.expect;

describe("BowlingGame", function() {
    describe("this.writeScoreBoard()", function() {
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
       });
       it("strike: three strikes in a row", function() {
           var game = new BowlingGame();
           var strike = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
           game.roll(strike);
           game.roll(strike);
           game.roll(strike);
           var scoreBoard = game.writeScoreBoard();
           expect(scoreBoard).to.deep.equal({1: {1: '', 2: 'X', cumScore: '30'}, 2: {1: '', 2: 'X', cumScore: ''}, 3: {1: '', 2: 'X', cumScore: ''}});
       });
       it("strike then spare", function() {
           var game = new BowlingGame();
           var allout = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
           game.roll(allout);
           var pins6 = {1: false, 2: true, 3: true, 4: true, 5: true, 6: false, 7: false, 8: false, 9: false, 10: false};
           game.roll(pins6);
           game.roll(allout);
           var scoreBoard = game.writeScoreBoard();
           expect(scoreBoard).to.deep.equal({1: {1: '', 2: 'X', cumScore: '20'}, 2: {1: '6', 2: '/', cumScore: ''}});
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
       });
       it("spare then strike", function() {
           var game = new BowlingGame();
           var pins6 = {1: false, 2: true, 3: true, 4: true, 5: true, 6: false, 7: false, 8: false, 9: false, 10: false};
           game.roll(pins6);
           var pins4 = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
           game.roll(pins4);
           var strike = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
           game.roll(strike);
           var scoreBoard = game.writeScoreBoard();
           expect(scoreBoard).to.deep.equal({1: {1: '6', 2: '/', cumScore: '20'}, 2: {1: '', 2: 'X', cumScore: ''}});
       });
       it("does not mutate this.score", function() {
           var game = new BowlingGame();
           var strike = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
           game.roll(strike);
           var scoreBoard = game.writeScoreBoard();
           expect(scoreBoard).to.deep.equal({1: {1: '', 2: 'X', cumScore: ''}});
           expect(game.score).to.deep.equal({1: {1: 10, cumScore: 10}, 2: {cumScore: 10}});
       });
       it("displays 0 as '-' for pins rolled but not cumulative score", function() {
           var game = new BowlingGame();
           var gutter = {1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true, 10: true};
           game.roll(gutter);
           game.roll(gutter);
           game.roll(gutter);
           var scoreBoard = game.writeScoreBoard();
           expect(scoreBoard).to.deep.equal({1: {1: '-', 2: '-', cumScore: '0'}, 2: {1: '-', 2: '', cumScore: ''}});
       });
       it("gutter game", function() {
           var game = new BowlingGame();
           var gutter = {1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true, 10: true};
           for (var i = 0; i < 20; i += 1) {
               game.roll(gutter);
           }
           var scoreBoard = game.writeScoreBoard();
           expect(scoreBoard).to.deep.equal({1: {1: '-', 2: '-', cumScore: '0'}, 2: {1: '-', 2: '-', cumScore: '0'}, 3: {1: '-', 2: '-', cumScore: '0'}, 4: {1: '-', 2: '-', cumScore: '0'}, 5: {1: '-', 2: '-', cumScore: '0'}, 6: {1: '-', 2: '-', cumScore: '0'}, 7: {1: '-', 2: '-', cumScore: '0'}, 8: {1: '-', 2: '-', cumScore: '0'}, 9: {1: '-', 2: '-', cumScore: '0'}, 10: {1: '-', 2: '-', 3: '', cumScore: '0'}});
       })
       it('10th frame: strike then score', function() {
            var game = new BowlingGame();
            var strike = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            for (var i = 0; i < 10; i += 1) {
                game.roll(strike);
            }
            var pins1 = {1: true, 2: false, 3: true, 4: false, 5: true, 6: false, 7: false, 8: false, 9: false, 10: false};
            game.roll(pins1);
            var pins2 = {1: true, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            game.roll(pins2);
            var scoreBoard = game.writeScoreBoard();
            expect(scoreBoard).to.deep.equal({1: {1: '', 2: 'X', cumScore: '30'}, 2: {1: '', 2: 'X', cumScore: '60'}, 3: {1: '', 2: 'X', cumScore: '90'}, 4: {1: '', 2: 'X', cumScore: '120'}, 5: {1: '', 2: 'X', cumScore: '150'}, 6: {1: '', 2: 'X', cumScore: '180'}, 7: {1: '', 2: 'X', cumScore: '210'}, 8: {1: '', 2: 'X', cumScore: '240'}, 9: {1: '', 2: 'X', cumScore: '267'}, 10: {1: 'X', 2: '7', 3: '2', cumScore: '286'}});
       });
       it('10th frame: strike then spare', function() {
            var game = new BowlingGame();
            var strike = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            for (var i = 0; i < 10; i += 1) {
                game.roll(strike);
            }
            var pins1 = {1: true, 2: false, 3: true, 4: false, 5: true, 6: false, 7: false, 8: false, 9: false, 10: false};
            game.roll(pins1);
            var pins2 = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            game.roll(pins2);
            var scoreBoard = game.writeScoreBoard();
            expect(scoreBoard).to.deep.equal({1: {1: '', 2: 'X', cumScore: '30'}, 2: {1: '', 2: 'X', cumScore: '60'}, 3: {1: '', 2: 'X', cumScore: '90'}, 4: {1: '', 2: 'X', cumScore: '120'}, 5: {1: '', 2: 'X', cumScore: '150'}, 6: {1: '', 2: 'X', cumScore: '180'}, 7: {1: '', 2: 'X', cumScore: '210'}, 8: {1: '', 2: 'X', cumScore: '240'}, 9: {1: '', 2: 'X', cumScore: '267'}, 10: {1: 'X', 2: '7', 3: '/', cumScore: '287'}});
       });
       it('10th frame: strike, strike, then score', function() {
            var game = new BowlingGame();
            var strike = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            for (var i = 0; i < 11; i += 1) {
                game.roll(strike);
            }
            var pins1 = {1: true, 2: false, 3: true, 4: false, 5: true, 6: false, 7: false, 8: false, 9: false, 10: false};
            game.roll(pins1);
            var scoreBoard = game.writeScoreBoard();
            expect(scoreBoard).to.deep.equal({1: {1: '', 2: 'X', cumScore: '30'}, 2: {1: '', 2: 'X', cumScore: '60'}, 3: {1: '', 2: 'X', cumScore: '90'}, 4: {1: '', 2: 'X', cumScore: '120'}, 5: {1: '', 2: 'X', cumScore: '150'}, 6: {1: '', 2: 'X', cumScore: '180'}, 7: {1: '', 2: 'X', cumScore: '210'}, 8: {1: '', 2: 'X', cumScore: '240'}, 9: {1: '', 2: 'X', cumScore: '270'}, 10: {1: 'X', 2: 'X', 3: '7', cumScore: '297'}});
       });
       it('10th frame: triple strike', function() {
            var game = new BowlingGame();
            var strike = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            for (var i = 0; i < 12; i += 1) {
                game.roll(strike);
            }
            var scoreBoard = game.writeScoreBoard();
            expect(scoreBoard).to.deep.equal({1: {1: '', 2: 'X', cumScore: '30'}, 2: {1: '', 2: 'X', cumScore: '60'}, 3: {1: '', 2: 'X', cumScore: '90'}, 4: {1: '', 2: 'X', cumScore: '120'}, 5: {1: '', 2: 'X', cumScore: '150'}, 6: {1: '', 2: 'X', cumScore: '180'}, 7: {1: '', 2: 'X', cumScore: '210'}, 8: {1: '', 2: 'X', cumScore: '240'}, 9: {1: '', 2: 'X', cumScore: '270'}, 10: {1: 'X', 2: 'X', 3: 'X', cumScore: '300'}});
       });
       it('10th frame: strike, strike, unfinished game', function() {
            var game = new BowlingGame();
            var strike = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            for (var i = 0; i < 11; i += 1) {
                game.roll(strike);
            }
            var scoreBoard = game.writeScoreBoard();
            expect(scoreBoard).to.deep.equal({1: {1: '', 2: 'X', cumScore: '30'}, 2: {1: '', 2: 'X', cumScore: '60'}, 3: {1: '', 2: 'X', cumScore: '90'}, 4: {1: '', 2: 'X', cumScore: '120'}, 5: {1: '', 2: 'X', cumScore: '150'}, 6: {1: '', 2: 'X', cumScore: '180'}, 7: {1: '', 2: 'X', cumScore: '210'}, 8: {1: '', 2: 'X', cumScore: '240'}, 9: {1: '', 2: 'X', cumScore: '270'}, 10: {1: 'X', 2: 'X', 3: '', cumScore: ''}});
       });
       it('10th frame: strike, score, unfinished game', function() {
            var game = new BowlingGame();
            var strike = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            for (var i = 0; i < 10; i += 1) {
                game.roll(strike);
            }
            var pins1 = {1: true, 2: true, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            game.roll(pins1);
            var scoreBoard = game.writeScoreBoard();
            expect(scoreBoard).to.deep.equal({1: {1: '', 2: 'X', cumScore: '30'}, 2: {1: '', 2: 'X', cumScore: '60'}, 3: {1: '', 2: 'X', cumScore: '90'}, 4: {1: '', 2: 'X', cumScore: '120'}, 5: {1: '', 2: 'X', cumScore: '150'}, 6: {1: '', 2: 'X', cumScore: '180'}, 7: {1: '', 2: 'X', cumScore: '210'}, 8: {1: '', 2: 'X', cumScore: '240'}, 9: {1: '', 2: 'X', cumScore: '268'}, 10: {1: 'X', 2: '8', 3: '', cumScore: ''}});
       });
       it('10th frame: strike, unfinished game', function() {
            var game = new BowlingGame();
            var strike = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            for (var i = 0; i < 10; i += 1) {
                game.roll(strike);
            }
            var scoreBoard = game.writeScoreBoard();
            expect(scoreBoard).to.deep.equal({1: {1: '', 2: 'X', cumScore: '30'}, 2: {1: '', 2: 'X', cumScore: '60'}, 3: {1: '', 2: 'X', cumScore: '90'}, 4: {1: '', 2: 'X', cumScore: '120'}, 5: {1: '', 2: 'X', cumScore: '150'}, 6: {1: '', 2: 'X', cumScore: '180'}, 7: {1: '', 2: 'X', cumScore: '210'}, 8: {1: '', 2: 'X', cumScore: '240'}, 9: {1: '', 2: 'X', cumScore: ''}, 10: {1: 'X', 2: '', 3: '', cumScore: ''}});
       });
       it('10th frame: strike then all gutter', function() {
            var game = new BowlingGame();
            var strike = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            for (var i = 0; i < 10; i += 1) {
                game.roll(strike);
            }
            var gutter = {1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true, 10: true};
            game.roll(gutter);
            game.roll(gutter);
            var scoreBoard = game.writeScoreBoard();
            expect(scoreBoard).to.deep.equal({1: {1: '', 2: 'X', cumScore: '30'}, 2: {1: '', 2: 'X', cumScore: '60'}, 3: {1: '', 2: 'X', cumScore: '90'}, 4: {1: '', 2: 'X', cumScore: '120'}, 5: {1: '', 2: 'X', cumScore: '150'}, 6: {1: '', 2: 'X', cumScore: '180'}, 7: {1: '', 2: 'X', cumScore: '210'}, 8: {1: '', 2: 'X', cumScore: '240'}, 9: {1: '', 2: 'X', cumScore: '260'}, 10: {1: 'X', 2: '-', 3: '-', cumScore: '270'}});
       });
       it('10th frame: spare then score', function() {
            var game = new BowlingGame();
            var strike = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            for (var i = 0; i < 9; i += 1) {
                game.roll(strike);
            }
            var pins1 = {1: true, 2: false, 3: true, 4: false, 5: true, 6: false, 7: false, 8: false, 9: false, 10: false};
            game.roll(pins1);
            var pins2 = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            game.roll(pins2);
            game.roll(pins1);
            var scoreBoard = game.writeScoreBoard();
            expect(scoreBoard).to.deep.equal({1: {1: '', 2: 'X', cumScore: '30'}, 2: {1: '', 2: 'X', cumScore: '60'}, 3: {1: '', 2: 'X', cumScore: '90'}, 4: {1: '', 2: 'X', cumScore: '120'}, 5: {1: '', 2: 'X', cumScore: '150'}, 6: {1: '', 2: 'X', cumScore: '180'}, 7: {1: '', 2: 'X', cumScore: '210'}, 8: {1: '', 2: 'X', cumScore: '237'}, 9: {1: '', 2: 'X', cumScore: '257'}, 10: {1: '7', 2: '/', 3: '7', cumScore: '274'}});
       });
       it('10th frame: spare then strike', function() {
            var game = new BowlingGame();
            var strike = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            for (var i = 0; i < 9; i += 1) {
                game.roll(strike);
            }
            var pins1 = {1: true, 2: false, 3: true, 4: false, 5: true, 6: false, 7: false, 8: false, 9: false, 10: false};
            game.roll(pins1);
            var pins2 = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            game.roll(pins2);
            game.roll(strike);
            var scoreBoard = game.writeScoreBoard();
            expect(scoreBoard).to.deep.equal({1: {1: '', 2: 'X', cumScore: '30'}, 2: {1: '', 2: 'X', cumScore: '60'}, 3: {1: '', 2: 'X', cumScore: '90'}, 4: {1: '', 2: 'X', cumScore: '120'}, 5: {1: '', 2: 'X', cumScore: '150'}, 6: {1: '', 2: 'X', cumScore: '180'}, 7: {1: '', 2: 'X', cumScore: '210'}, 8: {1: '', 2: 'X', cumScore: '237'}, 9: {1: '', 2: 'X', cumScore: '257'}, 10: {1: '7', 2: '/', 3: 'X', cumScore: '277'}});
       });
       it('10th frame: spare then gutter', function() {
            var game = new BowlingGame();
            var strike = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            for (var i = 0; i < 9; i += 1) {
                game.roll(strike);
            }
            var pins1 = {1: true, 2: false, 3: true, 4: false, 5: true, 6: false, 7: false, 8: false, 9: false, 10: false};
            game.roll(pins1);
            var pins2 = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            game.roll(pins2);
            var gutter = {1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true, 10: true};
            game.roll(gutter);
            var scoreBoard = game.writeScoreBoard();
            expect(scoreBoard).to.deep.equal({1: {1: '', 2: 'X', cumScore: '30'}, 2: {1: '', 2: 'X', cumScore: '60'}, 3: {1: '', 2: 'X', cumScore: '90'}, 4: {1: '', 2: 'X', cumScore: '120'}, 5: {1: '', 2: 'X', cumScore: '150'}, 6: {1: '', 2: 'X', cumScore: '180'}, 7: {1: '', 2: 'X', cumScore: '210'}, 8: {1: '', 2: 'X', cumScore: '237'}, 9: {1: '', 2: 'X', cumScore: '257'}, 10: {1: '7', 2: '/', 3: '-', cumScore: '267'}});
       });
       it('10th frame: spare, unfinished game', function() {
            var game = new BowlingGame();
            var strike = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            for (var i = 0; i < 9; i += 1) {
                game.roll(strike);
            }
            var pins1 = {1: true, 2: false, 3: true, 4: false, 5: true, 6: false, 7: false, 8: false, 9: false, 10: false};
            game.roll(pins1);
            var pins2 = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            game.roll(pins2);
            var scoreBoard = game.writeScoreBoard();
            expect(scoreBoard).to.deep.equal({1: {1: '', 2: 'X', cumScore: '30'}, 2: {1: '', 2: 'X', cumScore: '60'}, 3: {1: '', 2: 'X', cumScore: '90'}, 4: {1: '', 2: 'X', cumScore: '120'}, 5: {1: '', 2: 'X', cumScore: '150'}, 6: {1: '', 2: 'X', cumScore: '180'}, 7: {1: '', 2: 'X', cumScore: '210'}, 8: {1: '', 2: 'X', cumScore: '237'}, 9: {1: '', 2: 'X', cumScore: '257'}, 10: {1: '7', 2: '/', 3: '', cumScore: ''}});
       });
       it('10th frame: scores open frame', function() {
            var game = new BowlingGame();
            var strike = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            for (var i = 0; i < 9; i += 1) {
                game.roll(strike);
            }
            var pins1 = {1: true, 2: false, 3: true, 4: false, 5: true, 6: false, 7: false, 8: false, 9: false, 10: false};
            game.roll(pins1);
            var pins2 = {1: true, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            game.roll(pins2);
            var scoreBoard = game.writeScoreBoard();
            expect(scoreBoard).to.deep.equal({1: {1: '', 2: 'X', cumScore: '30'}, 2: {1: '', 2: 'X', cumScore: '60'}, 3: {1: '', 2: 'X', cumScore: '90'}, 4: {1: '', 2: 'X', cumScore: '120'}, 5: {1: '', 2: 'X', cumScore: '150'}, 6: {1: '', 2: 'X', cumScore: '180'}, 7: {1: '', 2: 'X', cumScore: '210'}, 8: {1: '', 2: 'X', cumScore: '237'}, 9: {1: '', 2: 'X', cumScore: '256'}, 10: {1: '7', 2: '2', 3: '', cumScore: '265'}});
       });
       it('10th frame: scores, unfinished game', function() {
            var game = new BowlingGame();
            var strike = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false};
            for (var i = 0; i < 9; i += 1) {
                game.roll(strike);
            }
            var pins1 = {1: true, 2: false, 3: true, 4: false, 5: true, 6: false, 7: false, 8: false, 9: false, 10: false};
            game.roll(pins1);
            var scoreBoard = game.writeScoreBoard();
            expect(scoreBoard).to.deep.equal({1: {1: '', 2: 'X', cumScore: '30'}, 2: {1: '', 2: 'X', cumScore: '60'}, 3: {1: '', 2: 'X', cumScore: '90'}, 4: {1: '', 2: 'X', cumScore: '120'}, 5: {1: '', 2: 'X', cumScore: '150'}, 6: {1: '', 2: 'X', cumScore: '180'}, 7: {1: '', 2: 'X', cumScore: '210'}, 8: {1: '', 2: 'X', cumScore: '237'}, 9: {1: '', 2: 'X', cumScore: ''}, 10: {1: '7', 2: '', 3: '', cumScore: ''}});
       });
       it("game with a variety of scores, strikes and spares, tests in between", function() {
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
            var scoreBoard1 = game.writeScoreBoard();
            expect(scoreBoard1).to.deep.equal({1: {1: '', 2: 'X', cumScore: '20'}, 2: {1: '7', 2: '/', cumScore: '37'}, 3: {1: '7', 2: '2', cumScore: '46'}, 4: {1: '9', 2: '/', cumScore: ''}});
            // Frame 5
            game.roll(allout); // Strike
            // Frame 6
            game.roll(allout); // Strike
            // Frame 7
            game.roll(allout); // Strike
            // Frame 8
            var pins2 = {1: false, 2: false, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true, 10: true};
            game.roll(pins2);
            var scoreBoard2 = game.writeScoreBoard();
            expect(scoreBoard2).to.deep.equal({1: {1: '', 2: 'X', cumScore: '20'}, 2: {1: '7', 2: '/', cumScore: '37'}, 3: {1: '7', 2: '2', cumScore: '46'}, 4: {1: '9', 2: '/', cumScore: '66'}, 5: {1: '', 2: 'X', cumScore: '96'}, 6: {1: '', 2: 'X', cumScore: '118'}, 7: {1: '', 2: 'X', cumScore: ''}, 8: {1: '2', 2: '', cumScore: ''}});
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
            var scoreBoard3 = game.writeScoreBoard();
            expect(scoreBoard3).to.deep.equal({1: {1: '', 2: 'X', cumScore: '20'}, 2: {1: '7', 2: '/', cumScore: '37'}, 3: {1: '7', 2: '2', cumScore: '46'}, 4: {1: '9', 2: '/', cumScore: '66'}, 5: {1: '', 2: 'X', cumScore: '96'}, 6: {1: '', 2: 'X', cumScore: '118'}, 7: {1: '', 2: 'X', cumScore: '133'}, 8: {1: '2', 2: '3', cumScore: '138'}, 9: {1: '6', 2: '/', cumScore: '155'}, 10: {1: '7', 2: '/', 3: '3', cumScore: '168'}});
        });
    });
});
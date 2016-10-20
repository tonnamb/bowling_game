'use strict';

import BowlingGame from '../src/BowlingGame.js';

var chai = require('chai');
var expect = chai.expect;

describe("BowlingGame", function() {
    it("handle gutter game", function() {
        var game = new BowlingGame();
        for (var i = 0; i < 20; i++) {
            game.roll(0);
        }
        expect(game.score()).to.equal(0);
    });
});

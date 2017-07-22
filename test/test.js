var expect = require('chai').expect;
var wordSearchSolver = require('../index.js');

const matrix = [
        'abcdef',
        'ghijkl',
        'mnopqr',
        'stuvwx',
        'yzabcd',
        'efghij',
];

describe('Test matrix', function() {
  describe('Direction: right', function() {
    it('Should find the word, when its horizontal without touching the edges of the matrix', function() {
      const matrix = [
        'abcdef',
        'ghijkl',
        'mnopqr',
        'scatsx',
        'yzabcd',
        'efghij',
      ];
      assertMatrix(matrix, ['cats'], [3, 1], [3, 4]);
    });
    it('Should find the word, when its horizontal with touching the edges of the matrix', function() {
      const matrix = [
        'abcdef',
        'ghijkl',
        'mnopqr',
        'stuvwx',
        'letter',
        'efghij',
      ];
      assertMatrix(matrix, ['letter'], [4, 0], [4, 5]);
    });
  });
  describe('Direction: left', function() {
    it('Should find the word, when its horizontal without touching the edges of the matrix', function() {
      const matrix = [
        'abcdef',
        'ghijkl',
        'mnopqr',
        'sraepx',
        'yzabcd',
        'efghij',
      ];
      assertMatrix(matrix, ['pear'], [3, 4], [3, 1]);
    });
    it('Should find the word, when its horizontal with touching the edges of the matrix', function() {
      const matrix = [
        'abcdef',
        'ghijkl',
        'mnopqr',
        'stuvwx',
        'erutuf',
        'efghij',
      ];
      assertMatrix(matrix, ['future'], [4, 5], [4, 0]);
    });
  });
  describe('Direction: up', function() {
    it('Should find the word, when its horizontal without touching the edges of the matrix', function() {
      const matrix = [
        'abcdef',
        'gdijkl',
        'mropqr',
        'seuvwx',
        'ynabcd',
        'efghij',
      ];
      assertMatrix(matrix, ['nerd'], [4, 1], [1, 1]);
    });
    it('Should find the word, when its horizontal with touching the edges of the matrix', function() {
      const matrix = [
        'abcdsf',
        'ghijrl',
        'mnoper',
        'stuvgx',
        'yzabid',
        'efghtj',
      ];
      assertMatrix(matrix, ['tigers'], [5, 4], [0, 4]);
    });
  });
  describe('Direction: down', function() {
    it('Should find the word, when its horizontal without touching the edges of the matrix', function() {
      const matrix = [
        'abcdef',
        'ghiskl',
        'mnoiqr',
        'stucwx',
        'yzakcd',
        'efghij',
      ];
      assertMatrix(matrix, ['sick'], [1, 3], [4, 3]);
    });
    it('Should find the word, when its horizontal with touching the edges of the matrix', function() {
      const matrix = [
        'abcdef',
        'ghijkr',
        'mnopqe',
        'stuvwa',
        'yzabck',
        'efghis',
      ];
      assertMatrix(matrix, ['freaks'], [0, 5], [5, 5]);
    });
  });
});

function assertMatrix(matrix, wordList, firstLetter, secondLetter) {
  const solverResult = wordSearchSolver(matrix, wordList);
  expect(solverResult.length).to.equal(wordList.length);
  for(let i = 0; i < wordList.length; i++) {
    expect(solverResult[i].word).to.equal(wordList[i]);
    expect(solverResult[i].found).to.be.true;
    expect(solverResult[i].firstLetter).to.deep.equal(firstLetter);
    expect(solverResult[i].lastLetter).to.deep.equal(secondLetter);
  }
}
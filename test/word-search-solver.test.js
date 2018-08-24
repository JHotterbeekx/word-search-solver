var expect = require('chai').expect;
var wordSearchSolver = require('../index.js');

describe('Test matrix', function() {
  describe('Direction: right', function() {
    it('Should find the word, when its not touching the edges of the matrix', function() {
      const matrix = [
        'abcdef',
        'ghijkl',
        'mnopqr',
        'scatsx',
        'yzabcd',
        'efghij',
      ];
      assertMatrix(matrix, ['cats'], [{ start: [3, 1], end: [3, 4] }]);
    });
    it('Should find the word, when its touching the edges of the matrix', function() {
      const matrix = [
        'abcdef',
        'ghijkl',
        'mnopqr',
        'stuvwx',
        'letter',
        'efghij',
      ];
      assertMatrix(matrix, ['letter'], [{ start: [4, 0], end: [4, 5] }]);
    });
  });
  describe('Direction: left', function() {
    it('Should find the word, when its not touching the edges of the matrix', function() {
      const matrix = [
        'abcdef',
        'ghijkl',
        'mnopqr',
        'sraepx',
        'yzabcd',
        'efghij',
      ];
      assertMatrix(matrix, ['pear'], [{ start: [3, 4], end: [3, 1] }]);
    });
    it('Should find the word, when its touching the edges of the matrix', function() {
      const matrix = [
        'abcdef',
        'ghijkl',
        'mnopqr',
        'stuvwx',
        'erutuf',
        'efghij',
      ];
      assertMatrix(matrix, ['future'], [{ start: [4, 5], end: [4, 0] }]);
    });
  });
  describe('Direction: up', function() {
    it('Should find the word, when its not touching the edges of the matrix', function() {
      const matrix = [
        'abcdef',
        'gdijkl',
        'mropqr',
        'seuvwx',
        'ynabcd',
        'efghij',
      ];
      assertMatrix(matrix, ['nerd'], [{ start: [4, 1], end: [1, 1] }]);
    });
    it('Should find the word, when its touching the edges of the matrix', function() {
      const matrix = [
        'abcdsf',
        'ghijrl',
        'mnoper',
        'stuvgx',
        'yzabid',
        'efghtj',
      ];
      assertMatrix(matrix, ['tigers'], [{ start: [5, 4], end: [0, 4] }]);
    });
  });
  describe('Direction: down', function() {
    it('Should find the word, when its not touching the edges of the matrix', function() {
      const matrix = [
        'abcdef',
        'ghiskl',
        'mnoiqr',
        'stucwx',
        'yzakcd',
        'efghij',
      ];
      assertMatrix(matrix, ['sick'], [{ start: [1, 3], end: [4, 3] }]);
    });
    it('Should find the word, when its touching the edges of the matrix', function() {
      const matrix = [
        'abcdef',
        'ghijkr',
        'mnopqe',
        'stuvwa',
        'yzabck',
        'efghis',
      ];
      assertMatrix(matrix, ['freaks'], [{ start: [0, 5], end: [5, 5] }]);
    });
  });
  describe('Direction: up right', function() {
    it('Should find the word, when its not touching the edges of the matrix', function() {
      const matrix = [
        'abcdef',
        'ghijsl',
        'mnosqr',
        'stavwx',
        'ybabcd',
        'efghij',
      ];
      assertMatrix(matrix, ['bass'], [{ start: [4, 1], end: [1, 4] }]);
    });
    it('Should find the word, when its touching the edges of the matrix', function() {
      const matrix = [
        'abcdes',
        'ghijtl',
        'mnosqr',
        'stavwx',
        'yeabcd',
        'bfghij',
      ];
      assertMatrix(matrix, ['beasts'], [{ start: [5, 0], end: [0, 5] }]);
    });
  });
  describe('Direction: down right', function() {
    it('Should find the word, when its not touching the edges of the matrix', function() {
      const matrix = [
        'abcdef',
        'gfijkl',
        'mnapqr',
        'stukwx',
        'yzabed',
        'efghij',
      ];
      assertMatrix(matrix, ['fake'], [{ start: [1, 1], end: [4, 4] }]);
    });
    it('Should find the word, when its touching the edges of the matrix', function() {
      const matrix = [
        'pbcdef',
        'goijkl',
        'mntpqr',
        'stuawx',
        'yzabtd',
        'efghio',
      ];
      assertMatrix(matrix, ['potato'], [{ start: [0, 0], end: [5, 5] }]);
    });
  });
  describe('Direction: down left', function() {
    it('Should find the word, when its not touching the edges of the matrix', function() {
      const matrix = [
        'abcdef',
        'ghijdl',
        'mnorqr',
        'stuvwx',
        'ymabcd',
        'efghij',
      ];
      assertMatrix(matrix, ['drum'], [{ start: [1, 4], end: [4, 1] }]);
    });
    it('Should find the word, when its touching the edges of the matrix', function() {
      const matrix = [
        'abcdeg',
        'ghijul',
        'mnoiqr',
        'sttvwx',
        'yaabcd',
        'rfghij',
      ];
      assertMatrix(matrix, ['guitar'], [{ start: [0, 5], end: [5, 0] }]);
    });
  });
  describe('Direction: up left', function() {
    it('Should find the word, when its not touching the edges of the matrix', function() {
      const matrix = [
        'abcdef',
        'geijkl',
        'mnvpqr',
        'stuowx',
        'yzabld',
        'efghij',
      ];
      assertMatrix(matrix, ['love'], [{ start: [4, 4], end: [1, 1] }]);
    });
    it('Should find the word, when its touching the edges of the matrix', function() {
      const matrix = [
        'rbcdef',
        'geijkl',
        'mnwpqr',
        'stuowx',
        'yzabld',
        'efghif',
      ];
      assertMatrix(matrix, ['flower'], [{ start: [5, 5], end: [0, 0] }]);
    });
  });
  it('Should return found false, when word does not exist in puzzle', function() {
    const matrix = [
      'abcdef',
      'ghijkl',
      'mnopqr',
      'stuvwx',
      'yzabcd',
      'efghij',
    ];
    const solverResult = wordSearchSolver(matrix, ['stars']);
    expect(solverResult.length).to.equal(1);
    expect(solverResult[0].word).to.equal('stars');
    expect(solverResult[0].found).to.equal(false);
    expect(solverResult[0].firstLetter).to.equal(undefined);
    expect(solverResult[0].lastLetter).to.equal(undefined);
  });
  it('Should solve a puzzle, when height is more then width', function() {
    const matrix = [
        'rfcd',
        'glij',
        'mowp',
        'swuo',
        'yeab',
        'ergh',
      ];
      assertMatrix(matrix, ['flower'], [{ start: [0, 1], end: [5, 1] }]);
  });
  it('Should solve a puzzle, when width is more then height', function() {
    const matrix = [
        'mnopqr',
        'srewop',
        'flower',
        'efghij',
      ];
      assertMatrix(
        matrix,
        ['flower', 'power'],
        [
          { start: [2, 0], end: [2, 5] },
          { start: [1, 5], end: [1, 1] }
        ]);
  });
  it('Should solve a puzzle, when width is variable', function() {
    const matrix = [
        'ads',
        'weqw',
        'flowers',
        'as',
      ];
      assertMatrix(matrix, ['flower'], [{ start: [2, 0], end: [2, 5] }]);
  });
  it('Should solve this real 11x11 puzzle', function() {
    const matrix = [
      'lecliffbvic',
      'eycncyhbore',
      'rcthoattond',
      'oiocidlceha',
      'vogtanocunc',
      'inmqedoriup',
      'nonaigodttf',
      'rdtlijwrese',
      'aoelqtiuera',
      'cnodoireptm',
      'dopolahpecp'
    ];
    const wordList = [
      'pterodactyl',
      'cephalopod',
      'echinoderm',
      'oligocene',
      'carnivore',
      'crocodile',
      'cionodon',
      'astrodon',
      'calcite',
      'period',
      'cliff'
    ];
    const solution = [
      { start: [10, 10], end: [0, 0] },
      { start: [10, 9], end: [10, 0] },
      { start: [0, 1], end: [9, 10] },
      { start: [9, 2], end: [1, 10] },
      { start: [9, 0], end: [1, 0] },
      { start: [0, 10], end: [8, 2] },
      { start: [2, 1], end: [9, 1] },
      { start: [8, 10], end: [1, 3] },
      { start: [1, 4], end: [7, 10] },
      { start: [9, 8], end: [9, 3] },
      { start: [0, 2], end: [0, 6] },
    ]
    assertMatrix(matrix, wordList, solution);
  });
});

function assertMatrix(matrix, wordList, positions) {
  const solverResult = wordSearchSolver(matrix, wordList);
  expect(solverResult.length).to.equal(wordList.length);
  for(let i = 0; i < wordList.length; i++) {
    expect(solverResult[i].word).to.equal(wordList[i]);
    expect(solverResult[i].found).to.equal(true);
    expect(solverResult[i].firstLetter).to.deep.equal(positions[i].start);
    expect(solverResult[i].lastLetter).to.deep.equal(positions[i].end);
  }
}
var expect = require('chai').expect;
var WordResult = require('../src/word-result');

describe('word-result', function() {
  it('CreateFound should create valid object', function () {
    var wordFoundResult = WordResult.CreateFound('fakeword', [1, 2], [3, 4]);

    expect(wordFoundResult.word).to.equal('fakeword');
    expect(wordFoundResult.found).to.equal(true);
    expect(wordFoundResult.firstLetter).to.deep.equal([1, 2]);
    expect(wordFoundResult.lastLetter).to.deep.equal([3, 4]);
  });
  it('CreateNotFound should create valid object', function () {
    var wordFoundResult = WordResult.CreateNotFound('fakeword');

    expect(wordFoundResult.word).to.equal('fakeword');
    expect(wordFoundResult.found).to.equal(false);
  });
});
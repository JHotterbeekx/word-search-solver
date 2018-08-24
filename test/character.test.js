const expect = require('chai').expect;
const Character = require('../src/character');

describe('character', function() {
  it('Constructor Should set the character as lowercase', function () {
    const character = new Character('T');

    expect(character.Character).to.equal('t');
  });
  it('atRow Should set the row index', function () {
    const character = new Character('t').atRow(12);

    expect(character.RowIndex).to.equal(12);
  });
  it('atColumn Should set the columns index', function () {
    const character = new Character('t').atColumn(23);

    expect(character.ColumnIndex).to.equal(23);
  });
  it('RegisterAsNeighbor Should register the character as neighbor', function() {
    const leftNeighbor = new Character('u');
    const rightNeighbor = new Character('w');
    const character = new Character('t');

    character.RegisterAsNeighbor('left', leftNeighbor);
    character.RegisterAsNeighbor('right', rightNeighbor);

    expect(character.Neighbors.left).to.deep.equal(leftNeighbor);
    expect(character.Neighbors.right).to.deep.equal(rightNeighbor);
  });
  describe('HasWord', function() {
    const letterPosition1 = new Character('c').atRow(2).atColumn(3);
    const letterPosition2 = new Character('o').atRow(2).atColumn(4);
    const letterPosition3 = new Character('w').atRow(2).atColumn(5);
    const letterPosition4 = new Character('s').atRow(2).atColumn(6);

    letterPosition1.RegisterAsNeighbor('right', letterPosition2);
    letterPosition2.RegisterAsNeighbor('right', letterPosition3);
    letterPosition3.RegisterAsNeighbor('right', letterPosition4);

    it('Hasword Shoud return found state false, When word does not exist', function () {
      const searchResult = letterPosition1.HasWord('dog', 'right');
      expect(searchResult.Found).to.equal(false);
    });
    it('Hasword Shoud return found state true, When word matches across full length', function () {
      const searchResult = letterPosition1.HasWord('cows', 'right');
      expect(searchResult.Found).to.equal(true);
      expect(searchResult.EndRowIndex).to.equal(2);
      expect(searchResult.EndColumnIndex).to.equal(6);
    });
    it('Hasword Shoud return found state true, When word matches across part of the length', function () {
      const searchResult = letterPosition1.HasWord('cow', 'right');
      expect(searchResult.Found).to.equal(true);
      expect(searchResult.EndRowIndex).to.equal(2);
      expect(searchResult.EndColumnIndex).to.equal(5);
    });
  });
});
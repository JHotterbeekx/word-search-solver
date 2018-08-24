const expect = require('chai').expect;
const Direction = require('../src/direction');

describe('direction', function() {
  it('Should return correct neighbour position, When direction moves to the left', function () {
    const direction = new Direction('fake').MoveLeft();
    const neighbour = direction.GetMyPositionFromNeighborsPerspective(2 ,2);

    expect(neighbour.RowIndex).to.equal(2);
    expect(neighbour.ColumnIndex).to.equal(3);
  });
  it('Should return correct neighbour position, When direction moves to the right', function () {
    const direction = new Direction('fake').MoveRight();
    const neighbour = direction.GetMyPositionFromNeighborsPerspective(2,2);

    expect(neighbour.RowIndex).to.equal(2);
    expect(neighbour.ColumnIndex).to.equal(1);
  });
  it('Should return correct neighbour position, When direction moves to the up', function () {
    const direction = new Direction('fake').MoveUp();
    const neighbour = direction.GetMyPositionFromNeighborsPerspective(2,2);

    expect(neighbour.RowIndex).to.equal(1);
    expect(neighbour.ColumnIndex).to.equal(2);
  });
  it('Should return correct neighbour position, When direction moves to the down', function () {
    const direction = new Direction('fake').MoveDown();
    const neighbour = direction.GetMyPositionFromNeighborsPerspective(2,2);

    expect(neighbour.RowIndex).to.equal(3);
    expect(neighbour.ColumnIndex).to.equal(2);
  });
});
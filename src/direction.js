module.exports = class Direction {
  constructor(direction) {
    this.Direction = direction;
    this.Horizontal = 0;
    this.Vertical = 0;
    
    return this;
  }

  MoveLeft() {
    this.Horizontal--;
    return this;
  }

  MoveRight() {
    this.Horizontal++;
    return this;
  }

  MoveUp() {
    this.Vertical++;
    return this;
  }

  MoveDown() {
    this.Vertical--;
    return this;
  }

  GetNeighborPosition(rowIndex, columnIndex) {
    return {
      RowIndex: rowIndex + (this.Horizontal * -1),
      ColumnIndex: columnIndex + (this.Vertical * -1),
    }
  }
}
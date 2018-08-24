module.exports = class Character {
  constructor(character) {
    this.Character = character.toLowerCase();
    this.RowIndex = undefined;
    this.ColumnIndex = undefined;
    this.Neighbors = {};

    return this;
  }

  atRow(rowIndex) {
    this.RowIndex = rowIndex;
    return this;
  }

  atColumn(columnIndex) {
    this.ColumnIndex = columnIndex;
    return this;
  }

  RegisterAsNeighbor(direction, neighbor) {
    this.Neighbors[direction] = neighbor;
  }

  HasWord(word, direction) {
    if (word.length === 1 && word.charAt(0) === this.Character) {
      return {
        Found: true,
        EndRowIndex: this.RowIndex,
        EndColumnIndex: this.ColumnIndex
      }
    }

    if(this.Character === word.charAt(0) && this.Neighbors[direction]) {
      return this.Neighbors[direction].HasWord(word.substr(1), direction);
    }

    return { Found: false }
  }
}
const Character = require('./character');
const Direction = require('./direction');
const WordResult = require('./word-result');

const Directions = [
  new Direction('Right').MoveRight(),
  new Direction('Left').MoveLeft(),
  new Direction('Down').MoveDown(),
  new Direction('Up').MoveUp(),
  new Direction('LeftUp').MoveLeft().MoveUp(),
  new Direction('LeftDown').MoveLeft().MoveDown(),
  new Direction('RightUp').MoveRight().MoveUp(),
  new Direction('RightDown').MoveRight().MoveDown(),
];

module.exports = class SearchMap {
  constructor(matrix) {
    this.IndexedMatrix = []

    this.BuildMap(matrix);
  }

  BuildMap(matrix) {
    this.IndexedMatrix = matrix.map((row, rowIndex) => 
      String(row).split('').map((col, colIndex) => 
        new Character(col).atRow(rowIndex).atColumn(colIndex)
      )
    );
    
    this.IndexedMatrix.forEach((row, rowIndex) => {
      row.forEach((item, colIndex) => {
        Directions.forEach(direction => {
          const neighbor = direction.GetMyPositionFromNeighborsPerspective(rowIndex, colIndex);
          this.SetPropertyInMatrixItemIfAvailable(neighbor.RowIndex, neighbor.ColumnIndex, direction.Direction, item);
        })
      })
    });
  }

  FindWord(word) {
    const wordClean = word.toLowerCase().trim();
  
    for(let rowIndex = 0; rowIndex < this.IndexedMatrix.length; rowIndex++) {
      for(let colIndex = 0; colIndex < this.IndexedMatrix[rowIndex].length; colIndex++) {
        
        const item = this.IndexedMatrix[rowIndex][colIndex];
        for(let directionIndex = 0; directionIndex < Directions.length; directionIndex ++) {
          const wordFoundResult = item.HasWord(wordClean, Directions[directionIndex].Direction);
          if (wordFoundResult.Found) {
            return WordResult.CreateFound(word, [item.RowIndex, item.ColumnIndex], [wordFoundResult.EndRowIndex, wordFoundResult.EndColumnIndex]);
          }
        }
      }
    }
  
    return WordResult.CreateNotFound(word);
  }

  SetPropertyInMatrixItemIfAvailable(row, col, prop, value) {
    if (this.IndexedMatrix[row] !== undefined && this.IndexedMatrix[row][col] !== undefined) {
      this.IndexedMatrix[row][col].RegisterAsNeighbor(prop, value);
    }
  }
}

'use strict';

module.exports = function(letterMatrix, wordList) {
  const result = [];
  const indexedMatrix = BuildMap(letterMatrix);

  for(var i = 0; i < wordList.length; i++) {
    const location = findInIndexedMatrix(wordList[i], indexedMatrix);
    const wordResult = {
      word: wordList[i],
      found: false
    }

    if( location[0][0] + location[0][1] + location[1][0] + location[1][1] > 0 ) {
      wordResult.found = true;
      wordResult.firstLetter = location[0];
      wordResult.lastLetter = location[1];
    }
    result.push(wordResult);
  }
  return result;
};

function BuildMap(matrix) {
  var indexedMatrix = matrix.map((row, rowIndex) => 
    row.split('').map((col, colIndex) => 
      new Character(col).atRow(rowIndex).atColumn(colIndex)
    )
  );
  
  indexedMatrix.forEach((row, rowIndex) => {
    row.forEach((item, colIndex) => {
      Directions.forEach(direction => {
        const neighbor = direction.GetNeighborPosition(rowIndex, colIndex);
        SetPropertyIfMatrixItemIfAvailable(indexedMatrix, neighbor.RowIndex, neighbor.ColumnIndex, direction.Direction, item);
      })
    })
  });
  
  return indexedMatrix;
}



function findInIndexedMatrix(word, indexedMatrix) {
  const wordClean = word.toLowerCase().trim();

  for(let rowIndex = 0; rowIndex < indexedMatrix.length; rowIndex++) {
    for(let colIndex = 0; colIndex < indexedMatrix[rowIndex].length; colIndex++) {
      
      const item = indexedMatrix[rowIndex][colIndex];
      for(let directionIndex = 0; directionIndex < Directions.length; directionIndex ++) {
        const wordFoundResult = item.HasWord(wordClean, Directions[directionIndex].Direction);
        if (wordFoundResult.Found) {
          return [[item.RowIndex, item.ColumnIndex], [wordFoundResult.EndRowIndex, wordFoundResult.EndColumnIndex]]
        }
      }
    }
  }

  return [[0,0],[0,0]];
}

function SetPropertyIfMatrixItemIfAvailable(indexedMatrix, row, col, prop, value) {
  if (indexedMatrix[row] !== undefined && indexedMatrix[row][col] !== undefined) {
    indexedMatrix[row][col].RegisterAsNeighbor(prop, value);
  }
}

class Character {
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

class Direction {
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

const Directions = [
  new Direction('Right').MoveRight(),
  new Direction('Left').MoveLeft(),
  new Direction('Down').MoveDown(),
  new Direction('Up').MoveUp(),
  new Direction('LeftUp').MoveLeft().MoveUp(),
  new Direction('LeftDown').MoveLeft().MoveDown(),
  new Direction('RightUp').MoveRight().MoveUp(),
  new Direction('RightDown').MoveRight().MoveDown(),
]
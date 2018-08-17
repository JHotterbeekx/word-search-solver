'use strict';

const Character = require('./character');
const Direction = require('./direction');

module.exports = function(letterMatrix, wordList) {
  const indexedMatrix = BuildMap(letterMatrix);
  return wordList.map(word => FindWord(word, indexedMatrix));
};

function FindWord(word, indexedMatrix) {
  const location = findInIndexedMatrix(word, indexedMatrix);
    const wordResult = {
      word: word,
      found: false
    }

    if( location[0][0] + location[0][1] + location[1][0] + location[1][1] > 0 ) {
      wordResult.found = true;
      wordResult.firstLetter = location[0];
      wordResult.lastLetter = location[1];
    }
    return wordResult;
}

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
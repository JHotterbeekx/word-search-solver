'use strict';

const Character = require('./character');
const Direction = require('./direction');

module.exports = function(letterMatrix, wordList) {
  const indexedMatrix = BuildMap(letterMatrix);
  return wordList.map(word => FindWordInIndexedMatrix(word, indexedMatrix));
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

function FindWordInIndexedMatrix(word, indexedMatrix) {
  const wordClean = word.toLowerCase().trim();

  for(let rowIndex = 0; rowIndex < indexedMatrix.length; rowIndex++) {
    for(let colIndex = 0; colIndex < indexedMatrix[rowIndex].length; colIndex++) {
      
      const item = indexedMatrix[rowIndex][colIndex];
      for(let directionIndex = 0; directionIndex < Directions.length; directionIndex ++) {
        const wordFoundResult = item.HasWord(wordClean, Directions[directionIndex].Direction);
        if (wordFoundResult.Found) {
          return CreateFoundResult(word, [item.RowIndex, item.ColumnIndex], [wordFoundResult.EndRowIndex, wordFoundResult.EndColumnIndex]);
        }
      }
    }
  }

  return CreateNotFoundResult(word);
}

function CreateFoundResult(word, firstLetterLocation, lastLetterLocation) {
  return {
    word: word,
    found: true,
    firstLetter: firstLetterLocation,
    lastLetter: lastLetterLocation,
  }
}

function CreateNotFoundResult(word) {
  return {
    word: word,
    found: false,
  }
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
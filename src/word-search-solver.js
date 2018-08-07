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
  var indexedMatrix = matrix.map((row, rowIndex) => row.split('').map((col, colIndex) => ({
    RowIndex: rowIndex,
    ColumnIndex: colIndex,
    Character: col.toLowerCase(),
    Directions: {}
  })));
  
  indexedMatrix.forEach((row, rowIndex) => {
    row.forEach((item, colIndex) => {
      SetPropertyIfMatrixItemIfAvailable(indexedMatrix, rowIndex, colIndex -1, 'Right', item);
      SetPropertyIfMatrixItemIfAvailable(indexedMatrix, rowIndex, colIndex +1, 'Left', item);
      SetPropertyIfMatrixItemIfAvailable(indexedMatrix, rowIndex -1, colIndex, 'Down', item);
      SetPropertyIfMatrixItemIfAvailable(indexedMatrix, rowIndex +1, colIndex, 'Up', item);
    
      SetPropertyIfMatrixItemIfAvailable(indexedMatrix, rowIndex +1, colIndex +1, 'LeftUp', item);
      SetPropertyIfMatrixItemIfAvailable(indexedMatrix, rowIndex -1, colIndex +1, 'LeftDown', item);
      SetPropertyIfMatrixItemIfAvailable(indexedMatrix, rowIndex +1, colIndex -1, 'RightUp', item);
      SetPropertyIfMatrixItemIfAvailable(indexedMatrix, rowIndex -1, colIndex -1, 'RightDown', item);
    })
  });
  
  return indexedMatrix;
}

function findInIndexedMatrix(word, indexedMatrix) {
  const wordArray = word.toLowerCase().trim().split('');

  for(let rowIndex = 0; rowIndex < indexedMatrix.length; rowIndex++) {
    for(let colIndex = 0; colIndex < indexedMatrix[rowIndex].length; colIndex++) {
      
      const item = indexedMatrix[rowIndex][colIndex];
      if (item.Character ===  wordArray[0]){
        const directions = Object.keys(item.Directions);

        for(let directionIndex = 0; directionIndex < directions.length; directionIndex ++) {
          const direction = directions[directionIndex];

          let pointingItem = {... item.Directions[direction]};
          let lettersFound = 1;
          let matching = true;

          while(matching && lettersFound < wordArray.length && pointingItem !== undefined) {
            if (pointingItem.Character !== wordArray[lettersFound]) {
              matching = false;
            } else {
              lettersFound++;
              
            }
            if (lettersFound < wordArray.length) pointingItem = pointingItem.Directions[direction];
          }

          if (matching && lettersFound === wordArray.length) {
            return [[item.RowIndex, item.ColumnIndex], [pointingItem.RowIndex, pointingItem.ColumnIndex]]
          }
        }
      }
    }
  }

  return [[0,0],[0,0]];
}

function SetPropertyIfMatrixItemIfAvailable(indexedMatrix, row, col, prop, value) {
  if (indexedMatrix[row] !== undefined && indexedMatrix[row][col] !== undefined) {
    indexedMatrix[row][col].Directions[prop] = value;
  }
}
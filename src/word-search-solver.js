'use strict';

module.exports = function(letterMatrix, wordList) {
  const result = [];
  for(var i = 0; i < wordList.length; i++) {
    const location = FindWordInMatrix(wordList[i], letterMatrix);
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

function FindWordInMatrix(word, matrix) {
  // Start by looking for the starting letter
  const startLetter = word[0];
  const wl = word.length -1;
  const height = matrix.length;
  // console.log('Searching word', word);
  // console.log('Searching width', width);
  // console.log('Searching matrix', matrix);
  // console.log('startLetter', startLetter);

  for(var x = 0; x < matrix.length; x++) {
    for(var y = 0; y < matrix.length; y++) {
      if(matrix[y][x] === startLetter) {
        const width = matrix[y].length;
        // console.log(`Found on [${y},${x}]`);
        const possibleDirections = ['l','lu','u','ru','r','rd','d','ld'];
        // exclude possible directions
        for(var d = 0; d < possibleDirections.length; d++) {
          const direction = possibleDirections[d];
          switch(direction) {
            case 'l':
              if (x - wl >= 0) {
                let match = true;
                for(let c = 1; c <= wl; c++) {
                  if(matrix[y][x -c] !== word[c]) {
                    match = false;
                  }
                }
                if(match) return [[y,x], [y, x - wl]];
              } else {
                // console.log('Does not fit to left');
              }
              break;
            case 'lu':
             if (x - wl >= 0 && y - wl >= 0) {
                let match = true;
                for(let c = 1; c <= wl; c++) {
                  if(matrix[y - c][x - c] !== word[c]) {
                    match = false;
                  }
                }
                if(match) return [[y,x], [y - wl, x - wl]];
              } else {
                // console.log('Does not fit to left up');
              }
              break;
            case 'u':
              if (y - wl >= 0) {
                let match = true;
                for(let c = 1; c <= wl; c++) {
                  if(matrix[y - c][x] !== word[c]) {
                    match = false;
                  }
                }
                if(match) return [[y,x], [y - wl, x]];
              } else {
                // console.log('Does not fit to up');
              }
              break;
            case 'ru':
              if (x + wl < width && y - wl >= 0) {
                let match = true;
                for(let c = 1; c <= wl; c++) {
                  if(matrix[y - c][x + c] !== word[c]) {
                    match = false;
                  }
                }
                if(match) return [[y,x], [y - wl, x + wl]];
              } else {
                // console.log('Does not fit to right up');
              }
              break;
            case 'r':
              if (x + wl < width) {
                let match = true;
                for(let c = 1; c <= wl; c++) {
                  if(matrix[y][x + c] !== word[c]) {
                    match = false;
                  }
                }
                if(match) return [[y,x], [y, x + wl]];
              } else {
                // console.log('Does not fit to right');
              }
              break;
            case 'rd':
              if (x + wl < width && y + wl < height) {
                let match = true;
                for(let c = 1; c <= wl; c++) {
                  if(matrix[y + c][x + c] !== word[c]) {
                    match = false;
                  }
                }
                if(match) return [[y,x], [y + wl, x + wl]];
              } else {
                // console.log('Does not fit to right down');
              }
              break;
            case 'd':
              if (y + wl < height) {
                let match = true;
                for(let c = 1; c <= wl; c++) {
                  if(matrix[y + c][x] !== word[c]) {
                    match = false;
                  }
                }
                if(match) return [[y,x], [y + wl, x]];
              } else {
                // console.log('Does not fit to down');
              }
              break;
            case 'ld':
            if (x - wl >= 0 && y + wl < height) {
                let match = true;
                for(let c = 1; c <= wl; c++) {
                  if(matrix[y + c][x - c] !== word[c]) {
                    match = false;
                  }
                }
                if(match) return [[y,x], [y + wl, x - wl]];
              } else {
                // console.log('Does not fit to left down');
              }
              break;
          }
        }
      }
    }
  }

  return [[0, 0], [0, 0]];
}
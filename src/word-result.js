module.exports = {
  CreateFound(word, firstLetterLocation, lastLetterLocation) {
    return {
      word: word,
      found: true,
      firstLetter: firstLetterLocation,
      lastLetter: lastLetterLocation,
    }
  },
  
  CreateNotFound(word) {
    return {
      word: word,
      found: false,
    }
  }
}
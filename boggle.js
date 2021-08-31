/**
 * @author Travis Harris
 * Requirement: trie.js must be in the same directory
 * Usage: node boggle.js words_file [matrix_file]'
 * 
 * words_file is a text file containing a list of words (Unix newline delimited).
 * matrix_file (optional) is a JSON-formatted matrix of letters (A-Z).
 * If a filename is not provided for the matrix, a 4x4 matrix of random letters
 * is used.
 *
 * Output: The matrix and all valid words in the matrix are output to the console.
 * Words are validated using the provided word list and the rules of Boggle.
 * 
 * Boggle rules: Words are composed of letters connected horizontally, vertically,
 * or diagonally, and they must be at least 3 letters long.
 */

const Trie = require('./trie.js')

/**
 * Loads a list of words from a file (Unix newline delimited).
 * @param {string} wordsFilename Filename, including extension.
 * @returns {Array.<string>} Array of words.
 */
function loadWords(wordsFilename) {
  // Code for reading file adapted from
  // https://nodejs.dev/learn/reading-files-with-nodejs
  const fs = require('fs')

  try {
    const data = fs.readFileSync(wordsFilename, 'utf8')
    return data.split('\n')
  } catch {
    console.error('Error reading words file.')
    process.exit(1)
  }
}

/**
 * Creates a Trie loaded with words from a file (Unix newline delimited).
 * @param {string} wordsFilename Filename, including extension.
 * @returns {Trie} Trie containing words.
 */
function loadDictionary(wordsFilename) {
  const dictionary = new Trie()

  // Put words into the Trie
  loadWords(wordsFilename).forEach((word) => {
    // only include words of valid length for Boggle
    if (word.length >= 3 && word.length <= 16) {
      dictionary.add(word.toUpperCase())
    }
  })
  return dictionary
}

/**
 * Loads a matrix from a JSON file.
 * @param {string} matrixFilename Filename, including extension.
 * @returns {Array.<Array.<string>>} 2D-Array.
 */
function loadMatrix(matrixFilename) {
  const fs = require('fs')

  try {
    const data = fs.readFileSync(matrixFilename, 'utf8')
    return JSON.parse(data)
  } catch {
    console.error('Error reading matrix file.')
    process.exit(1)
  }
}

/**
 * Returns a random letter from A-Z.
 * @returns {string} Single character.
 */
function getRandomChr() {
  // generate random ascii code for A-Z
  const randInt = Math.floor(Math.random() * 26 + 65)
  return String.fromCharCode(randInt)
}

/**
 * Generates a matrix of random letters (A-Z) of the specified size.
 * @param {number} [numRows=4] Default value is 4.
 * @param {number} [numCols=4] Default value is 4.
 * @returns {Array.<Array.<string>>} 2D-Array.
 */
function getRandomMat(numRows = 4, numCols = 4) {
  const mat = []
  for (let i = 0; i < numRows; i++) {
    let row = []
    for (let j = 0; j < numCols; j++) {
      row.push(getRandomChr())
    }
    mat.push(row)
  }
  return mat
}

/**
 * Takes a Trie containing all valid words and a matrix of letters (A-Z) and
 * finds all words according to the rules of Boggle:
 * Words are composed of letters connected horizontally, vertically,
 * or diagonally, and they must be at least 3 letters long.
 * @param {Trie} dict Trie-based dictionary containing all possible words.
 * @param {Array.<Array.<string>>} mat Matrix to be searched.
 * @returns {Set.<string>} Words in matrix found in dictionary.
 */
function boggle(dict, mat) {
  // use count (below) to verify total number of strings in matrix
  // must comment out the inDict if-else block below and uncomment count += 1, return count

  // let count = 0

  const numRows = mat.length
  const numCols = mat[0].length
  const maxWordLength = numRows * numCols
  const words = new Set()
  const stack = []
  const directions = [
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
  ]

  // depth-first traversals starting from each letter
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const str = mat[i][j]
      const visited = new Set()
      stack.push([i, j, str, visited])

      while (stack.length > 0) {
        // count += 1
        const [i, j, str, visited] = stack.pop()

        // determine if str is word, prefix, or neither
        const inDict = dict.find(str)
        if (inDict === 1) {
          words.add(str)
        } else if (inDict === 0) {
          continue // not in dict, stop this traversal
        }

        // check for traversal limit
        if (str.length < maxWordLength) {
          // copy visited, otherwise all visited in stack will refer to same set
          const visitedCopy = new Set(visited)
          visitedCopy.add([i, j].toString())

          // push all unvisited neighbors onto stack
          directions.forEach(([x, y]) => {
            const row = i + x
            const col = j + y
            if (
              row >= 0 &&
              row < numRows &&
              col >= 0 &&
              col < numCols &&
              !visitedCopy.has([row, col].toString())
            ) {
              const nextStr = str + mat[row][col]
              stack.push([row, col, nextStr, visitedCopy])
            }
          })
        }
      }
    }
  }
  return words
  // return count
}

/**
 * Takes a Set of words and displays them in the console.
 * The words are sorted from longest to shortest and in alphabetical order.
 * @param {Set.<string>} words
 */
function displayWords(words) {
  // sort method adapted from Salman A and Fergal at
  // https://stackoverflow.com/questions/10630766/how-to-sort-an-array-based-on-the-length-of-each-element/10630852
  const sortedWords = Array.from(words).sort(
    (a, b) => b.length - a.length || a.localeCompare(b)
  )
  sortedWords.forEach((word) => console.log(word))
}

/**
 * Executes the program with the provided words list (Unix new-line delimited)
 * and matrix file (optional).
 * @param {string} wordsFilename Filename, including extension.
 * @param {string} [matrixFilename] Filename, including extension.
 */
function main(wordsFilename, matrixFilename = null) {
  const dictionary = loadDictionary(wordsFilename)
  const mat = matrixFilename ? loadMatrix(matrixFilename) : getRandomMat()
  console.log(mat)
  const words = boggle(dictionary, mat)
  displayWords(words)
}

/**
 * Handle command-line arguments.
 */
if (require.main === module) {
  if (process.argv.length === 2) {
    console.error(
      'Error: Expected argument. Usage: node boggle.js words_file [matrix_file]'
    )
    process.exit(1)
  }
  const [wordsFilename, matrixFilename] = process.argv.slice(2)
  main(wordsFilename, matrixFilename)
}
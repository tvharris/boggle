// Defines a node in the Trie. Cildren is an object that stores
// the next character in a word as {character: TrieNode} and
// isWord is a bool indicating whether it's a terminal node
// for a complete word.
class TrieNode {
  constructor() {
    this.children = new Object()
    this.isWord = false
  }
}

// Defines a Trie, used for storing the dictionary
class Trie {
  constructor() {
    this.root = new TrieNode('')
  }

  // Adds a word to the trie
  add(word) {
    let node = this.root

    // traverse for each char, adding new nodes when necessary
    for (let i = 0; i < word.length; i++) {
      if (!node.children[word[i]]) {
        node.children[word[i]] = new TrieNode(word[i])
      }
      node = node.children[word[i]]
    }

    // indicate word is complete
    node.isWord = true
  }

  // Searches for the string s in the Trie. Returns 0 if
  // it is not found, 1 if it is a complete word, or 2 if
  // it is a valid prefix.
  find(s) {
    let node = this.root

    for (let i = 0; i < s.length; i++) {
      if (node.children[s[i]]) {
        node = node.children[s[i]]
      } else {
        return 0 // s not in Trie
      }
    }

    // s is found, so it's a word or a prefix
    return node.isWord ? 1 : 2
  }
}

function loadWords() {
  // Code for reading file adapted from
  // https://nodejs.dev/learn/reading-files-with-nodejs
  const fs = require('fs')

  // Takes a list of words (Unix newline delimited) and creates an
  // array of words
  try {
    const data = fs.readFileSync('twl06.txt', 'utf8')
    return data.split('\n')
  } catch (err) {
    console.error(err)
  }
}

function loadDictionary() {
  const dictionary = new Trie()

  // fill the Trie dictionary
  loadWords().forEach((word) => {
    // only include words of valid length for Boggle
    if (word.length >= 3 && word.length <= 16) {
      dictionary.add(word)
    }
  })
  return dictionary
}

// returns a random letter from a-z
function getRandomChr() {
  // generate random ascii code for a-z
  const randInt = Math.floor(Math.random() * 26 + 97)
  return String.fromCharCode(randInt)
}

// Optionally takes a number of rows and number of columns
// (default 4), and returns a matrix of random letters a-z.
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

// Takes a matrix of letters and a dictionary (Trie) and
// returns the words that can be formed by adjacent or diagonal letters
function boggle(dict, mat = null) {
  // use count (below) to verify total number of strings in matrix
  // must comment out the inDict if-else block below and uncomment count += 1, return count
  // let count = 0

  if (mat === null) {
    mat = getRandomMat()
  }
  console.log(mat)

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

function main() {
  const t0 = Date.now()
  const dictionary = loadDictionary()
  const t1 = Date.now()
  console.log('Time to load:', t1 - t0)
  // console.log(boggle(dictionary))
  const matrix = [
    ['a', 'b', 'a', 'b'],
    ['c', 'e', 't', 'b'],
    ['e', 'm', 'r', 'b'],
    ['a', 'l', 's', 'b'],
  ]
  console.log(boggle(dictionary, matrix))
  const t2 = Date.now()
  console.log('Time for boggle:', t2 - t1)

  // console.log(boggle(dictionary))
}

if (require.main === module) {
  main()
}

// testing
// console.log(dictionary.root.children)
// console.log(dictionary.root.children['a'].children['a'])
// console.log('not a word:', dictionary.find('aab'))
// console.log('word:', dictionary.find('aah'))
// console.log('prefix:', dictionary.find('aan'))
// let matrix = [
//   ['a', 'b'],
//   ['a', 'l'],
// ]

// let matrix = [
//   ['1', '2'],
//   ['3', '4'],
// ]
// let matrix = [
//   ['j', 'j'],
//   ['j', 'j'],
// ]
// let matrix = [
//   ['a', 'b', 'a'],
//   ['a', 'b', 'l'],
//   ['a', 'l', 'a'],
// ]
// let matrix = [
//   ['a', 'b', 'a', 'b'],
//   ['c', 'e', 't', 'b'],
//   ['e', 'm', 'r', 'b'],
//   ['a', 'l', 's', 'b'],
// ]
// console.log(boggle(dictionary, matrix))
// console.log(boggle(dictionary))

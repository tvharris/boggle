// Code for reading file adapted from
// https://nodejs.dev/learn/reading-files-with-nodejs
const fs = require('fs')
let words = []

// Takes a list of words (Unix newline delimited) and creates an
// array of words
try {
  const data = fs.readFileSync('twl06.txt', 'utf8')
  words = data.split('\n')
} catch (err) {
  console.error(err)
}

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
    let i = 0
    let node = this.root

    // traverse for each char in word until char isn't found
    while (i < word.length && node.children[word[i]]) {
      node = node.children[word[i]]
      i += 1
    }

    // add the remaining chars
    while (i < word.length) {
      // add char
      node.children[word[i]] = new TrieNode(word[i])
      // advance to next node and char
      node = node.children[word[i]]
      i += 1
    }

    // indicate word is complete
    node.isWord = true
  }

  // Searches for the string in the Trie. Returns 0 if
  // it is not found, 1 if it is a complete word, or 2 if
  // it is a valid prefix.
  find(s) {
    let node = this.root

    for (let i = 0; i < s.length; i++) {
      if (node.children[s[i]]) {
        // advance to next node
        node = node.children[s[i]]
      } else {
        return 0 // s not in Trie
      }
    }

    // s is found, so it's a word or a prefix
    return node.isWord ? 1 : 2
  }
}

let dictionary = new Trie()
// console.log(dictionary, dictionary.root)

// fill the Trie dictionary
words.forEach((word) => {
  // only include words of valid length for Boggle
  if (word.length >= 3 && word.length <= 16) {
    dictionary.add(word)
    // console.log(word, word[i])
  }
})

// returns a random letter from a-z
function getRandomChr() {
  // generate random ascii code for a-z
  let randInt = Math.floor(Math.random() * 26 + 97)
  return String.fromCharCode(randInt) 
}

// Takes a matrix of letters and a dictionary (Trie) and
// returns the words that can be formed by adjacent or diagonal letters
function boggle(mat, dict) {
  // use count (below) to verify total number of strings in matrix
  // must comment out the inDict if-else block below and uncomment count += 1, return count
  // let count = 0
  let numRows = mat.length
  let numCols = mat[0].length
  let maxWordLength = numRows * numCols
  let words = new Set()
  let stack = []
  let directions = [
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
      let str = mat[i][j]
      let visited = new Set()
      stack.push([i, j, str, visited])

      while (stack.length > 0) {
        // count += 1

        let [i, j, str, visited] = stack.pop()

        // determine if str is word, prefix, or neither
        let inDict = dict.find(str)
        if (inDict === 1) {
          words.add(str)
        } else if (inDict === 0) {
          continue // not in dict, stop this traversal
        }

        // check for traversal limit
        if (str.length < maxWordLength) {
          // copy visited, otherwise all visited in stack will refer to same set
          let visitedCopy = new Set(visited)
          visitedCopy.add([i, j].toString())

          // push all unvisited neighbors onto stack
          directions.forEach(([x, y]) => {
            let row = i + x
            let col = j + y
            if (
              row >= 0 &&
              row < numRows &&
              col >= 0 &&
              col < numCols &&
              !visitedCopy.has([row, col].toString())
            ) {
              nextStr = str + mat[row][col]
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
let matrix = [
  ['a', 'b', 'a', 'b'],
  ['c', 'e', 't', 'b'],
  ['e', 'm', 'r', 'b'],
  ['a', 'l', 's', 'b']
]
console.log(boggle(matrix, dictionary))


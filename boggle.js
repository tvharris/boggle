// Code for reading file adapted from 
// https://nodejs.dev/learn/reading-files-with-nodejs
const fs = require('fs')
let words = []

// Takes a list of words (Unix newline delimited) and creates an 
// array of words
try {
  const data = fs.readFileSync('truncated_dict.txt', 'utf8')
  // const data = fs.readFileSync('dictionary.txt', 'utf8')
  words = data.split('\n')
} catch (err) {
  console.error(err)
}

// Defines a node in the Trie. Its value is a character and
// its children is an object that stores the next character
// in a word as {character: TrieNode} 
class TrieNode {
  constructor(value) {
    this.children = new Object()
    this.value = value
  }
}

// Defines a Trie, used for storing the dictionary
class Trie {
  constructor() {
    this.root = new TrieNode('')
  }

  // Adds a word to the Trie
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
  }
}

let dictionary = new Trie()
// console.log(dictionary, dictionary.root)

// fill the Trie dictionary
words.forEach((word) => {
  // only include words of valid length for Boggle
  if (3 <= word.length <= 16) {
    dictionary.add(word)
    // console.log(word, word[i])
  }
})

// testing
console.log(dictionary.root.children)
console.log(dictionary.root.children['a'].children)

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
  if (3 <= word.length <= 16) {
    dictionary.add(word)
    // console.log(word, word[i])
  }
})

// testing
console.log(dictionary.root.children)
console.log(dictionary.root.children['a'].children['a'])
console.log('not a word:', dictionary.find('aab'))
console.log('word:', dictionary.find('aah'))
console.log('prefix:', dictionary.find('aan'))

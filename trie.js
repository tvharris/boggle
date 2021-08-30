/**
 * Defines a node to be used by Trie objects.
 * @class
 * @constructor
 * @public
 */
class TrieNode {
  constructor() {
    /**
     * children stores the next character in a word
     * @type {Object.<string, TrieNode>}
     * @public
     */
    this.children = new Object()
    /**
     * Indicates whether this is the terminal node for a word.
     * @type {boolean}
     * @public
     */
    this.isWord = false
  }
}

/**
 * Defines a Trie data structure with add and find methods.
 * @class
 * @constructor
 * @public
 */
class Trie {
  constructor() {
    /**
     * @type {TrieNode}
     * @public
     */
    this.root = new TrieNode('')
  }

  /**
   * Adds a word to the Trie
   * @param {string} word
   */
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

  /**
   * Searches for s in the Trie.
   * @param {string} s
   * @returns {number} 0 if it is not found, 1 if it is a complete word,
   * 2 if it is a valid prefix.
   */
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

module.exports = Trie

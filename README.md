# Boggle Word Search

## Description

This is an implentation of a word search in the style of the game Boggle. 
The program finds all valid words in a random or user-provided 4x4 (or other size) 
matrix. The words are output to the console and returned as a Set.

Words are validated using the provided word list and the rules of Boggle:
Words are composed of letters connected horizontally, vertically, or diagonally, 
and they must be at least 3 letters long.

## Usage

To run with the provided files, execute
`node boggle.js twl06.txt matrix.json`

More generally:
`node boggle.js words_file [matrix_file]`

`words_file` is a text file containing a list of words (**Unix newline delimited**).

`matrix_file` (optional) is a **JSON-formatted** matrix of letters (A-Z).
If a filename is not provided for the matrix, a 4x4 matrix of random letters is used.
 
## Source of Word List

`twlo6.txt` is the North America Scrabble word list from https://www.wordgamedictionary.com/word-lists/

## References

_All significant usage of code from the following references (e.g., for sorting the output) is cited in
comments within the files._

All references were accessed Aug 27-30, 2021.

### Reading Files
https://nodejs.dev/learn/reading-files-with-nodejs

### Trie Data Structure
Standard structure: https://en.wikipedia.org/wiki/Trie

Relevance to Boggle (Anna-Chiara Bellini): https://www.toptal.com/java/the-trie-a-neglected-data-structure

Idea for Boolean node value (Rod Howell): https://cis300.cs.ksu.edu/trees/tries/intro/

### Command-line Arguments

https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/

Error handling (joshtronic): https://www.digitalocean.com/community/tutorials/nodejs-command-line-arguments-node-scripts

### Docstrings
https://google.github.io/styleguide/jsguide.html

https://jsdoc.app/tags-type.html

Example class docstring (balupton): https://stackoverflow.com/questions/51467835/how-to-use-jsdoc-to-document-an-es6-class-property

### Other Articles and Useful Stack Overflow Posts

Sort method (Salman A and Fergal): https://stackoverflow.com/questions/10630766/how-to-sort-an-array-based-on-the-length-of-each-element/10630852

Workaround for arrays in sets (djfdev): https://stackoverflow.com/questions/29760644/storing-arrays-in-es6-set-and-accessing-them-by-value

Use of const (Alberto Gimeno): https://medium.com/dailyjs/use-const-and-make-your-javascript-code-better-aac4f3786ca1

Copy a set (Jo Liss): https://stackoverflow.com/questions/30626070/shallow-clone-a-map-or-set

Use of main function (Mathieu Larose): https://mathieularose.com/main-function-in-node-js

Import class from other file (Paul Rumkin): https://stackoverflow.com/questions/6998355/including-javascript-class-definition-from-another-file-in-node-js

### Basic Syntax
Classes: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

Random int: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

Ascii to string: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode

Set: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set

Continue/break: https://www.w3schools.com/js/js_break.asp

Array.from(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from

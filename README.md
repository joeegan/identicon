Using: https://stackoverflow.com/questions/32259142/how-to-use-pngjs-library-to-create-png-from-rgb-matrix#answer-32260288

Create and indenticon following these steps:

http://writings.orangegnome.com/writes/creating-identicons/

Get String
Convert string to MD5 hash (take first 15 of this 42 varchar and mirror it)
Extract identicon color from hash (use the first 3 numbers of has as RGB)
Convert hash values to boolean values to determine each block in the 5×5 grid (paint 'odd' values as colours)
Draw image based off of values
Output image

# 2048
A clone of 2048 written with React.js

# Functionality
The game is completely playable at the moment with the ability to reset the board and undo actions to any predetermined point in a game.
There isn't quite a way to "win" the game at the moment. You just play and match as high as you can and try to beat your best score. Perhaps could just add a simple popup to say you got to 2048.

# TODO or Concerns
The way that the gameboard is represented internally is a nxm array where n is the number of rows and m is the number of elements per row.
Some possible future improvements
- Allow generalization of 2048's game board and allow variable rows and columns
- Add transitions for sliding and merging. (This one in particular stumps me. Not entirely sure how to record the logic to transition tiles shifting and merging since the board rerenders from the array every time.
- Add an animation for increasing score.

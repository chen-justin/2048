import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
function Tile(props) {
  let tags = "tile";
  if (props.value < 0) { //For our purposes, negative values will be the "empty" value.
    return(
      <div className="tile">
        {null}
      </div>
    );
  }

  tags = "tile tile-"+ props.value.toString();

  return (
    <div className={tags}>
      {props.value}
    </div>
  );
}

class Board extends React.Component {
  renderTile(i) {
    return (
      <Tile
        value={this.props.tiles[i]}
      />
    );
  }

  render() {
    return (
      <div className="game-board">
        <div className="board-row">
          {this.renderTile(0)}
          {this.renderTile(1)}
          {this.renderTile(2)}
          {this.renderTile(3)}
        </div>
        <div className="board-row">
          {this.renderTile(4)}
          {this.renderTile(5)}
          {this.renderTile(6)}
          {this.renderTile(7)}
        </div>
        <div className="board-row">
          {this.renderTile(8)}
          {this.renderTile(9)}
          {this.renderTile(10)}
          {this.renderTile(11)}
        </div>
        <div className="board-row">
          {this.renderTile(12)}
          {this.renderTile(13)}
          {this.renderTile(14)}
          {this.renderTile(15)}
        </div>
      </div>
    );
  }
}


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          tiles: Array(16).fill(-1),
          score: 0
        },
      ],
      best_score: 0,
      stepNumber: 0,
    }
    let arr = []
    let rows = 4;
    let rowSize = 4;
    //Initializes board with "2" in two random places.
    while (arr.length < 2) {
      const rand = Math.floor(Math.random()*rows*rowSize);
      if(arr.indexOf(rand) > -1) continue;
      arr[arr.length] = rand;
    }

    this.state.history[0].tiles[arr[0]] = 2;
    this.state.history[0].tiles[arr[1]] = 2;
  }

  reset_game() {
    let arr = []
    let rows = 4;
    let rowSize = 4;
    //Initializes board with "2" in two random places.
    while (arr.length < 2) {
      const rand = Math.floor(Math.random()*rows*rowSize);
      if(arr.indexOf(rand) > -1) continue;
      arr[arr.length] = rand;
    }
    let new_tiles = Array(rows*rowSize).fill(-1);
    new_tiles[arr[0]] = 2;
    new_tiles[arr[1]] = 2;
    console.log(new_tiles);
    this.setState({
      best_score: Math.max(this.state.best_score, this.state.history[this.state.stepNumber].score),
      history: [{tiles: new_tiles, score: 0}],
      stepNumber: 0,
    })
  }

  undo() {
    this.setState({
      stepNumber: Math.max(0, this.state.stepNumber - 1),
    })
  }

  handleKeyPress = (e) => {
    e = e || window.event;
    if (e.keyCode === 38) {
      // up arrow
      this.shift(1);
    }
    else if (e.keyCode === 40) {
      // down arrow
      this.shift(2);
    }
    else if (e.keyCode === 37) {
      // left arrow
      this.shift(0);
    }
    else if (e.keyCode === 39) {
      // right arrow
      this.shift(3);
    }
  }

  shift(bit) {
    if (this.move_possible) {
      // 0 = left, 1 = up, 2 = down, 3 = right
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const tiles = current.tiles.slice();
      const rows = 4;
      const rowSize = 4;
      let moveMade = false;
      let addedScore = 0;

      if (bit === 0) {
        //Shifting left
        for (let i = 0; i < rows; i++) {
          //Perform possible merges.
          let prev = i*rowSize;
          let ptr = prev + 1;
          while (ptr < (i+1)*rowSize) {
            if(tiles[ptr] > 0 && tiles[ptr] === tiles[prev]) {
              addedScore += tiles[ptr];
              tiles[prev] = tiles[prev]*2;
              tiles[ptr] = -1;
              prev = ptr;
              moveMade = true;
            } else if (tiles[ptr] > 0) {
              prev = ptr;
            }
            ptr++;
          }

          //Moves everything as left as possible
          let pivot = i*rowSize;
          while (pivot < (i+1)*rowSize && tiles[pivot] > 0) {
            pivot++;
          }
          ptr = pivot; //Reset ptr
          while (ptr < (i+1)*rowSize) {
            if (tiles[ptr] > 0) {
              tiles[pivot] = tiles[ptr];
              tiles[ptr] = -1;
              pivot++;
              moveMade = true;
            }
            ptr++;
          }
        }

      } else if (bit === 1) {
        //Shifting up
        for (let i = 0; i < rowSize; i++) {

          //Perform possible merges
          let prev = i;
          let ptr = prev + rowSize;
          while (ptr < tiles.length) {
            if(tiles[ptr] > 0 && tiles[ptr] === tiles[prev]) {
              addedScore += tiles[ptr];
              tiles[prev] = tiles[prev]*2;
              tiles[ptr] = -1;
              prev = ptr;
              moveMade = true;
            } else {
              if (tiles[ptr] > 0) {
                prev = ptr;
              }
            }
            ptr += rowSize;
          }

          let pivot = i;
          while (pivot < tiles.length && tiles[pivot] > 0) {
            pivot += rowSize;
          }
          ptr = pivot;
          while (ptr < tiles.length) {
            if (tiles[ptr] > 0) {
              tiles[pivot] = tiles[ptr];
              tiles[ptr] = -1;
              pivot += rowSize;
              moveMade = true;
            }
            ptr += rowSize;
          }
        }
      } else if (bit === 2) {
        //Shifting down
        for (let i = 0; i < rowSize; i++) {

          //Perform possible merges
          let prev = tiles.length - i - 1;
          let ptr = prev - rowSize;
          while (ptr >= 0) {
            if(tiles[ptr] > 0 && tiles[ptr] === tiles[prev]) {
              addedScore += tiles[ptr];
              tiles[prev] = tiles[prev]*2;
              tiles[ptr] = -1;
              prev = ptr;
              moveMade = true;
            } else {
              if (tiles[ptr] > 0) {
                prev = ptr;
              }
            }
            ptr -= rowSize;
          }

          let pivot = tiles.length - i - 1;
          while (pivot >= 0 && tiles[pivot] > 0) {
            pivot -= rowSize;
          }
          ptr = pivot;
          while (ptr >= 0) {
            if (tiles[ptr] > 0) {
              tiles[pivot] = tiles[ptr];
              tiles[ptr] = -1;
              pivot -= rowSize;
              moveMade = true;
            }
            ptr -= rowSize;
          }
        }
      } else if (bit === 3) {
        //Shifting right
        for (let i = 0; i < rows; i++) {
          //Perform possible merges.
          let prev = (i+1)*rowSize-1;
          let ptr = prev - 1;
          while (ptr > i*rowSize-1) {
            if(tiles[ptr] > 0 && tiles[ptr] === tiles[prev]) {
              addedScore += tiles[ptr];
              tiles[prev] = tiles[prev]*2;
              tiles[ptr] = -1;
              prev = ptr;
              moveMade = true;
            } else if (tiles[ptr] > 0) {
              prev = ptr;
            }
            ptr--;
          }

          //Moves everything as right as possible
          let pivot = (i+1)*rowSize-1;
          while (pivot >= i*rowSize && tiles[pivot] > 0) {
            pivot--;
          }
          ptr = pivot; //Reset ptr
          while (ptr >= i*rowSize) {
            if (tiles[ptr] > 0) {
              tiles[pivot] = tiles[ptr];
              tiles[ptr] = -1;
              pivot--;
              moveMade = true;
            }
            ptr--;
          }
        }
      }

      let emptySpaces = [];
      for (let i = 0; i < tiles.length; i++) {
        if (tiles[i] < 0) {
          emptySpaces.push(i);
        }
      }

      if (!moveMade && emptySpaces.length === 0) {
        this.setState({
          best_score: Math.max(this.state.history[this.state.stepNumber].score, this.state.best_score),
        })
      }

      if (moveMade) {
        //Generate a new tile to add in an empty space.
        if (emptySpaces) {
          let rand = Math.floor(Math.random()*emptySpaces.length);
          tiles[emptySpaces[rand]] = 2;
        }

        this.setState({
          history: history.concat([
            {
              tiles: tiles,
              score: current.score + addedScore
            }
          ]),
          stepNumber: history.length,
        })
      }
    }
  }

  move_possible(tiles, numRows, numPerRow) {
    let move_possible = false;
    for (let i = 0; i < numRows; i++) {
      const row_index = i*numRows;
      for (let j = 0; j < numPerRow; j++) {
        const curr_index = row_index + j;

        //Checks if curr_index - numPerRow is still within bounds of our array.
        //Sets it to -1 if its out of bounds so we can account for it later.
        //Necessary since an empty space in our board is "null".
        //Possibly could make our default "empty" value -1.
        const above_curr = curr_index - numPerRow > 0 ? curr_index - numPerRow : null;
        const below_curr = curr_index + numPerRow < tiles.length ? curr_index + numPerRow : null;
        const left_curr = j - 1 > 0 ? curr_index - 1 : null;
        const right_curr = j + 1 < numPerRow ? curr_index + 1 :null;

        move_possible = move_possible || above_curr !== null || below_curr !== null || left_curr !== null || right_curr !== null;

      }
    }
    console.log(move_possible);
    return move_possible;
  }

  render() {
    let best_score = this.state.best_score;
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    let score = current.score;

    document.onkeydown = this.handleKeyPress;

    return(
      <div className="game" onKeyPress={this.handleKeyPress}>
        <div className = "header">
          <div className = "game-header">
            <p className="title">2048</p>
            <div className = "game-info">
              <div>
                <p>Score</p>
                <p><strong>{score}</strong></p>
              </div>
              <div>
                <p>Best</p>
                <p><strong>{best_score}</strong></p>
              </div>
              <div>
                <p>Moves</p>
                <p><strong>{this.state.stepNumber}</strong></p>
              </div>
            </div>
          </div>
          <div class="aux-header">
            <p className="subtitle">A take on 2048 in React.</p>
            <button className="resetGame" onClick={() => this.undo()}>Undo</button>
            <button className="resetGame" onClick={() => this.reset_game()}>Reset</button>
          </div>
        </div>
        <Board
          tiles={current.tiles}
        />
        <div className="controls">
          <button className="control" onClick={() => this.shift(0)}><i className="fas fa-arrow-left"></i></button>
          <button className="control" onClick={() => this.shift(1)}><i className="fas fa-arrow-up"></i></button>
          <button className="control" onClick={() => this.shift(2)}><i className="fas fa-arrow-down"></i></button>
          <button className="control" onClick={() => this.shift(3)}><i className="fas fa-arrow-right"></i></button>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
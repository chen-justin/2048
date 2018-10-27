import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Tile(props) {
  return (
    <div className="tile">
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
          tiles: Array(16).fill(null)
        }
      ],
      score: 0,
      best_score: 0,
      stepNumber: 0,
    }
    const arr = []
    while (arr.length < 2) {
      const rand = Math.floor(Math.random()*16);
      if(arr.indexOf(rand) > -1) continue;
      arr[arr.length] = rand;
    }
    this.state.history[0].tiles[arr[0]] = 2;
    this.state.history[0].tiles[arr[1]] = 2;
  }

  shift(bit) {
    // 0 = left, 1 = up, 2 = down, 3 = right
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const tiles = current.tiles.slice();

    const rowSize = 4;
    const rows = 4;
    console.log("Shifted");
    if (bit === 0) {
      for (let i = 1; i <= rows; i++) {
        let ptr = i*rowSize - 1;
        while (ptr > (i-1)*rowSize) {
          let currTile = tiles[ptr];
          let nextTile = tiles[ptr-1];
          if (currTile != null) {
            if (nextTile === null) {
              tiles[ptr - 1] = currTile;
              tiles[ptr] = null;
            } else {
              if (nextTile === currTile) {
                tiles[ptr-1] = currTile*2;
                tiles[ptr] = null;
              }
            }
          }
          ptr--;
        }
      }
    }

    //Generate a new number to add
    //This is pretty bad right now. Infinite loop if board is full.
    let rand = Math.floor(Math.random()*16);
    let iter = 0;
    while (tiles[rand] != null && iter < 16) {
      rand = Math.floor(Math.random()*16);
      iter++;
    }
    tiles[rand] = 2;



    this.setState({
      history: history.concat([
        {
          tiles: tiles
        }
      ]),
      stepNumber: history.length,
    })
  }

  render() {
    let score = this.state.score;
    let best_score = this.state.best_score;
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    return(
      <div className="game">
        <div className = "game-info">
          <div>2048 Clone</div>
          <div>Score: {score}</div>
          <div>Best: {best_score}</div>
        </div>
        <Board
          tiles={current.tiles}
        />
        <div className="controls">
          <button className="control" onClick={() => this.shift(0)}>Left</button>
          <button className="control" onClick={() => this.shift(1)}>Up</button>
          <button className="control" onClick={() => this.shift(2)}>Down</button>
          <button className="control" onClick={() => this.shift(3)}>Right</button>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

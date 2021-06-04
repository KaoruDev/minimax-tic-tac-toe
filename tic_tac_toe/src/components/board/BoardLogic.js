import * as BoardUtils from '../../utils/boardUtils'
import * as MarkerUtils from '../../utils/markerUtils'

const winStates = [
  // Horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonal
  [0, 4, 8],
  [2, 4, 6],
];

export default class BoardLogic {
  board;
  availableMoves;

  constructor({
    board,
    computerMarker,
  }) {
    this.board = [...board];
    this.computerMarker = computerMarker;
    this.availableMoves = BoardUtils.availableMoves(this.board)
  }

  nextBestMove() {
    let moves = this.availableMoves.map(move => {
      let testBoard = [...this.board];
      testBoard[move] = this.computerMarker;
      let score = this.minmax(testBoard, move, this.computerMarker);
      return { score, move };
    });

    let result = moves.reduce((maxScore, nextScore) => {
      if (maxScore.score !== undefined && nextScore.score < maxScore.score) {
        return maxScore;
      } else {
        return nextScore;
      }
    }, {});

    return result.move;
  }

  minmax(board, move, marker, turns = 0) {
    let availableMoves = BoardUtils.availableMoves(board);

    if (this.hasWon(board, MarkerUtils.oppositeMarker(this.computerMarker))) {
      return turns - 10;
    } else if (this.hasWon(board, this.computerMarker)) {
      return 10 - turns;
    } else if (!availableMoves.length) {
      return 0;
    }

    let opponentMarker = MarkerUtils.oppositeMarker(marker);

    let scores = availableMoves.map(move => {
      let testBoard = [...board];
      testBoard[move] = opponentMarker;
      return this.minmax(testBoard, move, opponentMarker, turns + 1);
    });

    if (opponentMarker === this.computerMarker) {
      return Math.max(...scores);
    } else {
      return Math.min(...scores);
    }
  }

  computerWon() {
    return this.hasWon(this.board, this.computerMarker);
  }

  playerWon() {
    return this.hasWon(this.board, MarkerUtils.oppositeMarker(this.computerMarker));
  }

  draw() {
    return !this.availableMoves.length;
  }

  hasWon(board, marker) {
    return !!winStates.find(winState => {
      return winState.every(idx => board[idx] === marker);
    });
  };
}
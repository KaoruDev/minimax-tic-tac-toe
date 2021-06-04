import * as BoardUtils from '../../utils/boardUtils'
import * as MarkerUtils from '../../utils/markerUtils'

/**
 * List of know winable states.
 */
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

/**
 * Encapsulates the Minimax algorithm inspired from:  https://www.neverstopbuilding.com/blog/minimax
 */
export default class BoardLogic {
  board;
  availableMoves;

  /**
   * @param board - Array describing the state of a tic-tac-toe board.
   *                Assumes the array has a length of 9 and only contains null, 'x', or 'y' values.
   * @param computerMarker - Value of the computer's marker ('x' or 'y'). Is used to evaluate the score of a move.
   */
  constructor({
    board,
    computerMarker,
  }) {
    this.board = [...board];
    this.computerMarker = computerMarker;
    this.availableMoves = BoardUtils.availableMoves(this.board)
  }

  /**
   * Returns the index of the optimal square the computer should take next.
   *
   * The algorithm will return a move that will result in a :
   * 1) Win
   * 2) Prolonged game that will result in a draw, or a late defeat (if the board is rigged).
   *
   * If there are multiple moves resulting in the same score, return a random move with the highest score.
   */
  nextBestMove() {
    let moves = this.availableMoves.map(move => {
      let score = this.minimax(this.board, move, this.computerMarker);
      return { score, move };
    });

    let result = moves.reduce((maxScores, nextScore) => {
      if (maxScores.length) {
        const maxScore = maxScores[0].score;
        if (maxScore > nextScore.score) {
          return maxScores
        } else if (maxScore === nextScore.score) {
          return [nextScore, ...maxScores];
        } else {
          return [nextScore];
        }
      } else {
        return [nextScore];
      }
    }, []);

    return result[Math.floor(Math.random() * result.length)].move;
  }

  /**
   * Recursive function to calculate a score of a particular move. Score is determine by the result of the game.
   *
   * A move resulting in a win for the marker, will return a positive number, if it is the computer's marker.
   * Otherwise, the score will be negative. The higher the score, the more better the move is.
   *
   * Any move resulting in a draw will return a 0.
   *
   * The more turns it takes to result in a end state, the lower the score will be. In other words, moves that result
   * in a win with less turns will result in a higher score.
   *
   * @param board - array of null, 'x', or 'o'
   * @param move - index of the element inside of board to replace with the marker
   * @param marker - value to replace a null value inside of the board
   * @param turns - which turn are we on?
   * @returns {number} - Score
   */
  minimax(board, move, marker, turns = 0) {
    let testBoard = [...board];
    testBoard[move] = marker;
    let availableMoves = BoardUtils.availableMoves(testBoard);

    if (this.hasWon(testBoard, MarkerUtils.oppositeMarker(this.computerMarker))) {
      return turns - 10;
    } else if (this.hasWon(testBoard, this.computerMarker)) {
      return 10 - turns;
    } else if (!availableMoves.length) {
      return 0;
    }

    let opponentMarker = MarkerUtils.oppositeMarker(marker);

    let scores = availableMoves.map(move => {
      return this.minimax(testBoard, move, opponentMarker, turns + 1);
    });

    if (opponentMarker === this.computerMarker) {
      return Math.max(...scores);
    } else {
      return Math.min(...scores);
    }
  }

  /**
   * Determines whether the computer has won the game or not.
   */
  computerWon() {
    return this.hasWon(this.board, this.computerMarker);
  }

  /**
   * Determins whether the player has won the game or not.
   */
  playerWon() {
    return this.hasWon(this.board, MarkerUtils.oppositeMarker(this.computerMarker));
  }

  /**
   * Game is a draw, if neither the computer nor the player has won and there are no availabe moves on the board.
   */
  draw() {
    return !this.computerWon() && !this.playerWon() &&  !this.availableMoves.length;
  }

  /**
   * Determines whether the marker has won the game by checking against all of the known win states.
   */
  hasWon(board, marker) {
    return !!winStates.find(winState => {
      return winState.every(idx => board[idx] === marker);
    });
  };
}
import * as MarkerUtils from '../../utils/markerUtils';
import * as BoardUtils from '../../utils/boardUtils';

export const GAME_STATES = {
  playing: 'playing',
  draw: 'DRAW!',
  playerWins: 'YOU WIN!',
  computerWins: 'YOU LOSE!'
}


const wonStates = [
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
  [6, 4, 2],
];

export const hasWon = (squares) => {
  return !!wonStates.find(winState => {
    let firstMarker = squares[winState[0]] || 'empty';
    return winState.every(idx => squares[idx] === firstMarker);
  });
};

export const evaluateBestMove = (board, marker) => {
  const availableMoves = BoardUtils.availableMoves(board)
  let winningMove = availableMoves.find(move => {
    let testBoard = [...board];
    testBoard[move] = marker;

    return hasWon(testBoard);
  });

  // Exit if we detect a win in the next move
  if (winningMove) {
    return winningMove;
  }

  let oppositeMarker = MarkerUtils.oppositeMarker(marker);
  let blockingMove = availableMoves.find(move => {
    let testBoard = [...board];
    testBoard[move] = oppositeMarker;
    return hasWon(testBoard);
  })

  if (blockingMove) {
    return blockingMove;
  } else {
    return availableMoves[0];
  }
}


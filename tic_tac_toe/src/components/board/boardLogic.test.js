import {evaluateBestMove, hasWon} from "./boardLogic";

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

test('#hasWon returns true for boards with winning states', () => {
  let emptyBoard = Array(9);

  wonStates.forEach(winState => {
    let testBoard = winState.reduce((board, idx) => {
      board[idx] = 'x';
      return board;
    }, (emptyBoard))

    expect(hasWon(testBoard), `Board: ${JSON.stringify(testBoard)} is not a a winning state`).toBeTruthy()
  });
});

test('#hasWon returns false for boards without winning states', () => {
  let emptyBoard = Array(9);

  expect(hasWon(emptyBoard), 'empty board won?').toBeFalsy();
  expect(hasWon(['x', null, null, null, null, null, null]), 'Board with 1 marker won').toBeFalsy();
});

test('#evaluateBestMove return 2 if board is [x, x, null, null ...]', () => {
  let testBoard = Array(9).fill(null).fill('x', 0, 2);
  expect(evaluateBestMove(testBoard, 'x')).toEqual(2);
});

test('#evaluateBestMove return 3 if board is [o, null, null, null, x, x, null, null]', () => {
  let testBoard = ['o', null, null, null, 'x', 'x', null, null]
  expect(evaluateBestMove(testBoard, 'x')).toEqual(3);
});


/**
 * In other words, if board is
 * x
 *  o
 *   o
 *
 * X's next move should be
 * x  x
 *  o
 *   o
 */
test('#evaluateBestMove return 2 if board is [x, null, null, null, o, null, null, null, o]', () => {
  let testBoard = ['x', null, null, null, 'o', null, null, null, 'o'];
  expect(evaluateBestMove(testBoard, 'x')).toEqual(2);
});

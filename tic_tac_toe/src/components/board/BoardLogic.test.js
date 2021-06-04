import BoardLogic from './BoardLogic';
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

test("#computerWon returns true when passed a board with a winning stage", () => {
  winStates.forEach(winState => {
    let board = Array(9).fill(null);
    winState.forEach(idx => board[idx] = 'x')
    let boardLogic = new BoardLogic({ board, computerMarker: 'x'});
    expect(boardLogic.computerWon(), `${winState} returned false`).toBeTruthy();
  })
});

test("#playerWon returns true when passed a board with a winning stage", () => {
  winStates.forEach(winState => {
    let board = Array(9).fill(null);
    winState.forEach(idx => board[idx] = 'o')
    let boardLogic = new BoardLogic({ board, computerMarker: 'x'});
    expect(boardLogic.playerWon(), `${winState} returned false`).toBeTruthy();
  })
})

test("#nextBestMove() returns winning move when there's a chance to win", () => {
  let testBoard = [
    'x', 'x', 'o',
    'o', 'x', null,
    'o', 'o', null,
  ];

  let game = new BoardLogic({board: testBoard, computerMarker: 'x'});

  expect(game.nextBestMove()).toEqual(8);

  testBoard = [
    'x', 'x', null,
    'o', 'o', null,
    null, null, null,
  ];

  game = new BoardLogic({board: testBoard, computerMarker: 'x'});

  expect(game.nextBestMove()).toEqual(2);

  game = new BoardLogic({board: testBoard, computerMarker: 'o'});

  expect(game.nextBestMove()).toEqual(5);
});

test("#nextBestMove() returns correct move when board opponent wins next turn", () => {
  let testBoard = [
    'x', 'x', null,
    'o', 'x', null,
    'o', 'o', null,
  ];

  let game = new BoardLogic({board: testBoard, computerMarker: 'o'});

  expect(game.nextBestMove()).toEqual(8);

  testBoard = [
    'x', 'x', null,
    'o', null, null,
    null, null, null,
  ]

  game = new BoardLogic({board: testBoard, computerMarker: 'o'});

  expect(game.nextBestMove()).toEqual(2);

  testBoard = [
    'x', null, null,
    null, 'o', null,
    'x', 'o', null,
  ];

  game = new BoardLogic({board: testBoard, computerMarker: 'x'});

  expect(game.nextBestMove()).toEqual(3);
});

test("#nextBestMove() gets winning move on a more complicated board", () => {
  let testBoard = [
    'o', null, 'x',
    'x', null, 'x',
    null, 'o', 'o',
  ];

  let game = new BoardLogic({board: testBoard, computerMarker: 'x'});

  expect(game.nextBestMove()).toEqual(4);
});


test("#nextBestMove() avoids traps", () => {
  let testBoard = [
    'x', null, null,
    null, 'o', null,
    null, null, 'o',
  ];

  let game = new BoardLogic({board: testBoard, computerMarker: 'x'});

  expect(game.nextBestMove()).toEqual(6);

  testBoard = [
    'o', null, null,
    null, 'o', null,
    null, null, 'x',
  ];

  game = new BoardLogic({board: testBoard, computerMarker: 'x'});

  expect(game.nextBestMove()).toEqual(6);
});

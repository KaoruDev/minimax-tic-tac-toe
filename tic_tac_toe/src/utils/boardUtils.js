export const availableMoves = (board) => (
  board.map((value, idx) => [value, idx])
    .filter(([value, _]) => !value)
    .map(([_, idx]) => idx)
);

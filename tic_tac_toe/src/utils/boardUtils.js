/**
 * Returns an array with the indexes of the falsey values of the original array.
 *
 * For example, if board = [1, 2, null, 5, null]
 * result is = [2, 4]
 */
export const availableMoves = (board) => (
  board.map((value, idx) => [value, idx])
    .filter(([value, _]) => !value)
    .map(([_, idx]) => idx)
);


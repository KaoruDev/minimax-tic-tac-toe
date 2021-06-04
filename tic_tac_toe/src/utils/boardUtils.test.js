import * as BoardUtils from './boardUtils'

test('BoardUtils.availableMoves returns an array of indexes of the falsely values', () => {
  expect(BoardUtils.availableMoves([1])).toEqual([]);
  expect(BoardUtils.availableMoves([null])).toEqual([0]);
  expect(BoardUtils.availableMoves([null, 1, 2, null])).toEqual([0, 3]);
  expect(BoardUtils.availableMoves([null, 5, null, 1, 2, null])).toEqual([0, 2, 5]);
});
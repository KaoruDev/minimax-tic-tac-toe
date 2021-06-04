import * as ArrayUtils from './arrayUtils'

test('arrayUtils.batchArray to return a nested array of elements', () => {
  expect(ArrayUtils.batchArray([1, 2, 3, 4, 5, 6], 2)).toEqual([[1, 2], [3, 4], [5, 6]]);
  expect(ArrayUtils.batchArray([1, 2, 3, 4, 5, 6], 1)).toEqual([[1], [2], [3], [4], [5], [6]]);
})
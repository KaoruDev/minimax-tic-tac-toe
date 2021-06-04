/**
 * Helper function to batch elements into nested arrays.
 *
 * For example, if target = [1, 2, 3, 4, 5, 6] and batchSize = 2
 * result is: [[1,2], [3, 4], [5, 6]]
 */
export const batchArray = (target, batchSize) => {
  let result = [];

  for (let i = 0; i < target.length; i += batchSize) {
    result.push(target.slice(i, i + batchSize));
  }

   return result;
}
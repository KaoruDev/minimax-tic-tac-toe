export const batchArray = function (target, batchSize) {
  let result = [];

  for (let i = 0; i < target.length; i += batchSize) {
    result.push(target.slice(i, i + batchSize));
  }

   return result;
}
export function insertionSort(array) {
  let n = array.length;
  const animations = [];
  //mark first element as sorted
  animations.push(createComparingObject(0, 0, false));
  for (let i = 1; i < n; i++) {
    // Choosing the first element in our unsorted subarray
    animations.push(createComparingObject(i, j, false, false, true));

    let current = array[i];
    // The last element of our sorted subarray
    let j = i - 1;
    animations.push(createComparingObject(i, j, false, true));
    while (j > -1 && current < array[j]) {
      [array[j], array[j + 1]] = [array[j + 1], array[j]];
      animations.push(createComparingObject(j, j + 1, false, true));
      animations.push(createComparingObject(j, j + 1, true));
      j--;
    }
  }
  return animations;
}

function createComparingObject(
  currElm,
  compareElm,
  isSwap,
  isCompare = false,
  isSetCurr = false
) {
  return {
    currElm,
    compareElm,
    isSwap,
    isCompare,
    isSetCurr,
  };
}

export function selectionSort(array) {
  let n = array.length;
  const compareAnim = [];
  for (let i = 0; i < n; i++) {
    // Finding the smallest number in the subarray
    let min = i;

    for (let j = i + 1; j < n; j++) {
      compareAnim.push(createComparingObject(i, j, min, false, false, -1));

      if (array[j] < array[min]) {
        min = j;
        compareAnim.push(createComparingObject(i, j, min, false, false, -1));
      }
    }

    if (min != i) {
      // Swapping the elements
      // [array[i], array[min]] = [array[min], array[i]];
      let tmp = array[i];
      array[i] = array[min];
      array[min] = tmp;
      compareAnim.push(createComparingObject(min, i, min, true, false, -1));
    }
    compareAnim.push(createComparingObject(i, i, i, false, true, i));
  }

  return compareAnim;
}

function createComparingObject(
  currElm,
  compareElm,
  minIndex,
  isSwap,
  isFinalElm,
  finalElm
) {
  return {
    currElm,
    compareElm,
    minIndex,
    isSwap,
    isFinalElm,
    finalElm,
  };
}

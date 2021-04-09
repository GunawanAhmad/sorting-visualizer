export function bubbleSort(array) {
  let swapped;
  const animation = [];
  do {
    swapped = false;
    animation.push(createComparingObject(0, 1, false, true));
    for (let i = 0; i < array.length - 1; i++) {
      animation.push(createComparingObject(i, i + 1));
      if (array[i] > array[i + 1]) {
        animation.push(createComparingObject(i, i + 1, true));
        let temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);
  return animation;
}

function createComparingObject(
  leftElm,
  rightElm,
  isSwap = false,
  isOutLoop = false
) {
  return {
    leftElm,
    rightElm,
    isSwap,
    isOutLoop,
  };
}

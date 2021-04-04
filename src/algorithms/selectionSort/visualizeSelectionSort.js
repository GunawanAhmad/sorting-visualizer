import { selectionSort } from "./selectionSort";
import { changeBackgroundColor, swapBars } from "../../Helper/Helper";

export function visualizeSelectionSort(array, animationTime, arrFromNodeList) {
  let sortedArr = selectionSort(array);
  let currElmColor = "#264653";
  let compareElmColor = "#e9c46a";
  let minElmCOlor = "#9e2a2b";
  let sortedColor = "#2a9d8f";
  let unsortedColor = "#e76f51";
  for (let i = 0; i < sortedArr.length; i++) {
    setTimeout(() => {
      changeBackgroundColor(
        sortedArr[i].minIndex,
        minElmCOlor,
        arrFromNodeList
      );
      changeBackgroundColor(
        sortedArr[i].currElm,
        currElmColor,
        arrFromNodeList
      );
      changeBackgroundColor(
        sortedArr[i].compareElm,
        compareElmColor,
        arrFromNodeList
      );
      if (sortedArr[i].isSwap === true) {
        // Changing the color-bar of elements which has to be swapped.

        changeBackgroundColor(
          sortedArr[i].minIndex,
          sortedColor,
          arrFromNodeList
        );
        changeBackgroundColor(
          sortedArr[i].currElm,
          sortedColor,
          arrFromNodeList
        );
        // Actually swapping the elements (heights).
        swapBars(
          sortedArr[i].currElm,
          sortedArr[i].compareElm,
          arrFromNodeList
        );
      }
    }, i * animationTime);

    setTimeout(() => {
      if (sortedArr[i].isFinalElm === true) {
        // Changing the color-bar of finalElement index which has taken its final sorted position.
        changeBackgroundColor(
          sortedArr[i].finalElm,
          sortedColor,
          arrFromNodeList
        );
      } else {
        // Changing the color-bar of elements which has not taken its final sorted position yet.
        changeBackgroundColor(
          sortedArr[i].compareElm,
          unsortedColor,
          arrFromNodeList
        );
        changeBackgroundColor(
          sortedArr[i].minIndex,
          unsortedColor,
          arrFromNodeList
        );
      }
    }, (i + 1) * animationTime);
  }
}

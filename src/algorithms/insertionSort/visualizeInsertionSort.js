import { insertionSort } from "./insertionSort";
import { changeBackgroundColor, swapBars } from "../../Helper/Helper";

export function visualizeInsertionSort(array, animationTime, arrFromNodeList) {
  let sortedArr = insertionSort(array);
  let currElmColor = "#e9c46a";
  let compareElmColor = "#264653";
  let unsortedColor = "#da7f4b";
  let sortedColor = "#2a9d8f";

  for (let i = 0; i < sortedArr.length; i++) {
    setTimeout(() => {
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

      if (sortedArr[i].isSwap) {
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
        swapBars(
          sortedArr[i].currElm,
          sortedArr[i].compareElm,
          arrFromNodeList
        );
      }
    }, i * animationTime);

    setTimeout(() => {
      changeBackgroundColor(
        sortedArr[i].compareElm,
        unsortedColor,
        arrFromNodeList
      );
      changeBackgroundColor(
        sortedArr[i].currElm,
        unsortedColor,
        arrFromNodeList
      );

      if (i === sortedArr.length - 1) {
        setTimeout(() => {
          for (let j = 0; j < arrFromNodeList.length; j++) {
            setTimeout(() => {
              changeBackgroundColor(j, sortedColor, arrFromNodeList);
            }, j * 100);
          }
        }, 300);
      }
    }, (i + 1) * animationTime);
  }
}

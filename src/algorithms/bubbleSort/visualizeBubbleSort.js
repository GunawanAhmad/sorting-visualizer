import { bubbleSort } from "./bubbleSort";
import {
  changeBackgroundColor,
  swapBars,
  disableButton,
} from "../../Helper/Helper";

export function visualizeBubbleSort(
  array,
  animationTime,
  arrFromNodeList
  // pseudoSections
) {
  let sortedArr = bubbleSort(array);
  // let currElmColor = "#264653";
  let compareElmColor = "#e9c46a";
  let sortedColor = "#2a9d8f";
  let unsortedColor = "#da7f4b";
  // pseudoSections[0].classList.add("active");
  for (let i = 0; i < sortedArr.length; i++) {
    disableButton(true);
    setTimeout(() => {
      if (i === sortedArr.length - 1) {
        disableButton(false);
      }
      changeBackgroundColor(
        sortedArr[i].leftElm,
        compareElmColor,
        arrFromNodeList
      );
      changeBackgroundColor(
        sortedArr[i].rightElm,
        compareElmColor,
        arrFromNodeList
      );
      if (sortedArr[i].isSwap) {
        changeBackgroundColor(
          sortedArr[i].leftElm,
          compareElmColor,
          arrFromNodeList
        );
        changeBackgroundColor(
          sortedArr[i].rightElm,
          compareElmColor,
          arrFromNodeList
        );
        swapBars(sortedArr[i].leftElm, sortedArr[i].rightElm, arrFromNodeList);
      }
    }, i * animationTime);

    setTimeout(() => {
      changeBackgroundColor(
        sortedArr[i].leftElm,
        unsortedColor,
        arrFromNodeList
      );
      changeBackgroundColor(
        sortedArr[i].rightElm,
        unsortedColor,
        arrFromNodeList
      );

      if (i === sortedArr.length - 1) {
        // removePreviousActivePseudo();
        // const pseudoCheckingElm = document.querySelector(
        //   ".pseudo-code-container .checking"
        // );
        // pseudoCheckingElm.textContent = "Let's Go";
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

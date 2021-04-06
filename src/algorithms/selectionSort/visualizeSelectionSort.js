import { selectionSort } from "./selectionSort";
import { changeBackgroundColor, swapBars } from "../../Helper/Helper";

export function visualizeSelectionSort(
  array,
  animationTime,
  arrFromNodeList,
  pseudoSections
) {
  let sortedArr = selectionSort(array);
  let currElmColor = "#264653";
  let compareElmColor = "#e9c46a";
  let minElmColor = "#9e2a2b";
  let sortedColor = "#2a9d8f";
  let unsortedColor = "#e76f51";
  pseudoSections[0].classList.add("active");
  for (let i = 0; i < sortedArr.length; i++) {
    setTimeout(() => {
      visualizePseudo(sortedArr[i], pseudoSections);
      checkPseudoAnim(sortedArr[i], arrFromNodeList, arrFromNodeList);
      changeBackgroundColor(
        sortedArr[i].minIndex,
        minElmColor,
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
      visualizePseudo(sortedArr[i], pseudoSections);
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

function removePreviousActivePseudo() {
  let sections = document.querySelectorAll(".active");
  sections.forEach((section) => {
    section.classList.remove("active");
  });
}

function visualizePseudo(data, pseudoSections) {
  removePreviousActivePseudo();
  pseudoSections[1].classList.add("active");
  if (data.isOutJLoop) {
    removePreviousActivePseudo();
    pseudoSections[1].classList.add("active");
  } else {
    removePreviousActivePseudo();
    pseudoSections[3].classList.add("active");
  }
  if (data.isChangeMin) {
    removePreviousActivePseudo();
    pseudoSections[4].classList.add("active");
  }
  if (data.isCompareIandMin) {
    removePreviousActivePseudo();
    pseudoSections[5].classList.add("active");
  }
  if (data.isSwap) {
    removePreviousActivePseudo();
    pseudoSections[6].classList.add("active");
  }
  if (data.isFinalElm) {
    removePreviousActivePseudo();
    pseudoSections[1].classList.add("active");
  }
}

function checkPseudoAnim(data, arrFromNodeList) {
  const pseudoCheckingElm = document.querySelector(
    ".pseudo-code-container .checking"
  );
  if (data.isFinalElm) {
    return;
  }
  if (!data.isOutJLoop) {
    pseudoCheckingElm.textContent = `Cek apakah nilai ${
      arrFromNodeList[data.compareElm].textContent
    } lebih kecil dari minimum (${arrFromNodeList[data.minIndex].textContent})`;
  }
  if (data.isChangeMin || data.isOutJLoop) {
    pseudoCheckingElm.textContent = `set nilai ${
      arrFromNodeList[data.minIndex].textContent
    } sebagai nilai minimum`;
  }
  // if (data.isFinalElm) {
  //   pseudoCheckingElm.textContent = `set nilai ${
  //     arrFromNodeList[data.minIndex + 1].textContent
  //   } sebagai nilai minimum`;
  // }
  // if (data.isOutJLoop) {
  //   console.log("hai");
  //   pseudoCheckingElm.textContent = `set nilai ${
  //     arrFromNodeList[data.minIndex].textContent
  //   } sebagai nilai minimum`;
  // }

  if (data.isSwap) {
    pseudoCheckingElm.textContent = `tukar nilai ${
      arrFromNodeList[data.compareElm].textContent
    } dan ${arrFromNodeList[data.minIndex].textContent}`;
  }
  if (data.isCompareIandMin) {
    pseudoCheckingElm.textContent = `cek apakah nilai ${
      arrFromNodeList[data.compareElm].textContent
    } dan ${arrFromNodeList[data.minIndex].textContent} berbeda`;
  }
}

import { insertionSort } from "./insertionSort";
import { changeBackgroundColor, swapBars } from "../../Helper/Helper";

export function visualizeInsertionSort(
  array,
  animationTime,
  arrFromNodeList,
  pseudoSections
) {
  let sortedArr = insertionSort(array);
  let currElmColor = "#e9c46a";
  let compareElmColor = "#264653";
  let unsortedColor = "#da7f4b";
  let sortedColor = "#2a9d8f";

  for (let i = 0; i < sortedArr.length; i++) {
    setTimeout(() => {
      visualizePseudo(sortedArr[i], pseudoSections);
      checkPseudoAnim(sortedArr[i], arrFromNodeList);
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
        removePreviousActivePseudo();
        const pseudoCheckingElm = document.querySelector(
          ".pseudo-code-container .checking"
        );
        pseudoCheckingElm.textContent = "Let's Go";
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

function removePreviousActivePseudo() {
  let sections = document.querySelectorAll(".active");
  sections.forEach((section) => {
    section.classList.remove("active");
  });
}

function visualizePseudo(data, pseudoSections) {
  if (data.isSetCurr) {
    removePreviousActivePseudo();
    pseudoSections[2].classList.add("active");
  }
  if (data.isCompare) {
    removePreviousActivePseudo();
    pseudoSections[3].classList.add("active");
  }
  if (data.isSwap) {
    removePreviousActivePseudo();
    pseudoSections[4].classList.add("active");
  }
  if (data.currElm == 0 && data.compareElm == 0) {
    removePreviousActivePseudo();
    pseudoSections[0].classList.add("active");
  }
}

function checkPseudoAnim(data, arrFromNodeList) {
  const pseudoCheckingElm = document.querySelector(
    ".pseudo-code-container .checking"
  );
  if (data.isSetCurr) {
    pseudoCheckingElm.textContent = `Set nilai ${
      arrFromNodeList[data.currElm].textContent
    } sebagai current`;
  }
  if (data.isCompare) {
    pseudoCheckingElm.textContent = `Cek apakah nilai ${
      arrFromNodeList[data.compareElm].textContent
    } < ${
      arrFromNodeList[data.currElm].textContent
    },  jika iya maka lakukan looping sampai menemukan data yang lebih kecil dari current`;
  }
  if (data.isSwap) {
    pseudoCheckingElm.textContent = `tukar nilai ${
      arrFromNodeList[data.compareElm].textContent
    } dan ${arrFromNodeList[data.currElm].textContent}`;
  }
  if (data.currElm == 0 && data.compareElm == 0) {
    pseudoCheckingElm.textContent = `Set nilai pertama sebagai sorted`;
  }
}

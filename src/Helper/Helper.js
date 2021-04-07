export function changeBackgroundColor(index, color, array) {
  array[index].style.backgroundColor = color;
}

export async function swapBars(index1, index2, array) {
  let bars = array;
  const translateBar1 = getTranslateValues(bars[index1]);
  const translateBar2 = getTranslateValues(bars[index2]);
  bars[index1].style.transform = `translate( ${translateBar1.x}px, 100px )`;
  bars[index2].style.transform = `translate( ${translateBar2.x}px, 100px )`;
  await delay(100);
  bars[index1].style.transform = `translate( ${translateBar2.x}px, 0% )`;
  bars[index2].style.transform = `translate( ${translateBar1.x}px, 0% )`;

  //swap arr element in array
  swapArrElm(array, index1, index2);
}

function delay(n) {
  n = n || 2000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
}

function getTranslateValues(element) {
  const style = window.getComputedStyle(element);
  const matrix =
    style["transform"] || style.webkitTransform || style.mozTransform;

  // No transform property. Simply return 0 values.
  if (matrix === "none" || typeof matrix === "undefined") {
    return {
      x: 0,
      y: 0,
      z: 0,
    };
  }

  // Can either be 2d or 3d transform
  const matrixType = matrix.includes("3d") ? "3d" : "2d";
  const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(", ");

  // 2d matrices have 6 values
  // Last 2 values are X and Y.
  // 2d matrices does not have Z value.
  if (matrixType === "2d") {
    return {
      x: matrixValues[4],
      y: matrixValues[5],
      z: 0,
    };
  }

  // 3d matrices have 16 values
  // The 13th, 14th, and 15th values are X, Y, and Z
  if (matrixType === "3d") {
    return {
      x: matrixValues[12],
      y: matrixValues[13],
      z: matrixValues[14],
    };
  }
}
function swapArrElm(arr, indexA, indexB) {
  var temp = arr[indexA];
  arr[indexA] = arr[indexB];
  arr[indexB] = temp;
}

export function disableButton(value) {
  let buttons = document.querySelectorAll(".navbar button");
  buttons.forEach((btn) => {
    btn.disabled = value;
  });
}

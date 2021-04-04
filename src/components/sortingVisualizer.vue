<template>
  <div class="container">
    <button @click="getRandomArray">Get random array</button>
    <button @click="runSelectionSort">Selection Sort</button>
    <div class="array-list">
      <div class="bars-container" ref="barContainer"></div>
    </div>
  </div>
</template>

<script>
import { selectionSort } from "../algorithms/selectionSort.js";
export default {
  mounted() {
    this.getRandomArray();
    let bars = document.querySelectorAll(".bar");

    this.arrFromNodeList = Array.from(bars);
  },
  data() {
    return {
      array: [],
      arrFromNodeList: [],
      animationTime: 200,
    };
  },
  methods: {
    getRandomArray() {
      this.array = [];
      this.$refs.barContainer.innerHTML = "";
      const maxLength = 10;
      const minLength = 8;
      const maxValue = 40;
      const minValue = 2;
      const length = Math.floor(
        Math.random() * (maxLength - minLength + 1) + minLength
      );
      for (let i = 0; i < length; i++) {
        let value = Math.floor(
          Math.random() * (maxValue - minValue) + minValue
        );
        this.array.push(value);
        let div = document.createElement("div");
        div.className = "bar";
        div.textContent = value;
        div.style.height = value * 10 + "px";
        this.$refs.barContainer.appendChild(div);
      }
      this.transformAllBars();
    },
    transformAllBars() {
      let bars = document.querySelectorAll(".bar");
      this.arrFromNodeList = Array.from(bars);
      for (let i = 0; i < this.array.length; i++) {
        bars[i].style.transform = `translate( ${i * 130}%, 0%)`;
        this.$refs.barContainer.style.transform = `translateX( -${i * 30}px )`;
      }
    },
    runSelectionSort() {
      let sortedArr = selectionSort(this.array);

      for (let i = 0; i < sortedArr.length; i++) {
        setTimeout(() => {
          this.changeBackgroundColor(
            sortedArr[i].minIndex,
            "rgba(0,0,255, 0.9)"
          );
          this.changeBackgroundColor(sortedArr[i].currElm, "rgba(0,0,0, 0.9)");
          this.changeBackgroundColor(
            sortedArr[i].compareElm,
            "rgba(255,165,0, 0.9)"
          );
          if (sortedArr[i].isSwap === true) {
            // Changing the color-bar of elements which has to be swapped.

            this.changeBackgroundColor(
              sortedArr[i].minIndex,
              "rgba(144,238,144, 0.9)"
            );
            this.changeBackgroundColor(
              sortedArr[i].currElm,
              "rgba(144,238,144, 0.9)"
            );
            // Actually swapping the elements (heights).
            this.swapBars(sortedArr[i].currElm, sortedArr[i].compareElm);
          }
        }, i * this.animationTime);

        setTimeout(() => {
          if (sortedArr[i].isFinalElm === true) {
            // Changing the color-bar of finalElement index which has taken its final sorted position.
            this.changeBackgroundColor(
              sortedArr[i].finalElm,
              "rgba(0, 164, 86, 0.6)"
            );
          } else {
            // Changing the color-bar of elements which has not taken its final sorted position yet.
            this.changeBackgroundColor(
              sortedArr[i].compareElm,
              "rgba(225, 0, 120, 0.6)"
            );
            this.changeBackgroundColor(
              sortedArr[i].minIndex,
              "rgba(225, 0, 120, 0.6)"
            );
          }

          // From "getSelectionSortAnimations" function, we know that the array is sorted when finalElement is (array.length - 1).
          // Resolving the promise when the finalElement index is (array.length - 1).
          // if (sortedArr[i].finalElm === this.array.length - 1) return;
        }, (i + 1) * this.animationTime);
      }
    },

    changeBackgroundColor(index, color) {
      this.arrFromNodeList[index].style.backgroundColor = color;
    },
    async swapBars(index1, index2) {
      let bars = this.arrFromNodeList;

      const translateBar1 = this.getTranslateValues(bars[index1]);
      const translateBar2 = this.getTranslateValues(bars[index2]);
      bars[index1].style.transform = `translate( ${translateBar1.x}px, 100px )`;
      bars[index2].style.transform = `translate( ${translateBar2.x}px, 100px )`;

      await this.delay(100);
      bars[index1].style.transform = `translate( ${translateBar2.x}px, 0% )`;
      bars[index2].style.transform = `translate( ${translateBar1.x}px, 0% )`;
      this.swapArrElm(this.arrFromNodeList, index1, index2);
    },
    delay(n) {
      n = n || 2000;
      return new Promise((done) => {
        setTimeout(() => {
          done();
        }, n);
      });
    },
    getTranslateValues(element) {
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
    },
    swapArrElm(arr, indexA, indexB) {
      var temp = arr[indexA];
      arr[indexA] = arr[indexB];
      arr[indexB] = temp;
    },
  },
};
</script>

<style scoped src="../style/sortingVisualizer.css"></style>

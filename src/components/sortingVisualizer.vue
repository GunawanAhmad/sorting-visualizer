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
import { visualizeSelectionSort } from "../algorithms/selectionSort/visualizeSelectionSort";
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
      animationTime: 100,
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
      visualizeSelectionSort(
        this.array,
        this.animationTime,
        this.arrFromNodeList
      );
    },
  },
};
</script>

<style scoped src="../style/sortingVisualizer.css"></style>

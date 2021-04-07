<template>
  <div class="container">
    <algo-info />
    <div class="visualization">
      <selection-sort-pseudo />
      <div class="array-list">
        <div class="bars-container" ref="barContainer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { visualizeSelectionSort } from "../algorithms/selectionSort/visualizeSelectionSort";
import SelectionSortPseudo from "./selectionSortPseudo.vue";
import AlgoInfo from "../components/AlgoInfo.vue";

export default {
  components: { SelectionSortPseudo, AlgoInfo },
  mounted() {
    this.getRandomArray();
    let bars = document.querySelectorAll(".bar");
    this.arrFromNodeList = Array.from(bars);
    this.eventHub.$on("visualize", (data) => {
      this.isShowAlgoInfo = true;
      this.checkSelectedAlgoAndSpeed(data);
      this.runSelectionSort();
    });
    this.eventHub.$on("randomize", (data) => {
      console.log(data);
      this.getRandomArray();
    });
    this.pseudoSections = document.querySelectorAll(".pseudo-code-container p");
  },
  data() {
    return {
      array: [],
      arrFromNodeList: [],
      animationTime: 200,
      pseudoSections: null,
      selectedAlgorithm: "",
      isShowAlgoInfo: false,
    };
  },
  methods: {
    getRandomArray() {
      this.array = [];
      this.$refs.barContainer.innerHTML = "";
      const maxLength = 12;
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
        this.$refs.barContainer.style.transform = `translateX( -${i * 35}px )`;
      }
    },
    runSelectionSort() {
      visualizeSelectionSort(
        this.array,
        this.animationTime,
        this.arrFromNodeList,
        this.pseudoSections
      );
    },
    checkSelectedAlgoAndSpeed(data) {
      if (data.selectedAlgorithm == "selection") {
        this.selectedAlgorithm = "selection";
      }

      if (data.selectedSpeed == "Lambat") {
        this.animationTime = 800;
      } else if (data.selectedSpeed == "Sedang") {
        this.animationTime = 500;
      } else if (data.selectedSpeed == "Cepat") {
        this.animationTime = 200;
      }
    },
  },
};
</script>

<style scoped src="../style/sortingVisualizer.css"></style>

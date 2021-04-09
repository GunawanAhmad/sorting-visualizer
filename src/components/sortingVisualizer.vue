<template>
  <div class="container">
    <algo-info />
    <div class="visualization">
      <selection-sort-pseudo v-if="selectedAlgorithm == 'selection'" />
      <insertion-sort-pseudo v-if="selectedAlgorithm == 'insertion'" />
      <div class="array-list">
        <div class="bars-container" ref="barContainer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { visualizeSelectionSort } from "../algorithms/selectionSort/visualizeSelectionSort";
import { visualizeInsertionSort } from "../algorithms/insertionSort/visualizeInsertionSort";
import { visualizeBubbleSort } from "../algorithms/bubbleSort/visualizeBubbleSort";
import SelectionSortPseudo from "./selectionSortPseudo.vue";
import AlgoInfo from "../components/AlgoInfo.vue";
import InsertionSortPseudo from "./insertionSortPseudo.vue";

export default {
  components: { SelectionSortPseudo, AlgoInfo, InsertionSortPseudo },
  mounted() {
    this.getRandomArray();
    let bars = document.querySelectorAll(".bar");
    this.arrFromNodeList = Array.from(bars);
    this.eventHub.$on("visualize", (data) => {
      this.isShowAlgoInfo = true;
      this.checkSelectedAlgoAndSpeed(data);
      this.visualizeSortingAlgo();
    });
    this.eventHub.$on("randomize", (data) => {
      console.log(data);
      this.getRandomArray();
    });
    this.eventHub.$on("changeAlgo", (data) => {
      this.selectedAlgorithm = data;
      this.pseudoSections = document.querySelectorAll(
        ".pseudo-code-container p"
      );
    });
    this.pseudoSections = document.querySelectorAll(".pseudo-code-container p");
  },
  data() {
    return {
      array: [],
      arrFromNodeList: [],
      animationTime: 200,
      pseudoSections: null,
      selectedAlgorithm: "selection",
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
    visualizeSortingAlgo() {
      if (this.selectedAlgorithm.toLowerCase() == "selection") {
        this.runSelectionSort();
      } else if (this.selectedAlgorithm.toLowerCase() == "insertion") {
        this.runInsertionSort();
      } else if (this.selectedAlgorithm.toLowerCase() == "bubble") {
        this.runBubbleSort();
      }
    },
    runBubbleSort() {
      this.pseudoSections = document.querySelectorAll(
        ".pseudo-code-container p"
      );
      visualizeBubbleSort(this.array, this.animationTime, this.arrFromNodeList);
    },
    runSelectionSort() {
      this.pseudoSections = document.querySelectorAll(
        ".pseudo-code-container p"
      );

      visualizeSelectionSort(
        this.array,
        this.animationTime,
        this.arrFromNodeList,
        this.pseudoSections
      );
    },
    runInsertionSort() {
      this.pseudoSections = document.querySelectorAll(
        ".pseudo-code-container p"
      );

      visualizeInsertionSort(
        this.array,
        this.animationTime,
        this.arrFromNodeList,
        this.pseudoSections
      );
    },
    checkSelectedAlgoAndSpeed(data) {
      if (data.selectedAlgorithm.toLowerCase() == "selection") {
        this.selectedAlgorithm = "selection";
      } else if (data.selectedAlgorithm.toLowerCase() == "insertion") {
        this.selectedAlgorithm = "insertion";
      } else if (data.selectedAlgorithm.toLowerCase() == "bubble") {
        this.selectedAlgorithm = "bubble";
      }

      if (data.selectedSpeed == "Lambat") {
        this.animationTime = 1000;
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
